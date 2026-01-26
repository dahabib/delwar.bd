<script lang="ts">
	import { onMount } from 'svelte';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';

	let visibleSections = {
		hero: false,
		skills: false,
		experience: false,
		projects: false,
		testimonials: false,
		contact: false
	};

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const sectionId = entry.target.id as keyof typeof visibleSections;
					visibleSections[sectionId] = true;
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.1 });

		document.querySelectorAll('[data-section]').forEach(el => observer.observe(el));
	});
</script>

<svelte:head>
	<title>Delwar Ahmed - Fullstack Developer Portfolio</title>
	<meta name="description" content="Portfolio of Delwar Ahmed, a Fullstack Developer specializing in modern web technologies." />
</svelte:head>

<div class="min-h-screen bg-white dark:bg-slate-950">
	<!-- Hero Section -->
	<section 
		id="hero"
		data-section
		class="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-12 sm:pt-40 sm:pb-20 overflow-hidden bg-linear-to-br from-white via-blue-50/50 to-white dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950"
	>
		<!-- Background decoration with enhanced patterns -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<!-- Grid pattern overlay -->
			<svg class="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
						<path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="1"/>
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill="url(#grid)" />
			</svg>
			<div class="absolute top-20 right-5 sm:right-10 w-56 sm:w-80 h-56 sm:h-80 bg-blue-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-float"></div>
			<div class="absolute -bottom-40 sm:-bottom-48 -left-40 sm:-left-48 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-100 dark:bg-indigo-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-float" style="animation-delay: 2s;"></div>
			<div class="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-100 dark:bg-purple-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float" style="animation-delay: 4s;"></div>
		</div>

		<div class="relative z-10 max-w-7xl mx-auto w-full">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
				<!-- Left Content -->
				<div class={`${visibleSections.hero ? 'animate-slideInLeft' : 'opacity-0'} transition-all duration-700`}>
					<div class="space-y-6 sm:space-y-8">
						<div>
							<div class="inline-block mb-5 px-4 sm:px-5 py-2 sm:py-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-full border border-blue-200 dark:border-blue-800">
								<span class="text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300">👋 Welcome to my portfolio</span>
							</div>
							<h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-5 leading-tight">
								Hi, I'm <span class="gradient-text">Delwar Ahmed</span>
							</h1>
						</div>
						
						<div class="space-y-3 sm:space-y-4">
							<p class="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
								🚀 <strong>Fullstack Developer</strong> specializing in modern web technologies
							</p>
							<p class="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
								I build scalable, performant web applications using Node.js, SvelteKit, React, Next.js, PostgreSQL, and SQLite.
							</p>
							<p class="text-base sm:text-lg text-slate-700 dark:text-slate-300 font-semibold">
								📍 Based in <strong class="text-blue-600 dark:text-blue-400">Dhaka, Bangladesh</strong>
							</p>
						</div>

						<div class="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-5 pt-4 sm:pt-6">
							<a 
								href="#projects" 
								class="px-6 sm:px-8 py-3 sm:py-3.5 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition-all hover-lift transform text-center text-sm sm:text-base shadow-lg hover:shadow-xl"
							>
								📂 View My Work
							</a>
							<a 
								href="#contact" 
								class="px-6 sm:px-8 py-3 sm:py-3.5 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg font-semibold transition-all transform text-center text-sm sm:text-base"
							>
								💬 Get In Touch
							</a>
						</div>

						<!-- Tech Stack Preview -->
						<div class="pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-700">
							<p class="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400 mb-3 sm:mb-4 uppercase tracking-widest">Tech Stack:</p>
							<div class="flex flex-wrap gap-2.5">
								<span class="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs sm:text-sm rounded-full font-semibold hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors duration-200">Node.js</span>
								<span class="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs sm:text-sm rounded-full font-semibold hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors duration-200">SvelteKit</span>
								<span class="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs sm:text-sm rounded-full font-semibold hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors duration-200">React</span>
								<span class="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs sm:text-sm rounded-full font-semibold hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors duration-200">Next.js</span>
								<span class="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs sm:text-sm rounded-full font-semibold hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors duration-200">PostgreSQL</span>
								<span class="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs sm:text-sm rounded-full font-semibold hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors duration-200">SQLite</span>
							</div>
						</div>
					</div>
				</div>

				<!-- Right Illustration -->
				<div class={`${visibleSections.hero ? 'animate-slideInRight' : 'opacity-0'} transition-all duration-700 hidden lg:flex items-center justify-center`}>
					<div class="relative w-full max-w-sm">
						<div class="animate-float">
							<div class="w-64 h-64 mx-auto bg-linear-to-br from-blue-400 via-blue-500 to-blue-600 dark:from-blue-500 dark:via-blue-600 dark:to-blue-800 rounded-3xl flex items-center justify-center text-white shadow-2xl border border-blue-200/50 dark:border-blue-700/30">
								<span class="text-7xl font-bold drop-shadow-lg">DA</span>
							</div>
						</div>
						<div class="absolute top-12 right-0 w-24 h-24 bg-indigo-300 dark:bg-indigo-600 rounded-2xl rotate-45 opacity-20 blur-2xl"></div>
						<div class="absolute bottom-0 left-0 w-32 h-32 bg-blue-300 dark:bg-blue-600 rounded-2xl opacity-20 blur-2xl"></div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Skills Section -->
	<section 
		id="skills"
		data-section
		class="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-slate-50 to-white dark:from-slate-900/30 dark:to-slate-950 overflow-hidden"
	>
		<!-- Background pattern -->
		<div class="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]">
			<svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<pattern id="dots" width="50" height="50" patternUnits="userSpaceOnUse">
						<circle cx="25" cy="25" r="2" fill="currentColor"/>
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill="url(#dots)" />
			</svg>
		</div>
		<div class="absolute top-20 right-10 w-96 h-96 bg-blue-100 dark:bg-blue-900/10 rounded-full blur-3xl opacity-20" style="filter: blur(80px);"></div>
		<div class="max-w-7xl mx-auto">
			<div class={`${visibleSections.skills ? 'animate-fadeInUp' : 'opacity-0'} transition-all duration-700 mb-14 sm:mb-16 lg:mb-20 text-center`}>
				<h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-5">
					💼 Technical Skills
				</h2>
				<p class="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">Expertise in modern web technologies and tools that power scalable applications</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
				<!-- Backend Skills -->
			<Card.Root class="group relative hover-lift border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 backdrop-blur-sm overflow-hidden">
				<!-- Background glow effect -->
				<div class="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
				<Card.Header class="pb-5 relative z-10">
					<div class="text-8xl sm:text-9xl mb-5 leading-none">🖥️</div>
						<Card.Title class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
							Backend
						</Card.Title>
					</Card.Header>
				<Card.Content class="relative z-10">
						<ul class="space-y-3 sm:space-y-4 text-slate-600 dark:text-slate-400">
							<li class="flex items-center gap-3 text-sm sm:text-base">
								<span class="text-blue-500 font-bold">▸</span>
								<span>Node.js & Express.js</span>
							</li>
							<li class="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
								<span class="text-blue-500 font-bold">▸</span>
								<span>RESTful APIs & GraphQL</span>
							</li>
							<li class="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
								<span class="text-blue-500 font-bold">▸</span>
								<span>Database Design</span>
							</li>
							<li class="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
								<span class="text-blue-500 font-bold">▸</span>
								<span>Server-side Rendering</span>
							</li>
							<li class="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
								<span class="text-blue-500 font-bold">▸</span>
								<span>Authentication & Security</span>
							</li>
						</ul>
					</Card.Content>
				</Card.Root>

				<!-- Frontend Skills -->
				<!-- Frontend Skills -->
				<Card.Root class="group relative hover-lift border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 backdrop-blur-sm overflow-hidden">
					<!-- Background glow effect -->
					<div class="absolute -top-20 -right-20 w-40 h-40 bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					<Card.Header class="pb-5 relative z-10">
						<div class="text-8xl sm:text-9xl mb-5 leading-none">🎨</div>
						<Card.Title class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
							Frontend
						</Card.Title>
					</Card.Header>
					<Card.Content class="relative z-10">
						<ul class="space-y-3 sm:space-y-4 text-slate-600 dark:text-slate-400">
							<li class="flex items-center gap-3 text-sm sm:text-base">
								<span class="text-indigo-500 font-bold">▸</span>
								<span>SvelteKit & Svelte</span>
							</li>
							<li class="flex items-center gap-3 text-sm sm:text-base">
								<span class="text-indigo-500 font-bold">▸</span>
								<span>React & Next.js</span>
							</li>
							<li class="flex items-center gap-3 text-sm sm:text-base">
								<span class="text-indigo-500 font-bold">▸</span>
								<span>Tailwind CSS</span>
							</li>
							<li class="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
								<span class="text-indigo-500 font-bold">▸</span>
								<span>Responsive Design</span>
							</li>
							<li class="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
								<span class="text-indigo-500 font-bold">▸</span>
								<span>State Management</span>
							</li>
						</ul>
					</Card.Content>
				</Card.Root>

				<!-- Database Skills -->
			<Card.Root class="group relative hover-lift border border-slate-200 dark:border-slate-700 hover:border-green-400 dark:hover:border-green-500 transition-all duration-300 backdrop-blur-sm overflow-hidden">
				<!-- Background glow effect -->
				<div class="absolute -top-20 -right-20 w-40 h-40 bg-green-200 dark:bg-green-900/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
				<Card.Header class="pb-5 relative z-10">
					<div class="text-8xl sm:text-9xl mb-5 leading-none">🗄️</div>
						<Card.Title class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
							Database
						</Card.Title>
					</Card.Header>
				<Card.Content class="relative z-10">
						<ul class="space-y-3 sm:space-y-4 text-slate-600 dark:text-slate-400">
							<li class="flex items-center gap-3 text-sm sm:text-base">
								<span class="text-green-500 font-bold">▸</span>
								<span>PostgreSQL</span>
							</li>
							<li class="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
								<span class="text-green-500 font-bold">▸</span>
								<span>SQLite</span>
							</li>
							<li class="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
								<span class="text-green-500 font-bold">▸</span>
								<span>Prisma ORM</span>
							</li>
							<li class="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
								<span class="text-green-500 font-bold">▸</span>
								<span>Database Optimization</span>
							</li>
							<li class="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
								<span class="text-green-500 font-bold">▸</span>
								<span>Migration Management</span>
							</li>
						</ul>
					</Card.Content>
				</Card.Root>
			</div>
		</div>
	</section>

	<!-- Experience Section -->
	<section 
		id="experience"
		data-section
		class="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900/40 overflow-hidden"
	>
		<!-- Background elements -->
		<div class="absolute inset-0 opacity-[0.015]">
			<svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<pattern id="diagonal-lines" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
						<line x1="0" y1="0" x2="0" y2="20" stroke="currentColor" stroke-width="1"/>
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill="url(#diagonal-lines)" />
			</svg>
		</div>
		<div class="absolute bottom-0 left-20 w-80 h-80 bg-indigo-100 dark:bg-indigo-900/10 rounded-full blur-3xl opacity-20"></div>
		<div class="max-w-7xl mx-auto">
			<div class={`${visibleSections.experience ? 'animate-fadeInUp' : 'opacity-0'} transition-all duration-700 mb-14 sm:mb-16 lg:mb-20 text-center`}>
				<h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-5">
					🚀 Work Experience
				</h2>
				<p class="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">My professional journey and key achievements</p>
			</div>

			<div class="max-w-3xl mx-auto space-y-7 sm:space-y-10">
				<!-- Experience Item 1 -->
				<div class="group hover-lift relative pl-6 sm:pl-10 pb-6 sm:pb-8 border-l-2 border-blue-400 dark:border-blue-500 last:border-l-2">
					<div class="absolute -left-3.5 sm:-left-5 top-0 w-7 h-7 sm:w-9 sm:h-9 bg-blue-500 rounded-full border-4 border-white dark:border-slate-900 group-hover:scale-125 transition-transform"></div>
					
					<div class="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
						<div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
							<div>
								<h3 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Senior Fullstack Developer</h3>
								<p class="text-base text-blue-600 dark:text-blue-400 font-semibold">Tech Company</p>
							</div>
							<span class="text-sm font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">2022 - Present</span>
						</div>
						<p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
							Leading development of scalable web applications using modern tech stack. Mentoring junior developers and architecting solutions for enterprise clients.
						</p>
						<div class="flex flex-wrap gap-2">
							<span class="px-3 py-1 text-xs sm:text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">Next.js</span>
							<span class="px-3 py-1 text-xs sm:text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">PostgreSQL</span>
							<span class="px-3 py-1 text-xs sm:text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">TypeScript</span>
						</div>
					</div>
				</div>

				<!-- Experience Item 2 -->
				<div class="group hover-lift relative pl-6 sm:pl-10 pb-6 sm:pb-8 border-l-2 border-indigo-400 dark:border-indigo-500">
					<div class="absolute -left-3.5 sm:-left-5 top-0 w-7 h-7 sm:w-9 sm:h-9 bg-indigo-500 rounded-full border-4 border-white dark:border-slate-900 group-hover:scale-125 transition-transform"></div>
					
					<div class="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
						<div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
							<div>
								<h3 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Fullstack Developer</h3>
								<p class="text-base text-indigo-600 dark:text-indigo-400 font-semibold">Startup</p>
							</div>
							<span class="text-sm font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">2020 - 2022</span>
						</div>
						<p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
							Developed and maintained full-stack applications for a growing startup. Implemented new features, fixed bugs, and optimized database queries for better performance.
						</p>
						<div class="flex flex-wrap gap-2">
							<span class="px-3 py-1 text-xs sm:text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">React</span>
							<span class="px-3 py-1 text-xs sm:text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">Node.js</span>
							<span class="px-3 py-1 text-xs sm:text-sm bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full">MongoDB</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Projects Section -->
	<section 
		id="projects"
		data-section
		class="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/30 overflow-hidden"
	>
		<!-- Background pattern with animation -->
		<div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
			<svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<pattern id="hexagon" width="60" height="60" patternUnits="userSpaceOnUse">
						<polygon points="30,0 60,15 60,45 30,60 0,45 0,15" fill="none" stroke="currentColor" stroke-width="0.5"/>
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill="url(#hexagon)" />
			</svg>
		</div>
		<div class="absolute top-40 -right-40 w-96 h-96 bg-purple-100 dark:bg-purple-900/10 rounded-full blur-3xl opacity-30"></div>
		<div class="absolute -bottom-20 -left-40 w-80 h-80 bg-blue-100 dark:bg-blue-900/10 rounded-full blur-3xl opacity-20"></div>
		<div class="max-w-7xl mx-auto">
			<div class={`${visibleSections.projects ? 'animate-fadeInUp' : 'opacity-0'} transition-all duration-700 mb-14 sm:mb-16 lg:mb-20 text-center`}>
				<h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-5">
					💼 Featured Projects
				</h2>
				<p class="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">Showcasing my best work and technical expertise</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-10">
				<!-- Project 1 -->
			<div class="group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover-lift bg-white dark:bg-slate-800 transition-all duration-300 shadow-md hover:shadow-2xl">
				<div class="relative h-56 sm:h-64 lg:h-72 bg-linear-to-br from-blue-400 via-cyan-400 to-blue-600 overflow-hidden group">
					<!-- Background pattern in project card -->
					<div class="absolute inset-0 opacity-10"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><defs><pattern id="shopping-pattern" width="40" height="40"><path d="M0,0 l40,40 M40,0 l-40,40" stroke="white" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#shopping-pattern)"/></svg></div>
					<div class="absolute inset-0 flex items-center justify-center text-white">
						<div class="text-center">
							<div class="text-9xl sm:text-10xl mb-3 leading-none drop-shadow-lg">🛍️</div>
							<p class="font-semibold text-lg sm:text-xl drop-shadow">E-Commerce Platform</p>
						</div>
					</div>
					<div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
					</div>
					<div class="p-7 sm:p-10">
						<h3 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-4">
							E-Commerce Platform
						</h3>
						<p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
							Full-featured e-commerce platform with payment integration, admin dashboard, and real-time inventory management.
						</p>
						<div class="flex flex-wrap gap-2.5 mb-5">
							<span class="px-3.5 py-1.5 text-xs sm:text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium">Next.js</span>
							<span class="px-3.5 py-1.5 text-xs sm:text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full font-medium">PostgreSQL</span>
							<span class="px-3 py-1 text-xs sm:text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">Stripe</span>
						</div>
						<button class="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:gap-3 transition-all font-semibold">
							View Project →
						</button>
					</div>
				</div>

				<!-- Project 2 -->
			<div class="group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover-lift bg-white dark:bg-slate-800 transition-all duration-300 shadow-md hover:shadow-2xl">
				<div class="relative h-56 sm:h-64 lg:h-72 bg-linear-to-br from-indigo-400 via-purple-400 to-indigo-600 overflow-hidden group">
					<!-- Background pattern -->
					<div class="absolute inset-0 opacity-10"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><defs><pattern id="analytics-pattern" width="40" height="40"><rect width="8" height="8" fill="white"/><rect x="12" y="12" width="8" height="8" fill="white"/><rect x="24" y="24" width="8" height="8" fill="white"/></pattern></defs><rect width="100%" height="100%" fill="url(#analytics-pattern)"/></svg></div>
					<div class="absolute inset-0 flex items-center justify-center text-white">
						<div class="text-center">
							<div class="text-9xl sm:text-10xl mb-3 leading-none drop-shadow-lg">📊</div>
							<p class="font-semibold text-lg sm:text-xl drop-shadow">Analytics Dashboard</p>
						</div>
					</div>
					<div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
					</div>
				<div class="p-7 sm:p-10">
					<h3 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 mb-4">
						Real-time Analytics Dashboard
					</h3>
					<p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
						Interactive dashboard with real-time data visualization, WebSocket updates, and comprehensive analytics reporting.
					</p>
					<div class="flex flex-wrap gap-2.5 mb-5">
						<span class="px-3.5 py-1.5 text-xs sm:text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium">React</span>
						<span class="px-3.5 py-1.5 text-xs sm:text-sm bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full font-medium">Node.js</span>
						<span class="px-3.5 py-1.5 text-xs sm:text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full font-medium">WebSocket</span>
						</div>
						<button class="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:gap-3 transition-all font-semibold">
							View Project →
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Testimonials Section -->
	<section 
		id="testimonials"
		data-section
		class="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900/40 overflow-hidden"
	>
		<!-- Background pattern -->
		<div class="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
			<svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<pattern id="stars" width="80" height="80" patternUnits="userSpaceOnUse">
						<circle cx="40" cy="40" r="1" fill="currentColor"/>
						<circle cx="10" cy="10" r="0.5" fill="currentColor"/>
						<circle cx="70" cy="70" r="0.5" fill="currentColor"/>
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill="url(#stars)" />
			</svg>
		</div>
		<div class="absolute top-20 left-1/4 w-96 h-96 bg-yellow-100 dark:bg-yellow-900/10 rounded-full blur-3xl opacity-20"></div>
		<div class="max-w-7xl mx-auto">
			<div class={`${visibleSections.testimonials ? 'animate-fadeInUp' : 'opacity-0'} transition-all duration-700 mb-14 sm:mb-16 lg:mb-20 text-center`}>
				<h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-5">
					⭐ Client Testimonials
				</h2>
				<p class="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">What clients say about my work</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-10 max-w-4xl mx-auto">
				<!-- Testimonial 1 -->
				<div class="group relative hover-lift bg-white dark:bg-slate-800 p-7 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-xl transition-all duration-300 shadow-md overflow-hidden">
					<!-- Background glow -->
					<div class="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					<div class="relative z-10">
						<div class="flex items-center gap-2 mb-7">
							<span class="text-3xl">⭐</span>
							<span class="text-3xl">⭐</span>
							<span class="text-3xl">⭐</span>
							<span class="text-3xl">⭐</span>
							<span class="text-3xl">⭐</span>
						</div>
						<blockquote class="text-slate-700 dark:text-slate-300 mb-7 leading-relaxed italic text-base sm:text-lg">
							"Delwar is an exceptional developer. His attention to detail and commitment to delivering quality code is unmatched. Highly recommended!"
						</blockquote>
						<div class="border-t border-slate-200 dark:border-slate-700 pt-5">
							<p class="font-bold text-slate-900 dark:text-white">John Doe</p>
							<p class="text-sm text-slate-600 dark:text-slate-400">CEO, Tech Company</p>
						</div>
					</div>
				</div>

				<!-- Testimonial 2 -->
				<div class="group relative hover-lift bg-white dark:bg-slate-800 p-7 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-xl transition-all duration-300 shadow-md overflow-hidden">
					<!-- Background glow -->
					<div class="absolute -top-20 -right-20 w-40 h-40 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					<div class="relative z-10">
						<div class="flex items-center gap-2 mb-6">
							<span class="text-3xl">⭐</span>
							<span class="text-3xl">⭐</span>
							<span class="text-3xl">⭐</span>
							<span class="text-3xl">⭐</span>
							<span class="text-3xl">⭐</span>
						</div>
						<blockquote class="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed italic text-base sm:text-lg">
							"Working with Delwar was a pleasure. He completed our project on time, maintained clean code, and exceeded our expectations."
						</blockquote>
						<div class="border-t border-slate-200 dark:border-slate-700 pt-4">
							<p class="font-bold text-slate-900 dark:text-white">Jane Smith</p>
							<p class="text-sm text-slate-600 dark:text-slate-400">Product Manager, Startup</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Contact Section -->
	<section 
		id="contact"
		data-section
		class="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/30 overflow-hidden"
	>
		<!-- Background pattern overlay -->
		<div class="absolute inset-0 opacity-[0.02]">
			<svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<pattern id="contact-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
						<circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.5"/>
						<circle cx="80" cy="80" r="2" fill="currentColor" opacity="0.3"/>
						<path d="M 50 0 Q 50 50 0 50" stroke="currentColor" stroke-width="0.5" fill="none"/>
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill="url(#contact-pattern)" />
			</svg>
		</div>
		<div class="absolute -top-40 right-1/4 w-96 h-96 bg-indigo-100 dark:bg-indigo-900/10 rounded-full blur-3xl opacity-30"></div>
		<div class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 dark:bg-purple-900/10 rounded-full blur-3xl opacity-20"></div>
		<div class="max-w-4xl mx-auto">
			<div class={`${visibleSections.contact ? 'animate-fadeInUp' : 'opacity-0'} transition-all duration-700`}>
				<div class="relative overflow-hidden rounded-3xl p-12 sm:p-16 lg:p-24 bg-linear-to-br from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 text-white shadow-2xl">
					<!-- Background decoration -->
					<div class="absolute top-10 right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
					<div class="absolute -bottom-20 -left-20 w-60 h-60 bg-white opacity-5 rounded-full blur-3xl"></div>

					<div class="relative z-10">
						<div class="mb-12 sm:mb-16">
							<h2 class="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
								💌 <span class="inline-block animate-bounce">Get In Touch</span>
							</h2>
							<p class="text-lg sm:text-xl opacity-95 leading-relaxed max-w-2xl font-medium">
								Let's discuss your project and how I can help bring your ideas to life. I'm always excited to work on new challenges.
							</p>
						</div>

						<div class="space-y-6 sm:space-y-8 mb-12 sm:mb-16">
							<a 
								href="mailto:contact@delwar.bd" 
								class="flex items-center gap-5 group hover:translate-x-3 transition-transform duration-300 p-5 sm:p-6 rounded-2xl hover:bg-white/15 backdrop-blur-sm"
							>
								<span class="text-4xl sm:text-5xl shrink-0">📧</span>
								<div>
									<p class="font-semibold text-sm opacity-85">Email</p>
									<p class="text-lg sm:text-xl font-bold">contact@delwar.bd</p>
								</div>
							</a>

							<a 
								href="https://delwar.bd" 
								target="_blank" 
								rel="noopener noreferrer"
								class="flex items-center gap-5 group hover:translate-x-3 transition-transform duration-300 p-5 sm:p-6 rounded-2xl hover:bg-white/15 backdrop-blur-sm"
							>
								<span class="text-4xl sm:text-5xl shrink-0">🌐</span>
								<div>
									<p class="font-semibold text-sm opacity-85">Website</p>
									<p class="text-lg sm:text-xl font-bold">delwar.bd</p>
								</div>
							</a>

							<div class="flex items-center gap-5 p-5 sm:p-6 rounded-2xl hover:bg-white/15 backdrop-blur-sm transition-colors duration-300">
								<span class="text-4xl sm:text-5xl shrink-0">📍</span>
								<div>
									<p class="font-semibold text-sm opacity-85">Location</p>
									<p class="text-lg sm:text-xl font-bold">Dhaka, Bangladesh</p>
								</div>
							</div>
						</div>

						<div class="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-5">
							<a 
								href="https://github.com" 
								target="_blank" 
								rel="noopener noreferrer"
								class="flex-1 sm:flex-initial px-7 py-3.5 bg-white text-indigo-600 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold text-center shadow-lg hover:shadow-xl"
							>
								GitHub
							</a>
							<a 
								href="https://linkedin.com" 
								target="_blank" 
								rel="noopener noreferrer"
								class="flex-1 sm:flex-initial px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all font-semibold text-center"
							>
								LinkedIn
							</a>
							<a 
								href="https://twitter.com" 
								target="_blank" 
								rel="noopener noreferrer"
								class="flex-1 sm:flex-initial px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all font-semibold text-center"
							>
								Twitter
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>
