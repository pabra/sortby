type AnyRecord = Record<string, any>;
type Lower = typeof lower;
type Greater = typeof greater;
type Equal = typeof equal;
type Direction = 'asc' | 'desc';
type KeyDirectionTuple<T extends AnyRecord> = [keyof T, Direction];

const lower = -1;
const greater = 1;
const equal = 0;

function isLower<T extends AnyRecord>(left: T, right: T): boolean {
  return left < right;
}

function isGreater<T extends AnyRecord>(left: T, right: T): boolean {
  return left > right;
}

function compareAsc<T extends AnyRecord>(
  left: T,
  right: T,
): Lower | Greater | undefined {
  // prettier-ignore
  return isLower(left, right) ? lower :
    isGreater(left, right) ? greater :
    undefined;
}

function compareDesc<T extends AnyRecord>(
  left: T,
  right: T,
): Lower | Greater | undefined {
  // prettier-ignore
  return isLower(left, right) ? greater :
    isGreater(left, right) ? lower :
    undefined;
}

function compare<T extends AnyRecord>(
  left: T,
  right: T,
  direction: Direction,
): Lower | Greater | undefined {
  return direction === 'asc'
    ? compareAsc(left, right)
    : compareDesc(left, right);
}

export function by<T extends AnyRecord>(
  ...keys: (KeyDirectionTuple<T> | keyof T)[]
): (left: T, right: T) => Lower | Greater | Equal {
  return (left: T, right: T) => {
    for (const entry of keys) {
      const [key, direction] = Array.isArray(entry)
        ? entry
        : [entry, 'asc' as const];

      const result = compare(left[key], right[key], direction);
      if (result !== undefined) return result;
    }
    return equal;
  };
}
