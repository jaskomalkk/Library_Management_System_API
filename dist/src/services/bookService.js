"use strict";
// services/bookService.ts
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
exports.getBooks = exports.createBook = void 0;
exports.filterByCategory = filterByCategory;
const firebase_1 = require("../config/firebase");
// Sample data (Books)
// Updated sampleBooks with 'name' instead of 'title'
const sampleBooks = [
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
// Sorting function by price
function sortByPrice(books, order = 'asc') {
    return books.sort((a, b) => {
        if (order === 'asc') {
            return a.price - b.price; // Ascending order
        }
        else {
            return b.price - a.price; // Descending order
        }
    });
}
// Filtering function
function filterByCategory(books, category) {
    return books.filter(book => book.category.toLowerCase() === category.toLowerCase());
}
// Firebase operations
const createBook = (book) => __awaiter(void 0, void 0, void 0, function* () {
    const newBookRef = firebase_1.db.collection('books').doc();
    yield newBookRef.set(book);
    return newBookRef.id;
});
exports.createBook = createBook;
const getBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield firebase_1.db.collection('books').get();
    return snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
});
exports.getBooks = getBooks;
module.exports = { sortByPrice, filterByCategory, createBook: exports.createBook, getBooks: exports.getBooks };
