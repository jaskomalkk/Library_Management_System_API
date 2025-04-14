// controllers/search_controller.ts
// This file contains the logic for searching books by title and/or author.
// It processes the search query, interacts with the database, and returns results.

import { Request, Response } from 'express';
import { Sequelize, Op } from 'sequelize';  // Import Op separately from Sequelize
import Book from '../models/book_model';  // Import Book model for querying the database

// Function to handle the search functionality
export const searchBooks = async (req: Request, res: Response): Promise<Response> => {
    // Get search parameters from the query string (title or author)
    const titleQuery: string = (req.query.title as string || '').toLowerCase();  // Search by title (default to empty string)
    const authorQuery: string = (req.query.author as string || '').toLowerCase();  // Search by author (default to empty string)

    // Validate that at least one search parameter is provided
    if (!titleQuery && !authorQuery) {
        return res.status(400).json({ message: 'Please provide a title or author to search' });  // Bad request response
    }

    try {
        // Query the database to find books that match the title or author
        const results = await Book.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.iLike]: `%${titleQuery}%` } },  // Case-insensitive search for title
                    { author: { [Op.iLike]: `%${authorQuery}%` } },  // Case-insensitive search for author
                ]
            }
        });

        // Prepare the results as a list of objects
        const booksList = results.map((book: any) => ({
            id: book.id,
            title: book.title,
            author: book.author,
            genre: book.genre
        }));

        // Return the list of books as a JSON response
        return res.status(200).json(booksList);  // Successful response with status 200
    } catch (error: any) {  // Explicitly declare the error type as 'any'
        // Catch any errors and return a 500 error response
        return res.status(500).json({ message: 'An error occurred while searching for books', error: error.message });
    }
};
