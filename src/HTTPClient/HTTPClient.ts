import Middleware, { NextFn } from "./Middleware";
import JSONEncoder from "./JSONEncoder";
import JSONDecoder from "./JSONDecoder";
import getQueryString, { HTTPQuery } from "./getQueryString";
import HTTPMethod from "./HTTPMethod";

interface Options {
  decoder?: JSONDecoder;
  encoder?: JSONEncoder;
  credentials?: RequestCredentials;
}

class HTTPClient {
  constructor(
    private readonly base: string,
    private readonly middlewares: Middleware[] = [],
    private readonly options: Options = {},
  ) {}

  get decoder(): JSONDecoder {
    return this.options.decoder ?? JSON;
  }

  get encoder(): JSONEncoder {
    return this.options.encoder ?? JSON;
  }

  public async request<T>(
    method: HTTPMethod,
    path: string,
    payload?: object,
    query?: HTTPQuery,
  ): Promise<T> {
    const request = this.getRequest(path, method, payload, query);

    const response = await this.performRequest(request);

    // TODO: validate contentType
    // const contentType = response.headers.get("content-type");
    const text = await response.text();
    return this.decoder.parse(text);
  }

  public async requestEmptyResponse(
    method: HTTPMethod,
    path: string,
    payload?: object,
    query?: HTTPQuery,
  ): Promise<void> {
    const request = this.getRequest(path, method, payload, query);

    await this.performRequest(request);
  }

  private getRequest(
    path: string,
    method: HTTPMethod,
    payload?: object,
    query?: HTTPQuery,
  ): Request {
    const queryString = getQueryString(query);
    const url = `${this.base}${path}${queryString}`;

    const headers = {
      "Content-Type": "application/json",
    };

    return new Request(url, {
      method: method,
      body: payload === undefined ? undefined : this.encoder.stringify(payload),
      headers: payload === undefined ? undefined : headers,
      credentials: this.options.credentials,
    });
  }

  private async performRequest(request: Request): Promise<Response> {
    const fn = this.reduceMiddlewares(this.lastAction);

    return await fn(request);
  }

  private reduceMiddlewares(lastAction: NextFn): NextFn {
    const result = this.middlewares.reduce((nextFn, middleware) => {
      return async (request: Request) => {
        return await middleware.request(request, nextFn);
      };
    }, lastAction);
    return result;
  }

  private async lastAction(request: Request): Promise<Response> {
    return await fetch(request);
  }
}

export default HTTPClient;
