import { attempt, paginate } from '@/utils/helper.util'
import { jsonOk, jsonError } from '@/base/api.base'
import { memberQuery } from './member.query'
import type {
  IReqPagination,
  IReqCreateMember,
  IReqUpdateMember,
} from './member.types'

const list = async (ctx: any) => {
  const { pageNum, perPage } = ctx.query as IReqPagination
  const [skip, take] = paginate(pageNum, perPage)
  const [data, err] = await attempt(() => memberQuery.getAll(skip, take))
  return err ? jsonError() : jsonOk(data)
}

const create = async (ctx: any) => {
  const req = ctx.body as IReqCreateMember
  const inputted = {
    ...req,
    internalId: await memberQuery.generateInternalId(),
    modifiedBy: ctx.user.internalId,
  }
  const [data, err] = await attempt(() => memberQuery.create(inputted))
  return err ? jsonError() : jsonOk(data)
}

export const update = async (ctx: any) => {
  let req = ctx.body as IReqUpdateMember
  const { id } = ctx.params as { id: number }
  const modifiedBy = ctx.user.internalId
  const [data, err] = await attempt(() =>
    memberQuery.updateByInternalId(Number(id), { ...req, modifiedBy })
  )
  return err ? jsonError() : jsonOk(data)
}

export const deleteById = async (ctx: any) => {
  const { id } = ctx.params as { id: number }
  const modifiedBy = ctx.user.internalId
  const [data, err] = await attempt(() =>
    memberQuery.softDeleteByInternalId(Number(id), modifiedBy)
  )
  return err ? jsonError() : jsonOk(data)
}

export default {
  list,
  create,
  update,
  deleteById,
}
