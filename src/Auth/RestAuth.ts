import HTTPClient from "../HTTPClient/HTTPClient";
import HTTPMethod from "../HTTPClient/HTTPMethod";
import { MissingRefreshTokenError, UnauthorizedError } from "./RestAuthError";
import { BadResponseError } from "../HTTPClient/ErrorHandlerMiddleware";
import AccessTokenInfo from "./AccessTokenInfo";
import Credentials from "./Credentials";

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
      } else if (
        error instanceof BadResponseError &&
        error.response.status === 400
      ) {
        const reason = await tryGetReason(error.response);
        if (reason === "MISSING_REFRESH_TOKEN") {
          throw new MissingRefreshTokenError(reason);
        }
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
    return await response.clone().text();
  }
}

export default RestAuth;
