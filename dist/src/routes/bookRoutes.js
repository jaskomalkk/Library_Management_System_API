"use strict";
const express = require('express');
const { createBook, getBooksByCategory, getBooksSortedByPrice } = require('../controllers/bookController');
const router = express.Router();
// Route to create a new book (with validation)
router.post('/books', createBook);
// Route to get books by category
router.get('/books', getBooksByCategory);
// Route to get books sorted by price (use ?order=asc or ?order=desc)
router.get('/books/sort', getBooksSortedByPrice);
module.exports = router;
