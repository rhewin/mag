import { FastifyRequest, FastifyReply } from 'fastify';
import { IBookRequestCreate, IBookRequestUpdate } from './book';
import {
  queryListInputValidate,
  createBookInputValidate,
  updateBookInputValidate,
  idInputValidate
} from './book.validator';
import * as query from './book.query';
import * as queryDep from './book.dep.query';
import { getPagination } from "../utils/util.pagination";
import { jsonError } from '../utils/util.jsonResponse';


export const isBookExists = async (id: number): Promise<boolean> => {
  const data = await query.getFirst(id);
  return !!data;
}

const allUpdateValidation = async (req: FastifyRequest, res: FastifyReply, id: number, data: IBookRequestUpdate) => {
  let validate = idInputValidate({ id })
  if (!validate.isSuccess) {
    return jsonError({ req, res, code: 400, message: 'Invalid param id', error: validate.errorDetail })
  }

  validate = updateBookInputValidate(data)
  if (!validate.isSuccess) {
    return jsonError({ req, res, code: 400, message: 'Invalid request', error: validate.errorDetail })
  }

  if (!await isBookExists(id)) {
    return jsonError({ req, res, code: 404, message: 'Data not found' })
  }

  return validate
}

const allDeleteValidation = async (req: FastifyRequest, res: FastifyReply, id: number) => {
  let validate = idInputValidate({ id })
  if (!validate.isSuccess) {
    return jsonError({ req, res, code: 400, message: 'Invalid param id', error: validate.errorDetail })
  }

  if (!await isBookExists(id)) {
    return jsonError({ req, res, code: 404, message: 'Data not found' })
  }

  return validate
}

export const listBook = async (req: FastifyRequest, res: FastifyReply) => {
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

export const createBook = async (req: FastifyRequest, res: FastifyReply) => {
  const modifiedBy = req.user.id ?? 0;
  const data: IBookRequestCreate = req.body as any

  const validate = createBookInputValidate({ ...data, modifiedBy })
  if (!validate.isSuccess) {
    return jsonError({ req, res, code: 400, message: 'Invalid request', error: validate.errorDetail })
  }

  try {
    const data = await query.create(validate.data);
    await queryDep.upsertBookStatus(data.id, data.quantity, 0);
    res.code(201).send(data);
  } catch (error) {
    return jsonError({ req, res, code: 500, message: 'Error creating data', error })
  }
};

export const updateBookStatus = async (req: FastifyRequest, res: FastifyReply, bookId: number, qty: number) => {
  const bookStatus = await queryDep.getBookStatusByBookId(bookId)
  if (bookStatus === null || bookStatus === undefined) {
    await queryDep.upsertBookStatus(bookId, qty, 0)
    return;
  }

  let availableQty = 0;
  let borrowedQty = 0;
  borrowedQty = bookStatus.borrowedQty;
  availableQty = qty - borrowedQty
  if (availableQty < 0) {
    return jsonError({ req, res, code: 500, message: 'No book to rent', error: 'No book to rent' })
  }
  await queryDep.upsertBookStatus(bookId, availableQty, borrowedQty)
}

export const updateBook = async (req: FastifyRequest, res: FastifyReply) => {
  const modifiedBy = req.user.id ?? 0;
  let { id } = req.params as { id: number }
  let data: IBookRequestUpdate = req.body as any

  id = Number(id)
  data = { ...data, modifiedBy }

  const validate = await allUpdateValidation(req, res, id, data)
  if (!validate) {
    return;
  }

  try {
    await updateBookStatus(req, res, id, validate.data.quantity)

    const data = await query.update(id, validate.data);
    res.send(data);
  } catch (error) {
    return jsonError({ req, res, code: 500, message: 'Error updating data', error })
  }
};

export const deleteBook = async (req: FastifyRequest, res: FastifyReply) => {
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
