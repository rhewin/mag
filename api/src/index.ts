import fastify from "fastify";
import cfg from "@/config";
import routes from "@/routes";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

const server = fastify()

const main = async () => {
  try {
    server.register(routes.bookRouter)
    server.register(swagger, cfg.SWAGGER_OPT)
    server.register(swaggerUI, cfg.SWAGGER_UI_OPT)

    await server.listen({ port: cfg.PORT });
    console.log("Server running at http://localhost:3000");
  } catch (err) {
    server.log.error(err);
    console.error(err)
    process.exit(1);
  }
};

main()
