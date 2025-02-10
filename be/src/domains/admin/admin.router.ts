import ctrl from './admin.controller'
import { jsonError } from '@/base/api.base'
import { authMiddleware } from '@/middlewares/auth.mid'
import { createAdminValidation, updateAdminValidation } from './admin.validator'

const prefix = '/v1/admins'

export default (app: any) =>
  app
    .post(`${prefix}/login`, (ctx: any) => ctrl.login(ctx))
    .group(prefix, (group: any) =>
      group
        .guard({ beforeHandle: authMiddleware })
        .get('/', (ctx: any) => ctrl.list(ctx))
        .post('/', (ctx: any) => ctrl.create(ctx), createAdminValidation)
        .put('/:id', (ctx: any) => ctrl.update(ctx), updateAdminValidation)
        .delete('/:id', (ctx: any) => ctrl.deleteById(ctx))
        .onError(({ code, error }: any) => jsonError(code, error.all))
    )
