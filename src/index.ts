import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import booksRouter from './routes/books';


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/books', booksRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
