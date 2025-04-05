import { db } from '../config/firebase';
import { Book } from '../models/book';

export const createBook = async (book: Book) => {
  const newBookRef = db.collection('books').doc();
  await newBookRef.set(book);
  return newBookRef.id;
};

export const getBooks = async () => {
  const snapshot = await db.collection('books').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
