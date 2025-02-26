import type { Actions, PageServerLoad } from './$types';

import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createUser, getUserByUsername } from '$lib/server/user/repo';
import { signUpSchema } from '$lib/modules/user/zod.validator';
import { createAndSetAuthTokenCookie } from '$lib/server/auth';

export const load = (async () => {
	return { form: await superValidate(zod(signUpSchema)) };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, cookies }) => {
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

		await createAndSetAuthTokenCookie(cookies, user);

		return redirect(303, '/');
	}
} satisfies Actions;
