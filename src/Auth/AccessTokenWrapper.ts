import AccessTokenInfo from "./AccessTokenInfo";

export class AccessTokenWrapper {
  #info: AccessTokenInfo;
  #expirationDate: Date;

  constructor(info: AccessTokenInfo) {
    this.#info = info;
    this.#expirationDate = new Date(Date.now() + info.expiresIn * 1000);
  }

  get isExpired(): boolean {
    return new Date() >= this.#expirationDate;
  }

  get token(): string {
    return this.#info.accessToken;
  }
}
