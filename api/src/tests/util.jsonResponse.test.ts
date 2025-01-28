import { jsonError } from '../utils/util.jsonResponse';
import { IJSONError } from '../utils/util';
import { FastifyBaseLogger, FastifyRequest, FastifyReply } from 'fastify';

describe('jsonError', () => {
  let mockReq: Partial<FastifyRequest>;
  let mockRes: Partial<FastifyReply>;

  beforeEach(() => {
    mockReq = {
      log: {
        error: jest.fn(),
        child: jest.fn(),
        level: 'info',
        fatal: jest.fn(),
        warn: jest.fn(),
        info: jest.fn(),
        debug: jest.fn(),
        trace: jest.fn(),
      } as unknown as FastifyBaseLogger,
    };

    mockRes = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  test('should log the error and return the correct message for a known error code (400)', () => {
    const data: IJSONError = {
      req: mockReq as FastifyRequest,
      res: mockRes as FastifyReply,
      code: 400,
      message: '',
      error: 'Invalid input data',
    };

    jsonError(data);

    expect((mockReq.log as any).error).toHaveBeenCalledWith('Invalid input data');
    expect(mockRes.code).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith({ errors: 'Bad request' });
  });

  test('should use the provided message when it is not empty', () => {
    const data: IJSONError = {
      req: mockReq as FastifyRequest,
      res: mockRes as FastifyReply,
      code: 404,
      message: 'Custom not found message',
      error: null,
    };

    jsonError(data);

    expect((mockReq.log as any).error).toHaveBeenCalledWith('Custom not found message');
    expect(mockRes.code).toHaveBeenCalledWith(404);
    expect(mockRes.send).toHaveBeenCalledWith({ errors: 'Custom not found message' });
  });

  test('should use the default message when no message is provided', () => {
    const data: IJSONError = {
      req: mockReq as FastifyRequest,
      res: mockRes as FastifyReply,
      code: 500,
      message: null,
      error: null,
    };

    jsonError(data);

    expect((mockReq.log as any).error).toHaveBeenCalledWith(null);
    expect(mockRes.code).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith({ errors: 'Internal server error' });
  });

  test('should handle unknown error codes with a default message', () => {
    const data: IJSONError = {
      req: mockReq as FastifyRequest,
      res: mockRes as FastifyReply,
      code: 999,
      message: null,
      error: 'Something went wrong',
    };

    jsonError(data);

    expect((mockReq.log as any).error).toHaveBeenCalledWith('Something went wrong');
    expect(mockRes.code).toHaveBeenCalledWith(999);
    expect(mockRes.send).toHaveBeenCalledWith({ errors: 'Unknown error' });
  });

  test('should prioritize the `message` over the error code message', () => {
    const data: IJSONError = {
      req: mockReq as FastifyRequest,
      res: mockRes as FastifyReply,
      code: 400,
      message: 'This is a specific error message',
      error: 'Detailed error',
    };

    jsonError(data);

    expect((mockReq.log as any).error).toHaveBeenCalledWith('Detailed error');
    expect(mockRes.code).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith({ errors: 'This is a specific error message' });
  });

  test('should log and return "Unknown error" if no code or message is provided', () => {
    const data: IJSONError = {
      req: mockReq as FastifyRequest,
      res: mockRes as FastifyReply,
      code: 0,
      message: null,
      error: null,
    };

    jsonError(data);

    expect((mockReq.log as any).error).toHaveBeenCalledWith(null);
    expect(mockRes.code).toHaveBeenCalledWith(0);
    expect(mockRes.send).toHaveBeenCalledWith({ errors: "Unknown error" });
  });

  test('should handle cases where the `error` property is missing', () => {
    const data: Partial<IJSONError> = {
      req: mockReq as FastifyRequest,
      res: mockRes as FastifyReply,
      code: 404,
      message: '',
    };

    jsonError(data as IJSONError);

    expect((mockReq.log as any).error).toHaveBeenCalledWith('');
    expect(mockRes.code).toHaveBeenCalledWith(404);
    expect(mockRes.send).toHaveBeenCalledWith({ errors: 'Not found' });
  });
});
