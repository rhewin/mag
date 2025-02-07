const isProduction = process.env.NODE_ENV === "production";

const LOGGER_OPT = {
  level: isProduction ? "error" : "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid",
    },
  },
};

const PRISMA_OPT = {
  errorFormat: "pretty" as "pretty" | "colorless" | "minimal",
};

const SWAGGER_OPT = {
  documentation: {
    info: {
      title: process.env.APP_NAME ?? "",
      version: "1.0.0",
      description: process.env.APP_DESCRIPTION ?? "",
    },
  },
};

export default {
  LOGGER_OPT,
  PRISMA_OPT,
  SWAGGER_OPT,
  REGEX_FORMAT_PHONE: "^\\+?[1-9]\\d{1,14}$",
  PORT: Number(process.env.PORT) || 3000,
};
