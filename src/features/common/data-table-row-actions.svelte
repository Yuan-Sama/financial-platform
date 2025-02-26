<script lang="ts">
	import { buttonVariants } from '$lib/components/button';
	import * as DropdownMenu from '$lib/components/dropdown-menu';
	import { cn } from '$lib/utils';
	import { Edit, MoreHorizontal } from 'lucide-svelte';

	type MaybePromise<T> = T | Promise<T> | PromiseLike<T>;

	let { onEdit }: { onEdit?: () => MaybePromise<void> } = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class={cn(buttonVariants({ variant: 'ghost' }), 'size-8 p-0')}>
		<MoreHorizontal />
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Item class="cursor-pointer" onclick={onEdit}><Edit /> Edit</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
