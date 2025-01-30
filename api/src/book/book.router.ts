import { FastifyInstance } from 'fastify';
import { listBook, createBook, updateBook, deleteBook } from './book.controller';
import { authMiddleware } from '../middlewares/mid.auth';

export default async (app: FastifyInstance) => {
  let prefix: string;
  prefix = '/v1/books'
  app.register(async (bookRoutes) => {
    bookRoutes.addHook('onRequest', authMiddleware);

    bookRoutes.get('/', listBook)
    bookRoutes.post('/', createBook)
    bookRoutes.put('/:id', updateBook)
    bookRoutes.delete('/:id', deleteBook)
  }, { prefix });
};
