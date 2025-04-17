import { Request, Response } from 'express';
import { db } from '../config/firebase';
import { filterByCategory, sortByPrice } from '../services/bookService';
import { Book } from '../models/book';

// Create a new book
export const createBook = async (req: Request, res: Response) => {
  const { title, author, available, category, price } = req.body;

  try {
    const bookRef = db.collection('books').doc();
    const newBook = { id: bookRef.id, title, author, available, category, price };
    await bookRef.set(newBook);
    res.status(201).json(newBook);
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

// Get books by category
export const getBooksByCategory = async (req: Request, res: Response) => {
  const { category } = req.query;

  if (typeof category !== 'string') {
    return res.status(400).send('Invalid category');
  }

  try {
    const snapshot = await db.collection('books').get();
    const books = snapshot.docs.map(doc => doc.data() as Book);
    const filteredBooks = filterByCategory(books, category);
    res.status(200).json(filteredBooks);
  } catch (error: unknown) {
    res.status(500).send((error as Error).message);
  }
};

// Get books sorted by price
export const getBooksSortedByPrice = async (req: Request, res: Response) => {
  const { order } = req.query;

  if (order !== 'asc' && order !== 'desc') {
    return res.status(400).send("Invalid order value. Use 'asc' or 'desc'.");
  }

  try {
    const snapshot = await db.collection('books').get();
    const books = snapshot.docs.map(doc => doc.data() as Book);
    const sortedBooks = sortByPrice(books, order);
    res.status(200).json(sortedBooks);
  } catch (error: unknown) {
    res.status(500).send((error as Error).message);
  }
};

// Update a book
export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, available, category, price } = req.body;

  try {
    const bookRef = db.collection('books').doc(id);
    const doc = await bookRef.get();

    if (!doc.exists) {
      return res.status(404).send('Book not found');
    }

    await bookRef.update({ title, author, available, category, price });
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
