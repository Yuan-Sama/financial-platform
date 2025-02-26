import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		warmup: {
			clientFiles: ['./src/routes/**/*.svelte'],
			ssrFiles: ['./src/lib/server/**/*.ts']
		}
	}
});
