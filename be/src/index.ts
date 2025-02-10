import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { jwt } from '@elysiajs/jwt'
import { jsonError } from '@/base/api.base'
import { log } from '@/utils/helper.util'
import cfg from './config'
import adminRoutes from './domains/admin/admin.router'
import memberRoutes from './domains/member/member.router'

const app = new Elysia()
  .use(swagger(cfg.SWAGGER_OPT))
  .use(jwt(cfg.JWT_OPT))
  .use(memberRoutes)
  .use(adminRoutes)
  .onError(({ code }) => jsonError(code))
  .listen(cfg.PORT)

log.info(`Server running at ${app.server?.hostname}:${cfg.PORT}`)
