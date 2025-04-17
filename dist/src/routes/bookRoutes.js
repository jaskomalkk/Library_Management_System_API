"use strict";
// routes/bookRoutes.js
const express = require('express');
const { getBooksByCategory } = require('../controllers/bookController');
const router = express.Router();
router.get('/books', getBooksByCategory);
module.exports = router;
