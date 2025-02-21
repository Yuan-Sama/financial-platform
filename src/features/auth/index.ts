import bcrypt from 'bcrypt';
import { db } from '$lib/server/database';
import type { User } from './drizzle.schema';

const saltRounds = 12;

export async function getUserByUsername(username: string) {
	return db.selectFrom('users').where('username', '==', username).selectAll().executeTakeFirst();
}

export async function createUser(data: { name: string; email: string; password: string }) {
	const hashedPassword = await bcrypt.hash(data.password, saltRounds);

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

export async function checkPassword(user: User, password: string) {
	return bcrypt.compare(password, user.password);
}
