import ObservableImpl from "./ObservableImpl";

// TODO: find a better name
class Store<T> extends ObservableImpl<T> {
  constructor(initialValue: T) {
    super(initialValue);
  }

  get(): T {
    return this.getLastNotifiedValue();
  }

  set(value: T): void {
    this.notify(value);
  }
}

export default Store;
