import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../app'; // Import the Sequelize instance from app.ts

// Define the Book model using Sequelize ORM
const Book = sequelize.define('Book', {
  // Primary key for the Book model
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Automatically incrementing the id
  },

  // Column for the title of the book
  title: {
    type: DataTypes.STRING(100),
    allowNull: false, // Ensures title is required
  },

  // Column for the author of the book
  author: {
    type: DataTypes.STRING(100),
    allowNull: false, // Ensures author is required
  },

  // Column for the genre of the book
  genre: {
    type: DataTypes.STRING(50),
    allowNull: true, // Genre is optional
  },
}, {
  // Sequelize options, including table name
  tableName: 'books',
  timestamps: true, // Enables createdAt and updatedAt fields by default
});

// Export the Book model to be used elsewhere in the app
export default Book;
