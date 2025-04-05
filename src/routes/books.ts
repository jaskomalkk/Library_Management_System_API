import express from 'express';
import { createUser, getUsers, updateUser, deleteUser } from '../controllers/usersController';

const router = express.Router();

router.get('/users', getUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
