import { useContext, useRef } from "react";
import useTrackObservable from "./useTrackObservable";
import ObservableStoreContext from "./ObservableStoreContext";
import find from "./find";
import Observable from "../Core/Observable";

export function useSmartViewModel<T extends object>(
  c: new (...args: never) => T,
  viewToken?: never
): [T, symbol] {
  const viewModel = useStoreFirstObjectOfType<T>(c);
  // TODO: refactor viewToken
  const internalViewToken = useRef(Symbol());
  useTrackObservablesInObject(viewModel, c.name);
  return [viewModel, viewToken || internalViewToken.current];
}

export function useStoreViewModel<T extends object>(
  c: new (...args: never) => T
): T {
  const viewModel = useStoreFirstObjectOfType<T>(c);

  // We can create another hook useUntrackedViewModel so we can fully control
  // the where the observable is tracked with `useTrackObservable`
  useTrackObservablesInObject(viewModel, c.name);

  return viewModel;
}

export function useStoreObservableOfType<T extends Observable<unknown>>(
  c: new (...args: never) => T
): T {
  const observable = useStoreFirstObjectOfType<T>(c);
  useTrackObservable(observable);
  return observable;
}

// TODO: projection would not be necessary with the smartSubscription strategy
export function useStoreViewModelProjection<T extends object, B extends object>(
  c: new (...args: never) => T,
  projectionFn: (viewModel: T) => B
): B {
  const viewModel = useStoreFirstObjectOfType<T>(c);
  const projection = projectionFn(viewModel);
  useTrackObservablesInObject(projection);
  return projection;
}

export function useStoreFirstObjectOfType<T extends object>(
  c: new (...args: never) => T
): T {
  const observableStore = useContext(ObservableStoreContext);

  if (observableStore === null) {
    throw new Error("ObservableStore not defined");
  }

  const viewModel = find(observableStore, c);

  if (viewModel === undefined) {
    throw new Error(`object of type ${c.name} not found in store`);
  }
  return viewModel;
}

function useTrackObservablesInObject(
  value: object,
  debugContainerName?: string
): void {
  Object.entries(value)
    .filter(([, value]) => {
      return instanceOfObservable(value as never);
    })
    .forEach(([key, value]) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useTrackObservable(value, {
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
