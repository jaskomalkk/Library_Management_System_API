"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
const password_1 = require("../utils/password");
const auth_1 = require("../utils/auth");
const users = []; // In-memory database for demonstration
/**
 * Register a new user by hashing the password.
 * @param username - The username of the user.
 * @param password - The password of the user.
 * @returns {Promise<string>} - A message or error.
 */
function registerUser(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = yield (0, password_1.hashPassword)(password);
        const newUser = { userId: `${Date.now()}`, username, password: hashedPassword };
        users.push(newUser);
        return 'User registered successfully';
    });
}
/**
 * Login an existing user by comparing passwords and generating a token.
 * @param username - The username of the user.
 * @param password - The password of the user.
 * @returns {Promise<string>} - The generated token or error message.
 */
function loginUser(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = users.find((user) => user.username === username);
        if (!user)
            return 'User not found';
        const isPasswordCorrect = yield (0, password_1.comparePassword)(password, user.password);
        if (!isPasswordCorrect)
            return 'Invalid password';
        const token = (0, auth_1.generateToken)(user.userId);
        return token;
    });
}
