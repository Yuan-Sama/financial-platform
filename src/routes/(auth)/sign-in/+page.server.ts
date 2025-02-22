import type { Actions, PageServerLoad } from './$types';

import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { signInSchema } from '$lib/auth/zod-schema';
import { getUserByUsername, comparePasswords } from '$lib/server/user/repo';
import { createAndSetAuthTokenCookie } from '$lib/server/auth';

export const load = (async () => {
	return { form: await superValidate(zod(signInSchema)) };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(signInSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const { data } = form;
		const user = await getUserByUsername(data.email);
		if (!user) return message(form, 'Email or password incorrect', { status: 400 });

		const passwordsMatch = await comparePasswords(user, data.password);
		if (!passwordsMatch) return message(form, 'Email or password incorrect', { status: 400 });

		await createAndSetAuthTokenCookie(cookies, user);

		return redirect(302, '/');
	}
} satisfies Actions;
