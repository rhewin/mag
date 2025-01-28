import { IJSONError } from './util';

const errCodeMessage: Record<number, string> = {
  400: "Bad request",
  401: "Unauthorized",
  404: "Not found",
  500: "Internal server error",
};

export const jsonError = (data: IJSONError) => {
  let { req, res, code, message, error } = data;
  const errMessage = (message == null || message === "")
    ? errCodeMessage[code] || "Unknown error"
    : message;

  req.log.error(error ?? (message ?? null));
  return res.code(code).send({ errors: errMessage });
}
