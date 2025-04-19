"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Ensure JWT_SECRET is a string (or fallback to default)
const JWT_SECRET = process.env.JWT_SECRET;
// Ensure JWT_EXPIRATION is string or number (handle fallback to '1h')
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';
/**
 * Function to generate a JWT token.
 * @param userId - The user ID to include in the payload.
 * @returns {string} - The JWT token.
 */
function generateToken(userId) {
    const payload = { userId };
    // Narrow the type of JWT_EXPIRATION to match the expected `expiresIn` type
    const options = { expiresIn: JWT_EXPIRATION };
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, options);
}
/**
 * Function to verify a JWT token.
 * @param token - The JWT token to verify.
 * @returns {JwtPayload | string} - The decoded payload or error message.
 */
function verifyToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        return 'Invalid token';
    }
}
