// See https://svelte.dev/docs/kit/types#app.d.ts

import type { UserEntity } from '$lib/modules/user';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: UserEntity | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
