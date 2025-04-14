import express, { Request, Response } from 'express';
import { searchBooks } from '../controllers/search_controller';  // Import the search controller

// Create a Router for the search functionality
const searchRouter = express.Router();

// Define a GET route for searching books
searchRouter.get('/search', async (req: Request, res: Response) => {
  try {
    await searchBooks(req, res);  
  } catch (error) {
    // Type assertion to specify that the error is of type Error
    const e = error as Error; 
    res.status(500).json({ message: 'An error occurred while searching for books', error: e.message });
  }
});


export default searchRouter;
