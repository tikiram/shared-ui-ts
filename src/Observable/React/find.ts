function find<T>(
  container: unknown,
  c: new (...args: never) => T,
): T | undefined {
  if (container instanceof c) {
    return container;
  }

  if (Array.isArray(container)) {
    for (const v of container) {
      const result = find(v, c);
      if (result) {
        return result;
      }
    }
  }

  if (typeof container === "object") {
    for (const key in container) {
      if (Object.prototype.hasOwnProperty.call(container, key)) {
        const result = find((container as Record<string, unknown>)[key], c);
        if (result) {
          return result;
        }
      }
    }
  }

  return undefined;
}

export default find;
