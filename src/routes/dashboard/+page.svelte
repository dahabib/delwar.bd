<script lang="ts">
  import type { PageData } from './$types';
  import * as Card from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import { onMount } from 'svelte';
  import { Plus, Trash2, Edit, ExternalLink, Github, Eye, Calendar, BarChart3, Clock, Settings } from 'lucide-svelte';

  let { data }: { data: PageData } = $props();

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
  let visible = $state(false);

  const stats = $derived([
    { label: 'Total Projects', value: portfolioItems.length, icon: BarChart3, color: 'bg-primary/10 text-primary' },
    { label: 'Live Projects', value: portfolioItems.filter(p => p.liveUrl).length, icon: ExternalLink, color: 'bg-green-500/10 text-green-500' },
    { label: 'With GitHub', value: portfolioItems.filter(p => p.githubUrl).length, icon: Github, color: 'bg-foreground/10 text-foreground' },
    { label: 'This Month', value: portfolioItems.filter(p => {
      const now = new Date();
      const created = new Date(p.createdAt);
      return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
    }).length, icon: Calendar, color: 'bg-blue-500/10 text-blue-500' },
  ]);

  const recentItems = $derived(portfolioItems.slice(0, 5));

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

  $effect(() => {
    if (data.session?.user) {
      loadPortfolioItems();
    } else {
      portfolioItems = [];
      loading = false;
    }
  });

  onMount(() => {
    setTimeout(() => visible = true, 100);
  });

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
</script>

<div class="space-y-8">
  <!-- Welcome Section -->
  <div class="{visible ? 'animate-fade-in' : 'opacity-0'}">
    <h1 class="text-3xl font-bold tracking-tight">Welcome back!</h1>
    <p class="text-muted-foreground mt-1">Here's an overview of your portfolio.</p>
  </div>

  <!-- Stats Grid -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    {#each stats as stat, i}
      <Card.Root class="{visible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: {100 + i * 50}ms">
        <Card.Content class="pt-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <p class="text-3xl font-bold mt-1">{stat.value}</p>
            </div>
            <div class="h-12 w-12 rounded-lg flex items-center justify-center {stat.color}">
              <stat.icon class="h-6 w-6" />
            </div>
          </div>
        </Card.Content>
      </Card.Root>
    {/each}
  </div>

  <!-- Quick Actions -->
  <div class="flex flex-wrap gap-4 {visible ? 'animate-fade-in delay-300' : 'opacity-0'}">
    <Button href="/dashboard/add" class="gap-2">
      <Plus class="h-4 w-4" />
      Add Project
    </Button>
    <Button href="/dashboard/homepage" variant="outline" class="gap-2">
      <Edit class="h-4 w-4" />
      Edit Homepage
    </Button>
    <Button href="/dashboard/settings" variant="outline" class="gap-2">
      <Settings class="h-4 w-4" />
      Settings
    </Button>
  </div>

  <Separator />

  <!-- Recent Projects -->
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold">Recent Projects</h2>
      <Button href="/dashboard/portfolio" variant="ghost" size="sm">View all</Button>
    </div>

    {#if loading}
      <div class="grid gap-4">
        {#each Array(3) as _}
          <div class="h-20 rounded-lg bg-muted animate-pulse"></div>
        {/each}
      </div>
    {:else if portfolioItems.length === 0}
      <Card.Root class="border-dashed">
        <Card.Content class="flex flex-col items-center justify-center py-8">
          <Eye class="h-12 w-12 text-muted-foreground mb-4" />
          <p class="text-muted-foreground mb-4">No projects yet.</p>
          <Button href="/dashboard/add" variant="secondary">Add your first project</Button>
        </Card.Content>
      </Card.Root>
    {:else}
      <div class="space-y-4">
        {#each recentItems as item, i (item.id)}
          <Card.Root class="{visible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay:{400 + i * 50}ms">
            <Card.Content class="flex items-center gap-4 p-4">
              <div class="h-16 w-24 rounded-md overflow-hidden bg-muted shrink-0">
                <img
                  src={item.imageUrl || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=100'}
                  alt={item.title}
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-medium truncate">{item.title}</h3>
                <p class="text-sm text-muted-foreground truncate">{item.description}</p>
                <div class="flex items-center gap-2 mt-1">
                  <Clock class="h-3 w-3 text-muted-foreground" />
                  <span class="text-xs text-muted-foreground">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div class="flex items-center gap-2">
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
</div>
