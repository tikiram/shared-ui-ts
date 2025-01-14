import Observable from "./Observable";
import Observer from "./Observer";
import Subscription from "./Subscription";

export interface ObserverData<T> {
  nextToken?: symbol;
  observer: Observer<T>;
}

abstract class ObservableImpl<T> implements Observable<T> {
  #lastValue: T;
  #observers: ObserverData<T>[] = [];
  #justNext: Record<symbol, boolean> = {};

  protected constructor(initialValue: T) {
    this.#lastValue = initialValue;
  }

  protected notifyWithPreviousValue(action: (previous: T) => T) {
    const newValue = action(this.#lastValue);
    this.notifyObservers(newValue);
  }

  protected notify(value: T): void {
    this.notifyObservers(value);
  }

  private notifyObservers(value: T): void {
    this.#lastValue = value;

    this.#observers
      .filter((d) => (d.nextToken ? this.#justNext[d.nextToken] : true))
      .forEach((d) => d.observer.next(value));

    this.#observers
      .filter((d) => d.nextToken)
      .forEach((d) => {
        this.#justNext[d.nextToken!] = false;
      });
  }

  getLastNotifiedValue(nextToken?: symbol): T {
    if (nextToken) {
      this.#justNext[nextToken] = true;
    }

    return this.#lastValue;
  }

  subscribe(observer: Observer<T>, nextToken?: symbol): Subscription {
    this.#observers.push({
      nextToken,
      observer,
    });

    const observers = this.#observers;

    return {
      unsubscribe() {
        const index = observers.findIndex((d) => d.observer === observer);
        observers.splice(index, 1);
      },
    };
  }
}

export default ObservableImpl;
