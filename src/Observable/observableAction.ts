import ObservableImpl from "./ObservableImpl.ts";
import ActionResult from "./ActionResult.ts";

class ObservableAction<A extends never[], T> extends ObservableImpl<
  ActionResult<T>
> {
  constructor(
    initialValue: T,
    private readonly action: (...args: A) => T,
  ) {
    super({ result: initialValue });
  }

  public result(nextToken?: symbol): T  {
    return this.getLastNotifiedValue(nextToken).result;
  };

  exec = (...args: A) => {
    try {
      const result = this.action(...args);
      this.notify({ result });
    } catch (e) {
      // TODO: probably `result` should be set as undefined
      // TODO: probably ObservableAction shouldn't handle errors
      this.notifyWithPreviousValue((p) => ({ ...p, error: e as Error }));
    }
  };
}

function observableAction<A extends never[], T>(
  initialValue: T,
  action: (...args: A) => T,
) {
  return new ObservableAction<A, T>(initialValue, action);
}

export default observableAction;
