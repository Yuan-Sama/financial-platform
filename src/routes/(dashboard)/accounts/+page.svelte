<script lang="ts">
	type Account = { id: number; name: string };

	import type { ActionData, PageData } from './$types';
	import type { ColumnDef } from '@tanstack/table-core';
	import type { getPageAccount } from '$lib/server/account/repo';

	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	import { Plus } from 'lucide-svelte';

	import * as Card from '$components/ui/card';
	import { Button } from '$components/ui/button';
	import { Checkbox } from '$components/ui/checkbox';
	import { Skeleton } from '$components/ui/skeleton';
	import { renderComponent } from '$components/ui/data-table';

	import { superForm, type FormResult } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import { DataTableSortColumn, Spinner } from '$features/shared';
	import { DataTable, FormDialog, RowActions } from '$features/accounts';
	import { createAccountSchema, updateAccountSchema } from '$lib/account/zod-schema';

	let { data }: { data: PageData } = $props();

	let accounts = $state(data.pagination.data);
	let page = $state(data.pagination.page);
	let pageSize = $state(data.pagination.pageSize);
	let openSheet = $state(false);

	const createForm = superForm(data.createForm, {
		validators: zodClient(createAccountSchema),
		async onUpdate({ form, result }) {
			if (result.status === 401) {
				await goto('/sign-in', { invalidateAll: true });
				toast.error('Unauthorized');
				return;
			}

			const data = result.data as FormResult<ActionData>;

			if (form.valid && data.createSuccess) {
				const { message, pagination } = data.createSuccess;

				openSheet = false;
				toast.success(message);
				accounts = pagination.data;
			}
		}
	});

	const updateForm = superForm(data.updateForm, {
		validators: zodClient(updateAccountSchema),
		async onUpdate({ form, result }) {
			if (result.status === 401) {
				await goto('/sign-in', { invalidateAll: true });
				toast.error('Unauthorized');
				return;
			}

			const data = result.data as FormResult<ActionData>;

			if (form.valid && data.updateSuccess) {
				const { message, pagination } = data.updateSuccess;

				openSheet = false;
				toast.success(message);
				accounts = pagination.data;
			}
		}
	});

	const { delayed: createState } = createForm;
	const { delayed: updateState } = updateForm;
	let deleteState = $state(false);

	let isLoading = $derived.by(() => {
		return $createState || $updateState || deleteState;
	});

	let formMode: 'update' | 'create' | undefined = $state(undefined);

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
		},
		{
			id: 'actions',
			cell: ({ row }) =>
				renderComponent(RowActions, {
					onEdit() {
						const account = row.original;
						updateForm.form.set({ id: account.id, name: account.name });
						formMode = 'update';
						openSheet = true;
					}
				})
		}
	];

	$inspect(isLoading);
</script>

{#if isLoading}
	<div class="px-4 lg:px-14 pb-10 -mt-24">
		<Card.Root class="border-none drop-shadow-sm">
			<Card.Header>
				<Skeleton class="h-8 w-48" />
			</Card.Header>
			<Card.Content>
				<div class="h-[500px] w-full flex items-center justify-center">
					<Spinner class="size-10" />
				</div>
			</Card.Content>
		</Card.Root>
	</div>
{:else}
	<div class="px-4 lg:px-14 pb-10 -mt-24">
		<Card.Root class="border-none drop-shadow-sm max-w-screen-2xl w-full mx-auto">
			<Card.Header class="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
				<Card.Title class="text-xl line-clamp-1">Accounts page</Card.Title>
				<Button
					size="sm"
					onclick={() => {
						openSheet = true;
						formMode = 'create';
					}}><Plus />Add new</Button
				>
			</Card.Header>
			<Card.Content>
				<DataTable
					data={accounts}
					paginationState={{ pageIndex: page - 1, pageSize }}
					{columns}
					onDelete={async (rows) => {
						deleteState = true;

						const ids = rows.map((row) => row.original.id);

						const response = await fetch('/api/accounts/bulk-delete', {
							method: 'POST',
							body: JSON.stringify({ ids })
						});

						if (response.status === 401) {
							await goto('/sign-in', { invalidateAll: true });

							deleteState = false;

							toast.error('Unauthorized');
							return;
						}

						if (!response.ok) {
							const data = (await response.json()) as { message: string };

							deleteState = false;

							toast.error(data.message);
							return;
						}

						const pagination = await (response.json() as ReturnType<typeof getPageAccount>);
						accounts = pagination.data;

						deleteState = false;

						toast.success('Accounts deleted');
					}}
					filterKey="name"
					disabled={deleteState}
				/>
			</Card.Content>
		</Card.Root>
	</div>
{/if}

<FormDialog
	bind:open={openSheet}
	form={formMode === 'update' ? updateForm : formMode === 'create' ? createForm : undefined}
	onUpdate={() => {
		if (formMode === 'update') {
			updateForm.reset({ data: undefined });
		} else if (formMode === 'create') createForm.reset({ data: undefined });

		formMode = undefined;
	}}
/>
