import { redirect, type Actions } from '@sveltejs/kit';
import { deleteAuthTokenCookie } from '$lib/server/auth';

export const actions = {
	default: async ({ locals, cookies }) => {
		const user = locals.user;
		if (user) {
			deleteAuthTokenCookie(cookies);
			locals.user = null;
		}

		return redirect(303, '/landing');
	}
} satisfies Actions;
