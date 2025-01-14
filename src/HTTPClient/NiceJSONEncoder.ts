import JSONEncoder from "./JSONEncoder";

function decapitalize(text: string): string {
  return text.charAt(0).toLowerCase() + text.substring(1);
}

function lowerCamelCaseToSnakeCase(text: string): string {
  const [firstSegment, ...otherSegments] = text.split(/(?=[A-Z])/g);
  return [firstSegment, ...otherSegments.map(decapitalize)].join("_");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function keysToSnakeCase(_key: string, value: any) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const entries = Object.entries(value).map(([key, value]) => {
      return [lowerCamelCaseToSnakeCase(key), value];
    });

    return Object.fromEntries(entries);
  }
  return value;
}

class NiceJSONEncoder implements JSONEncoder {
  constructor(private readonly keysToSnakeCase: boolean) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stringify(payload: any): string {
    return JSON.stringify(
      payload,
      this.keysToSnakeCase ? keysToSnakeCase : undefined,
    );
  }
}

export default NiceJSONEncoder;
