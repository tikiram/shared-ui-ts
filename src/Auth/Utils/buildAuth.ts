import RestAuth from "../Rest/RestAuth";
import Auth from "../Auth";
import { ErrorHandlerMiddleware, HTTPClient, NiceJSONDecoder, NiceJSONEncoder } from "typescript-http-client";

function buildAuth(baseUrl: string): Auth {

  const client = new HTTPClient(baseUrl, [new ErrorHandlerMiddleware()], {
    decoder: new NiceJSONDecoder(true),
    encoder: new NiceJSONEncoder(true),
    credentials: "include",
  });

  const restAuth = new RestAuth(client);
  return new Auth(restAuth);
}

export default buildAuth;
