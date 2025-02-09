import ObservableImpl from "./ObservableImpl";
import ActionStatus from "./ActionStatus";

const IDLE_TYPE = "idle";
const LOADING_TYPE = "loading";
const ERROR_TYPE = "error";
const SUCCESS_TYPE = "success";

export class ObservableAsyncAction<A extends never[], T> extends ObservableImpl<
  ActionStatus<T>
> {
  constructor(
    private readonly action: (...args: A) => Promise<T>,
    private readonly toFirstSuccess: boolean = false,
  ) {
    super({ type: IDLE_TYPE });
  }

  isIdle = (viewToken?: symbol): boolean => {
    return this.getLastNotifiedValue(viewToken).type === IDLE_TYPE;
  };

  isLoading = (viewToken?: symbol): boolean => {
    return this.getLastNotifiedValue(viewToken).type === LOADING_TYPE;
  };

  isSuccess = (viewToken?: symbol): boolean => {
    return this.getLastNotifiedValue(viewToken).type === SUCCESS_TYPE;
  };

  result = (viewToken?: symbol): T | undefined => {
    return this.getLastNotifiedValue(viewToken).result;
  };

  error = (viewToken?: symbol): Error | undefined => {
    return this.getLastNotifiedValue(viewToken).error;
  };

  exec = (...args: A) => {
    if (this.isLoading()) {
      return;
    }

    if (this.toFirstSuccess && this.getLastNotifiedValue().type === "success") {
      return;
    }

    (async () => {
      this.notify({ type: LOADING_TYPE });
      try {
        const result = await this.action(...args);
        this.notify({ type: SUCCESS_TYPE, result: result });
      } catch (error) {
        this.notify({ type: ERROR_TYPE, error: error as Error });
      }
    })();
  };
}

export default ObservableAsyncAction;
