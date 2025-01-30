import { mostBorrowedBooks, monthlyLendingTrends } from '../report/report.controller'; // Adjust import based on actual file location
import * as query from '../report/report.query';
import { FastifyRequest, FastifyReply } from 'fastify';
import { jsonError } from '../utils/util.jsonResponse';

jest.mock('../report/report.query', () => ({
  mostBorrowedBooks: jest.fn(),
  monthlyLendingTrends: jest.fn(),
}));
jest.mock('../utils/util.jsonResponse', () => ({
  jsonError: jest.fn()
}));

describe('Report Controller Tests', () => {

  describe('mostBorrowedBooks', () => {
    let req: Partial<FastifyRequest>;
    let res: Partial<FastifyReply>;

    beforeEach(() => {
      req = { query: {} };
      res = { send: jest.fn() };
    });

    it('should return filtered books based on the "top" query parameter', async () => {
      (query.mostBorrowedBooks as jest.Mock).mockResolvedValue([
        { _count: { lending: 5 }, title: 'Book 1' },
        { _count: { lending: 0 }, title: 'Book 2' },
        { _count: { lending: 3 }, title: 'Book 3' },
      ]);

      await mostBorrowedBooks(req as FastifyRequest, res as FastifyReply);

      expect(res.send).toHaveBeenCalledWith([
        { _count: { lending: 5 }, title: 'Book 1' },
        { _count: { lending: 3 }, title: 'Book 3' },
      ]);
    });

    it('should call jsonError on failure', async () => {
      (query.mostBorrowedBooks as jest.Mock).mockRejectedValue(new Error('Database error'));

      await mostBorrowedBooks(req as FastifyRequest, res as FastifyReply);

      expect(jsonError).toHaveBeenCalledWith({
        req,
        res,
        code: 500
      });
    });
  });

  describe('monthlyLendingTrends', () => {
    let req: Partial<FastifyRequest>;
    let res: Partial<FastifyReply>;

    beforeEach(() => {
      req = {};
      res = { send: jest.fn() };
    });

    it('should return monthly lending trends data', async () => {
      query.monthlyLendingTrends.mockResolvedValue([
        { month: 'January', totalLending: 50 },
        { month: 'February', totalLending: 40 },
      ]);

      await monthlyLendingTrends(req as FastifyRequest, res as FastifyReply);

      expect(res.send).toHaveBeenCalledWith([
        { month: 'January', totalLending: 50 },
        { month: 'February', totalLending: 40 },
      ]);
    });

    it('should call jsonError on failure', async () => {
      (query.monthlyLendingTrends as jest.Mock).mockRejectedValue(new Error('Database error'));

      await monthlyLendingTrends(req as FastifyRequest, res as FastifyReply);

      expect(jsonError).toHaveBeenCalledWith({
        req,
        res,
        code: 500
      });
    });
  });
});
