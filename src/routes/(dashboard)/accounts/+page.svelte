<script lang="ts">
	type Account = { id: number; name: string };

	import type { PageData } from './$types';
	import type { ColumnDef } from '@tanstack/table-core';

	import { Plus } from 'lucide-svelte';

	import * as Card from '$components/ui/card';
	import { Button } from '$components/ui/button';
	import { Checkbox } from '$components/ui/checkbox';
	import { renderComponent } from '$components/ui/data-table';

	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import { DataTableSortColumn } from '$features/shared';
	import { DataTable, NewAccountSheet } from '$features/accounts';
	import { createAccountSchema, updateAccountSchema } from '$lib/account/zod-schema';

	let { data }: { data: PageData } = $props();

	let { data: accounts, page, pageSize, totalRecords } = data.pagination;
	let open = $state(false);

	const createForm = superForm(data.createForm, { validators: zodClient(createAccountSchema) });
	const updateForm = superForm(data.updateForm, { validators: zodClient(updateAccountSchema) });

	const columns: ColumnDef<Account>[] = [
		{
			id: 'select',
			header: ({ table }) =>
				renderComponent(Checkbox, {
					checked: table.getIsAllPageRowsSelected(),
					indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
					onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
					'aria-label': 'Select all'
				}),
			cell: ({ row }) =>
				renderComponent(Checkbox, {
					checked: row.getIsSelected(),
					onCheckedChange: (value) => row.toggleSelected(!!value),
					'aria-label': 'Select row'
				}),
			enableSorting: false,
			enableHiding: false
		},
		{
			accessorKey: 'name',
			header: ({ column }) =>
				renderComponent(DataTableSortColumn, {
					onclick: () => column.toggleSorting(),
					isSorted: column.getIsSorted(),
					text: 'Name'
				})
		}
	];
</script>

<div class="px-4 lg:px-14 pb-10 -mt-24">
	<Card.Root class="border-none drop-shadow-sm max-w-screen-2xl w-full mx-auto">
		<Card.Header class="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
			<Card.Title class="text-xl line-clamp-1">Accounts page</Card.Title>
			<Button size="sm" onclick={() => (open = true)}><Plus />Add new</Button>
		</Card.Header>
		<Card.Content>
			<DataTable data={accounts} {columns} onDelete={() => {}} filterKey="name" disabled />
		</Card.Content>
	</Card.Root>
</div>

<NewAccountSheet bind:open form={createForm} action="?/create" />
