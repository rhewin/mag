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

const RATELIMIT_GLOBAL_OPT = {
  max: 100, // 100 requests
  timeWindow: 60 * 1000, // per 60 seconds
  message: 'Too many requests. Please try again later.',
}

const RATELIMIT_LOGIN_OPT = {
  max: 5, // 5 requests
  timeWindow: 60 * 1000, // per 60 seconds
  message: 'Too many requests. Please try again later.',
}

const RATELIMIT_GUARD_OPT = {
  max: 10, // 10 requests
  timeWindow: 60 * 1000, // per 60 seconds
  message: 'Too many requests. Please try again later.',
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
  PAGINATION: {
    DEFAULT_PER_PAGE: 10,
  },
  RATELIMIT_GLOBAL_OPT,
  RATELIMIT_LOGIN_OPT,
  RATELIMIT_GUARD_OPT,
  VALIDATION: {
    MIN_NAME: 3,
    MAX_NAME: 50,
    MIN_PASSWORD: 8,
    MAX_PASSWORD: 32,
    MIN_PHONE: 10,
    MAX_PHONE: 15,
    REGEX_FORMAT_PHONE: '^\\+?[1-9]\\d{1,14}$',
    REGEX_FORMAT_MEDIUM_PASSWORD: '^(?=.*[a-z])(?=.*\\d).{8,}$',
    REGEX_FORMAT_STRONG_PASSWORD:
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
  },
}
