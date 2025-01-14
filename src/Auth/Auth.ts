import RestAuth from "./RestAuth";
import Credentials from "./Credentials";
import { UnauthorizedError } from "./RestAuthError";
import { AuthStatus } from "./AuthStatus";
import {
  AlreadyAuthenticatedError,
  NotAuthenticatedError,
} from "./AuthError";
import ReusePromise from "./ReusePromise";
import { AccessTokenWrapper } from "./AccessTokenWrapper";
import ObservableImpl from "../Observable/ObservableImpl";

class Auth extends ObservableImpl<AuthStatus> {
  private accessTokenManager: AccessTokenWrapper = new AccessTokenWrapper({
    accessToken: "",
    expiresIn: 0,
  });
  private reusePromise: ReusePromise<void> = new ReusePromise();

  constructor(private readonly authRest: RestAuth) {
    super(AuthStatus.Uninitialized);
  }

  public initialize = async () => {
    if (this.getLastNotifiedValue() !== AuthStatus.Uninitialized) {
      return;
    }

    try {
      await this.refreshAccessToken();
      this.notify(AuthStatus.Authenticated);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        this.notify(AuthStatus.Anonymous);
        return;
      }
      throw error;
    }
  };

  public signUp = async (credentials: Credentials): Promise<void> => {
    if (this.getLastNotifiedValue() === AuthStatus.Authenticated) {
      throw new AlreadyAuthenticatedError();
    }
    const accessTokenInfo = await this.authRest.signUp(credentials);
    this.accessTokenManager = new AccessTokenWrapper(accessTokenInfo);
    this.notify(AuthStatus.Authenticated);
  };

  public signIn = async (credentials: Credentials): Promise<void> => {
    if (this.getLastNotifiedValue() === AuthStatus.Authenticated) {
      throw new AlreadyAuthenticatedError();
    }
    const accessTokenInfo = await this.authRest.signIn(credentials);
    this.accessTokenManager = new AccessTokenWrapper(accessTokenInfo);
    this.notify(AuthStatus.Authenticated);
  };

  public signOut = async (): Promise<void> => {
    await this.authRest.signOut();
    this.accessTokenManager = new AccessTokenWrapper({
      accessToken: "",
      expiresIn: 0,
    });
    this.notify(AuthStatus.Anonymous);
  };

  private refreshAccessToken = async (): Promise<void> => {
    if (!this.accessTokenManager.isExpired) {
      console.log("not expired");
      return;
    }

    await this.reusePromise.execute(async () => {
      const accessTokenInfo = await this.authRest.getNewAccessToken();
      this.accessTokenManager = new AccessTokenWrapper(accessTokenInfo);
    });
  };

  public getAccessToken = async (): Promise<string> => {
    if (this.getLastNotifiedValue() !== AuthStatus.Authenticated) {
      throw new NotAuthenticatedError();
    }

    try {
      await this.refreshAccessToken();
      return this.accessTokenManager.token;
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        this.notify(AuthStatus.Anonymous);
      }
      throw error;
    }
  };
}

export default Auth;
