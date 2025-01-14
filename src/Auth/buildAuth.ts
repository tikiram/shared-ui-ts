import RestAuth from "./RestAuth";
import NiceJSONDecoder from "../HTTPClient/NiceJSONDecoder";
import NiceJSONEncoder from "../HTTPClient/NiceJSONEncoder";
import ErrorHandlerMiddleware from "../HTTPClient/ErrorHandlerMiddleware";
import HTTPClient from "../HTTPClient/HTTPClient";
import Auth from "./Auth";

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
