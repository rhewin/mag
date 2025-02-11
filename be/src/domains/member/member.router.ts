import { rateLimit } from 'elysia-rate-limit'
import cfg from '@/config'
import ctrl from './member.controller'
import { jsonError } from '@/base/api.base'
import { authMiddleware } from '@/middlewares/auth.mid'
import {
  createMemberValidation,
  updateMemberValidation,
} from './member.validator'

const prefix = '/v1/members'

export default (app: any) =>
  app.group(prefix, (group: any) =>
    group
      .guard({
        beforeHandle: [authMiddleware, rateLimit(cfg.RATELIMIT_GUARD_OPT)],
      })
      .get('/', (ctx: any) => ctrl.list(ctx))
      .post('/', (ctx: any) => ctrl.create(ctx), createMemberValidation)
      .put('/:id', (ctx: any) => ctrl.update(ctx), updateMemberValidation)
      .delete('/:id', (ctx: any) => ctrl.deleteById(ctx))
      .onError(({ code, error }: any) => jsonError(code, error.all))
  )
