import ObservableImpl from "../Core/ObservableImpl";

export class ObservableAction<
  A extends unknown[],
  T,
> extends ObservableImpl<T> {
  readonly #action: (...args: A) => T;

  constructor(initialValue: T, action: (...args: A) => T) {
    super(initialValue);
    this.#action = action;
  }

  public result(): T {
    return this.getLastNotifiedValue();
  }

  exec = (...args: A) => {
    const result = this.#action(...args);
    this.notify(result);
  };
}

export default ObservableAction;
