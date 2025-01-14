import ObservableImpl from "./ObservableImpl";
import ActionResult from "./ActionResult";

export class ObservableAction<A extends unknown[], T> extends ObservableImpl<
  ActionResult<T>
> {
  readonly #action: (...args: A) => T;

  constructor(
    initialValue: T,
    action: (...args: A) => T,
  ) {
    super({ result: initialValue });
    this.#action = action;
  }

  public result(nextToken?: symbol): T  {
    return this.getLastNotifiedValue(nextToken).result;
  };

  exec = (...args: A) => {
    try {
      const result = this.#action(...args);
      this.notify({ result });
    } catch (e) {
      // TODO: probably `result` should be set as undefined
      // TODO: probably ObservableAction shouldn't handle errors
      this.notifyWithPreviousValue((p) => ({ ...p, error: e as Error }));
    }
  };
}

function observeAction<A extends unknown[], T>(
  initialValue: T,
  action: (...args: A) => T,
) {
  return new ObservableAction<A, T>(initialValue, action);
}

export default observeAction;
