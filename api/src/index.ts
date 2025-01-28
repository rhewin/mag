import fastify from 'fastify';
import cfg from './config';
import routes from './routes';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import middie from '@fastify/middie';
import rateLimit from '@fastify/rate-limit';

const server = fastify(cfg.LOGGER_OPT);

(async () => {
  try {
    await server.register(middie);
    server.register(rateLimit, cfg.RATE_LIMIT_OPT);
    server.register(swagger, cfg.SWAGGER_OPT);
    server.register(swaggerUI, cfg.SWAGGER_UI_OPT);

    server.register(routes.adminRouter);
    server.register(routes.bookRouter);
    server.register(routes.memberRouter);
    server.register(routes.lendRouter);

    await server.listen({ port: cfg.PORT });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})()
