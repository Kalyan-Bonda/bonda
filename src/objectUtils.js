/**
 * Performs a deep clone of an object or array.
 * @param {*} value
 * @returns {*}
 */
function deepClone(value) {
  if (value === null || typeof value !== 'object') return value;
  if (Array.isArray(value)) return value.map(deepClone);
  return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, deepClone(v)]));
}

/**
 * Performs a deep equality check between two values.
 * @param {*} a
 * @param {*} b
 * @returns {boolean}
 */
function deepEqual(a, b) {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (typeof a !== typeof b) return false;
  if (typeof a !== 'object') return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every(key => deepEqual(a[key], b[key]));
}

/**
 * Picks a subset of keys from an object.
 * @param {Object} obj
 * @param {string[]} keys
 * @returns {Object}
 */
function pick(obj, keys) {
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) throw new TypeError('obj must be a plain object');
  if (!Array.isArray(keys)) throw new TypeError('keys must be an array');
  return keys.reduce((acc, key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) acc[key] = obj[key];
    return acc;
  }, {});
}

/**
 * Omits a set of keys from an object.
 * @param {Object} obj
 * @param {string[]} keys
 * @returns {Object}
 */
function omit(obj, keys) {
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) throw new TypeError('obj must be a plain object');
  if (!Array.isArray(keys)) throw new TypeError('keys must be an array');
  const omitSet = new Set(keys);
  return Object.fromEntries(Object.entries(obj).filter(([k]) => !omitSet.has(k)));
}

/**
 * Merges two objects deeply, with the second object's values taking precedence.
 * @param {Object} target
 * @param {Object} source
 * @returns {Object}
 */
function deepMerge(target, source) {
  if (target === null || typeof target !== 'object' || Array.isArray(target)) throw new TypeError('target must be a plain object');
  if (source === null || typeof source !== 'object' || Array.isArray(source)) throw new TypeError('source must be a plain object');
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] !== null &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      result[key] !== null &&
      typeof result[key] === 'object' &&
      !Array.isArray(result[key])
    ) {
      result[key] = deepMerge(result[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

/**
 * Flattens a nested object into a single-level object with dot-notation keys.
 * @param {Object} obj
 * @param {string} [prefix='']
 * @returns {Object}
 */
function flattenObject(obj, prefix = '') {
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) throw new TypeError('obj must be a plain object');
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(acc, flattenObject(value, newKey));
    } else {
      acc[newKey] = value;
    }
    return acc;
  }, {});
}

module.exports = { deepClone, deepEqual, pick, omit, deepMerge, flattenObject };
