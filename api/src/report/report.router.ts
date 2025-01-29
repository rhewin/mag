import { FastifyInstance } from 'fastify';
import { mostBorrowedBooks, monthlyLendingTrends } from './report.controller';

export default async (app: FastifyInstance) => {
  let prefix: string;
  prefix = '/v1/reports'
  app.register(async (reportRoutes) => {
    reportRoutes.get('/most-borrowed-books', mostBorrowedBooks)
    reportRoutes.get('/monthly-lending-trends', monthlyLendingTrends)
  }, { prefix });
};
