import Auth from "../../Auth/Auth";
import observeAsyncAction from "../../Observable/observeAsyncAction";

class SignOutViewModel {
  #auth: Auth;

  constructor(auth: Auth) {
    this.#auth = auth;
  }

  logOutTapped = observeAsyncAction(async () => {
    await this.#auth.signOut();
  });
}

export default SignOutViewModel;
