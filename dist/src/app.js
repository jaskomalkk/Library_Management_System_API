"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const books_1 = __importDefault(require("./routes/books"));
const swagger_1 = require("../swagger/swagger"); // Import Swagger
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)()); // Enable CORS
app.use((0, helmet_1.default)()); // Secure HTTP headers
app.use(express_1.default.json()); // Parse JSON bodies
// Swagger UI setup
app.use('/api-docs', swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.swaggerSpec)); // Serve Swagger UI
// Books API
app.use('/books', books_1.default); // Books routes handled by booksRouter
// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
