import { rateLimit } from 'elysia-rate-limit'
import cfg from '@/config'
import ctrl from './member.controller'
import { jsonError } from '@/base/api.base'
import { authMiddleware } from '@/middlewares/auth.mid'
import { createValidation, updateValidation } from './member.validator'
import {
  ListSchema,
  CreateSchema,
  UpdateSchema,
  DeleteSchema,
} from '@/schemas/member.schema'

const prefix = '/v1/members'

export default (app: any) =>
  app.group(prefix, (group: any) =>
    group
      .guard({ beforeHandle: [authMiddleware] })
      .use(rateLimit(cfg.RATELIMIT_GUARD_OPT))
      .get('/', (ctx: any) => ctrl.list(ctx), ListSchema)
      .post('/', (ctx: any) => ctrl.create(ctx), CreateSchema, createValidation)
      .put(
        '/:id',
        (ctx: any) => ctrl.update(ctx),
        UpdateSchema,
        updateValidation
      )
      .delete('/:id', (ctx: any) => ctrl.deleteById(ctx), DeleteSchema)
      .onError(({ code, error }: any) => jsonError(code, error.all))
  )
