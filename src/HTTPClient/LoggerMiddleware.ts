import Middleware, { NextFn } from "./Middleware";

class LoggerMiddleware implements Middleware {
  constructor(private readonly enabled: boolean = true) {}

  async request(request: Request, next: NextFn): Promise<Response> {
    if (!this.enabled) {
      return await next(request);
    }

    console.log(`>>> request: ${request.method} ${request.url}`);

    if (request.body) {
      const contentType = request.headers.get("content-type");
      if (
        contentType?.includes("application/json") ||
        contentType?.includes("text/plain")
      ) {
        const text = await request.clone().text();
        console.log(text);
      }
    }

    const response = await next(request);

    console.log(`>>> response: ${response.status}`);

    // TODO: pretty print json responses
    const text = await response.clone().text();
    console.log(text);

    return response;
  }
}

export default LoggerMiddleware;
