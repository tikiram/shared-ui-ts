import ObservableUnsafeAction from "./ObservableUnsafeAction";

function observeUnsafeAction<A extends unknown[], T>(
  initialValue: T,
  action: (...args: A) => T
) {
  return new ObservableUnsafeAction<A, T>(initialValue, action);
}

export default observeUnsafeAction;
