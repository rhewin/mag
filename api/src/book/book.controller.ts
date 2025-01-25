import { FastifyRequest, FastifyReply } from 'fastify';
import { IBookRequestCreate, IBookRequestUpdate } from './book';
import { createBookInputValidate, updateBookInputValidate } from './book.validator';
import * as bookService from './book.query';


export const listBook = async (_: FastifyRequest, reply: FastifyReply) => {
  try {
    const books = await bookService.listBook();
    reply.send(books);
  } catch (error) {
    reply.code(500).send({ error: "Internal server error" });
  }
};

export const createBook = async (req: FastifyRequest, reply: FastifyReply) => {
  const data: IBookRequestCreate = req.body as any
  const modifiedBy = 0;

  const validate = createBookInputValidate({ ...data, modifiedBy })
  if (!validate.isSuccess) {
    req.log.error(validate.errorDetail)
    return reply.code(400).send({ error: "Invalid input" });
  }

  try {
    const book = await bookService.createBook(validate.data);
    reply.code(201).send(book);
  } catch (error) {
    req.log.error(error)
    reply.code(500).send({ error: "Error creating book" });
  }
};

export const updateBook = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as { id: string };
  const data: IBookRequestUpdate = req.body as any
  const modifiedBy = 0;

  const validate = updateBookInputValidate({ ...data, modifiedBy })
  if (!validate.isSuccess) {
    req.log.error(validate.errorDetail)
    return reply.code(400).send({ error: "Invalid input" });
  }

  try {
    const book = await bookService.updateBook(Number(id), validate.data);

    if (!book) {
      return reply.code(404).send({ error: "Book not found" });
    }

    reply.send(book);
  } catch (error) {
    reply.code(500).send({ error: "Error updating book" });
  }
};

export const deleteBook = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as { id: string };

  try {
    const book = await bookService.deleteBook(Number(id));

    if (!book) {
      return reply.code(404).send({ error: "Book not found" });
    }

    reply.send({ message: "Book deleted successfully" });
  } catch (error) {
    reply.code(500).send({ error: "Error deleting book" });
  }
};
