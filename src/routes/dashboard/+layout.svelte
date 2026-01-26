<script lang="ts">
	import { page } from '$app/stores';
	import { signOut } from '@auth/sveltekit/client';
	
	let { children } = $props();
	let sidebarOpen = $state(false);
	let logoutInProgress = $state(false);

	const menuItems = [
		{ href: '/dashboard', label: '📊 Overview', icon: '📊' },
		{ href: '/dashboard/portfolio', label: '🎯 Portfolio Settings', icon: '🎯' },
		{ href: '/dashboard/skills', label: '💡 Skills', icon: '💡' },
		{ href: '/dashboard/experience', label: '📝 Experience', icon: '📝' },
		{ href: '/dashboard/projects', label: '🚀 Projects', icon: '🚀' },
		{ href: '/dashboard/testimonials', label: '⭐ Testimonials', icon: '⭐' },
		{ href: '/dashboard/contact', label: '📧 Contact', icon: '📧' },
	];

	async function handleLogout() {
		logoutInProgress = true;
		await signOut({ redirect: true, redirectTo: '/' });
	}

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	function closeSidebarOverlay() {
		sidebarOpen = false;
	}
</script>

<div class="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
	<!-- Sidebar -->
	<aside class={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static left-0 top-0 z-40 w-64 h-screen bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-transform duration-300 overflow-y-auto`}>
		<div class="p-6 border-b border-slate-200 dark:border-slate-700">
			<div class="flex items-center gap-3">
				<div class="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
					<span class="text-white font-bold">DA</span>
				</div>
				<div>
					<p class="font-bold text-slate-900 dark:text-white">Admin</p>
					<p class="text-xs text-slate-500">Dashboard</p>
				</div>
			</div>
		</div>

		<nav class="p-4 space-y-2">
			{#each menuItems as item}
				<a
					href={item.href}
					class={`block px-4 py-2 rounded-lg transition ${
						$page.url.pathname === item.href
							? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-medium'
							: 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
					}`}
					onclick={() => sidebarOpen = false}
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<div class="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-700">
			<button
				onclick={handleLogout}
				disabled={logoutInProgress}
				class="w-full px-4 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition disabled:opacity-50"
			>
				{logoutInProgress ? '⏳ Logging out...' : '🚪 Logout'}
			</button>
		</div>
	</aside>

	<!-- Main Content -->
	<div class="flex-1 flex flex-col">
		<!-- Top Bar -->
		<div class="sticky top-0 z-30 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex justify-between items-center">
			<button
				onclick={toggleSidebar}
				class="lg:hidden p-2 text-slate-600 dark:text-slate-400"
				aria-label="Toggle sidebar"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</button>
			<h1 class="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
			<div class="text-slate-600 dark:text-slate-400 text-sm">
				Welcome, {$page.data.session?.user?.email || 'Admin'}
			</div>
		</div>

		<!-- Page Content -->
		<main class="flex-1 overflow-auto p-6">
			{@render children?.()}
		</main>
	</div>

	<!-- Overlay -->
	{#if sidebarOpen}
		<div
			role="button"
			tabindex="0"
			class="fixed inset-0 z-30 bg-black/50 lg:hidden"
			onclick={closeSidebarOverlay}
			onkeydown={(e) => e.key === 'Escape' && closeSidebarOverlay()}
		></div>
	{/if}
</div>
