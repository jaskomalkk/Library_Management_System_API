import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import booksRouter from './routes/books';
import { swaggerSpec, swaggerUi } from './config/swagger'; // Import Swagger

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(express.json());

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Books API
app.use('/books', booksRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
