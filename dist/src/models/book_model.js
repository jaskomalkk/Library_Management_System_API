"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const app_1 = require("../app"); // Import the Sequelize instance from app.ts
// Define the Book model using Sequelize ORM
const Book = app_1.sequelize.define('Book', {
    // Primary key for the Book model
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically incrementing the id
    },
    // Column for the title of the book
    title: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false, // Ensures title is required
    },
    // Column for the author of the book
    author: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false, // Ensures author is required
    },
    // Column for the genre of the book
    genre: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true, // Genre is optional
    },
}, {
    // Sequelize options, including table name
    tableName: 'books',
    timestamps: true, // Enables createdAt and updatedAt fields by default
});
// Export the Book model to be used elsewhere in the app
exports.default = Book;
