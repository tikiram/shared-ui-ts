import { ChangeEvent } from "react";

export function sendText(action: (text: string) => void) {
  return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    action(e.target.value);
  };
}

export function handleSubmit(action: () => void) {
  return (e: React.FormEvent<never>) => {
    e.preventDefault();
    action();
  };
}
