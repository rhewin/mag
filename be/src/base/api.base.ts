const headers = { "Content-Type": "application/json" };

const errCodeMessage: Record<number, string> = {
  400: "Bad request",
  401: "Unauthorized",
  404: "Not found",
  500: "Internal server error",
};

const jsonOk = (data: any, message: string = "success", status = 200) =>
  new Response(JSON.stringify({ success: true, message, data }), {
    status,
    headers,
  });

const jsonError = (
  message: string = errCodeMessage[500],
  status: number = 500,
  data?: any
) =>
  new Response(JSON.stringify({ success: false, message, data }), {
    status,
    headers,
  });

export { jsonOk, jsonError };
