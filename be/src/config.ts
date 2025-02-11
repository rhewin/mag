const isProduction = process.env.NODE_ENV === 'production'

const CORS_OPT = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}

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
  APP_PORT: Number(process.env.APP_PORT) || 3000,
  CHARS_PIN: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  CORS_OPT,
  JWT_OPT,
  LOGGER_OPT,
  PRISMA_OPT,
  SWAGGER_OPT,
  HASH_ARGON: {
    algorithm: 'argon2id' as 'argon2id' | 'argon2i' | 'argon2d',
    memoryCost: 4,
    timeCost: 3,
  },
  VALIDATION: {
    MIN_NAME: 3,
    MAX_NAME: 50,
    MIN_PHONE: 10,
    MAX_PHONE: 15,
    REGEX_FORMAT_PHONE: '^\\+?[1-9]\\d{1,14}$',
  },
}
