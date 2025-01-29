import { FastifyRequest, FastifyReply } from 'fastify';
import * as query from './report.query';
import { jsonError } from '../utils/util.jsonResponse';

export const mostBorrowedBooks = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const data = await query.mostBorrowedBooks();
    res.send(data);
  } catch (error) {
    return jsonError({ req, res, code: 500 })
  }
};

export const monthlyLendingTrends = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const data = await query.monthlyLendingTrends();
    console.log(data)
    res.send(data);
  } catch (error) {
    console.log(error)
    return jsonError({ req, res, code: 500 })
  }
};
