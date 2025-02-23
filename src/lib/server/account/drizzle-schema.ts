import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const accounts = sqliteTable('accounts', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	userId: integer('user_id').notNull()
});
