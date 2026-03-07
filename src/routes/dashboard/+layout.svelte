<script lang="ts">
  import '../layout.css';
  import favicon from '$lib/assets/favicon.svg';
  import { invalidateAll } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import ThemeToggle from '$lib/components/theme-toggle.svelte';
  import { page } from '$app/stores';
  import { onNavigate } from '$app/navigation';
  import { 
    LayoutDashboard, 
    FolderKanban, 
    Settings, 
    LogOut, 
    Menu, 
    X,
    Home,
    User,
    Palette
  } from 'lucide-svelte';

  let { data, children } = $props();

  let sidebarOpen = $state(false);

  const navItems = [
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/portfolio', label: 'Portfolio', icon: FolderKanban },
    { href: '/dashboard/homepage', label: 'Homepage Sections', icon: Home },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

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

  function closeSidebar() {
    sidebarOpen = false;
  }
</script>

<svelte:head>
  <title>Dashboard - {data.title || 'Delwar Ahmed'}</title>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen flex bg-background text-foreground">
  <!-- Mobile sidebar backdrop -->
  {#if sidebarOpen}
    <button 
      class="fixed inset-0 z-40 bg-black/50 lg:hidden"
      onclick={closeSidebar}
      aria-label="Close sidebar"
    ></button>
  {/if}

  <!-- Sidebar -->
  <aside 
    class="fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 lg:translate-x-0 lg:static bg-card border-r {sidebarOpen ? 'translate-x-0' : '-translate-x-full'}"
  >
    <div class="flex flex-col h-full">
      <!-- Logo -->
      <div class="flex items-center justify-between p-4 border-b">
        <a href="/dashboard" class="text-xl font-bold">
          <span class="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">Dashboard</span>
        </a>
        <button 
          class="lg:hidden p-2 hover:bg-accent rounded-md"
          onclick={closeSidebar}
          aria-label="Close sidebar"
        >
          <X class="h-5 w-5" />
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 p-4 space-y-1" aria-label="Dashboard navigation">
        {#each navItems as item}
          {@const isActive = $page.url.pathname === item.href || ($page.url.pathname.startsWith(item.href) && item.href !== '/dashboard')}
          <a
            href={item.href}
            class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all {isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}"
            onclick={() => closeSidebar()}
          >
            <item.icon class="h-5 w-5" />
            {item.label}
          </a>
        {/each}
      </nav>

      <!-- User section -->
      <div class="p-4 border-t">
        <div class="flex items-center gap-3 mb-3">
          <img 
            src={data.session?.user?.image || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} 
            alt="User avatar" 
            class="w-10 h-10 rounded-full border"
          />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium truncate">{data.session?.user?.name || 'User'}</p>
            <p class="text-xs text-muted-foreground truncate">{data.session?.user?.email}</p>
          </div>
        </div>
        
        <div class="flex items-center gap-2">
          <ThemeToggle />
          
          <form method="POST" action="/login?/signOut" class="flex-1">
            <Button type="submit" variant="ghost" size="sm" class="w-full justify-start gap-2">
              <LogOut class="h-4 w-4" />
              Sign out
            </Button>
          </form>
        </div>
      </div>
    </div>
  </aside>

  <!-- Main content -->
  <div class="flex-1 flex flex-col min-w-0">
    <!-- Mobile header -->
    <header class="lg:hidden flex items-center justify-between p-4 border-b bg-card">
      <span class="font-bold">Dashboard</span>
      <button 
        class="p-2 hover:bg-accent rounded-md"
        onclick={() => sidebarOpen = true}
        aria-label="Open sidebar"
      >
        <Menu class="h-5 w-5" />
      </button>
    </header>

    <!-- Page content -->
    <main class="flex-1 p-4 lg:p-8 overflow-auto">
      {@render children()}
    </main>
  </div>
</div>
