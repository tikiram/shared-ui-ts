class ReusePromise<T> {
  private promise: Promise<T> | null;

  constructor() {
    this.promise = null;
  }

  async execute(action: () => Promise<T>): Promise<T> {
    if (this.promise !== null) {
      return await this.promise;
    }

    this.promise = action();
    try {
      return await this.promise;
    } finally {
      this.promise = null;
    }
  }
}

export default ReusePromise;
