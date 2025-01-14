import Auth from "../../Auth/Auth";
import observableAsyncAction from "../../Observable/observableAsyncAction";

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
