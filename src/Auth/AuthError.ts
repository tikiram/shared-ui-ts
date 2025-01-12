export class AuthError extends Error {}

export class AlreadyAuthenticatedError extends AuthError {}

export class NotAuthenticatedError extends AuthError {}
