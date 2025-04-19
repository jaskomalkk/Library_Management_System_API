import express from 'express';
import { registerUser, loginUser } from '../models/user';
import { authenticate } from '../middlewares/authMiddleware';


const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const message = await registerUser(username, password);
  res.send(message);
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const token = await loginUser(username, password);
  res.send({ token });
});

// A protected route example
router.get('/profile', authenticate, (req, res) => {
  res.send(`Welcome, ${req.user?.userId}`);
});

export default router;
