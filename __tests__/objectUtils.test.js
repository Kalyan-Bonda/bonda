const {
  deepClone,
  deepEqual,
  pick,
  omit,
  deepMerge,
  flattenObject,
} = require('../src/objectUtils');

describe('deepClone', () => {
  it('clones a flat object', () => {
    const obj = { a: 1, b: 'hello', c: true };
    const clone = deepClone(obj);
    expect(clone).toEqual(obj);
    expect(clone).not.toBe(obj);
  });

  it('clones a nested object', () => {
    const obj = { a: { b: { c: 42 } } };
    const clone = deepClone(obj);
    expect(clone).toEqual(obj);
    expect(clone.a).not.toBe(obj.a);
    expect(clone.a.b).not.toBe(obj.a.b);
  });

  it('clones an array', () => {
    const arr = [1, [2, 3], [4, [5]]];
    const clone = deepClone(arr);
    expect(clone).toEqual(arr);
    expect(clone).not.toBe(arr);
    expect(clone[1]).not.toBe(arr[1]);
  });

  it('returns primitives as-is', () => {
    expect(deepClone(42)).toBe(42);
    expect(deepClone('hello')).toBe('hello');
    expect(deepClone(null)).toBeNull();
    expect(deepClone(true)).toBe(true);
  });

  it('modifications to the clone do not affect the original', () => {
    const obj = { a: { b: 1 } };
    const clone = deepClone(obj);
    clone.a.b = 99;
    expect(obj.a.b).toBe(1);
  });
});

describe('deepEqual', () => {
  it('returns true for identical primitives', () => {
    expect(deepEqual(1, 1)).toBe(true);
    expect(deepEqual('hello', 'hello')).toBe(true);
    expect(deepEqual(null, null)).toBe(true);
  });

  it('returns false for different primitives', () => {
    expect(deepEqual(1, 2)).toBe(false);
    expect(deepEqual('a', 'b')).toBe(false);
  });

  it('returns true for equal flat objects', () => {
    expect(deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
  });

  it('returns false for objects with different values', () => {
    expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
  });

  it('returns false for objects with different keys', () => {
    expect(deepEqual({ a: 1 }, { b: 1 })).toBe(false);
  });

  it('returns true for equal nested objects', () => {
    expect(deepEqual({ a: { b: { c: 3 } } }, { a: { b: { c: 3 } } })).toBe(true);
  });

  it('returns false for nested objects with different values', () => {
    expect(deepEqual({ a: { b: 1 } }, { a: { b: 2 } })).toBe(false);
  });

  it('returns true for equal arrays', () => {
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
  });

  it('returns false for arrays with different elements', () => {
    expect(deepEqual([1, 2], [1, 3])).toBe(false);
  });

  it('returns false when comparing an array to an object', () => {
    expect(deepEqual([], {})).toBe(false);
  });

  it('returns false when one value is null and the other is not', () => {
    expect(deepEqual(null, { a: 1 })).toBe(false);
    expect(deepEqual({ a: 1 }, null)).toBe(false);
  });

  it('returns false for different types', () => {
    expect(deepEqual(1, '1')).toBe(false);
  });

  it('returns false when the second object has more keys', () => {
    expect(deepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
  });
});

describe('pick', () => {
  it('returns a new object with only the specified keys', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 });
  });

  it('ignores keys that do not exist on the object', () => {
    const obj = { a: 1, b: 2 };
    expect(pick(obj, ['a', 'z'])).toEqual({ a: 1 });
  });

  it('returns an empty object when keys is empty', () => {
    expect(pick({ a: 1 }, [])).toEqual({});
  });

  it('does not mutate the original object', () => {
    const obj = { a: 1, b: 2 };
    pick(obj, ['a']);
    expect(obj).toEqual({ a: 1, b: 2 });
  });

  it('throws TypeError when obj is not a plain object', () => {
    expect(() => pick(null, ['a'])).toThrow(TypeError);
    expect(() => pick([1, 2], ['0'])).toThrow(TypeError);
  });

  it('throws TypeError when keys is not an array', () => {
    expect(() => pick({ a: 1 }, 'a')).toThrow(TypeError);
  });
});

describe('omit', () => {
  it('returns a new object without the specified keys', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(omit(obj, ['b'])).toEqual({ a: 1, c: 3 });
  });

  it('returns the object unchanged when keys are not present', () => {
    const obj = { a: 1, b: 2 };
    expect(omit(obj, ['z'])).toEqual({ a: 1, b: 2 });
  });

  it('returns an empty object when all keys are omitted', () => {
    expect(omit({ a: 1, b: 2 }, ['a', 'b'])).toEqual({});
  });

  it('does not mutate the original object', () => {
    const obj = { a: 1, b: 2 };
    omit(obj, ['a']);
    expect(obj).toEqual({ a: 1, b: 2 });
  });

  it('throws TypeError when obj is not a plain object', () => {
    expect(() => omit(null, ['a'])).toThrow(TypeError);
    expect(() => omit([1, 2], ['0'])).toThrow(TypeError);
  });

  it('throws TypeError when keys is not an array', () => {
    expect(() => omit({ a: 1 }, 'a')).toThrow(TypeError);
  });
});

describe('deepMerge', () => {
  it('merges two flat objects, source taking precedence', () => {
    expect(deepMerge({ a: 1, b: 2 }, { b: 3, c: 4 })).toEqual({ a: 1, b: 3, c: 4 });
  });

  it('recursively merges nested objects', () => {
    const target = { a: { x: 1, y: 2 }, b: 3 };
    const source = { a: { y: 99, z: 100 }, b: 4 };
    expect(deepMerge(target, source)).toEqual({ a: { x: 1, y: 99, z: 100 }, b: 4 });
  });

  it('does not mutate the target object', () => {
    const target = { a: 1 };
    deepMerge(target, { b: 2 });
    expect(target).toEqual({ a: 1 });
  });

  it('source array values overwrite target array values without deep merge', () => {
    const target = { a: [1, 2] };
    const source = { a: [3, 4, 5] };
    expect(deepMerge(target, source)).toEqual({ a: [3, 4, 5] });
  });

  it('returns a copy of target when source is empty', () => {
    expect(deepMerge({ a: 1 }, {})).toEqual({ a: 1 });
  });

  it('throws TypeError when target is not a plain object', () => {
    expect(() => deepMerge(null, {})).toThrow(TypeError);
    expect(() => deepMerge([1, 2], {})).toThrow(TypeError);
  });

  it('throws TypeError when source is not a plain object', () => {
    expect(() => deepMerge({}, null)).toThrow(TypeError);
    expect(() => deepMerge({}, [1, 2])).toThrow(TypeError);
  });
});

describe('flattenObject', () => {
  it('flattens a nested object using dot notation', () => {
    const obj = { a: { b: { c: 1 } }, d: 2 };
    expect(flattenObject(obj)).toEqual({ 'a.b.c': 1, d: 2 });
  });

  it('returns a flat object unchanged', () => {
    const obj = { a: 1, b: 2 };
    expect(flattenObject(obj)).toEqual({ a: 1, b: 2 });
  });

  it('returns an empty object for empty input', () => {
    expect(flattenObject({})).toEqual({});
  });

  it('handles arrays as leaf values without further flattening', () => {
    const obj = { a: { b: [1, 2, 3] } };
    expect(flattenObject(obj)).toEqual({ 'a.b': [1, 2, 3] });
  });

  it('handles null values as leaf values', () => {
    const obj = { a: { b: null } };
    expect(flattenObject(obj)).toEqual({ 'a.b': null });
  });

  it('throws TypeError for non-plain-object input', () => {
    expect(() => flattenObject(null)).toThrow(TypeError);
    expect(() => flattenObject([1, 2])).toThrow(TypeError);
  });
});
