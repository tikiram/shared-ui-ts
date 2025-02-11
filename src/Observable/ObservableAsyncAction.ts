import ObservableImpl from "./ObservableImpl";
import ActionStatus from "./ActionStatus";
import ObservableAsyncActionMode from "./ObservableAsyncActionMode";

const IDLE_TYPE = "idle";
const LOADING_TYPE = "loading";
const ERROR_TYPE = "error";
const SUCCESS_TYPE = "success";

export class ObservableAsyncAction<A extends never[], T> extends ObservableImpl<
  ActionStatus<T>
> {
  #lastExecutionTime: number = 0;
  #lastExecutionArgs?: A;
  #lastExecutionKey?: string;

  constructor(
    private readonly action: (...args: A) => Promise<T>,
    private readonly onlyToFirstSuccess: boolean = false,
    private readonly mode: ObservableAsyncActionMode = "ONE_AT_A_TIME",
    private readonly keyFn?: () => string,
    private readonly justLastCallSkipWhenInProgressFn?: (
      previousArgs: A,
      currentArgs: A,
    ) => boolean,
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

  isError = (viewToken?: symbol): boolean => {
    return this.getLastNotifiedValue(viewToken).type === ERROR_TYPE;
  };

  result = (viewToken?: symbol): T | undefined => {
    return this.getLastNotifiedValue(viewToken).result;
  };

  error = (viewToken?: symbol): Error | undefined => {
    return this.getLastNotifiedValue(viewToken).error;
  };

  exec = (...args: A) => {
    if (
      this.onlyToFirstSuccess &&
      this.getLastNotifiedValue().type === "success"
    ) {
      return;
    }

    switch (this.mode) {
      case "ONE_AT_A_TIME":
        this.#oneAtATime(...args);
        break;
      case "JUST_LAST_CALL":
        this.#lastOne(...args);
        break;
      default:
        throw new Error("Unknown mode");
    }
  };

  #oneAtATime = (...args: A) => {
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

  #lastOne = (...args: A) => {
    if (this.#shouldSkipInvocation(...args)) {
      return;
    }

    const currentExecutionTime = Date.now();
    this.#lastExecutionTime = currentExecutionTime;
    this.#lastExecutionArgs = args;
    this.#lastExecutionKey = this.keyFn?.();

    (async () => {
      if (!this.isLoading()) {
        this.notify({ type: LOADING_TYPE });
      }
      try {
        const result = await this.action(...args);

        if (this.#lastExecutionTime !== currentExecutionTime) {
          return;
        }
        this.notify({ type: SUCCESS_TYPE, result: result });
      } catch (error) {
        this.notify({ type: ERROR_TYPE, error: error as Error });
      }
    })();
  };

  #shouldSkipInvocation = (...args: A) => {
    if (
      this.isLoading() &&
      this.keyFn &&
      this.#lastExecutionKey === this.keyFn()
    ) {
      return true;
    }

    if (
      this.justLastCallSkipWhenInProgressFn &&
      this.#lastExecutionArgs &&
      this.isLoading()
    ) {
      return this.justLastCallSkipWhenInProgressFn(
        this.#lastExecutionArgs,
        args,
      );
    }
  };
}

export default ObservableAsyncAction;
