import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { jsonError } from '@/base/api.base'
import { log } from '@/utils/helper.util'
import { loadSwaggerYaml } from './utils/swagger.util'
import { loggerMiddleware } from './middlewares/logger.mid'
import packages from './packages'
import routes from './routes'
import cfg from './config'

new Elysia()
  .use(packages)
  .use(swagger({ documentation: await loadSwaggerYaml() }))
  .use(routes)
  .onRequest(loggerMiddleware)
  .onError(({ code }) => jsonError(code))
  .listen(cfg.APP_PORT)

log.info(`Server running at localhost:${cfg.APP_PORT}`)
