// tests/validation.test.ts

import { validatePositivePrice } from '../src/utils/validation';

describe('validatePositivePrice', () => {
  it('should throw error for non-positive price', () => {
    expect(() => validatePositivePrice(-10)).toThrow('Price must be a positive number');
  });

  it('should pass for positive price', () => {
    expect(() => validatePositivePrice(15)).not.toThrow();
  });
});
