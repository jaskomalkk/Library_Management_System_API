// Import necessary libraries
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { Sequelize, DataTypes } from 'sequelize';

import userRoutes from './routes/userRoutes';
import booksRouter from './routes/books';
import { swaggerSpec, swaggerUi } from '../swagger/swagger'; // Swagger setup

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Setup Sequelize (SQLite used here)
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'books.db'
});

// Define Book model
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

// Middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.json()); // Optional: You could use express.json() directly
// app.use(express.json()); // Alternative

// ✅ API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ✅ Routes
app.use('/user', userRoutes);
app.use('/books', booksRouter);

// ✅ Sync DB and Start Server
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully');
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
      console.log(`Swagger docs at http://localhost:${port}/api-docs`);
    });
  })
  .catch(err => {
    console.error('Database sync failed:', err);
  });
