type AnyRecord = Record<string, any>;
type Direction = 'asc' | 'desc';
type KeyOrExtractor<T extends AnyRecord> = ((thing: T) => T[keyof T]) | keyof T;
type KeyDirectionTuple<T extends AnyRecord> = [KeyOrExtractor<T>, Direction];

const enum Comparison {
  lower = -1,
  greater = 1,
  equal = 0,
}

function isLower(left: any, right: any): boolean {
  return left < right;
}

function isGreater(left: any, right: any): boolean {
  return left > right;
}

function compareAsc(left: any, right: any): Comparison {
  // prettier-ignore
  return isLower(left, right) ? Comparison.lower :
    isGreater(left, right) ? Comparison.greater :
    Comparison.equal;
}

function compareDesc(left: any, right: any): Comparison {
  // prettier-ignore
  return isLower(left, right) ? Comparison.greater :
    isGreater(left, right) ? Comparison.lower :
    Comparison.equal;
}

export function by<T extends AnyRecord>(
  ...keys: Readonly<(KeyDirectionTuple<T> | KeyOrExtractor<T>)[]>
): (left: Readonly<T>, right: Readonly<T>) => Comparison {
  const chain = keys.map(entry => {
    const [keyOrExtractor, direction] = Array.isArray(entry)
      ? entry
      : [entry, 'asc' as const];

    const extractor =
      typeof keyOrExtractor === 'function'
        ? keyOrExtractor
        : (thing: T) => thing[keyOrExtractor as keyof T];

    return [extractor, direction === 'asc' ? compareAsc : compareDesc] as const;
  });

  return (left: Readonly<T>, right: Readonly<T>) => {
    for (let i = 0, l = chain.length; i < l; i++) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const [extractor, cmp] = chain[i]!;
      const result = cmp(extractor(left), extractor(right));

      if (result !== Comparison.equal) {
        return result;
      }
    }

    return Comparison.equal;
  };
}
