<script lang="ts">
	import type { PageData } from './$types';

	import { APP_NAME } from '$lib';
	import Header from '$components/header.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Dashboard - {APP_NAME}</title>
</svelte:head>

<Header displayName={data.user.name} />
