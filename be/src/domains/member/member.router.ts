import ctrl from "./member.controller";
import { createMemberValidation } from "./member.validator";

export default (app: any) =>
  app.group("/v1/members", (group: any) =>
    group
      .get("/", (ctx: any) => ctrl.list(ctx))
      .post("/", (ctx: any) => ctrl.create(ctx), createMemberValidation)
      .put("/:id", (ctx: any) => ctrl.update(ctx))
      .delete("/:id", (ctx: any) => ctrl.deleteById(ctx))
  );
