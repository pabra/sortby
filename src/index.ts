type AnyRecord = Record<string, any>;

export function sortby<T extends AnyRecord>(
  ...keys: (keyof T)[]
): (a: T, b: T) => -1 | 0 | 1 {
  return (a: T, b: T) => {
    for (const k of keys) {
      if (a[k] < b[k]) return -1;
      if (a[k] > b[k]) return 1;
    }
    return 0;
  };
}
