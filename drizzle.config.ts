import { defineConfig } from 'drizzle-kit';
const { DATABASE_URL } = process.env;
if (!DATABASE_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
	schema: './src/features/**/drizzle.schema.ts',

	dbCredentials: {
		url: DATABASE_URL
	},

	verbose: true,
	strict: true,
	dialect: 'sqlite'
});
