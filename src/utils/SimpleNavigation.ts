import ObservableImpl from "../Observable/ObservableImpl.ts";

class SimpleNavigation extends ObservableImpl<string> {
  constructor() {
    super(window.location.pathname);

    window.addEventListener("popstate", () => {
      this.notify(window.location.pathname);
    });
  }

  push = (path: string) => {
    history.pushState({}, "", path);
    this.notify(path);
  };
}

export default SimpleNavigation;
