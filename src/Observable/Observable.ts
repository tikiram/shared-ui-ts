import Observer from "./Observer";
import Subscription from "./Subscription";

interface Observable<T> {
  getLastNotifiedValue(observerToken?: symbol): T;

  subscribe(observer: Observer<T>, observerToken?: symbol): Subscription;
}

export default Observable;
