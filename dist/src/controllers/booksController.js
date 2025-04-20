"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBooksSortedByPrice = exports.getBooksByCategory = exports.getBooks = exports.createBook = void 0;
const firebase_1 = require("../config/firebase");
const bookService_1 = require("../services/bookService");
const validation_1 = require("../utils/validation"); // Import validation function
// Create a new book with validation
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, available, category, price } = req.body;
    try {
        // Validate that price is a positive number
        (0, validation_1.validatePositivePrice)(price);
        const bookRef = firebase_1.db.collection('books').doc();
        const newBook = { id: bookRef.id, title, author, available, category, price };
        yield bookRef.set(newBook);
        res.status(201).json(newBook);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createBook = createBook;
// Get all books
const getBooks = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const snapshot = yield firebase_1.db.collection('books').get();
        const books = snapshot.docs.map(doc => doc.data());
        res.status(200).json(books);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getBooks = getBooks;
// Get books by category
const getBooksByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.query;
    if (typeof category !== 'string') {
        return res.status(400).send('Invalid category');
    }
    try {
        const snapshot = yield firebase_1.db.collection('books').get();
        const books = snapshot.docs.map(doc => doc.data());
        const filteredBooks = (0, bookService_1.filterByCategory)(books, category);
        res.status(200).json(filteredBooks);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getBooksByCategory = getBooksByCategory;
// Get books sorted by price
const getBooksSortedByPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { order } = req.query;
    if (order !== 'asc' && order !== 'desc') {
        return res.status(400).send("Invalid order value. Use 'asc' or 'desc'.");
    }
    try {
        const snapshot = yield firebase_1.db.collection('books').get();
        const books = snapshot.docs.map(doc => doc.data());
        const sortedBooks = (0, bookService_1.sortByPrice)(books, order);
        res.status(200).json(sortedBooks);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getBooksSortedByPrice = getBooksSortedByPrice;
// Update a book
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, author, available, category, price } = req.body;
    try {
        const bookRef = firebase_1.db.collection('books').doc(id);
        const doc = yield bookRef.get();
        if (!doc.exists) {
            return res.status(404).send('Book not found');
        }
        yield bookRef.update({ title, author, available, category, price });
        res.status(200).send('Book updated');
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.updateBook = updateBook;
// Delete a book
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const bookRef = firebase_1.db.collection('books').doc(id);
        const doc = yield bookRef.get();
        if (!doc.exists) {
            return res.status(404).send('Book not found');
        }
        yield bookRef.delete();
        res.status(200).send('Book deleted');
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.deleteBook = deleteBook;
