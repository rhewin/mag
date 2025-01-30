import { FastifyRequest, FastifyReply } from 'fastify';
import * as query from './report.query';
import { jsonError } from '../utils/util.jsonResponse';

export const mostBorrowedBooks = async (req: FastifyRequest, res: FastifyReply) => {
  let { top } = req.query as {
    top?: number;
  };
  top = top ? Number(top) : 50

  try {
    const data = await query.mostBorrowedBooks();
    const filteredData = data.filter(item => item._count.lending > 0).slice(0, top);
    res.send(filteredData);
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
