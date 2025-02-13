import {
  attempt,
  encode64,
  generateUUID7,
  getUnixTimestamp,
  paginate,
} from '@/utils/helper.util'
import { hashPassword, isPasswordValid } from '@/utils/auth.util'
import { jsonOk, jsonError } from '@/base/api.base'
import { adminQuery } from './admin.query'
import type * as T from './admin.types'

const list = async (ctx: any) => {
  const { pageNum, perPage } = ctx.query as T.ReqPagination
  const [skip, take] = paginate(pageNum, perPage)
  const [data, err] = await attempt(() => adminQuery.getAll(skip, take))
  return err ? jsonError() : jsonOk(data)
}

const add = async (ctx: any) => {
  const req = ctx.body as T.ReqCreateAdmin
  const inputted = {
    ...req,
    uuid: generateUUID7(),
    internalId: await adminQuery.generateInternalId(),
    password: await hashPassword(req.password),
    modifiedBy: ctx.user.internalId,
  }
  const [data, err] = await attempt(() => adminQuery.create(inputted))
  return err ? jsonError() : jsonOk(data)
}

const edit = async (ctx: any) => {
  const req = ctx.body as T.ReqUpdateAdmin
  const { internalId } = ctx.params as { internalId: number }
  const modifiedBy = ctx.user.internalId
  const [data, err] = await attempt(() =>
    adminQuery.updateByInternalId(Number(internalId), { ...req, modifiedBy })
  )
  return err ? jsonError() : jsonOk(data)
}

const wipe = async (ctx: any) => {
  const { internalId } = ctx.params as { internalId: number }
  const modifiedBy = ctx.user.internalId
  const [data, err] = await attempt(() =>
    adminQuery.softDeleteByInternalId(Number(internalId), { modifiedBy })
  )
  return err ? jsonError() : jsonOk(data)
}

const login = async (ctx: any) => {
  const { email, password } = ctx.body as T.ReqLogin

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
    iat: getUnixTimestamp(),
  }
  const encodedJwtData = encode64(JSON.stringify(jwtData))
  const [data, err] = await attempt(() =>
    ctx.jwt.sign({ data: encodedJwtData }, { expiresIn: '1d' })
  )
  return err ? jsonError() : jsonOk(data)
}

export default {
  list,
  add,
  edit,
  wipe,
  login,
}
