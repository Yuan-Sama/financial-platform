<script lang="ts" module>
	import type { SuperForm } from 'sveltekit-superforms';
	import type { EditAccountSchema } from '$lib/modules/account/zod.validator';

	export type EditAccountForm = SuperForm<EditAccountSchema, any>;
</script>

<script lang="ts">
	import * as Form from '$lib/components/form';
	import { Input } from '$lib/components/input';
	import { Trash } from 'lucide-svelte';
	import Spinner from '../common/spinner.svelte';

	let { form }: { form: EditAccountForm } = $props();

	const { enhance, form: formData, delayed } = form;
	let action: '?/update' | '?/delete' = $state('?/update');
</script>

<form {action} method="post" class="space-y-4 pt-4" use:enhance>
	<Form.Field {form} name="id">
		<Form.Control>
			{#snippet children({ props })}
				<Input {...props} value={$formData.id} hidden />
			{/snippet}
		</Form.Control>
	</Form.Field>

	<Form.Field {form} name="name">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Name</Form.Label>
				<Input
					{...props}
					bind:value={$formData.name}
					placeholder="e.g. Cash, Bank, Credit Card"
					class="mt-2"
					disabled={$delayed}
				/>
				<Form.FieldErrors />
			{/snippet}
		</Form.Control>
	</Form.Field>

	<Form.Button class="w-full " disabled={$delayed} onclick={() => (action = '?/update')}>
		Save Changes
		{#if $delayed && action === '?/update'}
			<Spinner class="ml-1" />
		{/if}
	</Form.Button>
	<Form.Button
		class="w-full "
		disabled={$delayed}
		variant="outline-red"
		onclick={() => (action = '?/delete')}
	>
		<Trash />Delete account
		{#if $delayed && action === '?/delete'}
			<Spinner class="ml-1" variant="red" />
		{/if}
	</Form.Button>
</form>
