import memberRoutes from './domains/member/member.router'
import adminRoutes from './domains/admin/admin.router'
import { jsonOk } from './base/api.base'

export const route = (app: any) =>
  app
    .get('/', () => jsonOk(null, 'Welcome to the API!'))
    .use(memberRoutes)
    .use(adminRoutes)
