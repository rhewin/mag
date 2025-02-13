import postmanToOpenApi from 'postman-to-openapi'
import cfg from '@/config'
import fs from 'fs'
import yaml from 'js-yaml'
import { resolve } from 'path'
import { attempt, log } from '@/utils/helper.util'
import { jsonOk, jsonError } from '@/base/api.base'

const filesDir = resolve(import.meta.dir, '../files')

const loadSwaggerYaml = async () => {
  const swaggerFilePath = resolve(filesDir, 'collection.yaml')
  if (!fs.existsSync(swaggerFilePath)) {
    log.warn('collection.yaml not found. Generating new one...')
    await toSwaggerYaml()
  }

  return yaml.load(fs.readFileSync(swaggerFilePath, 'utf8')) as object
}

const toSwaggerYaml = async () => {
  const input = resolve(filesDir, `${cfg.APP_NAME}.postman_collection.json`)
  const output = resolve(filesDir, 'collection.yaml')

  const [data, err] = await attempt(() =>
    postmanToOpenApi(input, output, cfg.SWAGGER_OPT)
  )

  if (err) {
    log.error('Error converting Postman collection:', err)
    return jsonError()
  }

  log.info(`OpenAPI specs saved to: ${output}`, data)
  return jsonOk(null)
}

export { loadSwaggerYaml, toSwaggerYaml }
