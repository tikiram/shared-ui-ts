export type NextFn = (request: Request) => Promise<Response>;

interface Middleware {
  request(request: Request, next: NextFn): Promise<Response>;
}

export default Middleware;
