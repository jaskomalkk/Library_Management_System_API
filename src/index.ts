import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import booksRouter from './routes/books';

import { swaggerSpec, swaggerUi } from './config/swagger'; // Import Swagger

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());  // Enable CORS
app.use(helmet());  // Secure HTTP headers
app.use(express.json());  // Parse JSON bodies

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));  // Serve Swagger UI

// Books API
app.use('/books', booksRouter);  // Books routes handled by booksRouter

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
