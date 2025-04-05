// src/utils/jwtUtils.ts
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY as string; // Ensure the SECRET_KEY is loaded from environment variables

// Define a type for the user payload (adjust according to your needs)
interface User {
  email: string;
}

// Generate a JWT token
export function generateToken(user: User): string {
  const payload: User = { email: user.email }; // You can include additional info if needed
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
  return token;
}

// Verify a JWT token
export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload; // Verify and decode the token
    return decoded;
  } catch (err) {
    return null; // Invalid or expired token
  }
}
