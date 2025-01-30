import { FastifyRequest, FastifyReply } from 'fastify';
import { jsonError } from '../utils/util.jsonResponse';
import { IAdminRequestCreate } from '../admin/admin';
import { v4 as uuidv4 } from 'uuid';
import * as adminController from '../admin/admin.controller';
import * as query from '../admin/admin.query';
import * as util from '../utils/util.formatter';
import argon2 from 'argon2';


jest.mock('../utils/util.jsonResponse');
jest.mock('../admin/admin.query', () => ({
  listAll: jest.fn() as jest.Mock<() => Promise<any[]>>,
  create: jest.fn(),
  update: jest.fn(),
  deleteById: jest.fn(),
  count: jest.fn(),
  getFirst: jest.fn(),
  jsonError: jest.fn()
}));
jest.mock('uuid', () => ({
  v4: jest.fn(),
}));
jest.mock('argon2', () => ({
  hash: jest.fn(),
}));

describe('Admin Controller Tests', () => {
  let mockReq: Partial<FastifyRequest>;
  let mockRes: Partial<FastifyReply>;
  let mockAdmins: any[];
  let mockAdmin: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockAdmins = [
      {
        id: 1,
        uuid: '16dac45e-47e8-47fe-9e65-1dba4ad0df6b',
        adminId: 'E1G3YNX1',
        email: 'margaret@abc.com',
        password: 'test1234',
        firstname: 'Margaret',
        lastname: 'Tatcher',
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      },
      {
        id: 2,
        uuid: '96b8d597-4c34-439b-bf1d-3587a0407027',
        adminId: 'M45F3IJV',
        email: 'sherlock@abc.com',
        password: 'test1234',
        firstname: 'Sherlock',
        lastname: 'Holmes',
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      },
    ];

    mockAdmin = mockAdmins[0];

    mockReq = {
      query: {},
      body: {},
      params: {},
    };

    mockRes = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    jest.spyOn(query, 'listAll').mockResolvedValue(mockAdmins);
    jest.spyOn(query, 'create').mockResolvedValue(mockAdmin);
    jest.spyOn(query, 'update').mockResolvedValue(mockAdmin);
    jest.spyOn(query, 'deleteById').mockResolvedValue({ ...mockAdmin, deletedAt: new Date() });
    jest.spyOn(query, 'count').mockResolvedValue(0);
  });

  describe('listAdmin', () => {
    it('should return paginated list of admins', async () => {
      mockReq.query = { pageNum: 1, perPage: 10 };
      const mockTotalRecords = 1;

      (query.listAll as jest.Mock).mockResolvedValue(mockAdmins);
      (query.count as jest.Mock).mockResolvedValue(mockTotalRecords);

      await adminController.listAdmin(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(query.listAll).toHaveBeenCalledWith(0, 10);
      expect(mockRes.send).toHaveBeenCalledWith({
        data: mockAdmins,
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

      await adminController.listAdmin(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(jsonError).toHaveBeenCalledWith({
        req: mockReq,
        res: mockRes,
        code: 400,
        message: 'Invalid param query',
        error: expect.anything(),
      });
    });
  });

  describe('createAdmin', () => {
    it('should create an admin successfully', async () => {
      jest.spyOn(util, 'genInternalUniqueId').mockReturnValue('HE7E71W5');
      const mockHashedPassword = 'hashedpassword';
      const mockUUID = '16dac45e-47e8-47fe-9e65-1dba4ad0df6b';
      const mockCreate: IAdminRequestCreate = {
        uuid: mockUUID,
        adminId: 'HE7E71W5',
        email: 'margaret@abc.com',
        password: mockHashedPassword,
        firstname: 'Margaret',
        lastname: 'Tatcher'
      };
      const mockCreatedAdmin = { email: mockCreate.email, firstname: mockCreate.password, lastname: mockCreate.lastname };

      (argon2.hash as jest.Mock).mockResolvedValue(mockHashedPassword);
      (uuidv4 as jest.Mock).mockReturnValue(mockUUID);
      (query.create as jest.Mock).mockResolvedValue(mockCreatedAdmin);

      mockReq.body = mockCreate;
      await adminController.createAdmin(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(query.create).toHaveBeenCalledWith(expect.objectContaining(mockCreate));
      expect(mockRes.code).toHaveBeenCalledWith(201);
      expect(mockRes.send).toHaveBeenCalledWith(mockCreatedAdmin);
    });

    it('should return 400 if validation fails', async () => {
      const mockCreate: IAdminRequestCreate = {
        uuid: '16dac45e-47e8-47fe-9e65-1dba4ad0df6b',
        adminId: 'HE7E71W5',
        email: 'margaret@abc.com',
        password: 'test1234',
        firstname: '',
        lastname: 'Tatcher'
      };

      mockReq.body = mockCreate;

      await adminController.createAdmin(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(jsonError).toHaveBeenCalledWith({
        req: mockReq,
        res: mockRes,
        code: 400,
        message: 'Invalid request',
        error: expect.anything(),
      });
    });

    it('should return 500 if an error occurs while creating admin', async () => {
      mockReq.body = mockAdmin;

      jest.spyOn(query, 'create').mockRejectedValue(new Error('Creation error'));
      await adminController.createAdmin(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(jsonError).toHaveBeenCalledWith({
        req: mockReq,
        res: mockRes,
        code: 500,
        message: 'Error creating data',
        error: expect.anything(),
      });
    });
  });

  describe('updateAdmin', () => {
    it('should update an admin successfully', async () => {
      const mockReq = {
        params: { id: 1 },
        body: {
          firstname: 'aden'
        },
      };

      const mockUpdatedAdmin = {
        id: mockAdmin.id,
        email: mockAdmin.email,
        firstname: mockAdmin.firstname,
        lastname: mockAdmin.lastname,
        createdAt: mockAdmin.createdAt,
        updatedAt: mockAdmin.updatedAt,
        deletedAt: mockAdmin.deletedAt
      };
      jest.spyOn(query, 'getFirst').mockResolvedValue(mockAdmin);
      jest.spyOn(query, 'update').mockResolvedValue(mockAdmin);

      await adminController.updateAdmin(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(mockRes.send).toHaveBeenCalledWith(mockUpdatedAdmin);
    });

    it('should return 400 if validation fails', async () => {
      const mockId = 'a';
      const mockData: any = { title: '' };
      mockReq.params = { id: mockId };
      mockReq.body = mockData;

      await adminController.updateAdmin(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(jsonError).toHaveBeenCalledWith({
        req: mockReq,
        res: mockRes,
        code: 400,
        message: 'Invalid param id',
        error: expect.anything(),
      });
    });

    it('should return 404 if the admin is not found', async () => {
      const mockData: any = { title: '' };
      mockReq.params = { id: 1 };
      mockReq.body = mockData;

      jest.spyOn(query, 'getFirst').mockResolvedValue(null);

      await adminController.updateAdmin(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(jsonError).toHaveBeenCalledWith({
        req: mockReq,
        res: mockRes,
        code: 404,
        message: 'Data not found'
      });
    });
  });

  describe('deleteAdmin', () => {
    it('should delete an admin successfully', async () => {
      mockReq.params = { id: 1 };

      jest.spyOn(query, 'getFirst').mockResolvedValue(mockAdmin);
      jest.spyOn(adminController, 'isAdminExists').mockResolvedValue(true);

      await adminController.deleteAdmin(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Data deleted successfully' });
    });

    it('should return 400 if validation fails', async () => {
      mockReq.params = { id: -1 };
      jest.spyOn(adminController, 'isAdminExists').mockResolvedValue(true);

      await adminController.deleteAdmin(mockReq as FastifyRequest, mockRes as FastifyReply);

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
      jest.spyOn(adminController, 'isAdminExists').mockResolvedValue(false);

      await adminController.deleteAdmin(mockReq as FastifyRequest, mockRes as FastifyReply);

      expect(jsonError).toHaveBeenCalledWith({
        req: mockReq,
        res: mockRes,
        code: 404,
        message: 'Data not found',
      });
    });
  });
});
