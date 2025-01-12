export function getCookies(): Record<string, string> {
  const entries = document.cookie
    .split("; ")
    .map((cookieText) => cookieText.split("="))
    .map(([key, value]) => [key, decodeURI(value)]);

  return Object.fromEntries(entries);
}

export function doesCookieExists(name: string): boolean {
  const cookies = getCookies();
  return cookies[name] !== undefined;
}

export function deleteCookie(name: string, path: string, domain: string) {
  document.cookie =
    name +
    "=" +
    (path ? ";path=" + path : "") +
    (domain ? ";domain=" + domain : "") +
    ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
}
