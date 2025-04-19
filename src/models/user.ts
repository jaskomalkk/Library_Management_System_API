import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/auth';

interface User {
  userId: string;
  username: string;
  password: string;
}

const users: User[] = [];  // In-memory database for demonstration

/**
 * Register a new user by hashing the password.
 * @param username - The username of the user.
 * @param password - The password of the user.
 * @returns {Promise<string>} - A message or error.
 */
export async function registerUser(username: string, password: string): Promise<string> {
  const hashedPassword = await hashPassword(password);
  const newUser = { userId: `${Date.now()}`, username, password: hashedPassword };
  users.push(newUser);
  return 'User registered successfully';
}

/**
 * Login an existing user by comparing passwords and generating a token.
 * @param username - The username of the user.
 * @param password - The password of the user.
 * @returns {Promise<string>} - The generated token or error message.
 */
export async function loginUser(username: string, password: string): Promise<string> {
  const user = users.find((user) => user.username === username);
  if (!user) return 'User not found';

  const isPasswordCorrect = await comparePassword(password, user.password);
  if (!isPasswordCorrect) return 'Invalid password';

  const token = generateToken(user.userId);
  return token;
}
