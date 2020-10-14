import { by } from '../src';

const list = [
  {
    name: 'Bob',
    age: 23,
  },
  {
    name: 'Alice',
    age: 23,
  },
  {
    name: 'Chloe',
    age: 42,
  },
  {
    name: 'Bob',
    age: 21,
  },
];

describe('sort by name first', () => {
  test('sort by name asc', () => {
    const data = [...list];
    const expectation1 = [1, 3, 0, 2].map(i => data[i]);
    const expectation2 = [1, 0, 3, 2].map(i => data[i]);
    const result = data.sort(by('name'));
    expect([expectation1, expectation2]).toContainEqual(result);
  });

  test('sort by name asc, age asc', () => {
    const data = [...list];
    const expectation = [1, 3, 0, 2].map(i => data[i]);
    const result = data.sort(by('name', 'age'));
    expect(result).toEqual(expectation);
  });

  test('sort by name asc, age desc', () => {
    const data = [...list];
    const expectation = [1, 0, 3, 2].map(i => data[i]);
    const result = data.sort(by('name', ['age', 'desc']));
    expect(result).toEqual(expectation);
  });

  test('sort by name desc, age asc', () => {
    const data = [...list];
    const expectation = [2, 3, 0, 1].map(i => data[i]);
    const result = data.sort(by(['name', 'desc'], 'age'));
    expect(result).toEqual(expectation);
  });

  test('sort by name desc, age desc', () => {
    const data = [...list];
    const expectation = [2, 0, 3, 1].map(i => data[i]);
    const result = data.sort(by(['name', 'desc'], ['age', 'desc']));
    expect(result).toEqual(expectation);
  });
});

describe('sort explicitly asc', () => {
  test('sort by name explicitly asc', () => {
    const data = [...list];
    const expectation1 = [1, 3, 0, 2].map(i => data[i]);
    const expectation2 = [1, 0, 3, 2].map(i => data[i]);
    const result = data.sort(by(['name', 'asc']));
    expect([expectation1, expectation2]).toContainEqual(result);
  });

  test('sort by name asc, age asc', () => {
    const data = [...list];
    const expectation = [1, 3, 0, 2].map(i => data[i]);
    const result = data.sort(by(['name', 'asc'], ['age', 'asc']));
    expect(result).toEqual(expectation);
  });

  test('sort by name asc, age desc', () => {
    const data = [...list];
    const expectation = [1, 0, 3, 2].map(i => data[i]);
    const result = data.sort(by(['name', 'asc'], ['age', 'desc']));
    expect(result).toEqual(expectation);
  });
});

describe('sort by age first', () => {
  test('sort by age asc', () => {
    const data = [...list];
    const expectation1 = [3, 0, 1, 2].map(i => data[i]);
    const expectation2 = [3, 1, 0, 2].map(i => data[i]);
    const result = data.sort(by('age'));
    expect([expectation1, expectation2]).toContainEqual(result);
  });

  test('sort by age asc, name asc', () => {
    const data = [...list];
    const expectation = [3, 1, 0, 2].map(i => data[i]);
    const result = data.sort(by('age', 'name'));
    expect(result).toEqual(expectation);
  });

  test('sort by age asc, name desc', () => {
    const data = [...list];
    const expectation = [3, 0, 1, 2].map(i => data[i]);
    const result = data.sort(by('age', ['name', 'desc']));
    expect(result).toEqual(expectation);
  });

  test('sort by age desc, name asc', () => {
    const data = [...list];
    const expectation = [2, 1, 0, 3].map(i => data[i]);
    const result = data.sort(by(['age', 'desc'], 'name'));
    expect(result).toEqual(expectation);
  });

  test('sort by age desc, name desc', () => {
    const data = [...list];
    const expectation = [2, 0, 1, 3].map(i => data[i]);
    const result = data.sort(by(['age', 'desc'], ['name', 'desc']));
    expect(result).toEqual(expectation);
  });
});

describe('extractor', () => {
  test('sort by last reversed name asc, age asc', () => {
    const data = [...list];
    const expectation = [3, 0, 1, 2].map(i => data[i]);
    const result = data.sort(
      by(x => x.name.split('').reverse().join(''), 'age'),
    );
    expect(result).toEqual(expectation);
  });

  test('sort by last reversed name desc, age asc', () => {
    const data = [...list];
    const expectation = [2, 1, 3, 0].map(i => data[i]);
    const result = data.sort(
      by([x => x.name.split('').reverse().join(''), 'desc'], 'age'),
    );
    expect(result).toEqual(expectation);
  });
});
