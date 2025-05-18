import Observable from "./Observable";
import Observer from "./Observer";
import Subscription from "./Subscription";

abstract class ObservableImpl<T> implements Observable<T> {
  #lastValue: T;

  #observers: Observer<T>[] = [];

  protected constructor(initialValue: T) {
    this.#lastValue = initialValue;
  }

  protected notifyWithPreviousValue(action: (previous: T) => T) {
    const newValue = action(this.#lastValue);
    this.notify(newValue);
  }

  protected notify(value: T): void {
    this.#lastValue = value;

    this.#observers
      .forEach((o) => o.next(value));
  }

  getLastNotifiedValue(): T {
    return this.#lastValue;
  }

  subscribe(observer: Observer<T>): Subscription {
    this.#observers.push(observer);

    return {
      unsubscribe: () => {
        const index = this.#observers.indexOf(observer)
        this.#observers.splice(index, 1);
      },
    };
  }
}

export default ObservableImpl;
