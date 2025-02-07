import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { jsonError } from "@/base/api.base";
import { log } from "@/utils/helper.util";
import memberRoutes from "./domains/member/member.router";
import cfg from "./config";

const app = new Elysia()
  .use(swagger(cfg.SWAGGER_OPT))
  .use(memberRoutes)
  .onError(() => jsonError())
  .listen(cfg.PORT);

log.info(`Server running at ${app.server?.hostname}:${cfg.PORT}`);
