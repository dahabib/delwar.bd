<script lang="ts">
	import { onMount } from 'svelte';

	let stats = $state({
		skills: 0,
		experiences: 0,
		projects: 0,
		testimonials: 0,
	});

	onMount(async () => {
		try {
			const skillsRes = await fetch('/api/skills');
			const experienceRes = await fetch('/api/experience');
			const projectsRes = await fetch('/api/projects');
			const testimonialsRes = await fetch('/api/testimonials');

			if (skillsRes.ok) stats.skills = (await skillsRes.json()).length;
			if (experienceRes.ok) stats.experiences = (await experienceRes.json()).length;
			if (projectsRes.ok) stats.projects = (await projectsRes.json()).length;
			if (testimonialsRes.ok) stats.testimonials = (await testimonialsRes.json()).length;
		} catch (error) {
			console.error('Error loading stats:', error);
		}
	});
</script>

<svelte:head>
	<title>Dashboard - Delwar Ahmed</title>
</svelte:head>

<div class="space-y-8">
	<div>
		<h1 class="text-4xl font-bold text-slate-900 dark:text-white mb-2">Dashboard Overview</h1>
		<p class="text-slate-600 dark:text-slate-400">Manage your portfolio content and settings</p>
	</div>

	<!-- Stats Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
		<a href="/dashboard/skills" class="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-600 transition cursor-pointer">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-slate-600 dark:text-slate-400 text-sm">Total Skills</p>
					<p class="text-3xl font-bold text-slate-900 dark:text-white">{stats.skills}</p>
				</div>
				<div class="text-4xl">💡</div>
			</div>
		</a>

		<a href="/dashboard/experience" class="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-600 transition cursor-pointer">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-slate-600 dark:text-slate-400 text-sm">Experiences</p>
					<p class="text-3xl font-bold text-slate-900 dark:text-white">{stats.experiences}</p>
				</div>
				<div class="text-4xl">📝</div>
			</div>
		</a>

		<a href="/dashboard/projects" class="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-600 transition cursor-pointer">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-slate-600 dark:text-slate-400 text-sm">Projects</p>
					<p class="text-3xl font-bold text-slate-900 dark:text-white">{stats.projects}</p>
				</div>
				<div class="text-4xl">🚀</div>
			</div>
		</a>

		<a href="/dashboard/testimonials" class="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-600 transition cursor-pointer">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-slate-600 dark:text-slate-400 text-sm">Testimonials</p>
					<p class="text-3xl font-bold text-slate-900 dark:text-white">{stats.testimonials}</p>
				</div>
				<div class="text-4xl">⭐</div>
			</div>
		</a>
	</div>

	<!-- Quick Actions -->
	<div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
		<h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Quick Actions</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<a href="/dashboard/portfolio" class="p-4 bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg hover:shadow-md transition">
				<p class="font-bold text-blue-900 dark:text-blue-100">🎯 Portfolio Settings</p>
				<p class="text-sm text-blue-700 dark:text-blue-200">Update your profile information</p>
			</a>
			<a href="/dashboard/skills" class="p-4 bg-linear-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg hover:shadow-md transition">
				<p class="font-bold text-green-900 dark:text-green-100">💡 Add Skills</p>
				<p class="text-sm text-green-700 dark:text-green-200">Showcase your technical expertise</p>
			</a>
			<a href="/dashboard/projects" class="p-4 bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg hover:shadow-md transition">
				<p class="font-bold text-purple-900 dark:text-purple-100">🚀 Add Projects</p>
				<p class="text-sm text-purple-700 dark:text-purple-200">Display your best work</p>
			</a>
		</div>
	</div>

	<!-- Recent Activity (Placeholder) -->
	<div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
		<h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Getting Started</h2>
		<div class="space-y-4">
			<div class="flex items-start gap-4">
				<div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center shrink-0 mt-1">
					<span class="text-blue-600 dark:text-blue-400 font-bold">1</span>
				</div>
				<div>
					<p class="font-bold text-slate-900 dark:text-white">Complete your portfolio settings</p>
					<p class="text-slate-600 dark:text-slate-400 text-sm">Add your profile image, bio, and contact information</p>
				</div>
			</div>
			<div class="flex items-start gap-4">
				<div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center shrink-0 mt-1">
					<span class="text-blue-600 dark:text-blue-400 font-bold">2</span>
				</div>
				<div>
					<p class="font-bold text-slate-900 dark:text-white">Add your technical skills</p>
					<p class="text-slate-600 dark:text-slate-400 text-sm">List the technologies and programming languages you're proficient with</p>
				</div>
			</div>
			<div class="flex items-start gap-4">
				<div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center shrink-0 mt-1">
					<span class="text-blue-600 dark:text-blue-400 font-bold">3</span>
				</div>
				<div>
					<p class="font-bold text-slate-900 dark:text-white">Showcase your projects</p>
					<p class="text-slate-600 dark:text-slate-400 text-sm">Add your best work with descriptions and live links</p>
				</div>
			</div>
		</div>
	</div>
</div>
