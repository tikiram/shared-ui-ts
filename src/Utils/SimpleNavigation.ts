import ObservableImpl from "../Observable/ObservableImpl";

export function matchTemplate(template: string, value: string) {
  const regexString = template.replace(/:\w+/g, "([\\w-]+)");
  const regex = new RegExp(`^${regexString}$`);
  return value.match(regex);
}

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

  isUrl = (template: string): boolean => {
    const matchResult = matchTemplate(template, this.getLastNotifiedValue());
    return matchResult !== null;
  };
}

export default SimpleNavigation;
