// tests/books.test.js

const request = require('supertest');
const express = require('express');
const { getBooks, createBook, updateBook, deleteBook } = require('../controllers/booksController');
const app = express();
app.use(express.json());

// Dummy data for testing
let bookId;

describe('Books API', () => {
  // Test for creating a new book
  it('should create a new book', async () => {
    const response = await request(app)
      .post('/api/books')
      .send({
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        available: true,
      });
    expect(response.status).toBe(201);
    expect(response.body.title).toBe('The Great Gatsby');
    expect(response.body.author).toBe('F. Scott Fitzgerald');
    bookId = response.body.id; // Save book ID for further tests
  });

  // Test for getting all books
  it('should get all books', async () => {
    const response = await request(app).get('/api/books');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test for updating a book
  it('should update a book', async () => {
    const response = await request(app)
      .put(`/api/books/${bookId}`)
      .send({ available: false });
    expect(response.status).toBe(200);
    expect(response.body.available).toBe(false);
  });

  // Test for deleting a book
  it('should delete a book', async () => {
    const response = await request(app).delete(`/api/books/${bookId}`);
    expect(response.status).toBe(200);
  });
});
