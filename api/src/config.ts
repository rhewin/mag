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
}

const swaggerUIOptions = {
  routePrefix: '/docs',
}

export default {
  PORT: Number(process.env.PORT) || 3000,
  SWAGGER_OPT: swaggerOptions,
  SWAGGER_UI_OPT: swaggerUIOptions
}
