import { signInSchema } from '$features/auth/zod.schema';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { checkPassword, getUserByUsername } from '$features/auth';

export const load = (async () => {
	return { form: await superValidate(zod(signInSchema)) };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(signInSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const { data } = form;
		const user = await getUserByUsername(data.email);
		if (!user) return message(form, 'Email or password incorrect', { status: 400 });

		const passwordsMatch = await checkPassword(user, data.password);
		if (!passwordsMatch) return message(form, 'Email or password incorrect', { status: 400 });

		return message(form, 'Welcome back');
	}
} satisfies Actions;
