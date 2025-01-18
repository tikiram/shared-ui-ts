import Auth from "../../Auth/Auth";
import observeAsyncAction from "../../Observable/observeAsyncAction";

class InitializeAuthViewModel {
  #auth: Auth;

  constructor(auth: Auth) {
    this.#auth = auth;
  }

  screenInit = observeAsyncAction(async () => {
    await this.#auth.initialize();
  }, true);
}

export default InitializeAuthViewModel;
