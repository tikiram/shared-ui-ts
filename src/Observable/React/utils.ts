import observeAction from "../Observables/observeAction";


export function observeTyping() {
  return observeAction("", (value: string) => value);
}
