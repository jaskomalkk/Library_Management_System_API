"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
// src/utils/jwtUtils.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.SECRET_KEY; // Ensure the SECRET_KEY is loaded from environment variables
// Generate a JWT token
function generateToken(user) {
    const payload = { email: user.email }; // You can include additional info if needed
    const token = jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
    return token;
}
// Verify a JWT token
function verifyToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey); // Verify and decode the token
        return decoded;
    }
    catch (err) {
        return null; // Invalid or expired token
    }
}
