"use strict";
// src/server.ts (or server.js if using ES modules)
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const books_1 = __importDefault(require("./routes/books")); // Make sure this file exists
const app = (0, express_1.default)();
exports.app = app;
const port = 3000;
app.use(express_1.default.json()); // Parse incoming JSON requests
// Mount the books router
app.use('/api/books', books_1.default);
// Only start the server if not in test mode
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}
