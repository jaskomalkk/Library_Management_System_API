"use strict";
// controllers/search_controller.ts
// This file contains the logic for searching books by title and/or author.
// It processes the search query, interacts with the database, and returns results.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchBooks = void 0;
const sequelize_1 = require("sequelize"); // Import Op separately from Sequelize
const book_model_1 = __importDefault(require("../models/book_model")); // Import Book model for querying the database
// Function to handle the search functionality
const searchBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get search parameters from the query string (title or author)
    const titleQuery = (req.query.title || '').toLowerCase(); // Search by title (default to empty string)
    const authorQuery = (req.query.author || '').toLowerCase(); // Search by author (default to empty string)
    // Validate that at least one search parameter is provided
    if (!titleQuery && !authorQuery) {
        return res.status(400).json({ message: 'Please provide a title or author to search' }); // Bad request response
    }
    try {
        // Query the database to find books that match the title or author
        const results = yield book_model_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { title: { [sequelize_1.Op.iLike]: `%${titleQuery}%` } }, // Case-insensitive search for title
                    { author: { [sequelize_1.Op.iLike]: `%${authorQuery}%` } }, // Case-insensitive search for author
                ]
            }
        });
        // Prepare the results as a list of objects
        const booksList = results.map((book) => ({
            id: book.id,
            title: book.title,
            author: book.author,
            genre: book.genre
        }));
        // Return the list of books as a JSON response
        return res.status(200).json(booksList); // Successful response with status 200
    }
    catch (error) { // Explicitly declare the error type as 'any'
        // Catch any errors and return a 500 error response
        return res.status(500).json({ message: 'An error occurred while searching for books', error: error.message });
    }
});
exports.searchBooks = searchBooks;
