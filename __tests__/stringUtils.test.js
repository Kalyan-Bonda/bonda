const {
  capitalize,
  reverse,
  isPalindrome,
  truncate,
  countOccurrences,
  camelToSnake,
  snakeToCamel,
} = require('../src/stringUtils');

describe('capitalize', () => {
  it('capitalizes the first letter of a lowercase string', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('leaves an already-capitalized string unchanged', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });

  it('returns an empty string unchanged', () => {
    expect(capitalize('')).toBe('');
  });

  it('handles a single character', () => {
    expect(capitalize('a')).toBe('A');
  });

  it('does not change characters beyond the first', () => {
    expect(capitalize('hELLO')).toBe('HELLO');
  });

  it('throws TypeError for non-string input', () => {
    expect(() => capitalize(42)).toThrow(TypeError);
    expect(() => capitalize(null)).toThrow(TypeError);
    expect(() => capitalize(undefined)).toThrow(TypeError);
  });
});

describe('reverse', () => {
  it('reverses a simple string', () => {
    expect(reverse('hello')).toBe('olleh');
  });

  it('returns an empty string unchanged', () => {
    expect(reverse('')).toBe('');
  });

  it('handles a single character', () => {
    expect(reverse('a')).toBe('a');
  });

  it('reverses a string with spaces', () => {
    expect(reverse('hello world')).toBe('dlrow olleh');
  });

  it('reverses a palindrome to itself', () => {
    expect(reverse('racecar')).toBe('racecar');
  });

  it('throws TypeError for non-string input', () => {
    expect(() => reverse(123)).toThrow(TypeError);
    expect(() => reverse([])).toThrow(TypeError);
  });
});

describe('isPalindrome', () => {
  it('returns true for a simple palindrome', () => {
    expect(isPalindrome('racecar')).toBe(true);
  });

  it('returns true for a palindrome with mixed case', () => {
    expect(isPalindrome('RaceCar')).toBe(true);
  });

  it('returns true for a sentence palindrome ignoring spaces and punctuation', () => {
    expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true);
  });

  it('returns false for a non-palindrome', () => {
    expect(isPalindrome('hello')).toBe(false);
  });

  it('returns true for an empty string', () => {
    expect(isPalindrome('')).toBe(true);
  });

  it('returns true for a single character', () => {
    expect(isPalindrome('a')).toBe(true);
  });

  it('handles numeric palindromes', () => {
    expect(isPalindrome('12321')).toBe(true);
    expect(isPalindrome('12345')).toBe(false);
  });

  it('throws TypeError for non-string input', () => {
    expect(() => isPalindrome(123)).toThrow(TypeError);
  });
});

describe('truncate', () => {
  it('returns the string unchanged when it is shorter than maxLength', () => {
    expect(truncate('hello', 10)).toBe('hello');
  });

  it('returns the string unchanged when it equals maxLength', () => {
    expect(truncate('hello', 5)).toBe('hello');
  });

  it('truncates and appends "..." when the string exceeds maxLength', () => {
    expect(truncate('hello world', 5)).toBe('hello...');
  });

  it('handles maxLength of 0', () => {
    expect(truncate('hello', 0)).toBe('...');
  });

  it('returns an empty string unchanged for maxLength 0', () => {
    expect(truncate('', 0)).toBe('');
  });

  it('throws TypeError for non-string input', () => {
    expect(() => truncate(42, 5)).toThrow(TypeError);
  });

  it('throws RangeError for negative maxLength', () => {
    expect(() => truncate('hello', -1)).toThrow(RangeError);
  });

  it('throws RangeError for non-numeric maxLength', () => {
    expect(() => truncate('hello', 'five')).toThrow(RangeError);
  });
});

describe('countOccurrences', () => {
  it('counts overlapping-free occurrences of a substring', () => {
    expect(countOccurrences('hello world hello', 'hello')).toBe(2);
  });

  it('returns 0 when the substring is not found', () => {
    expect(countOccurrences('hello', 'xyz')).toBe(0);
  });

  it('returns 0 for an empty substring', () => {
    expect(countOccurrences('hello', '')).toBe(0);
  });

  it('counts a single character correctly', () => {
    expect(countOccurrences('banana', 'a')).toBe(3);
  });

  it('is case-sensitive', () => {
    expect(countOccurrences('Hello hello', 'hello')).toBe(1);
  });

  it('works on an empty source string', () => {
    expect(countOccurrences('', 'hello')).toBe(0);
  });

  it('throws TypeError for non-string inputs', () => {
    expect(() => countOccurrences(123, 'a')).toThrow(TypeError);
    expect(() => countOccurrences('hello', 42)).toThrow(TypeError);
  });
});

describe('camelToSnake', () => {
  it('converts a simple camelCase string', () => {
    expect(camelToSnake('helloWorld')).toBe('hello_world');
  });

  it('handles multiple uppercase letters', () => {
    expect(camelToSnake('myVariableName')).toBe('my_variable_name');
  });

  it('returns an already lowercase string unchanged', () => {
    expect(camelToSnake('hello')).toBe('hello');
  });

  it('handles a string starting with an uppercase letter', () => {
    expect(camelToSnake('HelloWorld')).toBe('hello_world');
  });

  it('returns an empty string unchanged', () => {
    expect(camelToSnake('')).toBe('');
  });

  it('throws TypeError for non-string input', () => {
    expect(() => camelToSnake(42)).toThrow(TypeError);
  });
});

describe('snakeToCamel', () => {
  it('converts a simple snake_case string', () => {
    expect(snakeToCamel('hello_world')).toBe('helloWorld');
  });

  it('handles multiple underscores', () => {
    expect(snakeToCamel('my_variable_name')).toBe('myVariableName');
  });

  it('returns a string without underscores unchanged', () => {
    expect(snakeToCamel('hello')).toBe('hello');
  });

  it('returns an empty string unchanged', () => {
    expect(snakeToCamel('')).toBe('');
  });

  it('throws TypeError for non-string input', () => {
    expect(() => snakeToCamel(42)).toThrow(TypeError);
  });
});
