export class RestAuthError extends Error {}

export class UnauthorizedError extends RestAuthError {
  constructor(reason: string) {
    super(reason);
  }
}

export class MissingRefreshTokenError extends RestAuthError {
  constructor(reason: string) {
    super(reason);
  }
}
