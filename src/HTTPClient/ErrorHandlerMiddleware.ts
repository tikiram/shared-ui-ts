import Middleware, { NextFn } from "./Middleware";
import HTTPClientError from "./HTTPClientError";

export class BadResponseError extends HTTPClientError {
  readonly request: Request;
  readonly response: Response;

  constructor(request: Request, response: Response) {
    super("BAD_RESPONSE");
    this.request = request;
    this.response = response;
  }
}

class ErrorHandlerMiddleware implements Middleware {
  async request(request: Request, next: NextFn): Promise<Response> {
    const response = await next(request);

    if (response.status < 200 || response.status >= 300) {
      throw new BadResponseError(request, response);
    }

    return response;
  }
}

export default ErrorHandlerMiddleware;
