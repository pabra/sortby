type AnyRecord = Record<string, any>;
type Comparison = typeof greater | typeof lower | typeof equal;
type Direction = 'asc' | 'desc';
type KeyOrExtractor<T extends AnyRecord> = ((thing: T) => any) | keyof T;
type KeyDirectionTuple<T extends AnyRecord> = [KeyOrExtractor<T>, Direction];

const lower = -1;
const greater = 1;
const equal = 0;

function isLower(left: any, right: any): boolean {
  return left < right;
}

function isGreater(left: any, right: any): boolean {
  return left > right;
}

function compareAsc(left: any, right: any): Comparison {
  // prettier-ignore
  return isLower(left, right) ? lower :
    isGreater(left, right) ? greater :
    equal;
}

function compareDesc(left: any, right: any): Comparison {
  // prettier-ignore
  return isLower(left, right) ? greater :
    isGreater(left, right) ? lower :
    equal;
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
        : (thing: T) => thing[keyOrExtractor];

    return [extractor, direction === 'asc' ? compareAsc : compareDesc] as const;
  });

  return (left: Readonly<T>, right: Readonly<T>) => {
    for (let i = 0, l = chain.length; i < l; i++) {
      const [extractor, cmp] = chain[i];
      const result = cmp(extractor(left), extractor(right));

      if (result !== equal) {
        return result;
      }
    }

    return equal;
  };
}
