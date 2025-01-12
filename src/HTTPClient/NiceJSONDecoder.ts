import JSONDecoder from "./JSONDecoder.ts";

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.substring(1);
}

function snakeToLowerCamelCase(text: string): string {
  const [firstSegment, ...otherSegments] = text.split("_");
  const camelSegments = otherSegments.map(capitalize);
  return [firstSegment, ...camelSegments].join("");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function keysToLowerCamelCase(_key: string, value: any) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const entries = Object.entries(value).map(([key, value]) => {
      return [snakeToLowerCamelCase(key), value];
    });

    return Object.fromEntries(entries);
  }
  return value;
}

class NiceJSONDecoder implements JSONDecoder {
  constructor(private readonly keysToCamelCase: boolean) {}

  parse(text: string) {
    return JSON.parse(
      text,
      this.keysToCamelCase ? keysToLowerCamelCase : undefined,
    );
  }
}

export default NiceJSONDecoder;
