import { log } from '@/utils/helper.util'

export const loggerMiddleware = async (ctx: any) => {
  const { method, url, headers } = ctx.request

  const allowedHeaders = [
    'accept',
    'authorization',
    'cache-control',
    'user-agent',
  ]

  const headersObj = Object.fromEntries(headers.entries())
  const filteredHeaders = Object.fromEntries(
    Object.entries(headersObj).filter(([key]) =>
      allowedHeaders.includes(key.toLowerCase())
    )
  )

  log.info({ headers: filteredHeaders }, `Incoming request -> ${method} ${url}`)
}
