import RestAuth from "./RestAuth.ts";
import NiceJSONDecoder from "../HTTPClient/NiceJSONDecoder.ts";
import NiceJSONEncoder from "../HTTPClient/NiceJSONEncoder.ts";
import ErrorHandlerMiddleware from "../HTTPClient/ErrorHandlerMiddleware.ts";
import HTTPClient from "../HTTPClient/HTTPClient.ts";
import Auth from "./Auth.ts";

function buildAuth(): Auth {
  const base = import.meta.env.VITE_AUTH_API_URL;

  const client = new HTTPClient(base, [new ErrorHandlerMiddleware()], {
    decoder: new NiceJSONDecoder(true),
    encoder: new NiceJSONEncoder(true),
    credentials: "include",
  });

  const restAuth = new RestAuth(client);
  return new Auth(restAuth);
}

export default buildAuth;
