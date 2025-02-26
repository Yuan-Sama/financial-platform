import type { ExpressionBuilder, ExpressionWrapper, SqlBool } from 'kysely';
import { db, type Database } from '../database';
import type { AccountEntity } from '$lib/modules/account';

export async function createAccount(data: { userId: number; name: string }) {
	return db
		.insertInto('accounts')
		.values({
			user_id: data.userId,
			name: data.name
		})
		.returning(['id'])
		.executeTakeFirst();
}

export async function updateAccount(data: AccountEntity) {
	return db
		.updateTable('accounts')
		.set({ name: data.name })
		.where((eb) => eb.and([eb('id', '==', data.id), eb('user_id', '==', data.userId)]))
		.executeTakeFirst();
}

export async function deleteAccount(data: { id: number; userId: number }) {
	return db
		.deleteFrom('accounts')
		.where((eb) => eb.and([eb('id', '==', data.id), eb('user_id', '==', data.userId)]))
		.executeTakeFirst();
}

function accountHasPredicates(
	eb: ExpressionBuilder<Database, 'accounts'>,
	data: { userId: number; search: string | null | undefined }
) {
	const predicates: ExpressionWrapper<Database, 'accounts', SqlBool>[] = [];

	predicates.push(eb('user_id', '==', data.userId));

	if (data.search) {
		predicates.push(eb('name', 'ilike', data.search));
	}

	return eb.and(predicates);
}

export async function getTotalRecords(
	userId: number,
	search: string | null | undefined = undefined
) {
	const countResult = await db
		.selectFrom('accounts')
		.where((eb) => accountHasPredicates(eb, { userId, search }))
		.select(db.fn.count<number>('id').as('count'))
		.executeTakeFirst();

	return countResult?.count ?? 0;
}

export async function getAccounts(
	userId: number,
	page: number,
	pageSize: number,
	search: string | null | undefined = undefined,
	orders: string[] = []
) {
	let query = db.selectFrom('accounts').where((eb) => accountHasPredicates(eb, { userId, search }));

	for (const order of orders) {
		const column = order.toLowerCase();
		switch (column) {
			case '-name':
				query = query.orderBy('name desc');
				break;
			default:
				query = query.orderBy('name');
		}
	}

	return query
		.offset(page * pageSize - pageSize)
		.limit(pageSize)
		.select(['id', 'name'])
		.execute();
}

export async function getPageAccount(
	userId: number,
	page: number,
	pageSize: number,
	search: string | null | undefined = undefined,
	orders: string[] = []
) {
	return {
		page,
		pageSize,
		totalRecords: await getTotalRecords(userId),
		data: await getAccounts(userId, page, pageSize, search, orders)
	};
}

export async function deleteAccounts(userId: number, ids: number[]) {
	return db.deleteFrom('accounts').where('user_id', '==', userId).where('id', 'in', ids).execute();
}
