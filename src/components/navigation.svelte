<script lang="ts">
	import { page } from '$app/state';

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
