import Auth from "../../Auth/Auth";
import observableAsyncAction from "../../Observable/observableAsyncAction";

class InitializeAuthViewModel {
  #auth: Auth;

  constructor(auth: Auth) {
    this.#auth = auth;
  }

  screenInit = observableAsyncAction(async () => {
    await this.#auth.initialize();
  }, true);
}

export default InitializeAuthViewModel;
