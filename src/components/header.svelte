<script lang="ts">
	import HeaderLogo from './header-logo.svelte';
	import Navigation from './navigation.svelte';
</script>

<header class="bg-linear-to-b from-primary-700 to-primary-500 px-4 py-8 pb-36 lg:px-14">
	<div class="mx-auto max-w-(--breakpoint-2xl)">
		<div class="mb-14 flex w-full items-center justify-between">
			<div class="flex items-center lg:gap-x-16">
				<HeaderLogo />

				<Navigation />
				<!-- <nav
					class="mx-auto flex max-w-(--breakpoint-xl) flex-wrap items-center justify-between p-4 lg:hidden"
				>
					<button
						type="button"
						class="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-white outline-hidden hover:bg-white/20 focus:bg-white/30 focus-visible:ring-transparent focus-visible:ring-offset-0"
						aria-expanded={show}
						onclick={() => (show = true)}
					>
						<span class="sr-only">Open main menu</span>
						<svg
							class="h-5 w-5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 17 14"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M1 1h15M1 7h15M1 13h15"
							/>
						</svg>
					</button>

					<SideBar bind:show class="w-3/4 md:w-1/2">
						<SideBarHeading>{AppName}</SideBarHeading>
						<SideBarCloseButton onclick={() => (show = false)} />

						<div class="overflow-y-auto py-4">
							<ul class="space-y-2 font-medium">
								{#each routes as route}
									<li>
										<a
											href={route.href}
											class="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-300 dark:text-white dark:hover:bg-gray-700{$page
												.url.pathname === route.href
												? ' bg-gray-200 dark:bg-gray-600'
												: ''}"
										>
											<span class="ms-3">{route.label}</span>
										</a>
									</li>
								{/each}
							</ul>
						</div>
					</SideBar>
				</nav>
			</div> -->

				<!-- <div class="relative" bind:this={userMenuInstance}>
				<button type="button" onclick={() => (userMenuHidden = !userMenuHidden)}>
					<div
						class="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600"
					>
						<span class="font-medium text-gray-600 dark:text-gray-300">DE</span>
					</div>
				</button>

				<div
					class="right-0 top-11 z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700 {userMenuHidden
						? 'hidden'
						: 'absolute'}"
				>
					<div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
						<div>Demo Example</div>
						<div class="truncate font-medium">{data.user.username}</div>
					</div>
					{#if userRoutes.length}
						<ul
							class="py-2 text-sm text-gray-700 dark:text-gray-200"
							aria-labelledby="avatarButton"
						>
							{#each userRoutes as route}
								<li>
									<a
										href={route.href}
										class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
										>{route.label}</a
									>
								</li>
							{/each}
						</ul>
					{/if}
					<div class="py-1">
						<form action="/sign-out" method="post">
							<button
								type="submit"
								class="block w-full px-4 py-2 text-start text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
								>Sign out</button
							>
						</form>
					</div>
				</div> -->
			</div>
		</div>

		<div class="mb-4 space-y-2">
			<h2 class="text-2xl font-medium text-white lg:text-4xl">Welcome Back 👋🏻</h2>
			<p class="text-sm text-[#89b6fd] lg:text-base">This is your financial reports</p>
		</div>
	</div>
</header>
