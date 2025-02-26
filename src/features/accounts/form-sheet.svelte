<script lang="ts">
	import type { CreateAccountForm } from './create-form.svelte';
	import type { EditAccountForm } from './edit-form.svelte';
	
	import { get } from 'svelte/store';
	import * as Sheet from '$lib/components/sheet';
	import EditForm from './edit-form.svelte';
	import CreateForm from './create-form.svelte';

	let {
		form = undefined,
		open = $bindable(undefined),
		isLoading = false
	}: {
		form?: CreateAccountForm | EditAccountForm;
		open?: boolean | undefined;
		isLoading?: boolean;
	} = $props();

	function isEditForm(form: CreateAccountForm | EditAccountForm): form is EditAccountForm {
		const { form: formData } = form as EditAccountForm;
		return get(formData).id != undefined;
	}
</script>

<Sheet.Root {open} onOpenChange={() => (open = false)}>
	<Sheet.Content class="space-y-4" interactOutsideBehavior={isLoading ? 'ignore' : 'close'}>
		<Sheet.Header>
			{#if form}
				{#if isEditForm(form)}
					<Sheet.Title>Edit Account</Sheet.Title>
					<Sheet.Description>Edit an existing account.</Sheet.Description>
				{:else}
					<Sheet.Title>New Account</Sheet.Title>
					<Sheet.Description>Create a new account to track your transactions.</Sheet.Description>
				{/if}
			{/if}
		</Sheet.Header>
		{#if form}
			{#if isEditForm(form)}
				<EditForm {form} />
			{:else}
				<CreateForm {form} />
			{/if}
		{/if}
	</Sheet.Content>
</Sheet.Root>
