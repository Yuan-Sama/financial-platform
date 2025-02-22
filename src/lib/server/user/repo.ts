import type { User } from '.';

import { db } from '$lib/server/database';
import { hashString, rawAndHashedStringMatch } from '$lib/server/auth';

export async function getUserByUsername(username: string) {
	return db.selectFrom('users').where('username', '==', username).selectAll().executeTakeFirst();
}
export async function getUserById(id: number) {
	return db.selectFrom('users').where('id', '==', id).selectAll().executeTakeFirst();
}

export async function createUser(data: { name: string; email: string; password: string }) {
	const hashedPassword = await hashString(data.password);

	const newUser = await db
		.insertInto('users')
		.values({
			name: data.name,
			username: data.email,
			password: hashedPassword
		})
		.returningAll()
		.executeTakeFirst();

	return newUser;
}

export async function comparePasswords(user: User, password: string) {
	return rawAndHashedStringMatch(password, user.password);
}
