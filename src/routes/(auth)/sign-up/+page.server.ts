import { signUpSchema } from '$features/auth/zod.schema';
import type { PageServerLoad } from './$types';

import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = (async () => {
	return { form: await superValidate(zod(signUpSchema)) };
}) satisfies PageServerLoad;
