<script lang="ts">
	type Account = { id: number; name: string };
	type ValidatedForm =
		| SuperValidated<CreateAccountSchema, any, CreateAccountSchema>
		| SuperValidated<EditAccountSchema, any, EditAccountSchema>;
	type ResultTypeOnUpdate = Required<
		Extract<
			ActionResult,
			{
				type: 'success' | 'failure';
			}
		>
	>;

	import type { ActionData, PageData } from './$types';
	import type { ColumnDef } from '@tanstack/table-core';
	import type { getPageAccount } from '$lib/server/account/repo';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import * as Card from '$lib/components/card';
	import { Button } from '$lib/components/button';
	import { Checkbox } from '$lib/components/checkbox';
	import { Skeleton } from '$lib/components/skeleton';
	import { renderComponent } from '$lib/components/data-table';
	import { superForm, type FormResult, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import {
		createAccountSchema,
		editAccountSchema,
		type CreateAccountSchema,
		type EditAccountSchema
	} from '$lib/modules/account/zod.validator';
	import Spinner from '$features/common/spinner.svelte';
	import DataTable from '$features/common/data-table.svelte';
	import DataTableRowActions from '$features/common/data-table-row-actions.svelte';
	import DataTableSortColumn from '$features/common/data-table-sort-column.svelte';
	import FormSheet from '$features/accounts/form-sheet.svelte';
	import { Plus } from 'lucide-svelte';
	import type { ActionResult } from '@sveltejs/kit';

	let { data }: { data: PageData } = $props();

	let accounts = $state(data.pagination.data);
	let page = $state(data.pagination.page);
	let pageSize = $state(data.pagination.pageSize);
	let openSheet = $state(false);

	async function onUpdate({ form, result }: { form: ValidatedForm; result: ResultTypeOnUpdate }) {
		if (result.status === 401) {
			await goto('/sign-in', { invalidateAll: true });
			toast.error('Unauthorized');
			return;
		}

		if (!form.valid) return;

		const data = result.data as FormResult<ActionData>;

		const { message, newPagination } = data;
		if (newPagination) {
			// TODO: page and pageSize
			accounts = newPagination.data;
		}

		openSheet = false;

		if (message) toast.success(message);
	}

	function onUpdated({ form }: { form: Readonly<ValidatedForm> }) {
		formMode = undefined;
	}

	const createForm = superForm(data.createForm, {
		delayMs: 100,
		validators: zodClient(createAccountSchema),
		onUpdate,
		onUpdated
	});

	const { delayed: createState } = createForm;

	const updateForm = superForm(data.updateForm, {
		delayMs: 100,
		validators: zodClient(editAccountSchema),
		onUpdate,
		onUpdated
	});
	const { delayed: updateState } = updateForm;

	let deleteState = $state(false);

	let isLoading = $derived.by(() => {
		return $createState || $updateState || deleteState;
	});

	let formMode: 'edit' | 'create' | undefined = $state(undefined);

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
				renderComponent(DataTableRowActions, {
					onEdit() {
						const account = row.original;
						updateForm.form.set({ id: account.id, name: account.name });
						formMode = 'edit';
						openSheet = true;
					}
				})
		}
	];
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

<FormSheet
	bind:open={openSheet}
	{isLoading}
	form={formMode === 'edit' ? updateForm : formMode === 'create' ? createForm : undefined}
/>
