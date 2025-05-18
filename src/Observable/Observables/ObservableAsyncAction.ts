import ObservableImpl from "../Core/ObservableImpl";
import ActionStatus, {
  ERROR_TYPE,
  IDLE_TYPE,
  LOADING_TYPE,
  SUCCESS_TYPE,
} from "./ActionStatus";

/**
 * Processes only the last execution of the provided async action.
 * Best if used from predictable events, like user events, 
 * events like `useEffect` can be called multiple times by the React engine.
 */
export class ObservableAsyncAction<A extends never[], T> extends ObservableImpl<
  ActionStatus<T>
> {
  #lastExecutionTime: number = 0;

  constructor(private readonly action: (...args: A) => Promise<T>) {
    super({ type: IDLE_TYPE });
  }

  // -----------------------------------------------------------
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

  // -----------------------------------------------------------
  result = (): T | undefined => {
    return this.getLastNotifiedValue().result;
  };

  error = (): Error | undefined => {
    return this.getLastNotifiedValue().error;
  };

  // -----------------------------------------------------------
  exec = (...args: A) => {
    const actionExecutionTime = Date.now();

    this.#lastExecutionTime = actionExecutionTime;

    (async () => {
      if (!this.isLoading()) {
        this.notify({ type: LOADING_TYPE });
      }
      try {
        const result = await this.action(...args);

        if (this.#lastExecutionTime === actionExecutionTime) {
          this.notify({ type: SUCCESS_TYPE, result: result });
        }
      } catch (error) {
        if (this.#lastExecutionTime === actionExecutionTime) {
          this.notify({ type: ERROR_TYPE, error: error as Error });
        }
      }
    })();
  };
}

export default ObservableAsyncAction;
