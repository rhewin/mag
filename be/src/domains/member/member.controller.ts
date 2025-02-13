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
  const [data, err] = await attempt(() => memberQuery.createNested(inputted))
  return err ? jsonError() : jsonOk(data)
}

const edit = async (ctx: any) => {
  const req = ctx.body as T.ReqUpdateMember
  const { internalId } = ctx.params as { internalId: number }
  const modifiedBy = ctx.user.internalId
  const [data, err] = await attempt(() =>
    memberQuery.updateByInternalId(Number(internalId), { ...req, modifiedBy })
  )
  return err ? jsonError() : jsonOk(data)
}

const wipe = async (ctx: any) => {
  const { internalId } = ctx.params as { internalId: number }
  const modifiedBy = ctx.user.internalId
  const [data, err] = await attempt(() =>
    memberQuery.softDeleteByInternalId(Number(internalId), { modifiedBy })
  )
  return err ? jsonError() : jsonOk(data)
}

export default {
  list,
  add,
  edit,
  wipe,
}
