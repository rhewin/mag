import { PrismaClient } from '@prisma/client';
import { IBookRequestCreate, IBookRequestUpdate } from './book';

const prisma = new PrismaClient();
const table = prisma.book;

export const listAll = async (skip: number, take: number) => {
  return table.findMany({
    where: {
      deletedAt: null,
    },
    skip,
    take
  });
};

export const create = async (data: IBookRequestCreate) => table.create({ data });

export const update = async (id: number, data: IBookRequestUpdate) => {
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
