// src/server.ts (or server.js if using ES modules)

import express from 'express';
import booksRouter from './routes/books'; // Make sure this file exists

const app = express();
const port = 3000;

app.use(express.json()); // Parse incoming JSON requests

// Mount the books router
app.use('/api/books', booksRouter);

// Only start the server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

export { app };
