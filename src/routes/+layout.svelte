<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import '../app.css';
	import Logo from '$assets/logo.svg';
	import { APP_NAME } from '$lib';
	import { Toaster } from '$lib/components/sonner';
	import BackToTop from '$features/root/back-to-top.svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<svelte:head>
	<link rel="shortcut icon" href={Logo} type="image/svg" />
	<title>{APP_NAME}</title>
</svelte:head>

<Toaster closeButton richColors />

{@render children()}

<BackToTop />
