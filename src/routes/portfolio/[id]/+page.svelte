<script lang="ts">
  import type { PageData } from './$types';
  import { Button } from '$lib/components/ui/button';
  import { Separator } from '$lib/components/ui/separator';
  import { ArrowLeft, ExternalLink, Github, Calendar } from 'lucide-svelte';

  let { data }: { data: PageData } = $props();
  const item = $derived(data.portfolioItem);
</script>

<div class="container mx-auto px-4 py-12 max-w-5xl">
  <Button href="/portfolio" variant="ghost" size="sm" class="mb-8 group">
    <ArrowLeft class="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
    Back to Portfolio
  </Button>

  {#if item}
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div class="lg:col-span-2 space-y-8">
        <div>
          <h1 class="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">{item.title}</h1>
          <div class="flex items-center gap-4 text-muted-foreground">
            <span class="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              {item.category}
            </span>
            <span class="flex items-center text-sm">
              <Calendar class="mr-1.5 h-4 w-4" />
              {new Date(item.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
            </span>
          </div>
        </div>

        {#if item.imageUrl}
          <div class="overflow-hidden rounded-2xl border shadow-xl">
            <img src={item.imageUrl} alt={item.title} class="w-full aspect-video object-cover" />
          </div>
        {/if}

        <div class="prose prose-zinc dark:prose-invert max-w-none">
          <h2 class="text-2xl font-bold border-b pb-2 mb-4">Project Overview</h2>
          <p class="text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">
            {item.description}
          </p>
        </div>
      </div>

      <div class="space-y-6">
        <div class="rounded-xl border bg-card p-6 shadow-sm sticky top-24">
          <h3 class="font-bold text-xl mb-6">Project Details</h3>
          
          <div class="space-y-6">
            {#if item.liveUrl}
              <Button href={item.liveUrl} target="_blank" class="w-full shadow-lg shadow-primary/20">
                <ExternalLink class="mr-2 h-4 w-4" />
                Live Demo
              </Button>
            {/if}
            
            {#if item.githubUrl}
              <Button href={item.githubUrl} target="_blank" variant="outline" class="w-full">
                <Github class="mr-2 h-4 w-4" />
                View Source
              </Button>
            {/if}

            <Separator />

            <div class="space-y-4">
              <div class="text-sm">
                <span class="font-semibold block mb-1">Last Updated</span>
                <span class="text-muted-foreground">{new Date(item.updatedAt).toLocaleDateString()}</span>
              </div>

              {#if item.tags && item.tags.length > 0}
                <div class="text-sm">
                  <span class="font-semibold block mb-2">Technologies</span>
                  <div class="flex flex-wrap gap-2">
                    {#each item.tags as tag}
                      <span class="inline-flex items-center rounded-md border bg-muted/50 px-2 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted">
                        {tag}
                      </span>
                    {/each}
                  </div>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <div class="text-center py-20">
      <h2 class="text-2xl font-bold mb-4">Project Not Found</h2>
      <p class="text-muted-foreground mb-8">The project you're looking for doesn't exist or has been moved.</p>
      <Button href="/portfolio">Return to Portfolio</Button>
    </div>
  {/if}
</div>
