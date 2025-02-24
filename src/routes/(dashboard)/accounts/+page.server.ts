import type { Actions, PageServerLoad } from './$types';

import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms';
import { delay } from '$lib';
import { createAccountSchema, updateAccountSchema } from '$lib/account/zod-schema';
import { createAccount, getPageAccount, updateAccount } from '$lib/server/account/repo';

const { DEV } = import.meta.env;

export const load = (async ({ parent }) => {
	const { user } = await parent();

	const createForm = await superValidate(zod(createAccountSchema));
	const updateForm = await superValidate(zod(updateAccountSchema));

	const pagination = await getPageAccount(user.id, 1, 5);

	return { createForm, updateForm, pagination };
}) satisfies PageServerLoad;

export const actions = {
	create: async ({ locals, request }) => {
		const { user } = locals;
		const createForm = await superValidate(request, zod(createAccountSchema));

		if (!user) return fail(401, { createForm });

		if (DEV) await delay(1, 5);

		if (!createForm.valid) return message(createForm, 'Invalid form');

		await createAccount({ userId: user.id, name: createForm.data.name });

		// if ((result?.id ?? 0) < 1)
		// 	return message(createForm, 'Failed to create account', { status: 400 });

		// TODO: update for search params
		const pagination = await getPageAccount(user.id, 1, 5);

		return { createForm, createSuccess: { message: 'Account created', pagination } };
	},
	update: async ({ locals, request }) => {
		const { user } = locals;
		const updateForm = await superValidate(request, zod(updateAccountSchema));

		if (!user) return fail(401, { updateForm });

		if (DEV) await delay(1, 5);

		if (!updateForm.valid) return message(updateForm, 'Invalid form');

		await updateAccount({ userId: user.id, ...updateForm.data });

		// TODO: update for search params
		const pagination = await getPageAccount(user.id, 1, 5);

		return { updateForm, updateSuccess: { message: 'Account updated', pagination } };
	}
} satisfies Actions;
