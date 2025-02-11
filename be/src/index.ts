import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { jwt } from '@elysiajs/jwt'
import { swagger } from '@elysiajs/swagger'
import { jsonError } from '@/base/api.base'
import { log } from '@/utils/helper.util'
import { loggerMiddleware } from './middlewares/logger.mid'
import { route } from './route'
import cfg from './config'

const app = new Elysia()
  .use(swagger(cfg.SWAGGER_OPT))
  .use(cors(cfg.CORS_OPT))
  .use(jwt(cfg.JWT_OPT))
  .onRequest(loggerMiddleware)
  .use(route)
  .onError(({ code }) => jsonError(code))
  .listen(cfg.APP_PORT)

log.info(`Server running at ${app.server?.hostname}:${cfg.APP_PORT}`)
