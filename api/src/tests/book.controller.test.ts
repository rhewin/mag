import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { listBook, createBook } from '../book/book.controller';

// Mock PrismaClient
jest.mock("@prisma/client", () => {
  const mockPrisma = {
    book: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockPrisma) };
});

const prisma = new PrismaClient();

describe("Book Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("listBooks", () => {
    it("should fetch and return all books", async () => {
      // Arrange: Mock data
      const mockBooks = [
        { id: 1, title: "Book 1", author: "Author 1" },
        { id: 2, title: "Book 2", author: "Author 2" },
      ];
      (prisma.book.findMany as jest.Mock).mockResolvedValue(mockBooks);

      // Mock reply object
      const reply: Partial<FastifyReply> = {
        send: jest.fn(),
      };

      // Act
      await listBook({} as FastifyRequest, reply as FastifyReply);

      // Assert
      expect(prisma.book.findMany).toHaveBeenCalledTimes(1);
      expect(reply.send).toHaveBeenCalledWith(mockBooks);
    });

    it("should handle errors", async () => {
      // Arrange: Simulate an error
      const mockError = new Error("Database error");
      (prisma.book.findMany as jest.Mock).mockRejectedValue(mockError);

      const reply: Partial<FastifyReply> = {
        send: jest.fn(),
      };

      // Act
      try {
        await listBook({} as FastifyRequest, reply as FastifyReply);
      } catch (err) {
        // Assert
        expect(err).toEqual(mockError);
      }
    });
  });

  describe("createBook", () => {
    it("should create a new book and return it", async () => {
      // Arrange: Mock request body and prisma response
      const mockRequestBody = {
        title: "New Book",
        author: "New Author",
        isbn: "123-456",
        quantity: 10,
        categoryId: 1,
        modifiedBy: 0,
      };

      const mockBookResponse = {
        id: 1,
        ...mockRequestBody,
      };

      (prisma.book.create as jest.Mock).mockResolvedValue(mockBookResponse);

      const req = {
        body: mockRequestBody,
      } as FastifyRequest;

      const reply: Partial<FastifyReply> = {
        code: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      // Act
      await createBook(req, reply as FastifyReply);

      // Assert
      expect(prisma.book.create).toHaveBeenCalledWith({
        data: mockRequestBody,
      });
      expect(reply.code).toHaveBeenCalledWith(201);
      expect(reply.send).toHaveBeenCalledWith(mockBookResponse);
    });

    it("should handle errors during book creation", async () => {
      // Arrange: Simulate an error
      const mockRequestBody = {
        title: "New Book",
        author: "New Author",
        isbn: "123-456",
        quantity: 10,
        categoryId: 1,
        createdBy: "user123",
      };

      const mockError = new Error("Database error");
      (prisma.book.create as jest.Mock).mockRejectedValue(mockError);

      const req = {
        body: mockRequestBody,
      } as FastifyRequest;

      const reply: Partial<FastifyReply> = {
        code: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      // Act
      try {
        await createBook(req, reply as FastifyReply);
      } catch (err) {
        // Assert
        expect(err).toEqual(mockError);
      }
    });
  });
});
