import { rateLimit } from 'elysia-rate-limit'
import cfg from '@/config'
import check from './member.checker'
import ctrl from './member.controller'
import { jsonError } from '@/base/api.base'
import { authMiddleware } from '@/middlewares/auth.mid'

const prefix = '/v1/members'

export default (app: any) =>
  app.group(prefix, (group: any) =>
    group
      .guard({ beforeHandle: [authMiddleware] })
      .use(rateLimit(cfg.RATELIMIT_GUARD_OPT))
      .get('/', (ctx: any) => ctrl.list(ctx))
      .post('/', (ctx: any) => ctrl.add(ctx), check.add)
      .put('/:id', (ctx: any) => ctrl.edit(ctx), check.edit)
      .delete('/:id', (ctx: any) => ctrl.wipe(ctx))
      .onError(({ code, error }: any) => jsonError(code, error.all))
  )
