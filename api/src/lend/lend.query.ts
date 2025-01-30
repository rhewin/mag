import { PrismaClient } from '@prisma/client';
import { ILendRequestCreate, ILendRequestUpdate } from './lend';

const prisma = new PrismaClient();
const table = prisma.lending;

export const listAll = async (skip: number, take: number) => {
  return table.findMany({
    where: {
      deletedAt: null,
    },
    skip,
    take
  });
};

export const create = async (data: ILendRequestCreate) => table.create({ data });

export const update = async (id: number, data: ILendRequestUpdate) => {
  return table.update({
    where: { id },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  });
};

export const deleteById = async (id: number, modifiedBy: number) => {
  return table.update({
    where: { id },
    data: {
      modifiedBy,
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
  });
};

export const count = async () => table.count({ where: { deletedAt: null } });

export const getFirst = async (id: number) => {
  return table.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });
};

export const getRentedBook = async (bookId: number, memberId: number) => {
  return table.findFirst({
    where: {
      bookId,
      memberId,
      status: "borrowed",
      deletedAt: null,
    },
  });
};
