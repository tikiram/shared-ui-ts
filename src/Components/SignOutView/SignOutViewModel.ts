import Auth from "../../Auth/Auth.ts";
import observableAsyncAction from "../../utils/Observable/observableAsyncAction.ts";

class SignOutViewModel {
  #auth: Auth;

  constructor(auth: Auth) {
    this.#auth = auth;
  }

  logOutTapped = observableAsyncAction(async () => {
    await this.#auth.signOut();
  });
}

export default SignOutViewModel;
