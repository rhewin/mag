import fastify from 'fastify';
import cfg from './config';
import routes from './routes';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';

const server = fastify(cfg.LOGGER_OPT);

(async () => {
  try {
    server.register(swagger, cfg.SWAGGER_OPT);
    server.register(swaggerUI, cfg.SWAGGER_UI_OPT);
    server.register(routes.bookRouter);

    await server.listen({ port: cfg.PORT });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})()
