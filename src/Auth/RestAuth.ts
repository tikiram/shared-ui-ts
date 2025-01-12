import HTTPClient from "../HTTPClient/HTTPClient.ts";
import HTTPMethod from "../HTTPClient/HTTPMethod.ts";
import { UnauthorizedError } from "./RestAuthError.ts";
import { BadResponseError } from "../HTTPClient/ErrorHandlerMiddleware.ts";
import AccessTokenInfo from "./AccessTokenInfo.ts";
import Credentials from "./Credentials.ts";

const SIGN_UP_PATH = "/auth/register";
const TOKEN_PATH = "/auth/token";
const SIGN_OUT_PATH = "/auth/logout";

class RestAuth {
  constructor(private readonly client: HTTPClient) {}

  async getNewAccessToken(): Promise<AccessTokenInfo> {
    const payload = {
      grantType: "refresh_token",
    };

    try {
      return await this.client.request(HTTPMethod.Post, TOKEN_PATH, payload);
    } catch (error) {
      if (error instanceof BadResponseError && error.response.status === 401) {
        const reason = await tryGetReason(error.response);
        throw new UnauthorizedError(reason);
      }
      throw error;
    }
  }

  async signIn(credentials: Credentials): Promise<AccessTokenInfo> {
    const payload = {
      username: credentials.email,
      password: credentials.password,
      grantType: "password",
    };

    return await this.client.request(HTTPMethod.Post, TOKEN_PATH, payload);
    // TODO: handle expected errors
  }

  async signOut(): Promise<void> {
    await this.client.requestEmptyResponse(HTTPMethod.Post, SIGN_OUT_PATH);
  }

  async signUp(credentials: Credentials): Promise<AccessTokenInfo> {
    const payload = {
      username: credentials.email,
      password: credentials.password,
    };

    return await this.client.request(HTTPMethod.Post, SIGN_UP_PATH, payload);
    // TODO: handle expected errors
  }
}

async function tryGetReason(response: Response): Promise<string> {
  try {
    const content = await response.clone().json();
    return content.reason;
  } catch {
    return await response.text();
  }
}

export default RestAuth;
