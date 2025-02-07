import { attempt, paginate } from "@/utils/helper.util";
import { jsonOk, jsonError } from "@/base/api.base";
import { memberQuery } from "./member.query";
import type { IReqCreateMember, IReqUpdateMember } from "./member";

const list = async (ctx: any) => {
  let { pageNum, perPage } = ctx.query as {
    pageNum?: number;
    perPage?: number;
  };

  const [skip, take] = paginate(pageNum, perPage);
  const [data, err] = await attempt(() => memberQuery.getAll(skip, take));
  return err ? jsonError() : jsonOk(data);
};

const create = async (ctx: any) => {
  const req = ctx.body as IReqCreateMember;

  const modifiedBy = "0";
  const internalId = await memberQuery.genInternalId();
  const [data, err] = await attempt(() =>
    memberQuery.create({ ...req, internalId, modifiedBy })
  );
  return err ? jsonError() : jsonOk(data);
};

export const update = async (ctx: any) => {
  let { id } = ctx.params as { id: number };
  let req = ctx.body as IReqUpdateMember;

  const modifiedBy = "0";
  const [data, err] = await attempt(() => memberQuery.update(Number(id), { ...req, modifiedBy })
  );
  return err ? jsonError() : jsonOk(data);
};

export const deleteById = async (ctx: any) => {
  let { id } = ctx.params as { id: number };

  const modifiedBy = "0";
  const [data, err] = await attempt(() =>
    memberQuery.softDeleteById(Number(id), modifiedBy)
  );
  return err ? jsonError() : jsonOk(data, "success deleted");
};

export default {
  list,
  create,
  update,
  deleteById,
};
