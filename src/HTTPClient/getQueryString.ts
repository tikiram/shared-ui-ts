export type HTTPQuery = Record<
  string,
  string | number | boolean | null | undefined
>;

function getQueryString(query?: HTTPQuery): string {
  if (query === undefined) {
    return "";
  }

  const serializedEntries = Object.entries(query)
    .filter(([, v]) => !(v === null || v === undefined))
    .map(([k, v]) => [k, String(v)]);

  const serializedQuery: Record<string, string> =
    Object.fromEntries(serializedEntries);

  return "?" + new URLSearchParams(serializedQuery).toString();
}

export default getQueryString;
