<script lang="ts">
	import { adventurer } from '@dicebear/collection';
	import * as Avatar from './ui/avatar';
	import * as DropdownMenu from './ui/dropdown-menu';
	import { createAvatar } from '@dicebear/core';
	import { LogOut, User } from './icons';

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
			<DropdownMenu.Item class="hover:cursor-pointer">
				<form action="/log-out" method="post" class="contents hover:cursor-pointer">
					<button type="submit" class="contents hover:cursor-pointer">
						<LogOut class="mr-2" />
						<span>Log out</span>
					</button>
				</form>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
