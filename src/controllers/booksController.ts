import { Request, Response } from 'express';
import { db } from '../config/firebase';

// Create a new book
export const createBook = async (req: Request, res: Response) => {
  const { title, author, available } = req.body;
  
  try {
    const bookRef = db.collection('books').doc();
    await bookRef.set({ title, author, available });
    res.status(201).send('Book created');
  } catch (error: unknown) {
    res.status(500).send((error as Error).message);
  }
};

// Get all books
export const getBooks = async (req: Request, res: Response) => {
  try {
    const booksSnapshot = await db.collection('books').get();
    const books = booksSnapshot.docs.map(doc => doc.data());
    res.status(200).json(books);
  } catch (error: unknown) {
    res.status(500).send((error as Error).message);
  }
};

// Update a book
export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, available } = req.body;
  
  try {
    const bookRef = db.collection('books').doc(id);
    await bookRef.update({ title, author, available });
    res.status(200).send('Book updated');
  } catch (error: unknown) {
    res.status(500).send((error as Error).message);
  }
};

// Delete a book
export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    await db.collection('books').doc(id).delete();
    res.status(200).send('Book deleted');
  } catch (error: unknown) {
    res.status(500).send((error as Error).message);
  }
};
