import { FastifyReply, FastifyRequest } from 'fastify';
import { JwtPayload } from '../utils/util';
import { jsonError } from '../utils/util.jsonResponse';
import { verifyJwtToken } from '../utils/util.auth';

export const authMiddleware = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1]; // Use: Bearer <token>
    if (!token) {
      return jsonError({ req, res, code: 401 })
    }

    const decoded = verifyJwtToken(token)
    if (!decoded || typeof decoded === 'string') {
      return jsonError({ req, res, code: 401 })
    }

    req.user = decoded as JwtPayload;
    req.log.info(req.user)
  } catch (error) {
    return jsonError({ req, res, code: 401 })
  }
};
