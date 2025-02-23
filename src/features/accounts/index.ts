export { default as NewAccountSheet } from './new-account-sheet.svelte';
export { default as AccountForm } from './account-form.svelte';
export { default as DataTable } from './data-table.svelte';

import type { ColumnDef } from '@tanstack/table-core';
import { renderComponent } from '$components/ui/data-table';
import DataTableEmailButton from './data-table-email-button.svelte';

export type Payment = {
	id: string;
	amount: number;
	status: 'pending' | 'processing' | 'success' | 'failed';
	email: string;
};

export const columns: ColumnDef<Payment>[] = [
	{
		accessorKey: 'status',
		header: 'Status'
	},
	{
		accessorKey: 'email',
		header: ({ column }) =>
			renderComponent(DataTableEmailButton, {
				onclick: () => column.toggleSorting(column.getIsSorted() === 'asc')
			})
	},
	{
		accessorKey: 'amount',
		header: 'Amount'
	}
];
