<script lang="ts">
  import { onMount } from 'svelte';
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input';
  import { Search, Filter, ExternalLink, Github } from 'lucide-svelte';

  interface PortfolioItem {
    id: string;
    title: string;
    description: string;
    imageUrl: string | null;
    tags: string;
    category: string;
    githubUrl: string | null;
    liveUrl: string | null;
  }

  let portfolioItems: PortfolioItem[] = $state([]);
  let loading = $state(true);
  let error: string | null = $state(null);
  let searchQuery = $state('');
  let selectedCategory = $state('all');
  let visible = $state(false);

  const categories = ['all', 'web', 'mobile', 'design', 'other'];

  async function loadPortfolioItems() {
    loading = true;
    error = null;
    try {
      const res = await fetch('/api/portfolio');
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

  const filteredItems = $derived(() => {
    let items = portfolioItems;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.toLowerCase().includes(query)
      );
    }
    
    if (selectedCategory !== 'all') {
      items = items.filter(item => item.category.toLowerCase() === selectedCategory);
    }
    
    return items;
  });

  onMount(() => {
    loadPortfolioItems();
    setTimeout(() => visible = true, 100);
  });
</script>

<div class="container mx-auto p-6 max-w-7xl">
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 {visible ? 'animate-fade-in' : 'opacity-0'}">
    <div>
      <h1 class="text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">Portfolio</h1>
      <p class="text-muted-foreground text-lg">Check out my latest work and projects.</p>
    </div>
  </div>

  <div class="flex flex-col sm:flex-row gap-4 mb-8 {visible ? 'animate-fade-in delay-100' : 'opacity-0'}">
    <div class="relative flex-1">
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
      <div class="flex gap-2 flex-wrap">
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
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each Array(3) as _}
        <Card.Root class="overflow-hidden animate-pulse">
          <div class="h-48 bg-muted"></div>
          <Card.Header>
            <div class="h-6 bg-muted rounded w-3/4 mb-2"></div>
            <div class="h-4 bg-muted rounded w-1/2"></div>
          </Card.Header>
          <Card.Content>
            <div class="h-4 bg-muted rounded w-full mb-2"></div>
            <div class="h-4 bg-muted rounded w-5/6"></div>
          </Card.Content>
        </Card.Root>
      {/each}
    </div>
  {:else if error}
    <div class="bg-destructive/10 border border-destructive text-destructive p-4 rounded-lg">
      <p class="font-medium">Error: {error}</p>
      <Button variant="outline" size="sm" class="mt-2" onclick={loadPortfolioItems}>Try again</Button>
    </div>
  {:else if filteredItems().length === 0}
    <div class="text-center py-20 border-2 border-dashed rounded-xl">
      <p class="text-muted-foreground text-xl mb-4">No projects found.</p>
      <Button variant="secondary" onclick={() => { searchQuery = ''; selectedCategory = 'all'; }}>
        Clear filters
      </Button>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each filteredItems() as item, i (item.id)}
        <Card.Root class="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 border-muted/50 group {visible ? 'animate-fade-in' : 'opacity-0'}"
           style="animation-delay: {150 + i * 50}ms">
          <div class="aspect-video relative overflow-hidden">
            <img 
              src={item.imageUrl || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600'} 
              alt={item.title} 
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-2">
              {#if item.githubUrl}
                <Button size="icon-sm" variant="secondary" href={item.githubUrl} target="_blank" aria-label="View on GitHub">
                  <Github class="h-4 w-4" />
                </Button>
              {/if}
              {#if item.liveUrl}
                <Button size="icon-sm" variant="secondary" href={item.liveUrl} target="_blank" aria-label="View live demo">
                  <ExternalLink class="h-4 w-4" />
                </Button>
              {/if}
            </div>
          </div>
          <Card.Header>
            <Card.Title class="line-clamp-1 group-hover:text-primary transition-colors">{item.title}</Card.Title>
            <Card.Description class="line-clamp-2">{item.description}</Card.Description>
          </Card.Header>
          <Card.Content class="mt-auto pt-0">
            <div class="flex flex-wrap gap-2">
              {#each item.tags.split(',').slice(0, 4) as tag}
                <span class="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground">
                  {tag.trim()}
                </span>
              {/each}
            </div>
          </Card.Content>
          <Card.Footer class="pt-4">
            <Button href="/portfolio/{item.id}" variant="secondary" class="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              View Details
            </Button>
          </Card.Footer>
        </Card.Root>
      {/each}
    </div>
  {/if}
</div>
