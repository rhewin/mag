import { FastifyInstance } from 'fastify';
import { listBook, createBook, updateBook, deleteBook } from './book.controller';

export default async (app: FastifyInstance) => {
  app.get('/books', listBook)
  app.post('/books', createBook)
  app.put('/books/:id', updateBook)
  app.delete('/books/:id', deleteBook)
};
