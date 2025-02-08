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

const log = pino(cfg.LOGGER_OPT)

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

const toSnakeCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(toSnakeCase)
  }

  if (obj && typeof obj === 'object') {
    return Object.keys(obj).reduce(
      (acc, key) => ({
        ...acc,
        [key.replace(/([A-Z])/g, '_$1').toLowerCase()]: toSnakeCase(obj[key]),
      }),
      {} as Record<string, any>
    )
  }

  return obj
}

const toCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase)
  }

  if (obj && typeof obj === 'object') {
    return Object.keys(obj).reduce(
      (acc, key) => ({
        ...acc,
        [key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())]:
          toCamelCase(obj[key]),
      }),
      {} as Record<string, any>
    )
  }

  return obj
}

export { attempt, log, paginate, toSnakeCase, toCamelCase }
