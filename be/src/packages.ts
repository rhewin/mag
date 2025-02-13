import { rateLimit } from 'elysia-rate-limit'
import { cors } from '@elysiajs/cors'
import { jwt } from '@elysiajs/jwt'
import cfg from './config'

const packages = (app: any) => {
  return app
    .use(rateLimit(cfg.RATELIMIT_GLOBAL_OPT))
    .use(cors(cfg.CORS_OPT))
    .use(jwt(cfg.JWT_OPT))
}

export default packages
