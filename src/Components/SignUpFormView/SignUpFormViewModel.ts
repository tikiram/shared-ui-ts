import Auth from "../../Auth/Auth";
import observeAsyncAction from "../../Observable/observeAsyncAction";
import { observeTyping } from "../../Observable/utils";

class SignUpFormViewModel {
  #auth: Auth;

  constructor(auth: Auth) {
    this.#auth = auth;
  }

  emailTyped = observeTyping();
  passwordTyped = observeTyping();
  passwordVerificationTyped = observeTyping();

  signUpButtonTapped = observeAsyncAction(async () => {
    const email = this.emailTyped.result().trim();
    const password = this.passwordTyped.result();
    const passwordVerification = this.passwordTyped.result();

    if (
      email.length === 0 ||
      password.length === 0 ||
      passwordVerification.length === 0
    ) {
      throw new Error("FIELDS_REQUIRED");
    }

    if (password !== passwordVerification) {
      throw new Error("PASSWORDS_DO_NOT_MATCH");
    }

    await this.#auth.signUp({ email, password });

    this.#clearForm();
  });

  #clearForm = () => {
    this.emailTyped.exec("");
    this.passwordTyped.exec("");
    this.passwordVerificationTyped.exec("");
  };
}

export default SignUpFormViewModel;
