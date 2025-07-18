import { z } from 'zod';

export const userSignUpSchema = z.object({
  email: z.email(),
  role: z.enum(['student', 'company', 'admin']),
  password: z.string()
});

export const userSignInSchema = z.object({
  email: z.email(),
  password: z.string()
});