"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = require("../models/userModel");
const jwtUtils_1 = require("../utils/jwtUtils");
const router = express_1.default.Router();
// Sign-up route
router.post('/signup', (req, res) => {
    const { email, password } = req.body;
    if ((0, userModel_1.findUserByEmail)(email)) {
        res.status(400).send('User already exists');
        return; // No need to return a response object, just stop execution
    }
    (0, userModel_1.createUser)(email, password);
    res.status(201).send('User created');
});
// Login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = (0, userModel_1.findUserByEmail)(email);
    if (!user) {
        res.status(400).send('User not found');
        return; // Stop execution
    }
    const isPasswordValid = bcrypt_1.default.compareSync(password, user.password);
    if (!isPasswordValid) {
        res.status(400).send('Invalid credentials');
        return; // Stop execution
    }
    const token = (0, jwtUtils_1.generateToken)(user);
    res.status(200).send({ token });
});
// Middleware to protect routes that require authentication
function authenticateJWT(req, res, next) {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        res.status(401).send('Access Denied');
        return; // Stop execution
    }
    const user = (0, jwtUtils_1.verifyToken)(token);
    if (!user) {
        res.status(403).send('Invalid or expired token');
        return; // Stop execution
    }
    req.user = user; // Now TypeScript understands this
    next();
}
// Protected route example
router.get('/profile', authenticateJWT, (req, res) => {
    if (req.user) {
        res.status(200).send(`Hello ${req.user.email}, this is your profile!`);
    }
    else {
        res.status(400).send('User not authenticated');
    }
});
exports.default = router;
