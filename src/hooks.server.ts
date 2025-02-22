import { AUTH_TOKEN, validateAuthToken } from '$lib/server/auth';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	const { cookies } = event;
	const authToken = cookies.get(AUTH_TOKEN) ?? '';
	const user = await validateAuthToken(authToken);
	event.locals.user = user ?? null;

	const repsonse = await resolve(event);

	return repsonse;
}) satisfies Handle;
