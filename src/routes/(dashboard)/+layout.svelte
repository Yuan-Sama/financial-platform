<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	import { APP_NAME } from '$lib';
	import Header from '$lib/components/header.svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<svelte:head>
	<title>Dashboard - {APP_NAME}</title>
</svelte:head>

<Header displayName={data.user.name} />

{@render children()}
