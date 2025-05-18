import ObservableImpl from "../Core/ObservableImpl";
import ActionStatus, {
  ERROR_TYPE,
  IDLE_TYPE,
  LOADING_TYPE,
  SUCCESS_TYPE,
} from "./ActionStatus";

export class ObservableSingleAsyncAction<
  A extends never[],
  T,
> extends ObservableImpl<ActionStatus<T>> {
  constructor(private readonly action: (...args: A) => Promise<T>) {
    super({ type: IDLE_TYPE });
  }

  //------------------------------------------
  isIdle = (): boolean => {
    return this.getLastNotifiedValue().type === IDLE_TYPE;
  };

  isLoading = (): boolean => {
    return this.getLastNotifiedValue().type === LOADING_TYPE;
  };

  isSuccess = (): boolean => {
    return this.getLastNotifiedValue().type === SUCCESS_TYPE;
  };

  isError = (): boolean => {
    return this.getLastNotifiedValue().type === ERROR_TYPE;
  };

  //------------------------------------------
  result = (): T | undefined => {
    return this.getLastNotifiedValue().result;
  };

  error = (): Error | undefined => {
    return this.getLastNotifiedValue().error;
  };

  //------------------------------------------

  exec = (...args: A) => {
    if (this.isLoading()) {
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

export default ObservableSingleAsyncAction;
