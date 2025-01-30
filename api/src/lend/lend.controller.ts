import { FastifyRequest, FastifyReply } from 'fastify';
import { ILendApiRequestCreate, ILendRequestCreate, ILendApiRequestUpdate, ILendRequestUpdate, StatusType } from './lend';
import {
  queryListInputValidate,
  createLendInputValidate,
  updateLendInputValidate,
  idInputValidate
} from './lend.validator';
import * as query from './lend.query';
import * as queryDep from './lend.dep.query';
import { getPagination } from "../utils/util.pagination";
import { jsonError } from '../utils/util.jsonResponse';
import cfg from '../config';


export const isLendExists = async (id: number): Promise<boolean> => {
  const data = await query.getFirst(id);
  return !!data;
}

const allUpdateValidation = async (req: FastifyRequest, res: FastifyReply, id: number, data: ILendRequestUpdate) => {
  let validate = idInputValidate({ id })
  if (!validate.isSuccess) {
    return jsonError({ req, res, code: 400, message: 'Invalid param id', error: validate.errorDetail })
  }

  validate = updateLendInputValidate(data)
  if (!validate.isSuccess) {
    return jsonError({ req, res, code: 400, message: 'Invalid request', error: validate.errorDetail })
  }

  if (!await isLendExists(id)) {
    return jsonError({ req, res, code: 404, message: 'Data not found' })
  }

  return validate
}

const allDeleteValidation = async (req: FastifyRequest, res: FastifyReply, id: number) => {
  let validate = idInputValidate({ id })
  if (!validate.isSuccess) {
    return jsonError({ req, res, code: 400, message: 'Invalid param id', error: validate.errorDetail })
  }

  if (!await isLendExists(id)) {
    return jsonError({ req, res, code: 404, message: 'Data not found' })
  }

  return validate
}

const updateBookStatus = async (req: FastifyRequest, res: FastifyReply, bookId: number, mode: string) => {
  let availableQty = 0;
  let borrowedQty = 0;
  const bookStatus = await queryDep.getBookStatusByBookId(bookId)
  if (bookStatus !== null && bookStatus !== undefined) {
    availableQty = bookStatus.availableQty;
    borrowedQty = bookStatus.borrowedQty;
  }

  if (availableQty == 0 || mode == '') {
    return jsonError({ req, res, code: 500, message: 'No book to rent', error: 'No book to rent' })
  }

  if (mode == 'borrowed') {
    await queryDep.upsertBookStatus(bookId, availableQty - 1, borrowedQty + 1)
  } else if (mode == 'returned') {
    await queryDep.upsertBookStatus(bookId, availableQty + 1, borrowedQty - 1)
  }
}

export const listLend = async (req: FastifyRequest, res: FastifyReply) => {
  let { pageNum, perPage } = req.query as {
    pageNum?: number;
    perPage?: number;
  };

  pageNum = pageNum ? Number(pageNum) : 1
  perPage = perPage ? Number(perPage) : 10

  const validate = queryListInputValidate({ pageNum, perPage })
  if (!validate.isSuccess) {
    return jsonError({ req, res, code: 400, message: 'Invalid param query', error: validate.errorDetail })
  }

  const { currentPage, take, skip } = getPagination(pageNum, perPage);

  try {
    const allData = await query.listAll(skip, take);
    const totalRecords = await query.count();
    res.send({
      data: allData,
      pagination: {
        pageNum: currentPage,
        perPage: take,
        totalRecords,
        totalPages: Math.ceil(totalRecords / take),
      }
    });
  } catch (error) {
    return jsonError({ req, res, code: 500 })
  }
};

export const createLend = async (req: FastifyRequest, res: FastifyReply) => {
  const modifiedBy = req.user.id ?? 0;
  const data: ILendApiRequestCreate = req.body as any

  // get book id from isbn
  const book = await queryDep.getBookByIsbn(data.bookIsbn)
  if (book === null || book === undefined) {
    return jsonError({ req, res, code: 404 })
  }

  // set borrowed date at execution date time & auto calculate due date
  const borrowedDate = new Date()
  const dueDate = new Date(borrowedDate)
  dueDate.setDate(borrowedDate.getDate() + Number(cfg.LEND_DUE_DATE_DAYS))

  const inputData: ILendRequestCreate = {
    bookId: book.id,
    memberId: data.memberId,
    borrowedDate,
    dueDate,
    status: 'borrowed',
    modifiedBy
  }

  const validate = createLendInputValidate(inputData)
  if (!validate.isSuccess) {
    return jsonError({ req, res, code: 400, message: 'Invalid request', error: validate.errorDetail })
  }

  try {
    // check & update book status
    await updateBookStatus(req, res, book.id, "borrowed")

    const data = await query.create(validate.data);
    res.code(201).send(data);
  } catch (error) {
    return jsonError({ req, res, code: 500, message: 'Error creating data', error })
  }
};

export const updateLend = async (req: FastifyRequest, res: FastifyReply) => {
  const modifiedBy = req.user.id ?? 0;
  let { id } = req.params as { id: number }
  let data: ILendRequestUpdate = req.body as any

  id = Number(id)
  data = { ...data, modifiedBy }

  const validate = await allUpdateValidation(req, res, id, data)
  if (!validate) {
    return;
  }

  try {
    const data = await query.update(id, validate.data);
    res.send(data);
  } catch (error) {
    return jsonError({ req, res, code: 500, message: 'Error updating data', error })
  }
};

export const deleteLend = async (req: FastifyRequest, res: FastifyReply) => {
  const modifiedBy = req.user.id ?? 0;
  let { id } = req.params as { id: number };
  id = Number(id)

  const validate = await allDeleteValidation(req, res, id)
  if (!validate) {
    return;
  }

  try {
    await query.deleteById(id, modifiedBy);
    res.send({ message: "Data deleted successfully" });
  } catch (error) {
    return jsonError({ req, res, code: 500, message: 'Error deleting data', error })
  }
};

export const returnLend = async (req: FastifyRequest, res: FastifyReply) => {
  const modifiedBy = req.user.id ?? 0;
  let data: ILendApiRequestUpdate = req.body as any

  // get book id from isbn
  const book = await queryDep.getBookByIsbn(data.bookIsbn)
  if (book === null || book === undefined) {
    return jsonError({ req, res, code: 404, message: '', error: 'Book not found' })
  }

  // get rented book
  const rentedData = await query.getRentedBook(book.id, data.memberId)
  if (rentedData === null || rentedData === undefined) {
    return jsonError({ req, res, code: 404, message: '', error: 'Rent record not found' })
  }

  // check returnDate not more than dueDate
  const returnDate = new Date()
  let status: StatusType = 'returned'
  if (returnDate > rentedData.dueDate) {
    status = 'returned-late'
  }

  const updatedData: ILendRequestUpdate = {
    bookId: book.id,
    memberId: data.memberId,
    borrowedDate: rentedData.borrowedDate,
    dueDate: rentedData.dueDate,
    returnDate,
    status,
    modifiedBy
  }

  const validate = updateLendInputValidate(updatedData)
  if (!validate.isSuccess) {
    return jsonError({ req, res, code: 400, message: 'Invalid request', error: validate.errorDetail })
  }

  try {
    // check & update book status
    await updateBookStatus(req, res, book.id, "returned")

    const data = await query.update(rentedData.id, validate.data);
    res.send(data);
  } catch (error) {
    return jsonError({ req, res, code: 500, message: 'Error update rented data', error })
  }
};
