import { attempt } from '@/utils/helper.util'
import { jsonError } from '@/base/api.base'

export const authMiddleware = async (ctx: any) => {
  const token = ctx.request.headers
    .get('Authorization')
    ?.replace('Bearer ', '')
    .trim()

  if (!token) {
    return jsonError('UNAUTHORIZED')
  }

  const [payload, err] = await attempt(() => ctx.jwt.verify(token))
  if (err || !payload) {
    return jsonError('UNAUTHORIZED')
  }

  ctx.user = payload
}
