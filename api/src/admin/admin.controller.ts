import { FastifyRequest, FastifyReply } from 'fastify';
import { IAdminRequestCreate, IAdminRequestUpdate } from './admin';
import {
  queryListInputValidate,
  createAdminInputValidate,
  updateAdminInputValidate,
  idInputValidate,
  LoginInputValidate
} from './admin.validator';
import * as query from './admin.query';
import { getPagination } from "../utils/util.pagination";
import { jsonError } from '../utils/util.jsonResponse';
import { createJwtToken, isPasswordValid, hashedPassword } from '../utils/util.auth';
import { genInternalUniqueId } from '../utils/util.formatter';
import { v4 as uuidv4 } from 'uuid';


export const isAdminExists = async (id: number): Promise<boolean> => {
  const data = await query.getFirst(id);
  return !!data;
}

export const isAdminExistsByEmail = async (email: string): Promise<boolean> => {
  const data = await query.getFirstByEmail(email);
  return !!data;
}

const allUpdateValidation = async (req: FastifyRequest, res: FastifyReply, id: number, data: IAdminRequestUpdate) => {
  let validate = idInputValidate({ id })
  if (!validate.isSuccess) {
    return jsonError({ req, res, code: 400, message: 'Invalid param id', error: validate.errorDetail })
  }

  validate = updateAdminInputValidate(data)
  if (!validate.isSuccess) {
    return jsonError({ req, res, code: 400, message: 'Invalid request', error: validate.errorDetail })
  }

  if (!await isAdminExists(id)) {
    return jsonError({ req, res, code: 404, message: 'Data not found' })
  }

  return validate
}

const allDeleteValidation = async (req: FastifyRequest, res: FastifyReply, id: number) => {
  let validate = idInputValidate({ id })
  if (!validate.isSuccess) {
    return jsonError({ req, res, code: 400, message: 'Invalid param id', error: validate.errorDetail })
  }

  if (!await isAdminExists(id)) {
    return jsonError({ req, res, code: 404, message: 'Data not found' })
  }

  return validate
}

const allLoginValidation = async (req: FastifyRequest, res: FastifyReply, email: string, password: string) => {
  let validate = LoginInputValidate({ email, password })
  if (!validate.isSuccess) {
    return jsonError({ req, res, code: 400, message: '', error: validate.errorDetail })
  }

  if (!await isAdminExistsByEmail(email)) {
    return jsonError({ req, res, code: 500, message: '', error: 'Data not found' })
  }

  return validate
}

export const login = async (req: FastifyRequest, res: FastifyReply) => {
  const { email, password } = req.body as any
  const validate = await allLoginValidation(req, res, email, password)
  if (!validate) {
    return;
  }

  try {
    const data = await query.getFirstByEmail(email)
    if (data === null || data === undefined) {
      return jsonError({ req, res, code: 500, message: '', error: 'Data not found' })
    }

    if (!await isPasswordValid(data.password, password)) {
      return jsonError({ req, res, code: 500, message: '', error: 'Wrong password' })
    }

    const token = createJwtToken({
      id: data.id,
      uuid: data.uuid,
      email: data.email,
    });
    res.code(200).send({ token });
  } catch (error) {
    return jsonError({ req, res, code: 500, message: 'Error creating data', error })
  }
};

export const listAdmin = async (req: FastifyRequest, res: FastifyReply) => {
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

export const createAdmin = async (req: FastifyRequest, res: FastifyReply) => {
  const data: IAdminRequestCreate = req.body as any
  const uuid = uuidv4()
  const adminId = genInternalUniqueId()

  const validate = createAdminInputValidate({ ...data, uuid, adminId })
  if (!validate.isSuccess) {
    return jsonError({ req, res, code: 400, message: 'Invalid request', error: validate.errorDetail })
  }

  try {
    const plainPassword = validate.data.password
    validate.data = { ...validate.data, password: await hashedPassword(plainPassword) }

    const data = await query.create(validate.data);
    const { password, uuid, adminId, ...cleanedData } = data;

    res.code(201).send(cleanedData);
  } catch (error) {
    return jsonError({ req, res, code: 500, message: 'Error creating data', error })
  }
};

export const updateAdmin = async (req: FastifyRequest, res: FastifyReply) => {
  let { id } = req.params as { id: number }
  let data: IAdminRequestUpdate = req.body as any

  id = Number(id)

  const validate = await allUpdateValidation(req, res, id, data)
  if (!validate) {
    return;
  }

  try {
    const data = await query.update(id, validate.data);
    const { password, uuid, adminId, ...cleanedData } = data;

    res.send(cleanedData);
  } catch (error) {
    return jsonError({ req, res, code: 500, message: 'Error updating data', error })
  }
};

export const deleteAdmin = async (req: FastifyRequest, res: FastifyReply) => {
  let { id } = req.params as { id: number };
  id = Number(id)

  const validate = await allDeleteValidation(req, res, id)
  if (!validate) {
    return;
  }

  try {
    await query.deleteById(id);
    res.send({ message: "Data deleted successfully" });
  } catch (error) {
    return jsonError({ req, res, code: 500, message: 'Error deleting data', error })
  }
};
