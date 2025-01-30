import { PrismaClient } from '@prisma/client';
import { IMemberRequestCreate, IMemberRequestUpdate } from './member';

const prisma = new PrismaClient();
const table = prisma.member;

export const listAll = async (skip: number, take: number) => {
  return table.findMany({
    where: {
      deletedAt: null,
    },
    skip,
    take
  });
};

export const create = async (data: IMemberRequestCreate) => table.create({ data });

export const update = async (id: number, data: IMemberRequestUpdate) => {
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
