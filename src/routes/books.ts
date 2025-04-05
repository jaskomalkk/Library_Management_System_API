import express from 'express';
import * as bookService from '../services/bookService';

const router = express.Router();

router.get('/', async (req, res) => {
  const books = await bookService.getBooks();
  res.json({ books });
});

router.post('/', async (req, res) => {
  const newBookId = await bookService.createBook(req.body);
  res.status(201).json({ message: "Book created", id: newBookId });
});

export default router;
