import { FastifyRequest, FastifyReply } from 'fastify';
import { jsonError } from '../utils/util.jsonResponse';
import { IMemberRequestCreate } from '../member/member';
import * as memberController from '../member/member.controller';
import * as query from '../member/member.query';
import * as util from '../utils/util.formatter';

jest.mock('../utils/util.jsonResponse');
jest.mock('../member/member.query', () => ({
  listAll: jest.fn() as jest.Mock<() => Promise<any[]>>,
  create: jest.fn(),
  update: jest.fn(),
  deleteById: jest.fn(),
  count: jest.fn(),
  getFirst: jest.fn(),
  jsonError: jest.fn()
}));

describe('Member Controller Tests', () => {
  let mockReq: Partial<FastifyRequest>;
  let mockRes: Partial<FastifyReply>;
  let mockMembers: any[];
  let mockMember: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockMembers = [
      {
        id: 1,
        memberId: 'WKFISD234',
        firstname: 'Abraham',
        lastname: 'Lincoln',
        email: 'abraham@gmail.com',
        phone: '092547023',
        status: 'active',
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      },
      {
        id: 2,
        memberId: 'HE7E71W5',
        firstname: 'Brian',
        lastname: 'Don',
        email: 'brian@abc.com',
        phone: '09453023',
        status: 'active',
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      },
    ];

    mockMember = mockMembers[0];

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

    jest.spyOn(query, 'listAll').mockResolvedValue(mockMembers);
    jest.spyOn(query, 'create').mockResolvedValue(mockMember);
    jest.spyOn(query, 'update').mockResolvedValue(mockMember);
    jest.spyOn(query, 'deleteById').mockResolvedValue({ ...mockMember, deletedAt: new Date() });
    jest.spyOn(query, 'count').mockResolvedValue(0);
  });

  describe('listMember', () => {
    it('should return paginated list of members', async () => {
      mockReq.query = { pageNum: 1, perPage: 10 };
      const mockTotalRecords = 1;

      (query.listAll as jest.Mock).mockResolvedValue(mockMembers);
      (query.count as jest.Mock).mockResolvedValue(mockTotalRecords);

      await memberController.listMember(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(query.listAll).toHaveBeenCalledWith(0, 10);
      expect(mockRes.send).toHaveBeenCalledWith({
        data: mockMembers,
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

      await memberController.listMember(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(jsonError).toHaveBeenCalledWith({
        req: mockReq,
        res: mockRes,
        code: 400,
        message: 'Invalid param query',
        error: expect.anything(),
      });
    });
  });

  describe('createMember', () => {
    it('should create a member successfully', async () => {
      jest.spyOn(util, 'genInternalUniqueId').mockReturnValue('HE7E71W5');

      const mockCreate: IMemberRequestCreate = {
        memberId: 'HE7E71W5',
        firstname: 'Margaret',
        lastname: 'Tatcher',
        email: 'margaret@abc.com',
        phone: '09453023',
        status: 'active',
        modifiedBy: 1
      };

      mockReq.body = mockCreate;
      const mockCreatedMember = { ...mockCreate };

      (query.create as jest.Mock).mockResolvedValue(mockCreatedMember);

      await memberController.createMember(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(query.create).toHaveBeenCalledWith(expect.objectContaining(mockCreate));
      expect(mockRes.code).toHaveBeenCalledWith(201);
      expect(mockRes.send).toHaveBeenCalledWith(mockCreatedMember);
    });

    it('should return 400 if validation fails', async () => {
      const mockCreate: IMemberRequestCreate = {
        memberId: 'HE7E71W5',
        firstname: '',
        lastname: 'Tatcher',
        email: 'margaret@abc.com',
        phone: '09453023',
        status: 'active',
        modifiedBy: 1
      };

      mockReq.body = mockCreate;

      await memberController.createMember(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(jsonError).toHaveBeenCalledWith({
        req: mockReq,
        res: mockRes,
        code: 400,
        message: 'Invalid request',
        error: expect.anything(),
      });
    });

    it('should return 500 if an error occurs while creating member', async () => {
      mockReq.body = mockMember;

      jest.spyOn(query, 'create').mockRejectedValue(new Error('Creation error'));
      await memberController.createMember(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(jsonError).toHaveBeenCalledWith({
        req: mockReq,
        res: mockRes,
        code: 500,
        message: 'Error creating data',
        error: expect.anything(),
      });
    });
  });

  describe('updateMember', () => {
    it('should update a member successfully', async () => {
      mockReq = {
        user: {
          id: 1,
          uuid: '16dac45e-47e8-47fe-9e65-1dba4ad0df6b',
          email: 'margaret@abc.com'
        },
        params: { id: 1 },
        body: {
          firstname: 'aden'
        },
      };

      const mockUpdatedMember = { ...mockMember, id: 1 };
      jest.spyOn(query, 'getFirst').mockResolvedValue(mockUpdatedMember);
      jest.spyOn(query, 'update').mockResolvedValue(mockUpdatedMember);

      await memberController.updateMember(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(mockRes.send).toHaveBeenCalledWith(mockUpdatedMember);
    });

    it('should return 400 if validation fails', async () => {
      const mockId = 'a';
      const mockData: any = { title: '' };
      mockReq.params = { id: mockId };
      mockReq.body = mockData;

      await memberController.updateMember(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(jsonError).toHaveBeenCalledWith({
        req: mockReq,
        res: mockRes,
        code: 400,
        message: 'Invalid param id',
        error: expect.anything(),
      });
    });

    it('should return 404 if the member is not found', async () => {
      const mockData: any = { title: '' };
      mockReq.params = { id: 1 };
      mockReq.body = mockData;

      jest.spyOn(query, 'getFirst').mockResolvedValue(null);

      await memberController.updateMember(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(jsonError).toHaveBeenCalledWith({
        req: mockReq,
        res: mockRes,
        code: 404,
        message: 'Data not found'
      });
    });
  });

  describe('deleteMember', () => {
    it('should delete a member successfully', async () => {
      mockReq.params = { id: 1 };

      jest.spyOn(query, 'getFirst').mockResolvedValue(mockMember);
      jest.spyOn(memberController, 'isMemberExists').mockResolvedValue(true);

      await memberController.deleteMember(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Data deleted successfully' });
    });

    it('should return 400 if validation fails', async () => {
      mockReq.params = { id: -1 };
      jest.spyOn(memberController, 'isMemberExists').mockResolvedValue(true);

      await memberController.deleteMember(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(jsonError).toHaveBeenCalledWith({
        req: mockReq,
        res: mockRes,
        code: 400,
        message: 'Invalid param id',
        error: expect.anything(),
      });
    });

    it('should return 404 if the member is not found', async () => {
      mockReq.params = { id: 1 };

      jest.spyOn(query, 'getFirst').mockResolvedValue(null);
      jest.spyOn(memberController, 'isMemberExists').mockResolvedValue(false);

      await memberController.deleteMember(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(jsonError).toHaveBeenCalledWith({
        req: mockReq,
        res: mockRes,
        code: 404,
        message: 'Data not found',
      });
    });
  });
});
