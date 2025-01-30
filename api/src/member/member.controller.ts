import { FastifyRequest, FastifyReply } from 'fastify';
import { IMemberRequestCreate, IMemberRequestUpdate } from './member';
import {
  queryListInputValidate,
  createMemberInputValidate,
  updateMemberInputValidate,
  idInputValidate
} from './member.validator';
import * as query from './member.query';
import { getPagination } from "../utils/util.pagination";
import { jsonError } from '../utils/util.jsonResponse';
import { genInternalUniqueId } from '../utils/util.formatter';


export const isMemberExists = async (id: number): Promise<boolean> => {
  const data = await query.getFirst(id);
  return !!data;
}

const allUpdateValidation = async (req: FastifyRequest, res: FastifyReply, id: number, data: IMemberRequestUpdate) => {
  let validate = idInputValidate({ id })
  if (!validate.isSuccess) {
    return jsonError({ req, res, code: 400, message: 'Invalid param id', error: validate.errorDetail })
  }

  validate = updateMemberInputValidate(data)
  if (!validate.isSuccess) {
    return jsonError({ req, res, code: 400, message: 'Invalid request', error: validate.errorDetail })
  }

  if (!await isMemberExists(id)) {
    return jsonError({ req, res, code: 404, message: 'Data not found' })
  }

  return validate
}

const allDeleteValidation = async (req: FastifyRequest, res: FastifyReply, id: number) => {
  let validate = idInputValidate({ id })
  if (!validate.isSuccess) {
    return jsonError({ req, res, code: 400, message: 'Invalid param id', error: validate.errorDetail })
  }

  if (!await isMemberExists(id)) {
    return jsonError({ req, res, code: 404, message: 'Data not found' })
  }

  return validate
}

export const listMember = async (req: FastifyRequest, res: FastifyReply) => {
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

export const createMember = async (req: FastifyRequest, res: FastifyReply) => {
  const modifiedBy = req.user.id ?? 0;
  const data: IMemberRequestCreate = req.body as any
  const memberId = genInternalUniqueId()
  const status = "active";

  const validate = createMemberInputValidate({ ...data, memberId, status, modifiedBy })
  if (!validate.isSuccess) {
    return jsonError({ req, res, code: 400, message: 'Invalid request', error: validate.errorDetail })
  }

  try {
    const data = await query.create(validate.data);
    res.code(201).send(data);
  } catch (error) {
    return jsonError({ req, res, code: 500, message: 'Error creating data', error })
  }
};

export const updateMember = async (req: FastifyRequest, res: FastifyReply) => {
  const modifiedBy = req.user.id ?? 0;
  let { id } = req.params as { id: number }
  let data: IMemberRequestUpdate = req.body as any

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

export const deleteMember = async (req: FastifyRequest, res: FastifyReply) => {
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
