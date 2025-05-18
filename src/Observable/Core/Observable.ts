import Observer from "./Observer";
import Subscription from "./Subscription";


interface Observable<T> {
  getLastNotifiedValue(): T;

  subscribe(observer: Observer<T>): Subscription;
}

export default Observable;
