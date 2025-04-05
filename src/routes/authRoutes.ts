import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { findUserByEmail, createUser } from '../models/userModel';
import { generateToken, verifyToken } from '../utils/jwtUtils';

const router = express.Router();

// Sign-up route
router.post('/signup', (req: Request, res: Response): void => {
  const { email, password } = req.body;
  if (findUserByEmail(email)) {
    res.status(400).send('User already exists');
    return; // No need to return a response object, just stop execution
  }
  createUser(email, password);
  res.status(201).send('User created');
});

// Login route
router.post('/login', (req: Request, res: Response): void => {
  const { email, password } = req.body;
  const user = findUserByEmail(email);
  if (!user) {
    res.status(400).send('User not found');
    return; // Stop execution
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    res.status(400).send('Invalid credentials');
    return; // Stop execution
  }

  const token = generateToken(user);
  res.status(200).send({ token });
});

// Middleware to protect routes that require authentication
function authenticateJWT(req: Request, res: Response, next: NextFunction): void {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    res.status(401).send('Access Denied');
    return; // Stop execution
  }

  const user = verifyToken(token);
  if (!user) {
    res.status(403).send('Invalid or expired token');
    return; // Stop execution
  }

  req.user = user; // Now TypeScript understands this
  next();
}

// Protected route example
router.get('/profile', authenticateJWT, (req: Request, res: Response): void => {
  if (req.user) {
    res.status(200).send(`Hello ${req.user.email}, this is your profile!`);
  } else {
    res.status(400).send('User not authenticated');
  }
});

export default router;
