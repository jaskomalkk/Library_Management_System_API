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
exports.deleteBook = exports.updateBook = exports.getBooks = exports.createBook = void 0;
const firebase_1 = require("../config/firebase");
// Create a new book
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, available } = req.body;
    try {
        const bookRef = firebase_1.db.collection('books').doc();
        yield bookRef.set({ title, author, available });
        res.status(201).send('Book created');
    }
    catch (error) {
        res.status(500).send(error.message);
    }
    a;
});
exports.createBook = createBook;
// Get all books
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booksSnapshot = yield firebase_1.db.collection('books').get();
        const books = booksSnapshot.docs.map(doc => doc.data());
        res.status(200).json(books);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getBooks = getBooks;
// Update a book
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, author, available } = req.body;
    try {
        const bookRef = firebase_1.db.collection('books').doc(id);
        yield bookRef.update({ title, author, available });
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
        yield firebase_1.db.collection('books').doc(id).delete();
        res.status(200).send('Book deleted');
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.deleteBook = deleteBook;
