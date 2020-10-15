# @pabra/sortby

[![npm version](https://badge.fury.io/js/%40pabra%2Fsortby.svg)](https://www.npmjs.com/package/%40pabra%2Fsortby)
[![unit-tests](https://github.com/pabra/sortby/workflows/unit-tests/badge.svg?branch=master)](https://github.com/pabra/sortby/actions?query=branch%3Amaster+workflow%3Aunit-tests)
[![npm-publish](https://github.com/pabra/sortby/workflows/npm-publish/badge.svg)](https://github.com/pabra/sortby/actions?query=workflow%3Anpm-publish)
[![codecov](https://codecov.io/gh/pabra/sortby/branch/master/graph/badge.svg)](https://codecov.io/gh/pabra/sortby)

[![play with `sortby`](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/mystifying-brahmagupta-wv1o1?expanddevtools=1&hidenavigation=1&moduleview=0&file=/src/index.ts)

## What

If you want to sort an array of objects by multiple keys, you pass the object's
key names in the order you want to sort them to `sortby` and get back a function
that you can pass to `Array.prototype.sort`.

Goals are:

- work with [`Array.prototype.sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- be typesafe
- be lightweight/small
- be usable in browser and node.js
- do not have dependencies

## Why

There are already [`many`](https://github.com/snovakovic/fast-sort)
[`tools`](https://github.com/bameyrick/sort-by-typescript)
[`like`](https://github.com/stevemao/compare-func)
[`this`](https://github.com/cosimochellini/sort-es) but I was unable to find any
that is typesafe and `Array.prototype.sort` compatible.

## Install

```console
npm install --save @pabra/sortby
# or
yarn add @pabra/sortby
```

## Getting Started

Let's assume we have a list of users.

```typescript
const users = [
  { name: 'Bob', age: 23 },
  { name: 'Alice', age: 23 },
  { name: 'Chloe', age: 42 },
  { name: 'Bob', age: 21 },
];
```

Now we want to sort this array first by `name` and then by `age`.

```typescript
users.sort((left, right) =>
  left.name < right.name ? -1
    : left.name > right.name ? 1
    : left.age < right.age ? -1
    : left.age > right.age ? 1
    : 0,
);
```

Just for 2 keys this is already alot of typing and easy to produce/overlook
typos - especially if you have mixed ascending and descending order direction.
How about this for the same result?

```typescript
import { by } from '@pabra/sortby';

users.sort(by('name', 'age'));
```

## Usage

In the following examples we assume following `User` object.

```typescript
type User = {
  name: string;
  age: number;
};
```

### Importing

Import `sortby`

```typescript
import { by } from '@pabra/sortby';
```

### Sort by key names ascending

For each key of your object that you want to sort by, you need to pass an
argument to `by` function. If you want to sort your array of `User`s (`User[]`)
ascending by the key "name" and then by "age", you have to pass those key names
as 2 arguments to `by`.

```typescript
by('name', 'age')
```

That will return a function that you can pass to `Array.prototype.sort` with a
signature like this:

```typescript
(left: User, right: User) => number
```

### Sort descending

To sort descending for a key, you need to pass a tuple of key name and sort
direction. Sort directions are abbreviated with `asc` for "ascending" and `desc`
for "descending". To sort first descending by "name" and then descending by
"age", you write:

```typescript
by(['name', 'desc'], ['age', 'desc'])
```

Writing

```typescript
by('name', 'age')
```

is just a shorthand for

```typescript
by(['name', 'asc'], ['age', 'asc'])
```

### Prepare a `sortby` function

If you need to sort `User` lists at multiple places the same way, you can
prepare a `sortby` function to be reusable.

```typescript
const userSort = by('name', 'age');
```

Then you can just use it where needed.

```typescript
const finalUsers = users
  .filter(user => user.age > 23)
  .sort(userSort);
```

`sortby` works with [generic
types](https://www.typescriptlang.org/docs/handbook/generics.html). `userSort`
from above will have the following (simplified) type signature:

```typescript
const userSort: (
  left: { name: any } & { age: any },
  right: { name: any } & { age: any },
) => number
```

This means, `userSort` will work on any object with keys "name" and "age". When
you change the shape of your `User` type (eg. "name" => "firstName"), typescript
will mark places where you pass `userSort` to sort functions instead of the
place where you defined `userSort`.

To show typescript that this filter function is supposed to work on `User`
objects, you can define it like this:

```typescript
const userSort = by<User>('name', 'age');
```

The resulting (simplified) type signature looks like:

```typescript
const userSort: (
  left: User,
  right: User,
) => number
```

### Extractors

If you want to sort by nested objects or need to convert/manipulate a value
before comparing, you can pass an extractor function instead of the key name.
Let's assume you want to convert all user names to lower case before comping:

```typescript
by(user => user.name.toLowerCase(), 'age')
```

For descending order, wrap it in a tuple as above:

```typescript
by([user => user.name.toLowerCase(), 'desc'], 'age')
```

## Tests

Run tests.

```console
npm run test
```

See them succeed.

```
 PASS  __tests__/index.ts
  sort by name first
    ✓ sort by name asc (3 ms)
    ✓ sort by name asc, age asc (1 ms)
    ✓ sort by name asc, age desc
    ✓ sort by name desc, age asc (1 ms)
    ✓ sort by name desc, age desc
  sort explicitly asc
    ✓ sort by name explicitly asc (1 ms)
    ✓ sort by name asc, age asc
    ✓ sort by name asc, age desc (1 ms)
  sort by age first
    ✓ sort by age asc
    ✓ sort by age asc, name asc
    ✓ sort by age asc, name desc (1 ms)
    ✓ sort by age desc, name asc
    ✓ sort by age desc, name desc
  extractor
    ✓ sort by last reversed name asc, age asc (1 ms)
    ✓ sort by last reversed name desc, age asc

Test Suites: 1 passed, 1 total
Tests:       15 passed, 15 total
Snapshots:   0 total
Time:        2.371 s
Ran all test suites.
```
