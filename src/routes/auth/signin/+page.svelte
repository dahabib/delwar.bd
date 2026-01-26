<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	
	let email = $state('');
	let password = $state('');
	let loading = $state(false);
	let error = $state('');

	async function handleSubmit(e: any) {
		e.preventDefault();
		loading = true;
		error = '';

		try {
			const result = await signIn('credentials', {
				email,
				password,
				redirect: false,
			});

			if (!result?.ok) {
				error = result?.error || 'Invalid credentials';
			} else {
				window.location.href = '/dashboard';
			}
		} catch (err) {
			error = 'An error occurred. Please try again.';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Sign In - Delwar Ahmed</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900">
	<div class="w-full max-w-sm sm:max-w-md">
		<Card.Root class="bg-white dark:bg-slate-800/80 backdrop-blur-sm shadow-xl border border-slate-100 dark:border-slate-700">
			<Card.Header class="text-center">
				<div class="w-14 sm:w-16 h-14 sm:h-16 bg-linear-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
					<span class="text-white font-bold text-xl sm:text-2xl">DA</span>
				</div>
				<Card.Title class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
					Sign In
				</Card.Title>
				<Card.Description class="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
					Access your portfolio dashboard
				</Card.Description>
			</Card.Header>

			<Card.Content>
				{#if error}
					<div class="mb-6 p-3 sm:p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-lg">
						<p class="text-red-700 dark:text-red-300 text-xs sm:text-sm font-medium">{error}</p>
					</div>
				{/if}

				<form onsubmit={handleSubmit} class="space-y-4 sm:space-y-5">
					<div class="space-y-2">
						<Label for="email" class="text-xs sm:text-sm font-semibold">Email Address</Label>
						<Input
							id="email"
							type="email"
							bind:value={email}
							required
							placeholder="you@example.com"
							disabled={loading}
							class="h-10 sm:h-11"
						/>
					</div>

					<div class="space-y-2">
						<Label for="password" class="text-xs sm:text-sm font-semibold">Password</Label>
						<Input
							id="password"
							type="password"
							bind:value={password}
							required
							placeholder="••••••••"
							disabled={loading}
							class="h-10 sm:h-11"
						/>
					</div>

					<Button
						type="submit"
						disabled={loading}
						class="w-full h-10 sm:h-11 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all"
					>
						{loading ? 'Signing in...' : 'Sign In'}
					</Button>
				</form>

				<div class="mt-5 sm:mt-6 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
					<p class="text-center text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-mono">
						<strong>Demo:</strong> admin@example.com / admin123
					</p>
				</div>
			</Card.Content>

			<Card.Footer class="flex justify-center border-t border-slate-200 dark:border-slate-700">
				<a href="/" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline text-sm sm:text-base font-medium transition">
					← Back to home
				</a>
			</Card.Footer>
		</Card.Root>
	</div>
</div>
