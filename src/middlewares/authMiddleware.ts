import { verifyToken } from '../utils/auth';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to authenticate a user by verifying the JWT token.
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @param next - The next middleware function.
 */
export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).send('Authentication required');
    return;  // Explicitly return after sending the response
  }

  const decoded = verifyToken(token);
  if (decoded === 'Invalid token') {
    res.status(401).send('Invalid token');
    return;  // Explicitly return after sending the response
  }

  req.user = decoded;  // Store the decoded user info in the request object.
  next();
}
