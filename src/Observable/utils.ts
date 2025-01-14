import observeAction from "./observableAction";

export function observeTyping() {
  return observeAction("", (value: string) => value);
}
