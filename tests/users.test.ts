// tests/users.test.js

const request = require('supertest');
const express = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/usersController');
const app = express();
app.use(express.json());

// Dummy data for testing
let userId;

describe('Users API', () => {
  // Test for creating a new user
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        name: 'John Doe',
        role: 'admin',
      });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('John Doe');
    expect(response.body.role).toBe('admin');
    userId = response.body.id; // Save user ID for further tests
  });

  // Test for getting all users
  it('should get all users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test for updating a user
  it('should update a user', async () => {
    const response = await request(app)
      .put(`/api/users/${userId}`)
      .send({ role: 'manager' });
    expect(response.status).toBe(200);
    expect(response.body.role).toBe('manager');
  });

  // Test for deleting a user
  it('should delete a user', async () => {
    const response = await request(app).delete(`/api/users/${userId}`);
    expect(response.status).toBe(200);
  });
});
