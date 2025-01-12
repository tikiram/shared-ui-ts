import ObservableImpl from "./ObservableImpl.ts";
import ActionStatus from "./actionStatus.ts";

class ObservableAsyncAction<A extends never[], T> extends ObservableImpl<
  ActionStatus<T>
> {
  constructor(
    private readonly action: (...args: A) => Promise<T>,
    private readonly toFirstSuccess: boolean = false,
  ) {
    super({ type: "idle" });
  }

  public get isLoading(): boolean {
    return this.getLastNotifiedValue().type === "loading";
  }

  public get error(): Error | undefined {
    return this.getLastNotifiedValue().error;
  }

  exec = (...args: A) => {
    if (this.isLoading) {
      return;
    }

    if (this.toFirstSuccess && this.getLastNotifiedValue().type === "success") {
      return;
    }

    (async () => {
      this.notify({ type: "loading" });
      try {
        const result = await this.action(...args);
        this.notify({ type: "success", result: result });
      } catch (error) {
        this.notify({ type: "error", error: error as Error });
      }
    })();
  };
}

function observableAsyncAction<A extends never[], T>(
  action: (...args: A) => Promise<T>,
  toFirstSuccess: boolean = false,
) {
  return new ObservableAsyncAction<A, T>(action, toFirstSuccess);
}

export default observableAsyncAction;
