import { attempt, generateUUID7, paginate } from '@/utils/helper.util'
import { hashPassword, isPasswordValid } from '@/utils/auth.util'
import { jsonOk, jsonError } from '@/base/api.base'
import { adminQuery } from './admin.query'
import type {
  IReqLogin,
  IReqPagination,
  IReqCreateAdmin,
  IReqUpdateAdmin,
} from './admin'

const login = async (ctx: any) => {
  const { email, password } = ctx.body as IReqLogin

  const [admin, errAdmin] = await attempt(() =>
    adminQuery.getPasswordByEmail(email)
  )
  if (errAdmin || admin == null) {
    return jsonError('INTERNAL', null, 'Login failed')
  }

  if (!(await isPasswordValid(password, admin.password))) {
    return jsonError('INTERNAL', null, 'Login failed')
  }

  const jwtData = {
    uuid: admin.uuid,
    internalId: admin.internalId,
  }
  const [data, err] = await attempt(() => ctx.jwt.sign(jwtData))
  return err ? jsonError() : jsonOk(data)
}

const list = async (ctx: any) => {
  let { pageNum, perPage } = ctx.query as IReqPagination

  const [skip, take] = paginate(pageNum, perPage)
  const [data, err] = await attempt(() => adminQuery.getAll(skip, take))
  return err ? jsonError() : jsonOk(data)
}

const create = async (ctx: any) => {
  const req = ctx.body as IReqCreateAdmin

  const uuid = generateUUID7()
  const internalId = await adminQuery.generateInternalId()
  const password = await hashPassword(req.password)
  const modifiedBy = '0'
  const [data, err] = await attempt(() =>
    adminQuery.create({ ...req, uuid, internalId, password, modifiedBy })
  )
  return err ? jsonError() : jsonOk(data)
}

export const update = async (ctx: any) => {
  let { id } = ctx.params as { id: number }
  let req = ctx.body as IReqUpdateAdmin

  const modifiedBy = '0'
  const [data, err] = await attempt(() =>
    adminQuery.update(Number(id), { ...req, modifiedBy })
  )
  return err ? jsonError() : jsonOk(data)
}

export const deleteById = async (ctx: any) => {
  let { id } = ctx.params as { id: number }

  const modifiedBy = '0'
  const [data, err] = await attempt(() =>
    adminQuery.softDeleteById(Number(id), modifiedBy)
  )
  return err ? jsonError() : jsonOk(data)
}

export default {
  login,
  list,
  create,
  update,
  deleteById,
}
