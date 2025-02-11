import memberRoutes from './domains/member/member.router'
import adminRoutes from './domains/admin/admin.router'

export const route = (app: any) => {
  return app.use(memberRoutes).use(adminRoutes)
}
