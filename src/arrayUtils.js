/**
 * Returns the unique elements of an array (preserves order of first occurrence).
 * @param {Array} arr
 * @returns {Array}
 */
function unique(arr) {
  if (!Array.isArray(arr)) throw new TypeError('Input must be an array');
  return [...new Set(arr)];
}

/**
 * Flattens a nested array to the specified depth.
 * @param {Array} arr
 * @param {number} [depth=1]
 * @returns {Array}
 */
function flatten(arr, depth = 1) {
  if (!Array.isArray(arr)) throw new TypeError('Input must be an array');
  return arr.flat(depth);
}

/**
 * Groups an array of objects by a given key.
 * @param {Array<Object>} arr
 * @param {string} key
 * @returns {Object}
 */
function groupBy(arr, key) {
  if (!Array.isArray(arr)) throw new TypeError('Input must be an array');
  if (typeof key !== 'string') throw new TypeError('Key must be a string');
  return arr.reduce((acc, item) => {
    const group = item[key];
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});
}

/**
 * Chunks an array into smaller arrays of the given size.
 * @param {Array} arr
 * @param {number} size
 * @returns {Array[]}
 */
function chunk(arr, size) {
  if (!Array.isArray(arr)) throw new TypeError('Input must be an array');
  if (typeof size !== 'number' || size <= 0) throw new RangeError('size must be a positive number');
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * Returns the difference between two arrays (elements in arr1 not in arr2).
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {Array}
 */
function difference(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) throw new TypeError('Both inputs must be arrays');
  const set2 = new Set(arr2);
  return arr1.filter(item => !set2.has(item));
}

/**
 * Returns the intersection of two arrays.
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {Array}
 */
function intersection(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) throw new TypeError('Both inputs must be arrays');
  const set2 = new Set(arr2);
  return [...new Set(arr1.filter(item => set2.has(item)))];
}

/**
 * Sorts an array of objects by a given key.
 * @param {Array<Object>} arr
 * @param {string} key
 * @param {'asc'|'desc'} [order='asc']
 * @returns {Array<Object>}
 */
function sortBy(arr, key, order = 'asc') {
  if (!Array.isArray(arr)) throw new TypeError('Input must be an array');
  if (typeof key !== 'string') throw new TypeError('Key must be a string');
  const sorted = [...arr].sort((a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  });
  return order === 'desc' ? sorted.reverse() : sorted;
}

module.exports = { unique, flatten, groupBy, chunk, difference, intersection, sortBy };
