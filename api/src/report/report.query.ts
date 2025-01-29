import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const tableBook = prisma.book;

export const mostBorrowedBooks = async () => {
  return tableBook.findMany({
    select: {
      title: true,
      isbn: true,
      _count: {
        select: { lending: true },
      },
    },
    orderBy: {
      lending: {
        _count: 'desc',
      },
    },
  });
};

export const monthlyLendingTrends = async () => {
  return prisma.$queryRaw`
    SELECT
      EXTRACT(YEAR FROM "borrowedDate") AS year,
      EXTRACT(MONTH FROM "borrowedDate") AS month,
      COUNT(*)::int AS borrow_count
    FROM
      "Lending"
    GROUP BY
      year,
      month
    ORDER BY
      year ASC,
      month ASC;
  `;
};
