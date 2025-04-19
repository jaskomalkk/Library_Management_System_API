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
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const books_1 = __importDefault(require("./routes/books"));
const swagger_1 = require("../swagger/swagger"); // Swagger setup
// Load environment variables
dotenv_1.default.config();
// Initialize Express app
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Setup Sequelize (SQLite used here)
exports.sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: 'books.db'
});
// Define Book model
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
// Middleware
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(body_parser_1.default.json()); // Optional: You could use express.json() directly
// app.use(express.json()); // Alternative
// ✅ API Documentation
app.use('/api-docs', swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.swaggerSpec));
// ✅ Routes
app.use('/user', userRoutes_1.default);
app.use('/books', books_1.default);
// ✅ Sync DB and Start Server
exports.sequelize.sync()
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
