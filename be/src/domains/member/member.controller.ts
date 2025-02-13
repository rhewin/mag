import { attempt, paginate } from '@/utils/helper.util'
import { jsonOk, jsonError } from '@/base/api.base'
import { memberQuery } from './member.query'
import type * as T from './member.types'

const list = async (ctx: any) => {
  const { pageNum, perPage } = ctx.query as T.ReqPagination
  const [skip, take] = paginate(pageNum, perPage)
  const [data, err] = await attempt(() => memberQuery.getAll(skip, take))
  return err ? jsonError() : jsonOk(data)
}

const add = async (ctx: any) => {
  const req = ctx.body as T.ReqCreateMember
  const inputted = {
    ...req,
    internalId: await memberQuery.generateInternalId(),
    modifiedBy: ctx.user.internalId,
  }
  const [data, err] = await attempt(() => memberQuery.create(inputted))
  return err ? jsonError() : jsonOk(data)
}

const edit = async (ctx: any) => {
  let req = ctx.body as T.ReqUpdateMember
  const { id } = ctx.params as { id: number }
  const modifiedBy = ctx.user.internalId
  const [data, err] = await attempt(() =>
    memberQuery.updateByInternalId(Number(id), { ...req, modifiedBy })
  )
  return err ? jsonError() : jsonOk(data)
}

const wipe = async (ctx: any) => {
  const { id } = ctx.params as { id: number }
  const modifiedBy = ctx.user.internalId
  const [data, err] = await attempt(() =>
    memberQuery.softDeleteByInternalId(Number(id), modifiedBy)
  )
  return err ? jsonError() : jsonOk(data)
}

export default {
  list,
  add,
  edit,
  wipe,
}
