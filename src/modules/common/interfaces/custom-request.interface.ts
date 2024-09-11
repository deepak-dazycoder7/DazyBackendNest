// src/types/custom-request.interface.ts
import { Request } from 'express';

export interface CustomRequest extends Request {
  user?: {
    sub?: number; 
    userId?: number; 
    email?: string;
    role?: string;
  };
}
