interface AccessTokenInfo {
  readonly accessToken: string;
  /**
   * Value in seconds
   */
  readonly expiresIn: number;
}

export default AccessTokenInfo;
