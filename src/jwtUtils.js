// src/utils/jwtUtils.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY; // Read secret key from environment variables

// Generate a JWT token
function generateToken(user) {
  const payload = { email: user.email }; // You can include additional info if needed
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
  return token;
}

// Verify a JWT token
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey); // Verify and decode the token
    return decoded;
  } catch (err) {
    return null; // Invalid or expired token
  }
}

module.exports = { generateToken, verifyToken };
