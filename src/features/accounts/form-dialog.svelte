<script lang="ts">
	import { get } from 'svelte/store';
	import * as Sheet from '$components/ui/sheet';
	import UpdateAccountForm, { type UpdateForm } from './edit-form.svelte';
	import CreateAccountForm, { type CreateForm } from './create-form.svelte';

	let {
		form = undefined,
		open = $bindable(undefined),
		onUpdate = undefined
	}: {
		form?: CreateForm | UpdateForm;
		open?: boolean | undefined;
		onUpdate?: () => void | undefined;
	} = $props();

	function isUpdateForm(form: CreateForm | UpdateForm): form is UpdateForm {
		const { form: formData } = form as UpdateForm;
		return get(formData).id != undefined;
	}
</script>

<Sheet.Root
	{open}
	onOpenChange={(isOpen) => {
		open = isOpen;
		return onUpdate?.();
	}}
>
	<Sheet.Content class="space-y-4">
		<Sheet.Header>
			<Sheet.Title>New Account</Sheet.Title>
			<Sheet.Description>Create a new account to track your transactions.</Sheet.Description>
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
