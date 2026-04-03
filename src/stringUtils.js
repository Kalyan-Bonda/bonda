/**
 * Capitalizes the first letter of a string.
 * @param {string} str
 * @returns {string}
 */
function capitalize(str) {
  if (typeof str !== 'string') throw new TypeError('Input must be a string');
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Reverses a string.
 * @param {string} str
 * @returns {string}
 */
function reverse(str) {
  if (typeof str !== 'string') throw new TypeError('Input must be a string');
  return str.split('').reverse().join('');
}

/**
 * Checks whether a string is a palindrome (case-insensitive, ignores non-alphanumeric).
 * @param {string} str
 * @returns {boolean}
 */
function isPalindrome(str) {
  if (typeof str !== 'string') throw new TypeError('Input must be a string');
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

/**
 * Truncates a string to the given length, appending '...' if truncated.
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 */
function truncate(str, maxLength) {
  if (typeof str !== 'string') throw new TypeError('Input must be a string');
  if (typeof maxLength !== 'number' || maxLength < 0) throw new RangeError('maxLength must be a non-negative number');
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}

/**
 * Counts the occurrences of a substring within a string.
 * @param {string} str
 * @param {string} sub
 * @returns {number}
 */
function countOccurrences(str, sub) {
  if (typeof str !== 'string' || typeof sub !== 'string') throw new TypeError('Both inputs must be strings');
  if (sub.length === 0) return 0;
  let count = 0;
  let pos = str.indexOf(sub);
  while (pos !== -1) {
    count++;
    pos = str.indexOf(sub, pos + 1);
  }
  return count;
}

/**
 * Converts a camelCase string to snake_case.
 * @param {string} str
 * @returns {string}
 */
function camelToSnake(str) {
  if (typeof str !== 'string') throw new TypeError('Input must be a string');
  return str.replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '');
}

/**
 * Converts a snake_case string to camelCase.
 * @param {string} str
 * @returns {string}
 */
function snakeToCamel(str) {
  if (typeof str !== 'string') throw new TypeError('Input must be a string');
  return str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
}

module.exports = { capitalize, reverse, isPalindrome, truncate, countOccurrences, camelToSnake, snakeToCamel };
