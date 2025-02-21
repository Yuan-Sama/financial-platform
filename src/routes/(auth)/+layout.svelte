<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	import LogoText from '$assets/logo-text.svg';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<div class="min-h-screen flex flex-col items-center justify-center py-6 px-4">
	<div class="max-w-md w-full">
		<a href="/"><img src={LogoText} alt="logo" class="w-40 mb-8 mx-auto block" /> </a>

		{@render children()}
	</div>
</div>
