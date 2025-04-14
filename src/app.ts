// Import necessary libraries
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import booksRouter from './routes/books';  
import { swaggerSpec, swaggerUi } from '../swagger/swagger'; // Import Swagger setup
import { Sequelize, DataTypes } from 'sequelize'; // Import Sequelize for ORM

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Setup Sequelize (similar to Flask SQLAlchemy setup)
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'books.db'  // Using SQLite as the database
});

// Define Book model (similar to models.book_model import in Flask)
export const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year_published: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

// Middleware setup
app.use(cors());  // Enable CORS
app.use(helmet());  // Apply security headers
app.use(express.json());  // Parse incoming JSON requests

// Set up Swagger UI for API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));  // Serve Swagger UI

// Route for handling books-related API requests
app.use('/books', booksRouter);  // Assuming booksRouter is defined in ./routes/books

// Sync Sequelize models and start server
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully');
    // Start the server
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Database sync failed:', err);
  });
