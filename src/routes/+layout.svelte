<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Nav from '$lib/components/nav.svelte';
	import '../app.css';

	let { children } = $props();
	let session: any = $state();

	onMount(() => {
		// Get session from page data
		if ($page.data?.session) {
			session = $page.data.session;
		}

		// Initialize dark mode from localStorage or system preference
		const savedTheme = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		
		if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	});
</script>

<svelte:head>
	<title>Delwar Ahmed - Fullstack Developer</title>
	<meta name="description" content="Professional portfolio of Delwar Ahmed - Fullstack Developer based in Dhaka, Bangladesh" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta property="og:title" content="Delwar Ahmed - Fullstack Developer" />
	<meta property="og:description" content="Professional portfolio showcasing my skills, projects, and experience in web development." />
</svelte:head>

<div class="min-h-screen bg-white dark:bg-slate-950 flex flex-col transition-colors duration-300">
	<Nav {session} />
	
	<main class="grow">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
		<div class="max-w-7xl mx-auto">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
				<!-- About -->
				<div>
					<h3 class="font-bold text-lg text-slate-900 dark:text-white mb-4">About</h3>
					<p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Fullstack developer specializing in modern web technologies. Building scalable and performant applications.</p>
				</div>

				<!-- Quick Links -->
				<div>
					<h3 class="font-bold text-lg text-slate-900 dark:text-white mb-4">Quick Links</h3>
					<ul class="space-y-3 text-sm text-slate-600 dark:text-slate-400">
						<li><a href="/#skills" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">Skills</a></li>
						<li><a href="/#projects" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">Projects</a></li>
						<li><a href="/#contact" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">Contact</a></li>
						{#if session}
							<li><a href="/dashboard" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">Dashboard</a></li>
						{/if}
					</ul>
				</div>

				<!-- Connect -->
				<div>
					<h3 class="font-bold text-lg text-slate-900 dark:text-white mb-4">Connect</h3>
					<div class="flex gap-3">
						<a href="https://github.com" target="_blank" rel="noopener noreferrer" class="p-2 hover:bg-blue-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200" aria-label="GitHub">
							<svg class="w-5 h-5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.545 2.914 1.209.092-.937.349-1.546.635-1.903-2.22-.253-4.555-1.112-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.817c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.138 18.194 20 14.44 20 10.017 20 4.484 15.522 0 10 0z" clip-rule="evenodd" />
							</svg>
						</a>
						<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="p-2 hover:bg-blue-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200" aria-label="LinkedIn">
							<svg class="w-5 h-5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
								<path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.292-1.39-2.292-1.391 0-1.605 1.086-1.605 2.209v4.261h-2.667V9.309h2.56v1.17h.037c.356-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.354zM5.337 7.433c-.86 0-1.554-.694-1.554-1.554 0-.86.694-1.554 1.554-1.554.86 0 1.555.694 1.555 1.554 0 .86-.694 1.554-1.555 1.554zm1.338 8.905H3.999V9.309h2.676v6.029zM17.988 0H.012C.005 0 0 .005 0 .012v17.976C0 18.005.005 18 .012 18h17.976c.007 0 .012-.005.012-.012V.012C18 .005 17.995 0 17.988 0z" />
							</svg>
						</a>
						<a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="p-2 hover:bg-blue-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200" aria-label="Twitter">
							<svg class="w-5 h-5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
								<path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
							</svg>
						</a>
					</div>
				</div>
			</div>

			<div class="border-t border-slate-200 dark:border-slate-700 pt-8">
				<p class="text-center text-sm text-slate-600 dark:text-slate-400">
					&copy; {new Date().getFullYear()} Delwar Ahmed. All rights reserved.
				</p>
				<p class="text-center text-xs text-slate-500 dark:text-slate-500 mt-3">
					Designed & Built with ❤️ using SvelteKit & Tailwind CSS
				</p>
			</div>
		</div>
	</footer>
</div>
