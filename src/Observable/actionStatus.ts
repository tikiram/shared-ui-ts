interface ActionStatus<T> {
  type: "idle" | "loading" | "error" | "success";
  result?: T;
  error?: Error;
}

export default ActionStatus;
