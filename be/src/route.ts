import memberRoutes from './domains/member/member.router'
import adminRoutes from './domains/admin/admin.router'
import { HealthSchema } from './schemas/health.schema'
import { jsonOk } from './base/api.base'

export const route = (app: any) =>
  app
    .get('/', () => jsonOk(null, 'Welcome to the API!'), HealthSchema)
    .use(adminRoutes)
    .use(memberRoutes)
