import type { Actions, PageServerLoad } from './$types';

import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';
import { createAccountSchema, updateAccountSchema } from '$lib/account/zod-schema';
import { delay } from '$lib';
import { getPageAccount, getTotalRecords } from '$lib/server/account/repo';

const { DEV } = import.meta.env;

export const load = (async ({ parent }) => {
	const { user } = await parent();

	const createForm = await superValidate(zod(createAccountSchema));
	const updateForm = await superValidate(zod(updateAccountSchema));

	const pagination = {
		page: 1,
		pageSize: 5,
		totalRecords: await getTotalRecords(user.id),
		data: await getPageAccount(user.id, 1, 5)
	};

	return { createForm, updateForm, pagination };
}) satisfies PageServerLoad;

export const actions = {
	create: async ({ request }) => {
		const createForm = await superValidate(request, zod(createAccountSchema));

		if (DEV) await delay(1, 5);

		if (!createForm.valid) return fail(400, { createForm });
	},
	update: async ({ request }) => {
		const updateForm = await superValidate(request, zod(updateAccountSchema));

		if (DEV) await delay(1, 5);

		if (!updateForm.valid) return fail(400, { updateForm });
	}
} satisfies Actions;
