
import { useEffect, useState } from "react";
import Observable from "../Core/Observable";

function useObservable<T>(
  observable: Observable<T>,
  debug?: { name: string, containerName: string },
): T {
  const [state, setState] = useState(observable.getLastNotifiedValue());

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

  return state;
}

export default useObservable;
