const isProduction = process.env.NODE_ENV === 'production'

const JWT_OPT = {
  name: 'jwt',
  secret: process.env.JWT_SECRET ?? 'bXlqd3RzZWNyZXQ=',
}

const LOGGER_OPT = {
  level: isProduction ? 'error' : 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid',
    },
  },
}

const PRISMA_OPT = {
  errorFormat: 'pretty' as 'pretty' | 'colorless' | 'minimal',
}

const SWAGGER_OPT = {
  documentation: {
    info: {
      title: process.env.APP_NAME ?? '',
      version: '1.0.0',
      description: process.env.APP_DESCRIPTION ?? '',
    },
  },
}

export default {
  CHARS_PIN: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  JWT_OPT,
  LOGGER_OPT,
  PRISMA_OPT,
  SWAGGER_OPT,
  REGEX_FORMAT_PHONE: '^\\+?[1-9]\\d{1,14}$',
  PORT: Number(process.env.APP_PORT) || 3000,
}
