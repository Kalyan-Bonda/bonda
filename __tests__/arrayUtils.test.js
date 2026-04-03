const {
  unique,
  flatten,
  groupBy,
  chunk,
  difference,
  intersection,
  sortBy,
} = require('../src/arrayUtils');

describe('unique', () => {
  it('removes duplicate primitives', () => {
    expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
  });

  it('preserves order of first occurrences', () => {
    expect(unique([3, 1, 2, 1, 3])).toEqual([3, 1, 2]);
  });

  it('returns an empty array for empty input', () => {
    expect(unique([])).toEqual([]);
  });

  it('handles an array with no duplicates', () => {
    expect(unique([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('handles string duplicates', () => {
    expect(unique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
  });

  it('handles mixed types', () => {
    expect(unique([1, '1', 1, '1'])).toEqual([1, '1']);
  });

  it('throws TypeError for non-array input', () => {
    expect(() => unique('hello')).toThrow(TypeError);
    expect(() => unique(null)).toThrow(TypeError);
  });
});

describe('flatten', () => {
  it('flattens one level by default', () => {
    expect(flatten([1, [2, 3], [4, [5]]])).toEqual([1, 2, 3, 4, [5]]);
  });

  it('flattens to specified depth', () => {
    expect(flatten([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]]);
  });

  it('flattens fully with Infinity depth', () => {
    expect(flatten([1, [2, [3, [4, [5]]]]], Infinity)).toEqual([1, 2, 3, 4, 5]);
  });

  it('returns an empty array for empty input', () => {
    expect(flatten([])).toEqual([]);
  });

  it('returns the same array when there is nothing to flatten', () => {
    expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('throws TypeError for non-array input', () => {
    expect(() => flatten('hello')).toThrow(TypeError);
    expect(() => flatten(null)).toThrow(TypeError);
  });
});

describe('groupBy', () => {
  it('groups objects by the specified key', () => {
    const items = [
      { type: 'fruit', name: 'apple' },
      { type: 'veggie', name: 'carrot' },
      { type: 'fruit', name: 'banana' },
    ];
    expect(groupBy(items, 'type')).toEqual({
      fruit: [{ type: 'fruit', name: 'apple' }, { type: 'fruit', name: 'banana' }],
      veggie: [{ type: 'veggie', name: 'carrot' }],
    });
  });

  it('returns an empty object for an empty array', () => {
    expect(groupBy([], 'type')).toEqual({});
  });

  it('groups numeric key values', () => {
    const items = [{ age: 20 }, { age: 30 }, { age: 20 }];
    const result = groupBy(items, 'age');
    expect(result[20]).toHaveLength(2);
    expect(result[30]).toHaveLength(1);
  });

  it('throws TypeError for non-array input', () => {
    expect(() => groupBy('hello', 'key')).toThrow(TypeError);
  });

  it('throws TypeError for non-string key', () => {
    expect(() => groupBy([{ a: 1 }], 42)).toThrow(TypeError);
  });
});

describe('chunk', () => {
  it('splits an array into chunks of the specified size', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('handles chunk size equal to array length', () => {
    expect(chunk([1, 2, 3], 3)).toEqual([[1, 2, 3]]);
  });

  it('handles chunk size of 1', () => {
    expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
  });

  it('returns an empty array for empty input', () => {
    expect(chunk([], 2)).toEqual([]);
  });

  it('throws TypeError for non-array input', () => {
    expect(() => chunk('hello', 2)).toThrow(TypeError);
  });

  it('throws RangeError for size <= 0', () => {
    expect(() => chunk([1, 2, 3], 0)).toThrow(RangeError);
    expect(() => chunk([1, 2, 3], -1)).toThrow(RangeError);
  });

  it('throws RangeError for non-numeric size', () => {
    expect(() => chunk([1, 2, 3], 'two')).toThrow(RangeError);
  });
});

describe('difference', () => {
  it('returns elements in arr1 not in arr2', () => {
    expect(difference([1, 2, 3, 4], [2, 4])).toEqual([1, 3]);
  });

  it('returns the first array when arr2 is empty', () => {
    expect(difference([1, 2, 3], [])).toEqual([1, 2, 3]);
  });

  it('returns an empty array when all elements are in arr2', () => {
    expect(difference([1, 2], [1, 2, 3])).toEqual([]);
  });

  it('returns an empty array when arr1 is empty', () => {
    expect(difference([], [1, 2])).toEqual([]);
  });

  it('works with string arrays', () => {
    expect(difference(['a', 'b', 'c'], ['b'])).toEqual(['a', 'c']);
  });

  it('throws TypeError for non-array inputs', () => {
    expect(() => difference('hello', [1])).toThrow(TypeError);
    expect(() => difference([1], 'hello')).toThrow(TypeError);
  });
});

describe('intersection', () => {
  it('returns common elements between two arrays', () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
  });

  it('returns an empty array when there is no overlap', () => {
    expect(intersection([1, 2], [3, 4])).toEqual([]);
  });

  it('returns unique common elements when arr1 has duplicates', () => {
    expect(intersection([1, 1, 2], [1, 2, 2])).toEqual([1, 2]);
  });

  it('returns an empty array when either array is empty', () => {
    expect(intersection([], [1, 2])).toEqual([]);
    expect(intersection([1, 2], [])).toEqual([]);
  });

  it('throws TypeError for non-array inputs', () => {
    expect(() => intersection('hello', [1])).toThrow(TypeError);
    expect(() => intersection([1], null)).toThrow(TypeError);
  });
});

describe('sortBy', () => {
  const people = [
    { name: 'Charlie', age: 30 },
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 35 },
  ];

  it('sorts in ascending order by default', () => {
    expect(sortBy(people, 'name').map(p => p.name)).toEqual(['Alice', 'Bob', 'Charlie']);
  });

  it('sorts in descending order when specified', () => {
    expect(sortBy(people, 'age', 'desc').map(p => p.age)).toEqual([35, 30, 25]);
  });

  it('does not mutate the original array', () => {
    const original = [...people];
    sortBy(people, 'name');
    expect(people).toEqual(original);
  });

  it('returns an empty array for empty input', () => {
    expect(sortBy([], 'name')).toEqual([]);
  });

  it('handles equal values without error', () => {
    const items = [{ v: 1 }, { v: 1 }, { v: 1 }];
    expect(sortBy(items, 'v')).toEqual(items);
  });

  it('throws TypeError for non-array input', () => {
    expect(() => sortBy('hello', 'key')).toThrow(TypeError);
  });

  it('throws TypeError for non-string key', () => {
    expect(() => sortBy([{ a: 1 }], 42)).toThrow(TypeError);
  });
});
