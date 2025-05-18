import RestAuth from "./Rest/RestAuth";
import Credentials from "./Rest/Credentials";
import { MissingRefreshTokenError } from "./Rest/RestAuthError";
import AuthStatus from "./AuthStatus";
import { AlreadyAuthenticatedError, NotAuthenticatedError } from "./AuthError";
import ReusePromise from "./Utils/ReusePromise";
import { AccessTokenManager } from "./AccessTokenWrapper";
import ObservableImpl from "../Observable/Core/ObservableImpl";

// TODO: Add tests to this class
class Auth extends ObservableImpl<AuthStatus> {

  private accessTokenManager: AccessTokenManager = new AccessTokenManager();

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
      if (error instanceof MissingRefreshTokenError) {
        this.notify(AuthStatus.Anonymous);
        return;
      }
      // If the token is invalid we can get UnauthorizedError:
      // malformed
      // stolen session
      // tab race condition - one tab rotates the token at the same as another tab
      throw error;
    }
  };

  public signUp = async (credentials: Credentials): Promise<void> => {
    if (this.getLastNotifiedValue() === AuthStatus.Authenticated) {
      throw new AlreadyAuthenticatedError();
    }
    const tokens = await this.authRest.signUp(credentials);
    this.accessTokenManager = new AccessTokenManager(tokens);
    this.notify(AuthStatus.Authenticated);
  };

  public signIn = async (credentials: Credentials): Promise<void> => {
    if (this.getLastNotifiedValue() === AuthStatus.Authenticated) {
      throw new AlreadyAuthenticatedError();
    }
    const tokens = await this.authRest.signIn(credentials);
    this.accessTokenManager = new AccessTokenManager(tokens);
    this.notify(AuthStatus.Authenticated);
  };

  public signOut = async (): Promise<void> => {
    await this.authRest.signOut();
    this.accessTokenManager = new AccessTokenManager();
    this.notify(AuthStatus.Anonymous);
  };

  public getAccessToken = async (): Promise<string> => {
    if (this.getLastNotifiedValue() !== AuthStatus.Authenticated) {
      throw new NotAuthenticatedError();
    }

    await this.refreshAccessToken();
    return this.accessTokenManager.token;
  };

  private refreshAccessToken = async (): Promise<void> => {
    if (!this.accessTokenManager.isExpired) {
      console.log("not expired");
      return;
    }

    await this.reusePromise.execute(async () => {
      const tokens = await this.authRest.getNewAccessToken();
      this.accessTokenManager = new AccessTokenManager(tokens);
    });
  };
}

export default Auth;
