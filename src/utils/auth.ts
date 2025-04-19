import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Ensure JWT_SECRET is a string (or fallback to default)
const JWT_SECRET = process.env.JWT_SECRET as string;

// Ensure JWT_EXPIRATION is string or number (handle fallback to '1h')
const JWT_EXPIRATION: string | number = process.env.JWT_EXPIRATION || '1h';

/**
 * Function to generate a JWT token.
 * @param userId - The user ID to include in the payload.
 * @returns {string} - The JWT token.
 */
export function generateToken(userId: string): string {
  const payload = { userId };

  // Narrow the type of JWT_EXPIRATION to match the expected `expiresIn` type
  const options: SignOptions = { expiresIn: JWT_EXPIRATION as SignOptions['expiresIn'] };

  return jwt.sign(payload, JWT_SECRET, options);
}

/**
 * Function to verify a JWT token.
 * @param token - The JWT token to verify.
 * @returns {JwtPayload | string} - The decoded payload or error message.
 */
export function verifyToken(token: string): JwtPayload | string {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return 'Invalid token';
  }
}
