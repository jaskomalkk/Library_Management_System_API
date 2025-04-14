import request from 'supertest';
import app from '../app';
import bcrypt from 'bcryptjs';
import User from '../models/user';

describe('Authentication Routes', () => {
  let userId: string;

  // Create a user before running the tests
  beforeAll(async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = new User({
      username: 'jane_doe',
      email: 'jane.doe@example.com',
      password: hashedPassword,
    });
    await user.save();
    userId = user._id.toString();
  });

  // Test for login with valid credentials
  it('should login with valid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'jane.doe@example.com', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  // Test for login with invalid credentials
  it('should return error for invalid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'jane.doe@example.com', password: 'wrongpassword' });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });
});
