<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	import '../app.css';
	import Logo from '$assets/logo.svg';
	import BackToTop from '$components/back-to-top.svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<svelte:head>
	<link rel="shortcut icon" href={Logo} type="image/svg" />
	<title>Financial Platform</title>
</svelte:head>

{@render children()}

<BackToTop />
