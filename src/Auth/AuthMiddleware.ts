import Auth from "./Auth.ts";
import Middleware, { NextFn } from "../HTTPClient/Middleware.ts";

class AuthMiddleware implements Middleware {
  #auth: Auth;

  constructor(auth: Auth) {
    this.#auth = auth;
  }

  async request(request: Request, next: NextFn): Promise<Response> {
    const accessToken = await this.#auth.getAccessToken();
    request.headers.set("Authorization", `Bearer ${accessToken}`);
    return await next(request);
  }
}

export default AuthMiddleware;
