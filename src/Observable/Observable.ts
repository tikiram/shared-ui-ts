import Observer from "./Observer.ts";
import Subscription from "./Subscription.ts";

interface Observable<T> {
  getLastNotifiedValue(observerToken?: symbol): T;

  subscribe(observer: Observer<T>, observerToken?: symbol): Subscription;
}

export default Observable;
