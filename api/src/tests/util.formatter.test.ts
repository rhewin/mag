import { fmtArrayErrMessage, genInternalUniqueId } from '../utils/util.formatter';

describe('fmtArrayErrMessage', () => {
  test('should join error messages with commas for valid input', () => {
    const input = [{ message: 'Error 1' }, { message: 'Error 2' }, { message: 'Error 3' }];
    const result = fmtArrayErrMessage(input);
    expect(result).toBe('Error 1, Error 2, Error 3');
  });

  test('should return an empty string for an empty array', () => {
    const input: any[] = [];
    const result = fmtArrayErrMessage(input);
    expect(result).toBe('');
  });

  test('should return an empty string if input is null', () => {
    const input: any = null;
    const result = fmtArrayErrMessage(input);
    expect(result).toBe('');
  });

  test('should return an empty string if input is undefined', () => {
    const input: any = undefined;
    const result = fmtArrayErrMessage(input);
    expect(result).toBe('');
  });

  test('should return an empty string if input is not an array', () => {
    const input: any = "invalid";
    const result = fmtArrayErrMessage(input);
    expect(result).toBe('');
  });

  test('should handle array with null or undefined elements gracefully', () => {
    const input = [{ message: 'Error 1' }, null, { message: 'Error 2' }, undefined];
    const result = fmtArrayErrMessage(input);
    expect(result).toBe('Error 1, Error 2');
  });

  test('should ignore elements without a "message" property', () => {
    const input = [
      { message: 'Error 1' },
      { msg: 'Ignored Error' },
      { message: 'Error 2' },
      42,
      null,
      undefined,
    ];
    const result = fmtArrayErrMessage(input);
    expect(result).toBe('Error 1, Error 2');
  });

  test('should handle numeric values in the "message" property', () => {
    const input = [{ message: 123 }, { message: 456 }];
    const result = fmtArrayErrMessage(input);
    expect(result).toBe('123, 456');
  });

  test('should handle boolean values in the "message" property', () => {
    const input = [{ message: true }, { message: false }];
    const result = fmtArrayErrMessage(input);
    expect(result).toBe('true, false');
  });

  test('should return an empty string if array contains no valid "message" properties', () => {
    const input = [{ msg: 'Invalid Error' }, {}, null, undefined];
    const result = fmtArrayErrMessage(input);
    expect(result).toBe('');
  });
});

describe('genInternalUniqueId', () => {
  it('should generate a unique ID of length 8', () => {
    const id = genInternalUniqueId();
    expect(id).toHaveLength(8);
  });

  it('should only contain uppercase letters and numbers', () => {
    const id = genInternalUniqueId();
    expect(id).toMatch(/^[A-Z0-9]{8}$/); // Matches only uppercase letters and digits
  });

  it('should generate a unique unique ID on each call', () => {
    const id1 = genInternalUniqueId();
    const id2 = genInternalUniqueId();
    expect(id1).not.toBe(id2); // Ensures the pins are different
  });

  it('should return a string', () => {
    const id = genInternalUniqueId();
    expect(typeof id).toBe('string');
  });

  it('should only contain 8 characters even after multiple invocations', () => {
    for (let i = 0; i < 1000; i++) {
      const id = genInternalUniqueId();
      expect(id).toHaveLength(8);
    }
  });
});
