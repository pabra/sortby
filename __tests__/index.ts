import { sortby } from '../src';

describe('sortby', () => {
  const list = [
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

  test('sorting', () => {
    expect(list.sort(sortby('age'))).toEqual([
      {
        name: 'Bob',
        age: 21,
      },
      {
        name: 'Alice',
        age: 23,
      },
      {
        name: 'Chloe',
        age: 42,
      },
    ]);
  });
});
