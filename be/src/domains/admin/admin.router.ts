import { rateLimit } from 'elysia-rate-limit'
import cfg from '@/config'
import ctrl from './admin.controller'
import { jsonError } from '@/base/api.base'
import { authMiddleware } from '@/middlewares/auth.mid'
import {
  loginValidation,
  createValidation,
  updateValidation,
} from './admin.validator'
import {
  LoginSchema,
  ListSchema,
  CreateSchema,
  UpdateSchema,
  DeleteSchema,
} from '@/schemas/admin.schema'

const prefix = '/v1/admins'

export default (app: any) =>
  app.group(prefix, (group: any) =>
    group
      .post(
        '/login',
        (ctx: any) => ctrl.login(ctx),
        LoginSchema,
        loginValidation
      )
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
