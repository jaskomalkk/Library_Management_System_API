"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = findUserByEmail;
exports.createUser = createUser;
// src/models/userModel.ts
const bcrypt_1 = __importDefault(require("bcrypt"));
// Simulating an in-memory database for users
let users = [];
// Utility function to find a user by email
function findUserByEmail(email) {
    return users.find(user => user.email === email);
}
// Utility function to create a new user
function createUser(email, password) {
    const salt = bcrypt_1.default.genSaltSync(10); // Generate salt
    const hashedPassword = bcrypt_1.default.hashSync(password, salt); // Hash the password
    const newUser = { email, password: hashedPassword };
    users.push(newUser); // Save the user to our in-memory "database"
}
