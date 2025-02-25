<script lang="ts">
	import { get } from 'svelte/store';
	import * as Sheet from '$components/ui/sheet';
	import UpdateAccountForm, { type UpdateForm } from './edit-form.svelte';
	import CreateAccountForm, { type CreateForm } from './create-form.svelte';

	let {
		form = undefined,
		open = $bindable(undefined),
		isLoading = false
	}: {
		form?: CreateForm | UpdateForm;
		open?: boolean | undefined;
		isLoading?: boolean;
	} = $props();

	function isUpdateForm(form: CreateForm | UpdateForm): form is UpdateForm {
		const { form: formData } = form as UpdateForm;
		return get(formData).id != undefined;
	}
</script>

<Sheet.Root {open} onOpenChange={() => (open = false)}>
	<Sheet.Content class="space-y-4" interactOutsideBehavior={isLoading ? 'ignore' : 'close'}>
		<Sheet.Header>
			{#if form}
				{#if isUpdateForm(form)}
					<Sheet.Title>Edit Account</Sheet.Title>
					<Sheet.Description>Edit an existing account.</Sheet.Description>
				{:else}
					<Sheet.Title>New Account</Sheet.Title>
					<Sheet.Description>Create a new account to track your transactions.</Sheet.Description>
				{/if}
			{/if}
		</Sheet.Header>
		{#if form}
			{#if isUpdateForm(form)}
				<UpdateAccountForm {form} />
			{:else}
				<CreateAccountForm {form} />
			{/if}
		{/if}
	</Sheet.Content>
</Sheet.Root>
