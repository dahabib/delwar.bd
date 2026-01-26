<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { Moon, Sun } from 'lucide-svelte';

	let { session, logoutInProgress = false } = $props();
	let mobileMenuOpen = $state(false);
	let isDarkMode = $state(false);
    let scrolled = $state(false);

	function toggleDarkMode() {
		isDarkMode = !isDarkMode;
		if (isDarkMode) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}

	async function handleLogout() {
		await signOut({ redirect: true, redirectTo: '/' });
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	$effect(() => {
		if (mobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
		
		// Initialize dark mode on mount
		if (typeof window !== 'undefined') {
			const savedTheme = localStorage.getItem('theme') || 'light';
			isDarkMode = savedTheme === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches;
		}

		// Scroll listener to toggle compact scrolled navbar
		if (typeof window !== 'undefined') {
			const onScroll = () => {
				scrolled = window.scrollY > 8;
			};
			window.addEventListener('scroll', onScroll, { passive: true });
			onScroll();
			return () => window.removeEventListener('scroll', onScroll);
		}
	});
</script>

<header class="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800 shadow-md dark:shadow-lg transition-all duration-300" class:scrolled={scrolled}>
	<nav class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
		<!-- Logo -->
		<a href="/" class="flex items-center gap-3 sm:gap-4 group" onclick={closeMobileMenu}>
			<div class="w-11 sm:w-12 h-11 sm:h-12 bg-linear-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 shadow-md">
				<span class="text-white font-extrabold text-base sm:text-lg">DA</span>
			</div>
			<div class="flex flex-col leading-tight">
				<span class="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight">Delwar Ahmed</span>
				<span class="text-xs text-slate-500 dark:text-slate-400 font-medium">Fullstack Developer</span>
			</div>
		</a>

		<!-- Desktop Navigation -->
		<div class="hidden lg:flex items-center gap-0.5 xl:gap-1.5">
			<a href="/" class="px-4 py-2.5 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-300 font-semibold text-sm tracking-tight">Home</a>
			<a href="/#skills" class="px-4 py-2.5 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-300 font-semibold text-sm tracking-tight">Skills</a>
			<a href="/#experience" class="px-4 py-2.5 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-300 font-semibold text-sm tracking-tight">Experience</a>
			<a href="/#projects" class="px-4 py-2.5 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-300 font-semibold text-sm tracking-tight">Projects</a>
			<a href="/#testimonials" class="px-4 py-2.5 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-300 font-semibold text-sm tracking-tight">Testimonials</a>
			<a href="/#contact" class="px-4 py-2.5 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-300 font-semibold text-sm tracking-tight">Contact</a>
		</div>

		<!-- Right Section -->
		<div class="flex items-center gap-2.5 sm:gap-4">
			{#if session}
				<a href="/dashboard" class="hidden sm:inline-block px-4 py-2.5 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-300 font-semibold text-sm tracking-tight">
					📊 Dashboard
				</a>
				<button 
					onclick={handleLogout}
					disabled={logoutInProgress}
					class="hidden sm:block px-5 py-2.5 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white rounded-xl transition-all duration-300 font-semibold text-sm shadow-md hover:shadow-lg disabled:opacity-50"
				>
					{logoutInProgress ? 'Logging out...' : 'Logout'}
				</button>
			{:else}
				<a href="/auth/signin" class="hidden sm:block btn btn-primary px-5 py-2.5 font-semibold text-sm shadow-md hover:shadow-lg">
					Sign In
				</a>
			{/if}

			<!-- Dark Mode Toggle -->
			<button 
				onclick={toggleDarkMode}
				class="p-2.5 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-300 hidden sm:flex items-center justify-center"
				aria-label="Toggle dark mode"
				title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
			>
				{#if isDarkMode}
					<Sun class="w-5 h-5" />
				{:else}
					<Moon class="w-5 h-5" />
				{/if}
			</button>

			<!-- Mobile Menu Button -->
			<button 
				onclick={toggleMobileMenu}
				class="lg:hidden p-2.5 text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-300"
				aria-label="Toggle menu"
				aria-expanded={mobileMenuOpen}
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					{#if mobileMenuOpen}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					{:else}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					{/if}
				</svg>
			</button>
		</div>
	</nav>

	<!-- Mobile Navigation -->
	{#if mobileMenuOpen}
		<div class="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 animate-slideDown">
			<div class="container mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col gap-2.5">
				<!-- Navigation Links -->
				<a href="/" class="px-5 py-3.5 text-slate-700 dark:text-slate-200 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-300 font-semibold text-base" onclick={closeMobileMenu}>🏠 Home</a>
				<a href="/#skills" class="px-5 py-3.5 text-slate-700 dark:text-slate-200 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-300 font-semibold text-base" onclick={closeMobileMenu}>💼 Skills</a>
				<a href="/#experience" class="px-5 py-3.5 text-slate-700 dark:text-slate-200 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-300 font-semibold text-base" onclick={closeMobileMenu}>🚀 Experience</a>
				<a href="/#projects" class="px-5 py-3.5 text-slate-700 dark:text-slate-200 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-300 font-semibold text-base" onclick={closeMobileMenu}>📂 Projects</a>
				<a href="/#testimonials" class="px-5 py-3.5 text-slate-700 dark:text-slate-200 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-300 font-semibold text-base" onclick={closeMobileMenu}>⭐ Testimonials</a>
				<a href="/#contact" class="px-5 py-3.5 text-slate-700 dark:text-slate-200 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-300 font-semibold text-base" onclick={closeMobileMenu}>💌 Contact</a>
				
				<!-- Dark Mode Toggle Mobile -->
				<button 
					onclick={() => {
						toggleDarkMode();
						closeMobileMenu();
					}}
					class="w-full flex items-center gap-2.5 px-5 py-3.5 text-slate-700 dark:text-slate-200 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-300 font-semibold text-base"
				>
					{#if isDarkMode}
						<Sun class="w-5 h-5" />
						<span>Light Mode</span>
					{:else}
						<Moon class="w-5 h-5" />
						<span>Dark Mode</span>
					{/if}
				</button>
				
				<div class="border-t border-slate-200 dark:border-slate-700 my-5 pt-5 flex flex-col gap-2.5">
					{#if session}
						<a href="/dashboard" class="block px-5 py-3.5 text-slate-700 dark:text-slate-200 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-300 font-semibold text-base" onclick={closeMobileMenu}>📊 Dashboard</a>
						<button 
							onclick={handleLogout}
							disabled={logoutInProgress}
							class="w-full text-left px-5 py-3.5 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white rounded-xl transition-all duration-300 font-semibold shadow-md disabled:opacity-50"
						>
							{logoutInProgress ? 'Logging out...' : 'Logout'}
						</button>
					{:else}
						<a href="/auth/signin" class="block px-5 py-3.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-xl transition-all duration-300 font-semibold text-center shadow-md" onclick={closeMobileMenu}>Sign In</a>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</header>

<style>
	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	:global(.animate-slideDown) {
		animation: slideDown 0.3s ease-out;
	}

	:global(header.scrolled) {
		background-color: rgba(255,255,255,0.98) !important;
		box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
		backdrop-filter: blur(10px);
	}

	:global(html.dark) header.scrolled {
		background-color: rgba(15, 23, 42, 0.92) !important;
		box-shadow: 0 10px 30px rgba(2,6,23,0.6);
	}
</style>
