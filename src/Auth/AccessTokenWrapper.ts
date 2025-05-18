import Tokens from "./Rest/Tokens";

export class AccessTokenManager {
  #accessToken: string;
  #expirationDate: Date;

  constructor(info?: Tokens) {
    if (info) {
      this.#accessToken = info.accessToken;
      this.#expirationDate = new Date(Date.now() + info.expiresIn * 1000);
    }
    else {
      this.#accessToken = "";
      this.#expirationDate = new Date();
    }
  }

  get isExpired(): boolean {
    return new Date() >= this.#expirationDate;
  }

  get token(): string {
    return this.#accessToken;
  }
}
