import ObservableAction from "./ObservableAction";


function observeAction<A extends unknown[], T>(
  initialValue: T,
  action: (...args: A) => T
) {
  return new ObservableAction<A, T>(initialValue, action);
}

export default observeAction;
