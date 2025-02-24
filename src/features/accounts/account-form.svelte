<script lang="ts" module>
	export type CreateForm = SuperForm<CreateAccountSchemaType, any>;
	export type UpdateForm = SuperForm<UpdateAccountSchemaType, any>;
</script>

<script lang="ts">
	import type { SuperForm } from 'sveltekit-superforms';
	import type { CreateAccountSchemaType, UpdateAccountSchemaType } from '$lib/account/zod-schema';

	import * as Form from '$components/ui/form';
	import { Input } from '$components/ui/input';
	import { get } from 'svelte/store';
	import { Spinner } from '$features/shared';

	let {
		form,
		action
	}: {
		form: CreateForm | UpdateForm;
		action: string;
	} = $props();

	const { enhance, form: formData, delayed } = form;

	function isUpdateForm(form: CreateForm | UpdateForm): form is UpdateForm {
		const { form: formData } = form as UpdateForm;
		return get(formData).id != undefined;
	}
</script>

<form {action} method="post" class="space-y-4 pt-4" use:enhance>
	{#if isUpdateForm(form)}
		{@const { form: updateFormData } = form}
		<Form.Field {form} name="id">
			<Form.Control>
				{#snippet children({ props })}
					<Input {...props} value={get(updateFormData).id} hidden />
				{/snippet}
			</Form.Control>
		</Form.Field>
	{/if}

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
		{isUpdateForm(form) ? 'Save Changes' : 'Create account'}
		{#if $delayed}
			<Spinner class="ml-1" />
		{/if}
	</Form.Button>
</form>
