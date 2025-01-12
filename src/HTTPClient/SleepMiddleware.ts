import Middleware, { NextFn } from "./Middleware.ts";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class SleepMiddleware implements Middleware {
  constructor(private readonly seconds: number) {}

  async request(request: Request, next: NextFn): Promise<Response> {
    console.log("sleep", this.seconds);
    await sleep(this.seconds * 1000);
    return await next(request);
  }
}

export default SleepMiddleware;
