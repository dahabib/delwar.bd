<script lang="ts">
  import './layout.css';
  import favicon from '$lib/assets/favicon-16x16.png'; 
  import { invalidateAll } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import ThemeToggle from '$lib/components/theme-toggle.svelte';
  import { onNavigate } from '$app/navigation';

  let { data, children } = $props();

  async function refreshSession() {
    await invalidateAll();
  }

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<svelte:head>
  <title>{data.title || 'Delwar Ahmed'}</title>
  <link rel="icon" href={favicon} />
</svelte:head>

<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md">
  Skip to content
</a>

<div class="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
  <nav class="border-b bg-card/80 backdrop-blur-md text-card-foreground p-4 sticky top-0 z-50 supports-backdrop-filter:bg-card/60 supports-backdrop-filter:backdrop-blur-md" aria-label="Main navigation">
    <div class="container mx-auto flex justify-between items-center">
      <a href="/" class="text-xl font-bold tracking-tight hover:text-primary transition-colors" aria-label="Delwar Ahmed - Home">
        <span class="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">Delwar Ahmed</span>
      </a>
      <div class="space-x-4 flex items-center">
        
        <!-- <a href="/portfolio" class="text-sm font-medium hover:text-primary transition-colors relative group">Portfolio
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
        </a>
        <a href="/contact" class="text-sm font-medium hover:text-primary transition-colors relative group">Contact
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
        </a>
        <div class="border-l h-6 mx-2"></div> -->
        <ThemeToggle />

        {#if data.session?.user}
          <div class="flex items-center space-x-3 ml-4">
            <img src={data.session.user.image || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} alt="User avatar" class="w-8 h-8 rounded-full border" />
            <span class="text-sm font-medium hidden md:inline-block">{data.session.user.name || data.session.user.email}</span>
            <form method="POST" action="/login?/signOut">
              <Button type="submit" variant="ghost" size="sm">Sign out</Button>
            </form>
          </div>
        {/if}
      </div>
    </div>
  </nav>

  <main id="main-content" class="grow">
    {@render children()}
  </main>

  <footer class="border-t bg-card/50 text-card-foreground p-8">
    <div class="container mx-auto text-center">
      <p class="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} <a href="https://delwar.bd/" target="_blank" rel="noopener noreferrer" class="hover:text-primary transition-colors">Delwar Ahmed</a>. Built with SvelteKit.
      </p>
    </div>
  </footer>
</div>
