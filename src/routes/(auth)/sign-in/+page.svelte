<script lang="ts">
	import type { PageData } from './$types';

	import * as Form from '$components/ui/form';
	import * as Card from '$components/ui/card';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Input } from '$components/ui/input';
	import { Label } from '$components/ui/label';
	import { Checkbox } from '$components/ui/checkbox';
	import { signInSchema } from '$lib/auth/zod-schema';
	import { APP_NAME } from '$lib';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import Spinner from '$lib/components/spinner.svelte';

	let { data }: { data: PageData } = $props();

	let showPassword = $state(false);

	const form = superForm(data.form, {
		validators: zodClient(signInSchema),
		onUpdated({ form }) {
			if (!form.valid) {
				toast.error(form.message);
			}
		},
		onResult: async ({ result }) => {
			if (result.type === 'redirect') {
				await goto(result.location);
				toast.success('We are glad you are back');
			}
		}
	});
	const { form: formData, enhance, delayed } = form;
</script>

<svelte:head>
	<title>Login to your account - {APP_NAME}</title>
</svelte:head>

<Card.Root>
	<Card.Header>
		<Card.Title class="text-center text-2xl font-bold">Sign in to your account</Card.Title>
	</Card.Header>

	<Card.Content>
		<form method="POST" class="space-y-4 md:space-y-6" use:enhance>
			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label class="text-gray-800 text-sm mb-2 block">Your email</Form.Label>
						<Input
							{...props}
							bind:value={$formData.email}
							type="email"
							required
							placeholder="Enter email address"
							autocomplete="email"
							disabled={$delayed}
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
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
								autocomplete="current-password"
								disabled={$delayed}
							/>
							<button
								type="button"
								aria-label="show password"
								class="contents"
								onclick={() => (showPassword = !showPassword)}
								title="Show password"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill={showPassword ? '#1e2939' : '#bbb'}
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
				<Form.FieldErrors />
			</Form.Field>

			<div class="flex flex-wrap items-center justify-between gap-4">
				<div class="flex items-center text-sm">
					<Checkbox id="remember-me" disabled={$delayed} />
					<Label for="remember-me" class="ml-3 font-normal">Remember me</Label>
				</div>
				<div class="text-sm">
					<a href={'#'} class="text-primary hover:underline font-semibold">
						Forgot your password?
					</a>
				</div>
			</div>

			<div class="mt-8">
				<Form.Button class="w-full rounded-lg" disabled={$delayed}
					>Sign in
					{#if $delayed}
						<Spinner class="ml-1" />
					{/if}
				</Form.Button>
			</div>

			<p class="text-gray-800 text-sm mt-8 text-center">
				Don't have an account? <a
					href="/sign-up"
					class="text-primary hover:underline ml-1 whitespace-nowrap font-semibold">Register here</a
				>
			</p>
		</form>
	</Card.Content>
</Card.Root>
