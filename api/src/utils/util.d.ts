import { FastifyReply, FastifyRequest } from "fastify";

export interface IJSONError {
  req: FastifyRequest;
  res: FastifyReply;
  code: number;
  message?: string | null;
  error?: unknown;
}

interface JwtPayload {
  id: number;
  uuid: string;
  email: string;
};

declare module 'fastify' {
  interface FastifyRequest {
    user: JwtPayload;
  }
}
