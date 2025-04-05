"use strict";
// src/server.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const app = express();
const port = 3000;
app.use(bodyParser.json()); // Parse incoming JSON requests
// Use the authentication routes
app.use('/api', authRoutes);
// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
