/**
 * Clamps a number between min and max (inclusive).
 * @param {number} num
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function clamp(num, min, max) {
  if (typeof num !== 'number' || typeof min !== 'number' || typeof max !== 'number') {
    throw new TypeError('All arguments must be numbers');
  }
  if (min > max) throw new RangeError('min must be less than or equal to max');
  return Math.min(Math.max(num, min), max);
}

/**
 * Returns the sum of all numbers in an array.
 * @param {number[]} arr
 * @returns {number}
 */
function sum(arr) {
  if (!Array.isArray(arr)) throw new TypeError('Input must be an array');
  if (arr.some(n => typeof n !== 'number')) throw new TypeError('All elements must be numbers');
  return arr.reduce((acc, n) => acc + n, 0);
}

/**
 * Returns the average of all numbers in an array.
 * @param {number[]} arr
 * @returns {number}
 */
function average(arr) {
  if (!Array.isArray(arr)) throw new TypeError('Input must be an array');
  if (arr.length === 0) throw new RangeError('Array must not be empty');
  return sum(arr) / arr.length;
}

/**
 * Returns the factorial of a non-negative integer.
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  if (typeof n !== 'number' || !Number.isInteger(n)) throw new TypeError('Input must be an integer');
  if (n < 0) throw new RangeError('Input must be a non-negative integer');
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

/**
 * Checks if a number is prime.
 * @param {number} n
 * @returns {boolean}
 */
function isPrime(n) {
  if (typeof n !== 'number' || !Number.isInteger(n)) throw new TypeError('Input must be an integer');
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

/**
 * Returns the greatest common divisor of two integers using Euclidean algorithm.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function gcd(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number' || !Number.isInteger(a) || !Number.isInteger(b)) {
    throw new TypeError('Both inputs must be integers');
  }
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

/**
 * Returns the least common multiple of two integers.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function lcm(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number' || !Number.isInteger(a) || !Number.isInteger(b)) {
    throw new TypeError('Both inputs must be integers');
  }
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

/**
 * Rounds a number to the specified number of decimal places.
 * @param {number} num
 * @param {number} [decimals=0]
 * @returns {number}
 */
function roundTo(num, decimals = 0) {
  if (typeof num !== 'number') throw new TypeError('num must be a number');
  if (typeof decimals !== 'number' || !Number.isInteger(decimals) || decimals < 0) {
    throw new RangeError('decimals must be a non-negative integer');
  }
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}

module.exports = { clamp, sum, average, factorial, isPrime, gcd, lcm, roundTo };
