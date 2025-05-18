
interface Payload {
  readonly userId: string
}

interface Tokens {
  readonly accessToken: string;
  /**
   * Value in seconds
   */
  readonly expiresIn: number;

  readonly payload: Payload
}


/*
  "payload": {
    "user_id": "18339087-B29C-434C-9A36-74E8BA0FBBB4"
  },
  "access_token": "",
  "expires_in": 300,
  "refresh_token": "",
  "refresh_token_expires_in": 900
}
*/

export default Tokens;
