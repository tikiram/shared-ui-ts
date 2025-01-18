import Auth from "../../Auth/Auth";
import observeAsyncAction from "../../Observable/observeAsyncAction";
import { observeTyping } from "../../Observable/utils";

class SignInFormViewModel {
  #auth: Auth;

  constructor(auth: Auth) {
    this.#auth = auth;
  }

  emailTyped = observeTyping();
  passwordTyped = observeTyping();

  signInButtonTapped = observeAsyncAction(async () => {
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

export default SignInFormViewModel;
