// tests/testUtils.ts
import express from 'express';

const app = express();
app.use(express.json());

// Here, you can import your controllers and set up the routes
// e.g., app.use('/api/books', booksRoutes);
// e.g., app.use('/api/users', usersRoutes);

export { app };
