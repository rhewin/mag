import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const tableBookStatus = prisma.bookStatus;

export const getBookStatusByBookId = async (bookId: number) => {
  return tableBookStatus.findFirst({
    where: {
      bookId
    },
  });
};

export const upsertBookStatus = async (bookId: number, availableQty: number, borrowedQty: number) => {
  return tableBookStatus.upsert({
    where: {
      bookId,
    },
    update: {
      availableQty,
      borrowedQty
    },
    create: {
      bookId,
      availableQty,
      borrowedQty
    },
  });
}
