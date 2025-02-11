import ObservableAsyncAction from "./ObservableAsyncAction";
import ObservableAsyncActionMode from "./ObservableAsyncActionMode";

interface Options<A> {
  onlyToFirstSuccess?: boolean;
  mode?: ObservableAsyncActionMode;
  keyFn?: () => string;
  justLastCallSkipWhenInProgressFn?: (
    previousArgs: A,
    currentArgs: A,
  ) => boolean;
}

// TODO: refactor options? should I get rid of this and use the class directly?

function observeAsyncAction<A extends never[], T>(
  action: (...args: A) => Promise<T>,
  options?: Options<A>,
) {
  const { onlyToFirstSuccess, mode, keyFn, justLastCallSkipWhenInProgressFn } =
    options || {};

  return new ObservableAsyncAction<A, T>(
    action,
    onlyToFirstSuccess,
    mode,
    keyFn,
    justLastCallSkipWhenInProgressFn,
  );
}

export default observeAsyncAction;
