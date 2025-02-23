import type { Actions, PageServerLoad } from './$types';

import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';
import { createAccountSchema, updateAccountSchema } from '$lib/account/zod-schema';
import { delay } from '$lib';

type Payment = {
	id: string;
	amount: number;
	status: 'pending' | 'processing' | 'success' | 'failed';
	email: string;
};

const payments: Payment[] = [
	{
		id: '728ed52f',
		amount: 100,
		status: 'pending',
		email: 'm@example.com'
	},
	{
		id: '489e1d42',
		amount: 125,
		status: 'processing',
		email: 'example@gmail.com'
	}
	// ...
];

export const load = (async ({ parent }) => {
	await parent();

	const createForm = await superValidate(zod(createAccountSchema));
	const updateForm = await superValidate(zod(updateAccountSchema));

	return { createForm, updateForm, payments };
}) satisfies PageServerLoad;

export const actions = {
	create: async ({ request }) => {
		const createForm = await superValidate(request, zod(createAccountSchema));

		await delay(3, 5);

		if (!createForm.valid) return fail(400, { createForm });
	},
	update: async ({ request }) => {
		const updateForm = await superValidate(request, zod(updateAccountSchema));

		if (!updateForm.valid) return fail(400, { updateForm });
	}
} satisfies Actions;
