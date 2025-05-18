export const IDLE_TYPE = "idle";
export const LOADING_TYPE = "loading";
export const ERROR_TYPE = "error";
export const SUCCESS_TYPE = "success";

interface ActionStatus<T> {
  type: "idle" | "loading" | "error" | "success";
  result?: T;
  error?: Error;
}

export default ActionStatus;
