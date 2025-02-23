import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const { user } = locals;
	
	if (!user) return redirect(307, '/landing');

	return { user };
}) satisfies LayoutServerLoad;
