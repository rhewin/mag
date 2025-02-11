import { PrismaClient } from '@prisma/client'
import cfg from '@/config'

export const prisma = new PrismaClient(cfg.PRISMA_OPT)

export class BaseQuery {
  protected readonly table
  protected readonly visibleFields

  constructor(tableName: any, visibleFields: any) {
    this.table = tableName
    this.visibleFields = visibleFields
  }

  selectField = (fields: any) => (!fields ? {} : { select: fields })

  count = async () => this.table.count({ where: { deletedAt: null } })

  create = async (data: any) =>
    this.table.create({ data, ...this.selectField(this.visibleFields) })

  getById = async (id: number) =>
    this.table.findFirst({
      ...this.selectField(this.visibleFields),
      where: {
        id,
        deletedAt: null,
      },
    })

  getAll = async (skip: number, take: number) =>
    this.table.findMany({
      ...this.selectField(this.visibleFields),
      where: {
        deletedAt: null,
      },
      skip,
      take,
    })

  update = async (id: number, data: any) =>
    this.table.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })

  updateByInternalId = async (internalId: number, data: any) =>
    this.table.update({
      where: { internalId },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })

  softDeleteById = async (id: number, modifiedBy: string) => {
    const dateNow = new Date()
    return this.table.update({
      where: { id },
      data: {
        modifiedBy,
        updatedAt: dateNow,
        deletedAt: dateNow,
      },
    })
  }

  softDeleteByInternalId = async (internalId: number, modifiedBy: string) => {
    const dateNow = new Date()
    return this.table.update({
      where: { internalId },
      data: {
        modifiedBy,
        updatedAt: dateNow,
        deletedAt: dateNow,
      },
    })
  }
}
