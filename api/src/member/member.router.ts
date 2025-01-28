import { FastifyInstance } from 'fastify';
import { listMember, createMember, updateMember, deleteMember } from './member.controller';
import { authMiddleware } from '../middlewares/mid.auth';

export default async (app: FastifyInstance) => {
  let prefix: string;
  prefix = '/v1/members'
  app.register(async (memberRoutes) => {
    memberRoutes.addHook('onRequest', authMiddleware);

    memberRoutes.get('/', listMember)
    memberRoutes.post('/', createMember)
    memberRoutes.put('/:id', updateMember)
    memberRoutes.delete('/:id', deleteMember)
  }, { prefix });
};
