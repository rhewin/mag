import { PrismaClient } from '@prisma/client';
import { IAdminRequestCreate, IAdminRequestUpdate } from './admin';

const prisma = new PrismaClient();
const table = prisma.admin;

export const listAll = async (skip: number, take: number) => {
  return table.findMany({
    select: {
      id: true,
      email: true,
      firstname: true,
      lastname: true
    },
    where: {
      deletedAt: null,
    },
    skip,
    take
  });
};

export const create = async (data: IAdminRequestCreate) => table.create({ data });

export const update = async (id: number, data: IAdminRequestUpdate) => {
  return table.update({
    where: { id },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  });
};

export const deleteById = async (id: number) => {
  return table.update({
    where: { id },
    data: {
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

export const getFirstByEmail = async (email: string) => {
  return table.findFirst({
    where: {
      email,
      deletedAt: null,
    },
  });
};
