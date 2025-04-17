// utils/validation.ts

export function validatePositivePrice(price: number): void {
  if (price <= 0) {
    throw new Error('Price must be a positive number');
  }
}
