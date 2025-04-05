// src/types/express/index.d.ts
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Adjust 'any' to the actual type for the user
    }
  }
}
