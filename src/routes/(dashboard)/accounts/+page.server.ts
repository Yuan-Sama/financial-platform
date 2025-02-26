import type { Actions, PageServerLoad } from './$types';

import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms';
import { delay } from '$lib';
import { createAccountSchema, editAccountSchema } from '$lib/modules/account/zod.validator';
import {
	createAccount,
	deleteAccount,
	getPageAccount,
	updateAccount
} from '$lib/server/account/repo';

const { DEV } = import.meta.env;

export const load = (async ({ parent }) => {
	const { user } = await parent();

	const createForm = await superValidate(zod(createAccountSchema));
	const updateForm = await superValidate(zod(editAccountSchema));

	const pagination = await getPageAccount(user.id, 1, 10);

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
		const newPagination = await getPageAccount(user.id, 1, 10);

		return { createForm, message: 'Account created', newPagination };
	},
	edit: async ({ locals, request }) => {
		const { user } = locals;
		const editForm = await superValidate(request, zod(editAccountSchema));

		if (!user) return fail(401, { editForm });

		if (DEV) await delay(1, 5);

		if (!editForm.valid) return message(editForm, 'Invalid form');

		await updateAccount({ userId: user.id, ...editForm.data });

		// TODO: update for search params
		const newPagination = await getPageAccount(user.id, 1, 10);

		return { editForm, message: 'Account updated', newPagination };
	},
	delete: async ({ locals, request }) => {
		const { user } = locals;
		const updateForm = await superValidate(request, zod(editAccountSchema));

		if (!user) return fail(401, { updateForm });

		if (DEV) await delay(1, 5);

		if (!updateForm.valid) return message(updateForm, 'Invalid form');

		await deleteAccount({ userId: user.id, id: updateForm.data.id });

		// TODO: update for search params
		const newPagination = await getPageAccount(user.id, 1, 10);

		return { updateForm, message: 'Account deleted', newPagination };
	}
} satisfies Actions;
