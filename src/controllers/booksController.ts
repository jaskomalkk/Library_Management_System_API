import { Request, Response } from 'express';
import { db } from '../config/firebase';

// Create a new book
export const createBook = async (req: Request, res: Response) => {
  const { title, author, available } = req.body;

  try {
    const bookRef = db.collection('books').doc();
    const newBook = { id: bookRef.id, title, author, available };
    await bookRef.set(newBook); // Include the ID in the document
    res.status(201).json(newBook); // Send the new book as JSON
  } catch (error: unknown) {
    res.status(500).send((error as Error).message);
  }
};

// Get all books
export const getBooks = async (_req: Request, res: Response) => {
  try {
    const snapshot = await db.collection('books').get();
    const books = snapshot.docs.map(doc => doc.data());
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
    const doc = await bookRef.get();

    if (!doc.exists) {
      return res.status(404).send('Book not found');
    }

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
    const bookRef = db.collection('books').doc(id);
    const doc = await bookRef.get();

    if (!doc.exists) {
      return res.status(404).send('Book not found');
    }

    await bookRef.delete();
    res.status(200).send('Book deleted');
  } catch (error: unknown) {
    res.status(500).send((error as Error).message);
  }
};
