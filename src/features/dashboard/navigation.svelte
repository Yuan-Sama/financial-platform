<script lang="ts">
	import Logo from '$assets/logo.svg';
	import { page } from '$app/state';
	import { APP_NAME } from '$lib';
	import { Menu } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import * as Sheet from '$lib/components/sheet';
	import { Button, buttonVariants } from '$lib/components/button';

	const routes = [
		{
			href: '/',
			label: 'Overview'
		},
		{
			href: '/transactions',
			label: 'Transactions'
		},
		{
			href: '/accounts',
			label: 'Accounts'
		},
		{
			href: '/categories',
			label: 'Categories'
		},
		{
			href: '/settings',
			label: 'Settings'
		}
	];
</script>

<nav class="hidden items-center gap-x-2 overflow-x-auto lg:flex">
	{#each routes as route}
		<a
			class="mb-2 me-2 rounded-lg px-3 py-2 text-center text-sm font-medium text-white outline-hidden hover:bg-white/20 focus:bg-white/30 focus-visible:ring-transparent focus-visible:ring-offset-0 transition{page
				.url.pathname === route.href
				? ' bg-white/10'
				: ''}"
			href={route.href}>{route.label}</a
		>
	{/each}
</nav>

<Sheet.Root>
	<Sheet.Trigger
		class={cn(
			buttonVariants({ variant: 'outline', size: 'sm' }),
			'lg:hidden',
			'font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-hidden text-white focus:bg-white/30 transition'
		)}><Menu /></Sheet.Trigger
	>

	<Sheet.Content side="left" class="px-2">
		<div class="w-full flex justify-start items-center pt-5 px-4">
			<img class="h-7 w-7" src={Logo} alt="logo" />
			<span class="ml-2.5 text-xl font-semibold text-primary">
				{APP_NAME}
			</span>
		</div>
		<nav class="flex flex-col gap-y-2 pt-6">
			{#each routes as route}
				<Button
					href={route.href}
					variant={page.url.pathname === route.href ? 'secondary' : 'ghost'}
					class="w-full justify-start">{route.label}</Button
				>
			{/each}
		</nav>
	</Sheet.Content>
</Sheet.Root>
