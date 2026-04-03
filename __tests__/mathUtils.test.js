const {
  clamp,
  sum,
  average,
  factorial,
  isPrime,
  gcd,
  lcm,
  roundTo,
} = require('../src/mathUtils');

describe('clamp', () => {
  it('returns the number when it is within the range', () => {
    expect(clamp(5, 1, 10)).toBe(5);
  });

  it('returns min when the number is below the range', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it('returns max when the number is above the range', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it('returns min when num equals min', () => {
    expect(clamp(0, 0, 10)).toBe(0);
  });

  it('returns max when num equals max', () => {
    expect(clamp(10, 0, 10)).toBe(10);
  });

  it('handles negative ranges', () => {
    expect(clamp(-3, -10, -1)).toBe(-3);
    expect(clamp(0, -10, -1)).toBe(-1);
  });

  it('throws TypeError for non-numeric inputs', () => {
    expect(() => clamp('5', 0, 10)).toThrow(TypeError);
    expect(() => clamp(5, '0', 10)).toThrow(TypeError);
  });

  it('throws RangeError when min > max', () => {
    expect(() => clamp(5, 10, 0)).toThrow(RangeError);
  });
});

describe('sum', () => {
  it('returns the sum of an array of numbers', () => {
    expect(sum([1, 2, 3, 4, 5])).toBe(15);
  });

  it('returns 0 for an empty array', () => {
    expect(sum([])).toBe(0);
  });

  it('handles negative numbers', () => {
    expect(sum([-1, -2, 3])).toBe(0);
  });

  it('handles a single-element array', () => {
    expect(sum([42])).toBe(42);
  });

  it('handles floating-point numbers', () => {
    expect(sum([0.1, 0.2])).toBeCloseTo(0.3);
  });

  it('throws TypeError for non-array input', () => {
    expect(() => sum('hello')).toThrow(TypeError);
  });

  it('throws TypeError when the array contains non-numbers', () => {
    expect(() => sum([1, 2, 'three'])).toThrow(TypeError);
  });
});

describe('average', () => {
  it('returns the average of an array of numbers', () => {
    expect(average([1, 2, 3, 4, 5])).toBe(3);
  });

  it('handles a single-element array', () => {
    expect(average([10])).toBe(10);
  });

  it('handles negative numbers', () => {
    expect(average([-10, 0, 10])).toBe(0);
  });

  it('handles floating-point results', () => {
    expect(average([1, 2])).toBe(1.5);
  });

  it('throws RangeError for an empty array', () => {
    expect(() => average([])).toThrow(RangeError);
  });

  it('throws TypeError for non-array input', () => {
    expect(() => average(null)).toThrow(TypeError);
  });
});

describe('factorial', () => {
  it('returns 1 for 0', () => {
    expect(factorial(0)).toBe(1);
  });

  it('returns 1 for 1', () => {
    expect(factorial(1)).toBe(1);
  });

  it('returns the correct factorial for small numbers', () => {
    expect(factorial(5)).toBe(120);
    expect(factorial(6)).toBe(720);
  });

  it('returns the correct factorial for larger numbers', () => {
    expect(factorial(10)).toBe(3628800);
  });

  it('throws RangeError for negative input', () => {
    expect(() => factorial(-1)).toThrow(RangeError);
  });

  it('throws TypeError for non-integer input', () => {
    expect(() => factorial(2.5)).toThrow(TypeError);
    expect(() => factorial('5')).toThrow(TypeError);
  });
});

describe('isPrime', () => {
  it('returns false for numbers less than 2', () => {
    expect(isPrime(0)).toBe(false);
    expect(isPrime(1)).toBe(false);
    expect(isPrime(-5)).toBe(false);
  });

  it('returns true for 2 (smallest prime)', () => {
    expect(isPrime(2)).toBe(true);
  });

  it('returns true for known primes', () => {
    [3, 5, 7, 11, 13, 17, 19, 23].forEach(p => {
      expect(isPrime(p)).toBe(true);
    });
  });

  it('returns false for composite numbers', () => {
    [4, 6, 8, 9, 10, 12, 15, 16].forEach(n => {
      expect(isPrime(n)).toBe(false);
    });
  });

  it('throws TypeError for non-integer input', () => {
    expect(() => isPrime(2.5)).toThrow(TypeError);
    expect(() => isPrime('7')).toThrow(TypeError);
  });
});

describe('gcd', () => {
  it('returns the GCD of two positive integers', () => {
    expect(gcd(12, 8)).toBe(4);
    expect(gcd(100, 75)).toBe(25);
  });

  it('returns the larger number when one divides the other', () => {
    expect(gcd(10, 5)).toBe(5);
  });

  it('returns the number itself when the other is 0', () => {
    expect(gcd(7, 0)).toBe(7);
    expect(gcd(0, 7)).toBe(7);
  });

  it('handles negative inputs', () => {
    expect(gcd(-12, 8)).toBe(4);
    expect(gcd(12, -8)).toBe(4);
  });

  it('returns 1 for coprime numbers', () => {
    expect(gcd(7, 11)).toBe(1);
  });

  it('throws TypeError for non-integer inputs', () => {
    expect(() => gcd(2.5, 4)).toThrow(TypeError);
    expect(() => gcd(4, '8')).toThrow(TypeError);
  });
});

describe('lcm', () => {
  it('returns the LCM of two positive integers', () => {
    expect(lcm(4, 6)).toBe(12);
    expect(lcm(12, 8)).toBe(24);
  });

  it('returns 0 when either argument is 0', () => {
    expect(lcm(0, 5)).toBe(0);
    expect(lcm(5, 0)).toBe(0);
  });

  it('returns the number when both are the same', () => {
    expect(lcm(7, 7)).toBe(7);
  });

  it('handles coprime inputs (LCM = product)', () => {
    expect(lcm(7, 11)).toBe(77);
  });

  it('throws TypeError for non-integer inputs', () => {
    expect(() => lcm(2.5, 4)).toThrow(TypeError);
    expect(() => lcm(4, '8')).toThrow(TypeError);
  });
});

describe('roundTo', () => {
  it('rounds to 0 decimal places by default', () => {
    expect(roundTo(3.567)).toBe(4);
  });

  it('rounds to the specified number of decimal places', () => {
    expect(roundTo(3.14159, 2)).toBe(3.14);
    expect(roundTo(3.14159, 4)).toBe(3.1416);
  });

  it('returns the number unchanged when decimals is sufficient', () => {
    expect(roundTo(1.5, 2)).toBe(1.5);
  });

  it('rounds negative numbers correctly', () => {
    expect(roundTo(-3.567, 2)).toBe(-3.57);
  });

  it('handles 0 decimal places explicitly', () => {
    expect(roundTo(2.5, 0)).toBe(3);
  });

  it('throws TypeError for non-numeric num', () => {
    expect(() => roundTo('3.14', 2)).toThrow(TypeError);
  });

  it('throws RangeError for non-integer decimals', () => {
    expect(() => roundTo(3.14, 1.5)).toThrow(RangeError);
    expect(() => roundTo(3.14, -1)).toThrow(RangeError);
  });
});
