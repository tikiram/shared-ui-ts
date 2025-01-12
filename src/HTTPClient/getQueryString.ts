export type HTTPQuery = Record<string, string | number | boolean | null | undefined>;

function getQueryString(query?: HTTPQuery): string {
  const serializedEntries =
    query &&
    Object.entries(query)
      .filter(([, v]) => v !== null && v !== undefined)
      .map(([k, v]) => [k, String(v)]);
  const serializedQuery: Record<string, string> | undefined =
    serializedEntries && Object.fromEntries(serializedEntries);
  const queryString = serializedQuery
    ? "?" + new URLSearchParams(serializedQuery).toString()
    : "";
  return queryString;
}

export default getQueryString;
