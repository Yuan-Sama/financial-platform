<script lang="ts">
	import Logo from '$assets/logo.svg';
	import { APP_NAME } from '$lib';
	import UserButton from '$lib/user/components/user-button.svelte';
	import Navigation from './navigation.svelte';

	let { displayName }: { displayName: string } = $props();
</script>

<header class="bg-linear-to-b from-primary-700 to-primary-500 px-4 pt-8 pb-36 lg:px-14">
	<div class="mx-auto max-w-(--breakpoint-2xl)">
		<div class="mb-14 flex w-full items-center justify-between">
			<div class="flex items-center lg:gap-x-16">
				<!-- Header Logo -->
				<a href="/" class="hidden items-center lg:flex">
					<img class="h-7 w-7" src={Logo} alt="logo" />
					<span class="ml-2.5 text-2xl font-semibold text-white">
						{APP_NAME}
					</span>
				</a>

				<Navigation />
			</div>

			<UserButton {displayName} />
		</div>

		<div class="mb-4 space-y-2">
			<h2 class="text-2xl font-medium text-white lg:text-4xl">Welcome back, {displayName} 👋🏻</h2>
			<p class="text-sm text-[#89b6fd] lg:text-base">This is your Financial Overview Report</p>
		</div>
	</div>
</header>
