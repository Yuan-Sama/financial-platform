<script lang="ts">
	import type { PageData } from './$types';

	import LogoText from '$assets/logo-text.svg';
	import * as Form from '$components/ui/form';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { signInSchema } from '$features/auth/zod.schema';
	import { Input } from '$components/ui/input';
	import { Label } from '$components/ui/label';

	let { data }: { data: PageData } = $props();

	let showPassword = $state(false);

	const form = superForm(data.form, { validators: zodClient(signInSchema) });
	const { form: formData, enhance } = form;
</script>

<svelte:head>
	<title>Financial Platform - Login to your account</title>
</svelte:head>

<div class="min-h-screen flex flex-col items-center justify-center py-6 px-4">
	<div class="max-w-md w-full">
		<a href="/"><img src={LogoText} alt="logo" class="w-40 mb-8 mx-auto block" /> </a>

		<div class="p-8 rounded-2xl bg-white shadow">
			<h2 class="text-gray-800 text-center text-2xl font-bold">Sign in</h2>
			<form class="mt-8 space-y-4">
				<Form.Field {form} name="email">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label class="text-gray-800 text-sm mb-2 block">Email</Form.Label>
							<div class="relative flex items-center">
								<Input
									{...props}
									bind:value={$formData.email}
									type="email"
									required
									placeholder="Enter email address"
								/>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="#bbb"
									stroke="#bbb"
									class="w-4 h-4 absolute right-4"
									viewBox="0 0 24 24"
								>
									<circle cx="10" cy="7" r="6" data-original="#000000"></circle>
									<path
										d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
										data-original="#000000"
									></path>
								</svg>
							</div>
						{/snippet}
					</Form.Control>
				</Form.Field>

				<Form.Field {form} name="password">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label class="text-gray-800 text-sm mb-2 block">Password</Form.Label>
							<div class="relative flex items-center">
								<Input
									{...props}
									bind:value={$formData.password}
									type={showPassword ? 'text' : 'password'}
									required
									placeholder="Enter password"
								/>
								<button
									type="button"
									aria-label="show password"
									class="contents"
									onclick={() => (showPassword = !showPassword)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill={showPassword ? '#525252' : '#bbb'}
										stroke={showPassword ? '#525252' : '#bbb'}
										class="w-4 h-4 absolute right-4 cursor-pointer"
										viewBox="0 0 128 128"
									>
										<path
											d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
											data-original="#000000"
										></path>
									</svg>
								</button>
							</div>
						{/snippet}
					</Form.Control>
				</Form.Field>

				<div class="flex flex-wrap items-center justify-between gap-4">
					<div class="flex items-center">
						<input
							id="remember-me"
							name="remember-me"
							type="checkbox"
							class="h-4 w-4 shrink-0 text-primary focus:ring-primary-500 border-gray-300 rounded"
						/>
						<Label for="remember-me" class="ml-3">Remember me</Label>
					</div>
					<div class="text-sm">
						<a href={'#'} class="text-primary hover:underline font-semibold">
							Forgot your password?
						</a>
					</div>
				</div>

				<div class="!mt-8">
					<Form.Button class="w-full rounded-lg">Sign in</Form.Button>
				</div>
				<p class="text-gray-800 text-sm !mt-8 text-center">
					Don't have an account? <a
						href="/sign-up"
						class="text-primary hover:underline ml-1 whitespace-nowrap font-semibold"
						>Register here</a
					>
				</p>
			</form>
		</div>
	</div>
</div>
