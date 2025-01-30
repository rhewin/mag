import { FastifyInstance } from 'fastify';
import { login, listAdmin, createAdmin, updateAdmin, deleteAdmin } from './admin.controller';
import { authMiddleware } from '../middlewares/mid.auth';

export default async (app: FastifyInstance) => {
  app.post('/login', login)

  let prefix: string;
  prefix = '/v1/admins'
  app.register(async (adminRoutes) => {
    adminRoutes.addHook('onRequest', authMiddleware);

    adminRoutes.get('/', listAdmin);
    adminRoutes.post('/', createAdmin);
    adminRoutes.put('/:id', updateAdmin);
    adminRoutes.delete('/:id', deleteAdmin);
  }, { prefix });
};
