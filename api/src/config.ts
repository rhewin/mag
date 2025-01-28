import dotenv from "dotenv";
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const swaggerOptions = {
  swagger: {
    info: {
      title: 'Book Management API',
      description: 'API documentation for managing books and lending records.',
      version: '1.0.0',
    },
  },
  uiConfig: {
    docExpansion: 'full',
    deepLinking: true,
  },
};

const swaggerUIOptions = {
  routePrefix: '/docs',
};

// rate limit: 100 req/min
const rateLimitOptions = {
  max: 100,
  timeWindow: '1 minute',
}

const loggerOptions = {
  logger: {
    level: isProduction ? 'error' : 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid',
      },
    }
  }
}

const jwtOptions = { expiresIn: '1h' }

export default {
  PORT: Number(process.env.PORT) || 3000,
  SWAGGER_OPT: swaggerOptions,
  SWAGGER_UI_OPT: swaggerUIOptions,
  RATE_LIMIT_OPT: rateLimitOptions,
  LOGGER_OPT: loggerOptions,
  JWT_SECRET: process.env.JWT_SECRET ?? '',
  JWT_OPT: jwtOptions,
  LEND_DUE_DATE_DAYS: 7
};
