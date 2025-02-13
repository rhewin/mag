import memberRoutes from './domains/member/member.router'
import adminRoutes from './domains/admin/admin.router'
import { toSwaggerYaml } from './utils/swagger.util'
import { jsonOk } from './base/api.base'

const routes = (app: any) =>
  app
    .get('/', () => jsonOk(null, 'Welcome!'))
    .get('/generate-swagger', () => toSwaggerYaml())
    .use(adminRoutes)
    .use(memberRoutes)

export default routes
