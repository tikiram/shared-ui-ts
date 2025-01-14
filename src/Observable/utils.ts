import observableAction from "./observableAction";

export function observeTyping() {
  return observableAction("", (value: string) => value);
}
