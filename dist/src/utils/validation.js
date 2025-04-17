"use strict";
// utils/validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePositivePrice = validatePositivePrice;
function validatePositivePrice(price) {
    if (price <= 0) {
        throw new Error('Price must be a positive number');
    }
}
