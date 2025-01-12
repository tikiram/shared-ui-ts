import observableAction from "../../utils/Observable/observableAction.ts";
import observableAsyncAction from "../../utils/Observable/observableAsyncAction.ts";
import Auth from "../../Auth/Auth.ts";

class SignInViewModel {
  #auth: Auth;

  constructor(auth: Auth) {
    this.#auth = auth;
  }

  emailTyped = observableAction("", (text: string) => text);

  passwordTyped = observableAction("", (text: string) => text);

  signInButtonTapped = observableAsyncAction(async () => {
    const email = this.emailTyped.result().trim();
    const password = this.passwordTyped.result().trim();

    if (email.length === 0 || password.length === 0) {
      throw new Error("FIELDS_REQUIRED");
    }

    await this.#auth.signIn({ email, password });

    this.#clearForm();
  });

  #clearForm = () => {
    this.emailTyped.exec("");
    this.passwordTyped.exec("");
  };
}

export default SignInViewModel;
