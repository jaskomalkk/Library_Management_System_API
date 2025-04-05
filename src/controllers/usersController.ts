import { Request, Response } from 'express';
import { db } from '../config/firebase';

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  const { name, role } = req.body;
  
  try {
    const userRef = db.collection('users').doc();
    await userRef.set({ name, role });
    res.status(201).send('User created');
  } catch (error: unknown) {
    res.status(500).send((error as Error).message);
  }
};

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const usersSnapshot = await db.collection('users').get();
    const users = usersSnapshot.docs.map(doc => doc.data());
    res.status(200).json(users);
  } catch (error: unknown) {
    res.status(500).send((error as Error).message);
  }
};

// Update a user
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, role } = req.body;
  
  try {
    const userRef = db.collection('users').doc(id);
    await userRef.update({ name, role });
    res.status(200).send('User updated');
  } catch (error: unknown) {
    res.status(500).send((error as Error).message);
  }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    await db.collection('users').doc(id).delete();
    res.status(200).send('User deleted');
  } catch (error: unknown) {
    res.status(500).send((error as Error).message);
  }
};
