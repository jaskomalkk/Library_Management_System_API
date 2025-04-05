// src/models/userModel.ts
import bcrypt from 'bcrypt';

interface User {
  email: string;
  password: string;
}

// Simulating an in-memory database for users
let users: User[] = [];

// Utility function to find a user by email
function findUserByEmail(email: string): User | undefined {
  return users.find(user => user.email === email);
}

// Utility function to create a new user
function createUser(email: string, password: string): void {
  const salt = bcrypt.genSaltSync(10); // Generate salt
  const hashedPassword = bcrypt.hashSync(password, salt); // Hash the password

  const newUser: User = { email, password: hashedPassword };
  users.push(newUser); // Save the user to our in-memory "database"
}

export { findUserByEmail, createUser };
