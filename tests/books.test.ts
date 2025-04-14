import request from 'supertest';
import { app } from './testUtils'; // Make sure testUtils exports `app` correctly

let bookId: string; // <-- This was missing in your file

describe('Books API', () => {
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
    bookId = response.body.id;
  });

  it('should get all books', async () => {
    const response = await request(app).get('/api/books');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should update a book', async () => {
    const response = await request(app)
      .put(`/api/books/${bookId}`)
      .send({ available: false });

    expect(response.status).toBe(200);
    expect(response.body.available).toBe(false);
  });

  it('should delete a book', async () => {
    const response = await request(app).delete(`/api/books/${bookId}`);
    expect(response.status).toBe(200);
  });
});
