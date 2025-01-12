import observableAction from "./observableAction.ts";

export function observeTyping() {
  return observableAction("", (value: string) => value);
}
