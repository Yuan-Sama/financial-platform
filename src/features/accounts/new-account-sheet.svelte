<script lang="ts">
	import * as Sheet from '$components/ui/sheet';
	import AccountForm, { type CreateForm, type UpdateForm } from './account-form.svelte';

	let {
		form,
		action,
		open = $bindable(false)
	}: { form: CreateForm | UpdateForm; action: string; open?: boolean | undefined } = $props();
</script>

<Sheet.Root
	{open}
	onOpenChange={() => {
		open = false;
	}}
>
	<Sheet.Content class="space-y-4">
		<Sheet.Header>
			<Sheet.Title>New Account</Sheet.Title>
			<Sheet.Description>Create a new account to track your transactions.</Sheet.Description>
		</Sheet.Header>
		<AccountForm {form} {action} />
	</Sheet.Content>
</Sheet.Root>
