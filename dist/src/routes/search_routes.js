"use strict";
// routes/search_routes.ts
// This file contains the routes for handling the search API.
// It imports the controller logic and associates the search endpoint with the controller function.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const search_controller_1 = require("../controllers/search_controller"); // Import the search controller
// Create a Router for the search functionality
const searchRouter = express_1.default.Router();
// Define a GET route for searching books
searchRouter.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, search_controller_1.searchBooks)(req, res); // Calls the searchBooks function when /search is accessed
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred while searching for books', error: error.message });
    }
}));
// Export the router to be used in the main app
exports.default = searchRouter;
