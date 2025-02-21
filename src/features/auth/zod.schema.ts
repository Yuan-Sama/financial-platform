import { z } from 'zod';

export const signInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1, 'required')
});

export const signUpSchema = z.object({
	name: z.string().trim().min(1, 'required'),
	email: z.string().email(),
	password: z.string().min(1, 'required')
});
