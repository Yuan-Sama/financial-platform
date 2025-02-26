import type { RequestHandler } from './$types';

import { deleteAccountSchema } from '$lib/modules/account/zod.validator';
import { deleteAccounts, getPageAccount } from '$lib/server/account/repo';
import { delay } from '$lib';

const { DEV } = import.meta.env;

export const POST: RequestHandler = async ({ locals, request }) => {
	const { user } = locals;
	if (!user)
		return Response.json(
			{ message: 'Unauthorized' },
			{
				status: 401
			}
		);

	if (DEV) await delay(1, 5);

	const data = await request.json();
	const validatedResult = await deleteAccountSchema.safeParseAsync(data);

	if (validatedResult.error)
		return Response.json({ message: validatedResult.error.errors[0].message }, { status: 400 });

	const { ids } = validatedResult.data;
	await deleteAccounts(user.id, ids);

	return Response.json(await getPageAccount(user.id, 1, 10));
};
