interface ActionResult<T> {
  result?: T;
  error?: Error;
}

export default ActionResult;
