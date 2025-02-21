import { signUpSchema } from '$features/auth/zod.schema';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { db } from '$lib/server/database';
import { createUser, getUserByUsername } from '$features/auth';

export const load = (async () => {
	return { form: await superValidate(zod(signUpSchema)) };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(signUpSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const { data } = form;

		const existedUser = await getUserByUsername(data.email);
		if (existedUser) {
			return message(form, 'User exists', { status: 400 });
		}

		const user = await createUser(data);
		if (!user) return message(form, 'Can not create user', { status: 400 });

		return message(form, 'Account created');
	}
} satisfies Actions;
