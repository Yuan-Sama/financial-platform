<script lang="ts">
	import type { PageData } from './$types';

	import * as Card from '$components/ui/card';
	import { Button } from '$components/ui/button';
	import { superForm } from 'sveltekit-superforms';
	import { columns, DataTable, NewAccountSheet } from '$features/accounts';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { createAccountSchema, updateAccountSchema } from '$lib/account/zod-schema';
	import { Plus } from '$components/icons';

	let { data }: { data: PageData } = $props();

	let open = $state(false);

	const createForm = superForm(data.createForm, { validators: zodClient(createAccountSchema) });
	const updateForm = superForm(data.updateForm, { validators: zodClient(updateAccountSchema) });
</script>

<div class="px-4 lg:px-14 pb-10 -mt-24">
	<Card.Root class="border-none drop-shadow-sm max-w-screen-2xl w-full mx-auto">
		<Card.Header class="gap-y-2 lg:flex-row lg:items-center lg:justify-between pb-6">
			<Card.Title class="text-xl line-clamp-1">Accounts page</Card.Title>
			<Button size="sm" onclick={() => (open = true)}><Plus class="!size-5"/>Add new</Button>
		</Card.Header>
		<Card.Content>
			<DataTable data={data.payments} {columns} />
		</Card.Content>
	</Card.Root>
</div>

<NewAccountSheet bind:open form={createForm} action="?/create" />
