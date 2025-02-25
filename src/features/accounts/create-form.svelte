<script lang="ts" module>
	export type CreateForm = SuperForm<CreateAccountSchemaType, any>;
</script>

<script lang="ts">
	import type { SuperForm } from 'sveltekit-superforms';
	import type { CreateAccountSchemaType } from '$lib/account/zod-schema';

	import * as Form from '$components/ui/form';
	import { Input } from '$components/ui/input';
	import { Spinner } from '$features/shared';

	let { form }: { form: CreateForm } = $props();

	const { enhance, form: formData, delayed } = form;
</script>

<form action="?/create" method="post" class="space-y-4 pt-4" use:enhance>
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

	<Form.Button class="w-full " disabled={$delayed}>
		Create account
		{#if $delayed}
			<Spinner class="ml-1" />
		{/if}
	</Form.Button>
</form>
