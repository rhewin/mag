import { createBook } from "./controllers/bookController";

test("Create book successfully", async () => {
  const mockReq = { body: { title: "Book", author: "Author", isbn: "12345", quantity: 10 } };
  const mockReply = { code: jest.fn().mockReturnThis(), send: jest.fn() };

  await createBook(mockReq as any, mockReply as any);

  expect(mockReply.code).toHaveBeenCalledWith(201);
  expect(mockReply.send).toHaveBeenCalledWith(expect.objectContaining({ title: "Book" }));
});
