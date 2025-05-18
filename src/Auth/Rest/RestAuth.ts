import { MissingRefreshTokenError, UnauthorizedError } from "./RestAuthError";
import Tokens from "./Tokens";
import Credentials from "./Credentials";
import { BadResponseError, HTTPClient, HTTPMethod } from "typescript-http-client";

const SIGN_UP_PATH = "/c/v1/auth/register";
const SIGN_IN_PATH = "/c/v1/auth/login";
const REFRESH_PATH = "/b/v1/auth/refresh";
const SIGN_OUT_PATH = "/b/v1/auth/logout";

class RestAuth {
  constructor(private readonly client: HTTPClient) { }

  async getNewAccessToken(): Promise<Tokens> {
    try {
      return await this.client.request(HTTPMethod.Post, REFRESH_PATH);
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

  async signIn(credentials: Credentials): Promise<Tokens> {
    return await this.client.request(HTTPMethod.Post, SIGN_IN_PATH, credentials);
    // TODO: handle expected errors
  }

  async signOut(): Promise<void> {
    await this.client.requestEmptyResponse(HTTPMethod.Post, SIGN_OUT_PATH);
  }

  async signUp(credentials: Credentials): Promise<Tokens> {
    return await this.client.request(HTTPMethod.Post, SIGN_UP_PATH, credentials);
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
