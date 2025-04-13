import * as bookService from '../services/book.service';


test('createBook creates a new book', async () => {
  const book = { title: '1984', author: 'George Orwell', available: true };
  const bookId = await bookService.createBook(book);
  expect(bookId).toBeDefined();
});

test('getBooks retrieves a list of books', async () => {
  const books = await bookService.getBooks();
  expect(books).toBeInstanceOf(Array);
});
