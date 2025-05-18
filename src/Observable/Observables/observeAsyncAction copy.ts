import ObservableSingleAsyncAction from "./ObservableSingleAsyncAction";

function observeSingleAsyncAction<A extends never[], T>(
  action: (...args: A) => Promise<T>
) {
  return new ObservableSingleAsyncAction<A, T>(action);
}

export default observeSingleAsyncAction;
