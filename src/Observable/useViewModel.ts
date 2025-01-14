import { useContext, useRef } from "react";
import Observable from "./Observable";
import useTrackObservable from "./useTrackObservable";
import ObservableStoreContext from "./ObservableStoreContext";
import find from "./find";

export function useSmartViewModel<T extends object>(
  c: new (...args: never) => T,
): [T, symbol] {
  const viewModel = useFindViewModel<T>(c);
  const viewToken = useRef(Symbol());
  useTrackObservablesInObject(viewModel, viewToken.current, c.name);
  return [viewModel, viewToken.current];
}

export function useViewModel<T extends object>(
  c: new (...args: never) => T,
): T {
  const viewModel = useFindViewModel<T>(c);

  // We can create another hook useUntrackedViewModel so we can fully control
  // the where the observable is tracked with `useTrackObservable`
  useTrackObservablesInObject(viewModel, undefined, c.name);

  return viewModel;
}

export function useObservableOfType<T extends Observable<unknown>>(c: new (...args: never) => T): T {
  const observable = useFindViewModel<T>(c);
  useTrackObservable(observable)
  return observable;
}

// TODO: projection would not be necessary with the smartSubscription strategy
export function useViewModelProjection<T extends object, B extends object>(
  c: new (...args: never) => T,
  projectionFn: (viewModel: T) => B,
): B {
  const viewModel = useFindViewModel<T>(c);
  const projection = projectionFn(viewModel);
  useTrackObservablesInObject(projection);
  return projection;
}

function useFindViewModel<T extends object>(c: new (...args: never) => T): T {
  const observableStore = useContext(ObservableStoreContext);

  if (observableStore === null) {
    throw new Error("ObservableStore not defined");
  }

  const viewModel = find(observableStore, c);

  if (viewModel === undefined) {
    throw new Error("viewModel not found");
  }
  return viewModel;
}

function useTrackObservablesInObject(
  value: object,
  nextToken?: symbol,
  debugContainerName?: string,
): void {
  Object.entries(value)
    .filter(([, value]) => {
      return instanceOfObservable(value as never);
    })
    .forEach(([key, value]) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useTrackObservable(value, nextToken, {
        name: key,
        containerName: debugContainerName ?? "",
      });
    });
}

function safeIn(prop: string, obj: unknown): boolean {
  return obj !== null && typeof obj === "object" && prop in obj;
}

function instanceOfObservable(object: unknown): object is Observable<never> {
  return safeIn("subscribe", object);
}
