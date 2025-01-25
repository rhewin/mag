import { PrismaClient } from '@prisma/client';
import { IBookRequestCreate, IBookRequestUpdate } from './book';

const prisma = new PrismaClient();

export const listBook = async () => {
  return prisma.book.findMany({
    where: {
      deletedAt: null,
    },
  });
};

export const createBook = async (data: IBookRequestCreate) => {
  const { title, author, isbn, quantity, categoryId, modifiedBy }: IBookRequestCreate = data;
  return prisma.book.create({
    data: {
      title,
      author,
      isbn,
      quantity,
      categoryId,
      modifiedBy,
    },
  });
};

export const updateBook = async (id: number, data: IBookRequestUpdate) => {
  const { title, author, isbn, quantity, categoryId, modifiedBy }: IBookRequestUpdate = data;
  return prisma.book.update({
    where: { id },
    data: {
      title,
      author,
      isbn,
      quantity,
      categoryId,
      modifiedBy,
      updatedAt: new Date(),
    },
  });
};

export const deleteBook = async (id: number) => {
  return prisma.book.update({
    where: { id },
    data: {
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
  });
};
