<script lang="ts" module>
	export type UpdateForm = SuperForm<UpdateAccountSchemaType, any>;
</script>

<script lang="ts">
	import type { SuperForm } from 'sveltekit-superforms';
	import type { UpdateAccountSchemaType } from '$lib/account/zod-schema';

	import * as Form from '$components/ui/form';
	import { Input } from '$components/ui/input';
	import { Spinner } from '$features/shared';

	let { form }: { form: UpdateForm } = $props();

	const { enhance, form: formData, delayed } = form;
</script>

<form action="?/update" method="post" class="space-y-4 pt-4" use:enhance>
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

	<Form.Button class="w-full " disabled={$delayed}>
		Save Changes
		{#if $delayed}
			<Spinner class="ml-1" />
		{/if}
	</Form.Button>
</form>
