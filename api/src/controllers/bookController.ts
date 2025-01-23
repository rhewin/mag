import { PrismaClient } from "@prisma/client";
import { FastifyRequest, FastifyReply } from "fastify";

const prisma = new PrismaClient();

export const listBook = async (_: FastifyRequest, reply: FastifyReply) => {
  const books = await prisma.book.findMany();
  reply.send(books);
};

export const createBook = async (req: FastifyRequest, reply: FastifyReply) => {
  const { title, author, isbn, quantity, categoryId, createdBy } = req.body as any;
  const book = await prisma.book.create({
    data: {
      title,
      author,
      isbn,
      quantity,
      categoryId,
      createdBy,
    },
  });
  reply.code(201).send(book);
};
