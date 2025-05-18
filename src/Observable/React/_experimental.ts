/*

import { useDirectObservable } from "./useObservable";
import Observable from "./Observable";
import Store from "./Store";

const a = {
  x: new Store<number>(1),
  z: {
    a: new Store<string>(""),
  },
  w: "asdf",
};

type DynamicOptional<T> = {
  [K in keyof T]: T[K] extends Observable<infer V>
    ? { use: () => V }
    : DynamicOptional<T[K]>;
};

function instanceOfObservable(object: never): boolean {
  return "subscribe" in object;
}

function convert<T>(store: T): DynamicOptional<T> {
  const entries = Object.entries(store).map(([key, value]) => {
    const newValue = instanceOfObservable(value)
      ? {
          use: () => {
            return useDirectObservable(value);
          },
        }
      : convert(value);

    return [key, newValue];
  });

  return Object.fromEntries(entries);
}


 */