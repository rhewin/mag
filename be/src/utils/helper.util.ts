import pino from 'pino'
import cfg from '@/config'

const attempt = async <T>(
  fn: () => Promise<T>
): Promise<[T | null, Error | null]> => {
  try {
    const result = await fn()
    return [result, null]
  } catch (error) {
    log.error(error)
    return [null, error instanceof Error ? error : new Error(String(error))]
  }
}

const decode64 = (encoded: string) =>
  Buffer.from(encoded, 'base64').toString('utf-8')

const encode64 = (str: string) => Buffer.from(str).toString('base64')

const generatePIN = (length: number = 9) =>
  Array.from(
    { length },
    () => cfg.CHARS_PIN[Math.floor(Math.random() * cfg.CHARS_PIN.length)]
  ).join('')

const log = pino(cfg.LOGGER_OPT)

const generateUUID7 = () => globalThis.Bun.randomUUIDv7()

const paginate = (
  pageNum: number | undefined,
  perPage: number | undefined
): any => {
  pageNum = pageNum ? Number(pageNum) : 1
  perPage = perPage ? Number(perPage) : 10

  const skip = (pageNum - 1) * perPage
  const take = perPage
  return [skip, take]
}

const toSnakeCase = (str: string) =>
  str.replace(/([A-Z])/g, '_$1').toLowerCase()

const transformKeysToSnakeCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(transformKeysToSnakeCase)
  }

  if (obj && typeof obj === 'object') {
    return Object.keys(obj).reduce(
      (acc, key) => ({
        ...acc,
        [toSnakeCase(key)]: transformKeysToSnakeCase(obj[key]),
      }),
      {} as Record<string, any>
    )
  }
  return obj
}

const toCamelCase = (str: string) =>
  str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())

const transformKeysToCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(transformKeysToCamelCase)
  }

  if (obj && typeof obj === 'object') {
    return Object.keys(obj).reduce(
      (acc, key) => ({
        ...acc,
        [toCamelCase(key)]: transformKeysToCamelCase(obj[key]),
      }),
      {} as Record<string, any>
    )
  }
  return obj
}

export {
  attempt,
  decode64,
  encode64,
  generatePIN,
  generateUUID7,
  log,
  paginate,
  toSnakeCase,
  toCamelCase,
  transformKeysToSnakeCase,
  transformKeysToCamelCase,
}
