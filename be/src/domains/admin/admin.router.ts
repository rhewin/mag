import { rateLimit } from 'elysia-rate-limit'
import cfg from '@/config'
import ctrl from './admin.controller'
import { jsonError } from '@/base/api.base'
import { authMiddleware } from '@/middlewares/auth.mid'
import {
  loginValidation,
  createAdminValidation,
  updateAdminValidation,
} from './admin.validator'

const prefix = '/v1/admins'

export default (app: any) =>
  app
    .post(
      `${prefix}/login`,
      rateLimit(cfg.RATELIMIT_LOGIN_OPT),
      (ctx: any) => ctrl.login(ctx),
      loginValidation
    )
    .group(prefix, (group: any) =>
      group
        .guard({
          beforeHandle: [authMiddleware, rateLimit(cfg.RATELIMIT_GUARD_OPT)],
        })
        .get('/', (ctx: any) => ctrl.list(ctx))
        .post('/', (ctx: any) => ctrl.create(ctx), createAdminValidation)
        .put('/:id', (ctx: any) => ctrl.update(ctx), updateAdminValidation)
        .delete('/:id', (ctx: any) => ctrl.deleteById(ctx))
        .onError(({ code, error }: any) => jsonError(code, error.all))
    )
