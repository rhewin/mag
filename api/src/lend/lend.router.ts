import { FastifyInstance } from 'fastify';
import { listLend, createLend, updateLend, deleteLend, returnLend } from './lend.controller';
import { authMiddleware } from '../middlewares/mid.auth';

export default async (app: FastifyInstance) => {
  let prefix: string;
  prefix = '/v1/lends'
  app.register(async (bookRoutes) => {
    bookRoutes.addHook('onRequest', authMiddleware);

    bookRoutes.get('/', listLend)
    bookRoutes.post('/borrow', createLend)
    bookRoutes.put('/return', returnLend)
    bookRoutes.put('/:id', updateLend)
    bookRoutes.delete('/:id', deleteLend)
  }, { prefix });
};
