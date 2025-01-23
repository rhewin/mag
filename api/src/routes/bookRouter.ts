import { FastifyInstance } from "fastify";
import { listBook, createBook } from "../controllers/bookController";

export default async (app: FastifyInstance) => {
  app.get("/books", listBook);
  app.post("/books", createBook);
}
