<script lang="ts">
	import { goto } from '$app/navigation';

	import * as Avatar from '$components/ui/avatar';
	import * as DropdownMenu from '$components/ui/dropdown-menu';

	import { createAvatar } from '@dicebear/core';
	import { adventurer } from '@dicebear/collection';
	
	import { LogOut, User } from 'lucide-svelte';

	let { displayName }: { displayName: string } = $props();

	const avatar = createAvatar(adventurer, {
		seed: 'Sophia',
		backgroundColor: ['d1d4f9', 'ffdfbf'],
		backgroundType: ['gradientLinear']
	});
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class="hover:cursor-pointer" title={displayName}
		><Avatar.Root>
			<Avatar.Image src={avatar.toDataUri()} alt={displayName} />
			<Avatar.Fallback>{displayName.substring(0, 2).toUpperCase()}</Avatar.Fallback>
		</Avatar.Root></DropdownMenu.Trigger
	>

	<DropdownMenu.Content align="end">
		<DropdownMenu.Group>
			<DropdownMenu.GroupHeading>{displayName}</DropdownMenu.GroupHeading>
			<DropdownMenu.Separator />
			<DropdownMenu.Item class="hover:cursor-pointer">
				<User class="mr-2" />
				<span>Profile</span>
			</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Item
				class="hover:cursor-pointer"
				onclick={async () => {
					const response = await fetch('/api/log-out', {
						method: 'POST'
					});

					const data = await response.json();

					if (data.location) return await goto(data.location, { invalidateAll: true });
				}}
			>
				<LogOut class="mr-2" />
				<span>Log out</span>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
