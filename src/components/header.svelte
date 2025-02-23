<script lang="ts">
	import HeaderLogo from './header-logo.svelte';
	import Navigation from './navigation.svelte';
	import UserButton from './user-button.svelte';

	let { displayName }: { displayName: string } = $props();
</script>

<header class="bg-linear-to-b from-primary-700 to-primary-500 px-4 pt-8 pb-36 lg:px-14">
	<div class="mx-auto max-w-(--breakpoint-2xl)">
		<div class="mb-14 flex w-full items-center justify-between">
			<div class="flex items-center lg:gap-x-16">
				<HeaderLogo />

				<Navigation />
			</div>

			<UserButton {displayName} />
		</div>

		<div class="mb-4 space-y-2">
			<h2 class="text-2xl font-medium text-white lg:text-4xl">Welcome to Dashboard 👋🏻</h2>
			<p class="text-sm text-[#89b6fd] lg:text-base">This is your financial reports</p>
		</div>
	</div>
</header>
