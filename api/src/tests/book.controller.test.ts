import { FastifyRequest, FastifyReply } from 'fastify';
import { jsonError } from '../utils/util.jsonResponse';
import { IBookRequestCreate } from '../book/book';
import * as bookController from '../book/book.controller';
import * as query from '../book/book.query';
import * as queryDep from '../book/book.dep.query';

jest.mock('../utils/util.jsonResponse');
jest.mock('../book/book.query', () => ({
  listAll: jest.fn() as jest.Mock<() => Promise<any[]>>,
  create: jest.fn(),
  update: jest.fn(),
  deleteById: jest.fn(),
  count: jest.fn(),
  getFirst: jest.fn(),
  jsonError: jest.fn()
}));

jest.mock('../book/book.dep.query', () => ({
  upsertBookStatus: jest.fn()
}));

describe('Book Controller Tests', () => {
  let mockReq: Partial<FastifyRequest>;
  let mockRes: Partial<FastifyReply>;
  let mockBooks: any[];
  let mockBook: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockBooks = [
      {
        id: 1,
        title: 'Book 1',
        author: 'Author 1',
        isbn: '978-3-16-148410-0',
        quantity: 10,
        categoryId: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      },
      {
        id: 2,
        title: 'Book 2',
        author: 'Author 2',
        isbn: '978-3-16-142510-0',
        quantity: 5,
        categoryId: 2,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      },
    ];

    mockBook = mockBooks[0];

    mockReq = {
      user: {
        id: 1,
        uuid: '16dac45e-47e8-47fe-9e65-1dba4ad0df6b',
        email: 'margaret@abc.com'
      },
      query: {},
      body: {},
      params: {},
    };

    mockRes = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    jest.spyOn(query, 'listAll').mockResolvedValue(mockBooks);
    jest.spyOn(query, 'create').mockResolvedValue(mockBook);
    jest.spyOn(query, 'update').mockResolvedValue(mockBook);
    jest.spyOn(query, 'deleteById').mockResolvedValue({ ...mockBook, deletedAt: new Date() });
    jest.spyOn(query, 'count').mockResolvedValue(0);
  });

  describe('listBook', () => {
    it('should return paginated list of books', async () => {
      mockReq.query = { pageNum: 1, perPage: 10 };
      const mockTotalRecords = 1;

      (query.listAll as jest.Mock).mockResolvedValue(mockBooks);
      (query.count as jest.Mock).mockResolvedValue(mockTotalRecords);

      await bookController.listBook(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(query.listAll).toHaveBeenCalledWith(0, 10);
      expect(mockRes.send).toHaveBeenCalledWith({
        data: mockBooks,
        pagination: {
          pageNum: 1,
          perPage: 10,
          totalRecords: mockTotalRecords,
          totalPages: 1,
        },
      });
    });

    it('should return 400 if validation fails', async () => {
      mockReq.query = { pageNum: 'invalid' };

      await bookController.listBook(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(jsonError).toHaveBeenCalledWith({
        req: mockReq,
        res: mockRes,
        code: 400,
        message: 'Invalid param query',
        error: expect.anything(),
      });
    });
  });

  describe('createBook', () => {
    it('should create a book successfully', async () => {
      const mockCreate: IBookRequestCreate = {
        title: 'New Book',
        author: 'Author',
        isbn: '978-3-16-148410-0',
        quantity: 10,
        categoryId: 1,
        modifiedBy: 1,
      };

      mockReq.body = mockCreate;
      const mockCreatedBook = { ...mockCreate };

      (query.create as jest.Mock).mockResolvedValue(mockCreatedBook);
      (queryDep.upsertBookStatus as jest.Mock).mockResolvedValue(null);

      await bookController.createBook(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(query.create).toHaveBeenCalledWith(expect.objectContaining(mockCreate));
      expect(mockRes.code).toHaveBeenCalledWith(201);
      expect(mockRes.send).toHaveBeenCalledWith(mockCreatedBook);
    });

    it('should return 400 if validation fails', async () => {
      const mockCreate: IBookRequestCreate = {
        title: '',
        author: '',
        isbn: '978-3-16-148410-0',
        quantity: 10,
        categoryId: 1,
        modifiedBy: 1,
      };
      mockReq.body = mockCreate;

      await bookController.createBook(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(jsonError).toHaveBeenCalledWith({
        req: mockReq,
        res: mockRes,
        code: 400,
        message: 'Invalid request',
        error: expect.anything(),
      });
    });

    it('should return 500 if an error occurs while creating book', async () => {
      mockReq.body = mockBook;

      jest.spyOn(query, 'create').mockRejectedValue(new Error('Creation error'));
      await bookController.createBook(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(jsonError).toHaveBeenCalledWith({
        req: mockReq,
        res: mockRes,
        code: 500,
        message: 'Error creating data',
        error: expect.anything(),
      });
    });
  });

  describe('updateBook', () => {
    it('should update a book successfully', async () => {
      mockReq = {
        user: {
          id: 1,
          uuid: '16dac45e-47e8-47fe-9e65-1dba4ad0df6b',
          email: 'margaret@abc.com'
        },
        params: { id: 1 },
        body: {
          title: 'Test Update Book'
        },
      };

      const mockUpdatedBook = { ...mockBook, id: 1 };
      // (queryDep.upsertBookStatus as jest.Mock).mockResolvedValue(null);
      jest.spyOn(query, 'getFirst').mockResolvedValue(mockUpdatedBook);
      jest.spyOn(query, 'update').mockResolvedValue(mockUpdatedBook);
      jest.spyOn(bookController, 'updateBookStatus').mockResolvedValue(undefined);

      await bookController.updateBook(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(mockRes.send).toHaveBeenCalledWith(mockUpdatedBook);
    });

    it('should return 400 if validation fails', async () => {
      const mockId = 'a';
      const mockData: any = { title: '' };
      mockReq.params = { id: mockId };
      mockReq.body = mockData;

      await bookController.updateBook(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(jsonError).toHaveBeenCalledWith({
        req: mockReq,
        res: mockRes,
        code: 400,
        message: 'Invalid param id',
        error: expect.anything(),
      });
    });

    it('should return 404 if the book is not found', async () => {
      const mockData: any = { title: '' };
      mockReq.params = { id: 1 };
      mockReq.body = mockData;

      jest.spyOn(query, 'getFirst').mockResolvedValue(null);

      await bookController.updateBook(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(jsonError).toHaveBeenCalledWith({
        req: mockReq,
        res: mockRes,
        code: 404,
        message: 'Data not found'
      });
    });
  });

  describe('deleteBook', () => {
    it('should delete a book successfully', async () => {
      mockReq.params = { id: 1 };

      jest.spyOn(query, 'getFirst').mockResolvedValue(mockBook);
      jest.spyOn(bookController, 'isBookExists').mockResolvedValue(true);

      await bookController.deleteBook(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Data deleted successfully' });
    });

    it('should return 400 if validation fails', async () => {
      mockReq.params = { id: -1 };
      jest.spyOn(bookController, 'isBookExists').mockResolvedValue(true);

      await bookController.deleteBook(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(jsonError).toHaveBeenCalledWith({
        req: mockReq,
        res: mockRes,
        code: 400,
        message: 'Invalid param id',
        error: expect.anything(),
      });
    });

    it('should return 404 if the book is not found', async () => {
      mockReq.params = { id: 1 };

      jest.spyOn(query, 'getFirst').mockResolvedValue(null);
      jest.spyOn(bookController, 'isBookExists').mockResolvedValue(false);

      await bookController.deleteBook(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(jsonError).toHaveBeenCalledWith({
        req: mockReq,
        res: mockRes,
        code: 404,
        message: 'Data not found',
      });
    });
  });
});
