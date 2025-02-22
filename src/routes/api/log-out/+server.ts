import type { RequestHandler } from './$types';

import { deleteAuthTokenCookie } from '$lib/server/auth';

export const POST: RequestHandler = ({ locals, cookies }) => {
	const user = locals.user;

	if (user) {
		deleteAuthTokenCookie(cookies);
		locals.user = null;
	}

	return Response.json(
		{ location: '/landing' },
		{
			status: 303
		}
	);
};
