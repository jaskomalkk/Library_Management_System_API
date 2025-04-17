"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = exports.sequelize = void 0;
// Import necessary libraries
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const books_1 = __importDefault(require("./routes/books"));
const swagger_1 = require("../swagger/swagger"); // Import Swagger setup
const sequelize_1 = require("sequelize"); // Import Sequelize for ORM
// Initialize Express app
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Setup Sequelize (similar to Flask SQLAlchemy setup)
exports.sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: 'books.db' // Using SQLite as the database
});
// Define Book model (similar to models.book_model import in Flask)
exports.Book = exports.sequelize.define('Book', {
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    year_published: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    }
});
// Middleware setup
app.use((0, cors_1.default)()); // Enable CORS
app.use((0, helmet_1.default)()); // Apply security headers
app.use(express_1.default.json()); // Parse incoming JSON requests
// Set up Swagger UI for API documentation
app.use('/api-docs', swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.swaggerSpec)); // Serve Swagger UI
// Route for handling books-related API requests
app.use('/books', books_1.default); // Assuming booksRouter is defined in ./routes/books
// Sync Sequelize models and start server
exports.sequelize.sync()
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
