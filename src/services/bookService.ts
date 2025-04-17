// services/bookService.ts

import { db } from '../config/firebase';
import { Book } from '../models/book';

// Sample data (Books)
const sampleBooks: Book[] = [
  {
    title: 'The Great Gatsby',
    name: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Fiction',
    price: 10,
    available: true
  },
  {
    title: '1984',
    name: '1984',
    author: 'George Orwell',
    category: 'Fiction',
    price: 15,
    available: true
  },
  {
    title: 'JavaScript: The Good Parts',
    name: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    category: 'Programming',
    price: 25,
    available: true
  },
  {
    title: 'Clean Code',
    name: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'Programming',
    price: 35,
    available: false
  },
];

// ✅ Exported sorting function
export function sortByPrice(books: Book[], order: 'asc' | 'desc' = 'asc'): Book[] {
  return books.sort((a: Book, b: Book) => {
    return order === 'asc' ? a.price - b.price : b.price - a.price;
  });
}

// ✅ Exported filtering function
export function filterByCategory(books: Book[], category: string): Book[] {
  return books.filter(book => book.category.toLowerCase() === category.toLowerCase());
}

// ✅ Exported Firebase operations
export const createBook = async (book: Book) => {
  const newBookRef = db.collection('books').doc();
  await newBookRef.set(book);
  return newBookRef.id;
};

export const getBooks = async () => {
  const snapshot = await db.collection('books').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
