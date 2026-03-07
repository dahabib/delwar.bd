<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { onMount } from 'svelte';
  import { Plus, Trash2, Edit, ExternalLink, Github, Search, Filter } from 'lucide-svelte';
  import { Input } from "$lib/components/ui/input/index.js";

  interface PortfolioItem {
    id: string;
    title: string;
    description: string;
    imageUrl: string | null;
    githubUrl: string | null;
    liveUrl: string | null;
    tags: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
  }

  let portfolioItems: PortfolioItem[] = $state([]);
  let loading = $state(true);
  let error: string | null = $state(null);
  let searchQuery = $state('');
  let visible = $state(false);

  const categories = ['all', 'web', 'mobile', 'design', 'other'];
  let selectedCategory = $state('all');

  const filteredItems = $derived(() => {
    let items = portfolioItems;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    }
    
    if (selectedCategory !== 'all') {
      items = items.filter(item => item.category.toLowerCase() === selectedCategory);
    }
    
    return items;
  });

  async function loadPortfolioItems() {
    loading = true;
    error = null;
    try {
      const res = await fetch('/dashboard/portfolio');
      if (res.ok) {
        portfolioItems = await res.json();
      } else {
        const errData = await res.json();
        error = errData.message || 'Failed to load portfolio items';
      }
    } catch (e) {
      error = e instanceof Error ? e.message : 'Network error';
    } finally {
      loading = false;
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }
    try {
      const res = await fetch(`/dashboard/portfolio/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        portfolioItems = portfolioItems.filter(item => item.id !== id);
      } else {
        const errData = await res.json();
        alert(errData.message || 'Failed to delete item');
      }
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Network error');
    }
  }

  onMount(() => {
    loadPortfolioItems();
    setTimeout(() => visible = true, 100);
  });
</script>

<div class="space-y-6">
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 {visible ? 'animate-fade-in' : 'opacity-0'}">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Portfolio</h1>
      <p class="text-muted-foreground mt-1">Manage your projects and showcase work.</p>
    </div>
    <Button href="/dashboard/add" class="gap-2">
      <Plus class="h-4 w-4" />
      Add Project
    </Button>
  </div>

  <!-- Filters -->
  <div class="flex flex-col sm:flex-row gap-4 {visible ? 'animate-fade-in delay-100' : 'opacity-0'}">
    <div class="relative flex-1 max-w-md">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input 
        type="text" 
        placeholder="Search projects..." 
        bind:value={searchQuery}
        class="pl-10"
      />
    </div>
    <div class="flex items-center gap-2">
      <Filter class="h-4 w-4 text-muted-foreground" />
      <div class="flex gap-1">
        {#each categories as category}
          <button
            onclick={() => selectedCategory = category}
            class="px-3 py-1.5 rounded-md text-sm font-medium transition-all {selectedCategory === category ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        {/each}
      </div>
    </div>
  </div>

  {#if loading}
    <div class="grid gap-4">
      {#each Array(5) as _}
        <div class="h-24 rounded-lg bg-muted animate-pulse"></div>
      {/each}
    </div>
  {:else if error}
    <div class="bg-destructive/10 text-destructive p-4 rounded-lg">
      Error: {error}
      <Button variant="outline" size="sm" class="mt-2" onclick={loadPortfolioItems}>Try again</Button>
    </div>
  {:else if filteredItems().length === 0}
    <Card.Root class="border-dashed">
      <Card.Content class="flex flex-col items-center justify-center py-12">
        <p class="text-muted-foreground mb-4">No projects found.</p>
        <Button href="/dashboard/add" variant="secondary">Add your first project</Button>
      </Card.Content>
    </Card.Root>
  {:else}
    <div class="space-y-4">
      {#each filteredItems() as item, i (item.id)}
        <Card.Root class="{visible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: {150 + i * 30}ms">
          <Card.Content class="flex items-center gap-4 p-4">
            <div class="h-20 w-32 rounded-md overflow-hidden bg-muted flex-shrink-0">
              <img
                src={item.imageUrl || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=100'}
                alt={item.title}
                class="w-full h-full object-cover"
              />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-medium text-lg">{item.title}</h3>
              <p class="text-sm text-muted-foreground truncate">{item.description}</p>
              <div class="flex flex-wrap gap-1 mt-2">
                {#each item.tags.split(',').slice(0, 3) as tag}
                  <span class="px-2 py-0.5 text-xs rounded-md bg-muted">
                    {tag.trim()}
                  </span>
                {/each}
              </div>
            </div>
            <div class="flex items-center gap-1">
              {#if item.liveUrl}
                <Button size="icon-sm" variant="ghost" href={item.liveUrl} target="_blank" aria-label="View live">
                  <ExternalLink class="h-4 w-4" />
                </Button>
              {/if}
              {#if item.githubUrl}
                <Button size="icon-sm" variant="ghost" href={item.githubUrl} target="_blank" aria-label="View on GitHub">
                  <Github class="h-4 w-4" />
                </Button>
              {/if}
              <Button size="icon-sm" variant="ghost" href="/dashboard/edit/{item.id}" aria-label="Edit">
                <Edit class="h-4 w-4" />
              </Button>
              <Button size="icon-sm" variant="ghost" onclick={() => handleDelete(item.id)} aria-label="Delete">
                <Trash2 class="h-4 w-4" />
              </Button>
            </div>
          </Card.Content>
        </Card.Root>
      {/each}
    </div>
  {/if}
</div>
