import { z } from 'zod';

const insertSchema = z.object({
	id: z.coerce
		.number({ required_error: 'id is required' })
		.min(1, { message: 'id must be greater than 0' }),
	name: z
		.string({ required_error: 'Name is required' })
		.trim()
		.min(1, { message: 'Name can not be empty' })
});

export const createAccountSchema = insertSchema.pick({ name: true });

export type CreateAccountSchema = z.infer<typeof createAccountSchema>;

export const editAccountSchema = insertSchema.pick({ id: true, name: true });

export type EditAccountSchema = z.infer<typeof editAccountSchema>;

export const deleteAccountSchema = z.object({
	ids: z.array(z.number().min(1, { message: 'id must be greater than 0' }))
});
