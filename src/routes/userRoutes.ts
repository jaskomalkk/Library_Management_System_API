import express from 'express';
import { registerUser, loginUser } from '../models/user';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints for user management
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const message = await registerUser(username, password);
  res.status(201).send(message);
});

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT token returned
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const token = await loginUser(username, password);
  res.send({ token });
});

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Access the profile of the logged-in user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A welcome message with user ID
 *       401:
 *         description: Unauthorized
 */
router.get('/profile', authenticate, (req, res) => {
  res.send(`Welcome, ${req.user?.userId}`);
});

export default router;
