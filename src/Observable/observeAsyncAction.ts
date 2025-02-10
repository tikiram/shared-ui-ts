import ObservableAsyncAction from "./ObservableAsyncAction";
import ObservableAsyncActionMode from "./ObservableAsyncActionMode";

interface Options {
  onlyToFirstSuccess?: boolean;
  mode?: ObservableAsyncActionMode;
}

function observeAsyncAction<A extends never[], T>(
  action: (...args: A) => Promise<T>,
  options?: Options,
) {
  const { onlyToFirstSuccess, mode } = options || {};

  return new ObservableAsyncAction<A, T>(action, onlyToFirstSuccess, mode);
}

export default observeAsyncAction;
