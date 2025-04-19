import bcrypt from 'bcryptjs';

/**
 * Function to hash a password.
 * @param password - The password to hash.
 * @returns {Promise<string>} - The hashed password.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

/**
 * Function to compare a password with a hashed password.
 * @param password - The password to compare.
 * @param hashedPassword - The hashed password.
 * @returns {Promise<boolean>} - Whether the passwords match.
 */
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}
