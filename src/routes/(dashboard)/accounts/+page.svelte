<script lang="ts">
	import type { PageData } from './$types';

	import { Button } from '$components/ui/button';
	import { superForm } from 'sveltekit-superforms';
	import { NewAccountSheet } from '$features/accounts';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { createAccountSchema, updateAccountSchema } from '$lib/account/zod-schema';

	let { data }: { data: PageData } = $props();

	let open = $state(false);

	const createForm = superForm(data.createForm, { validators: zodClient(createAccountSchema) });
	const updateForm = superForm(data.updateForm, { validators: zodClient(updateAccountSchema) });
</script>

<Button onclick={() => (open = true)}>Add new account</Button>

<NewAccountSheet bind:open form={createForm} action="?/create" />
