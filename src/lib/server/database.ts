import type { Kyselify } from 'drizzle-orm/kysely';
import type { users } from '../modules/user/drizzle-schema.sqlite';
import type { accounts } from '../modules/account/drizzle-schema.sqlite';

import { env } from '$env/dynamic/private';
import SQLite from 'better-sqlite3';
import { Kysely, SqliteDialect } from 'kysely';

export interface Database {
	users: Kyselify<typeof users>;
	accounts: Kyselify<typeof accounts>;
}

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const dialect = new SqliteDialect({
	database: new SQLite(env.DATABASE_URL)
});

export const db = new Kysely<Database>({
	dialect
});
