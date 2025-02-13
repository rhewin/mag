import type { ErrorMap } from '.'
import { log, transformKeysToSnakeCase } from '@/utils/helper.util'

const headers = { 'Content-Type': 'application/json' }

const errorMap: Record<string, ErrorMap> = {
  VALIDATION: { status: 400, message: 'Validation failed' },
  NOT_FOUND: { status: 404, message: 'Route not found' },
  UNAUTHORIZED: { status: 401, message: 'Unauthorized access' },
  FORBIDDEN: { status: 403, message: 'Forbidden' },
  TOO_MANY_REQUESTS: { status: 429, message: 'Too many requests' },
  INTERNAL: { status: 500, message: 'Internal server error' },
  BAD_REQUEST: { status: 400, message: 'Bad request' },
}

const jsonOk = (data: any, message: string = 'success', status = 200) =>
  new Response(
    JSON.stringify(transformKeysToSnakeCase({ success: true, message, data })),
    {
      status,
      headers,
    }
  )

const jsonError = (code?: string, data?: any, customMessage?: string) => {
  code = code ?? 'INTERNAL'
  let { status, message } = errorMap[code] || {
    status: 500,
    message: 'Unknown error',
  }

  log.error(data, message || customMessage)

  if (code == 'VALIDATION') {
    message = data
      .map((err: any) => {
        return err.schema.error
          ? err.schema.error.message
          : JSON.stringify(err.schema.errorMessage)
      })
      .join(', ')
    data = null
  } else {
    message = customMessage && customMessage != '' ? customMessage : message
    data = data instanceof Error && data.message ? data.message : null
  }

  return new Response(
    JSON.stringify(
      transformKeysToSnakeCase({
        success: false,
        message,
        data,
      })
    ),
    {
      status,
      headers,
    }
  )
}

export { jsonOk, jsonError }
