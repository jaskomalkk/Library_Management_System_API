import { db } from '../config/firebase';
import { Book } from '../models/book';

// Sample data (Books)
const sampleBooks = [
  { name: 'The Great Gatsby', category: 'Fiction', price: 10 },
  { name: '1984', category: 'Fiction', price: 15 },
  { name: 'JavaScript: The Good Parts', category: 'Programming', price: 25 },
  { name: 'Clean Code', category: 'Programming', price: 35 },
];

// Filtering function
export function filterByCategory(books: Book[], category: string): Book[] {
  return books.filter(book => book.category.toLowerCase() === category.toLowerCase());
}

// Firebase operations
export const createBook = async (book: Book) => {
  const newBookRef = db.collection('books').doc();
  await newBookRef.set(book);
  return newBookRef.id;
};

export const getBooks = async () => {
  const snapshot = await db.collection('books').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
