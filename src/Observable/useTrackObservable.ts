import Observable from "./Observable.ts";
import { useEffect, useState } from "react";

export const useTrackObservable = <T>(
  observable: Observable<T>,
  nextToken?: symbol,
  debug?: { name: string; containerName: string },
) => {
  const [, setState] = useState(observable.getLastNotifiedValue());

  useEffect(() => {
    const subscription = observable.subscribe(
      {
        next: (value) => {
          if (debug) {
            console.log(debug.containerName, debug.name, value);
          }
          setState(value);
        },
      },
      nextToken,
    );
    return () => subscription.unsubscribe();
  }, [nextToken, observable]);
};

export default useTrackObservable;
