interface Observer<T> {
  next(value: T): void;
}

export default Observer;
