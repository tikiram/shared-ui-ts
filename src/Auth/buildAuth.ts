import RestAuth from "./RestAuth";
import NiceJSONDecoder from "../HTTPClient/NiceJSONDecoder";
import NiceJSONEncoder from "../HTTPClient/NiceJSONEncoder";
import ErrorHandlerMiddleware from "../HTTPClient/ErrorHandlerMiddleware";
import HTTPClient from "../HTTPClient/HTTPClient";
import Auth from "./Auth";

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
