import type { Actions, PageServerLoad } from './$types';

import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';
import { createAccountSchema, updateAccountSchema } from '$lib/account/zod-schema';

export const load = (async ({ parent }) => {
	await parent();

	const createForm = await superValidate(zod(createAccountSchema));
	const updateForm = await superValidate(zod(updateAccountSchema));

	return { createForm, updateForm };
}) satisfies PageServerLoad;

export const actions = {
	create: async ({ request }) => {
		const createForm = await superValidate(request, zod(createAccountSchema));

		if (!createForm.valid) return fail(400, { createForm });
	},
	update: async ({ request }) => {
		const updateForm = await superValidate(request, zod(updateAccountSchema));

		if (!updateForm.valid) return fail(400, { updateForm });
	}
} satisfies Actions;
