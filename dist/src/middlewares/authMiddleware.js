"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const auth_1 = require("../utils/auth");
/**
 * Middleware to authenticate a user by verifying the JWT token.
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @param next - The next middleware function.
 */
function authenticate(req, res, next) {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        res.status(401).send('Authentication required');
        return; // Explicitly return after sending the response
    }
    const decoded = (0, auth_1.verifyToken)(token);
    if (decoded === 'Invalid token') {
        res.status(401).send('Invalid token');
        return; // Explicitly return after sending the response
    }
    req.user = decoded; // Store the decoded user info in the request object.
    next();
}
