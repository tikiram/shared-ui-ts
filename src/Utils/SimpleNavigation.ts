import ObservableImpl from "../Observable/Core/ObservableImpl";

export function matchTemplate(template: string, value: string) {
  const regexString = template.replace(/:\w+/g, "([\\w-]+)");
  const regex = new RegExp(`^${regexString}$`);
  return value.match(regex);
}

export function getPathValues(
  template: string,
  value: string,
): Record<string, string> {
  const matchResult = matchTemplate(template, value);
  if (matchResult === null) {
    throw new Error(`Invalid url: ${template} - ${value}`);
  }

  const [, ...values] = matchResult;
  const names = template.match(/:\w+/g);
  if (names === null) {
    return {};
  }

  const entries = names
    .map((s) => s.substring(1))
    .map((name, index) => [name, values[index]]);
  return Object.fromEntries(entries);
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
    // TODO: probably I only need to notify the path segment
    this.notify(path);
  };

  isUrl = (template: string): boolean => {
    const matchResult = matchTemplate(template, this.getLastNotifiedValue());
    return matchResult !== null;
  };

  getPathValues = (template: string): Record<string, string> => {
    return getPathValues(template, this.getLastNotifiedValue());
  };
}

export default SimpleNavigation;
