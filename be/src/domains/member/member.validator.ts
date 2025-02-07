import { t } from "elysia";
import cfg from "@/config";

const phoneValidation = t.String({
  pattern: cfg.REGEX_FORMAT_PHONE,
  minLength: 10,
  maxLength: 15,
});

export const createMemberValidation = {
  body: t.Object({
    fullname: t.String({ minLength: 3, maxLength: 50 }),
    nickname: t.String({ minLength: 3, maxLength: 50 }),
    email: t.String({ format: "email" }),
    phone: phoneValidation,
  }),
};
