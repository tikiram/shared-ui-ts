import { useEffect, useState } from "react";
import Observable from "../Core/Observable";

export const useTrackObservable = <T>(
  observable: Observable<T>,

  debug?: { name: string; containerName: string }
) => {
  const [, setState] = useState(observable.getLastNotifiedValue());

  useEffect(() => {
    const subscription = observable.subscribe({
      next: (value) => {
        if (debug) {
          console.log(debug.containerName, debug.name, value);
        }
        setState(value);
      },
    });
    return () => subscription.unsubscribe();
  }, [observable]);
};

export default useTrackObservable;
