import ObservableImpl from "../Core/ObservableImpl";
import ActionResult from "./ActionResult";

export class ObservableUnsafeAction<
  A extends unknown[],
  T,
> extends ObservableImpl<ActionResult<T>> {
  readonly #action: (...args: A) => T;

  constructor(initialValue: T, action: (...args: A) => T) {
    super({ result: initialValue });
    this.#action = action;
  }

  public result(): T | undefined {
    return this.getLastNotifiedValue().result;
  }

  exec = (...args: A) => {
    try {
      const result = this.#action(...args);
      this.notify({ result });
    } catch (e) {
      this.notify({ error: e as Error, result: undefined });
    }
  };
}

export default ObservableUnsafeAction;
