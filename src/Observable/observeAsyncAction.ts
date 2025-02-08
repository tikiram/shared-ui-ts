import ObservableAsyncAction from "./ObservableAsyncAction";

function observeAsyncAction<A extends never[], T>(
  action: (...args: A) => Promise<T>,
  toFirstSuccess: boolean = false,
) {
  return new ObservableAsyncAction<A, T>(action, toFirstSuccess);
}

export default observeAsyncAction;
