interface JSONEncoder {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stringify(payload: any): string;
}

export default JSONEncoder;
