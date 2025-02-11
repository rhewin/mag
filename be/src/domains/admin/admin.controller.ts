import { attempt, encode64, generateUUID7, paginate } from '@/utils/helper.util'
import { hashPassword, isPasswordValid } from '@/utils/auth.util'
import { jsonOk, jsonError } from '@/base/api.base'
import { adminQuery } from './admin.query'
import type {
  IReqLogin,
  IReqPagination,
  IReqCreateAdmin,
  IReqUpdateAdmin,
} from './admin.types'

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
  const encodedJwtData = encode64(JSON.stringify(jwtData))
  const [data, err] = await attempt(() =>
    ctx.jwt.sign({ data: encodedJwtData })
  )
  return err ? jsonError() : jsonOk(data)
}

const list = async (ctx: any) => {
  const { pageNum, perPage } = ctx.query as IReqPagination
  const [skip, take] = paginate(pageNum, perPage)
  const [data, err] = await attempt(() => adminQuery.getAll(skip, take))
  return err ? jsonError() : jsonOk(data)
}

const create = async (ctx: any) => {
  const req = ctx.body as IReqCreateAdmin
  const inputted = {
    ...req,
    uuid: generateUUID7(),
    internalId: await adminQuery.generateInternalId(),
    password: await hashPassword(req.password),
    modifiedBy: ctx.user.internalId,
  }
  const [data, err] = await attempt(() => adminQuery.create({ inputted }))
  return err ? jsonError() : jsonOk(data)
}

export const update = async (ctx: any) => {
  let req = ctx.body as IReqUpdateAdmin
  const { id } = ctx.params as { id: number }
  const modifiedBy = ctx.user.internalId
  const [data, err] = await attempt(() =>
    adminQuery.updateByInternalId(Number(id), { ...req, modifiedBy })
  )
  return err ? jsonError() : jsonOk(data)
}

export const deleteById = async (ctx: any) => {
  const { id } = ctx.params as { id: number }
  const modifiedBy = ctx.user.internalId
  const [data, err] = await attempt(() =>
    adminQuery.softDeleteByInternalId(Number(id), modifiedBy)
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
