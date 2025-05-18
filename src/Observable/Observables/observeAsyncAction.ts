import ObservableAsyncAction from "./ObservableAsyncAction";

function observeAsyncAction<A extends never[], T>(
  action: (...args: A) => Promise<T>
) {
  return new ObservableAsyncAction<A, T>(action);
}

export default observeAsyncAction;
