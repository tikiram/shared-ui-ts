import AccessTokenInfo from "./AccessTokenInfo";

export class AccessTokenWrapper {
  constructor(private readonly info: AccessTokenInfo) {
  }

  get isExpired(): boolean {
    const expirationDate = new Date(Date.now() + this.info.expiresIn * 1000);
    return new Date() >= expirationDate;
  }

  get token(): string {
    return this.info.accessToken;
  }
}