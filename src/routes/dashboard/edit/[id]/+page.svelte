<script lang="ts">
  import { goto, invalidateAll } from '$app/navigation';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Field from "$lib/components/ui/field/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Button } from "$lib/components/ui/button/index.js";

  let { data }: { data: PageData } = $props();

  let title = $state('');
  let description = $state('');
  let imageUrl = $state('');
  let githubUrl = $state('');
  let liveUrl = $state('');
  let tagsInput = $state('');
  let category = $state('');
  let submitting = $state(false);
  let error: string | null = $state(null);

  // Load data from the server using $effect
  $effect(() => {
    if (data.portfolioItem) {
      title = data.portfolioItem.title || '';
      description = data.portfolioItem.description || '';
      imageUrl = data.portfolioItem.imageUrl || '';
      githubUrl = data.portfolioItem.githubUrl || '';
      liveUrl = data.portfolioItem.liveUrl || '';
      tagsInput = data.portfolioItem.tags ?? '';
      category = data.portfolioItem.category || '';
    }
  });

  onMount(() => {
    if (!data.session?.user) {
      goto('/dashboard');
    }
  });

  async function handleSubmit() {
    submitting = true;
    error = null;
    try {
      const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

      const res = await fetch(`/dashboard/portfolio/${data.portfolioItem?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          githubUrl,
          liveUrl,
          tags,
          category,
        }),
      });

      if (res.ok) {
        await invalidateAll();
        await goto('/dashboard');
      } else {
        const errData = await res.json();
        error = errData.message || 'Failed to update portfolio item';
      }
    } catch (e: any) {
      error = e.message || 'Network error';
    } finally {
      submitting = false;
    }
  }
</script>

<div class="container mx-auto p-4 max-w-2xl">
  <Card.Root>
    <Card.Header>
      <Card.Title class="text-3xl">Edit Portfolio Item</Card.Title>
      <Card.Description>Update the details of your portfolio item below.</Card.Description>
    </Card.Header>
    <Card.Content>
      {#if error}
        <div class="bg-destructive/15 text-destructive text-sm font-medium p-3 rounded-md mb-6">
          {error}
        </div>
      {/if}

      {#if !data.portfolioItem}
        <p class="text-muted-foreground">Loading item details...</p>
      {:else}
        <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-6">
          <Field.Group>
            <Field.Label for="title">Title</Field.Label>
            <Input type="text" id="title" bind:value={title} placeholder="e.g., My Awesome Project" required />
          </Field.Group>

          <Field.Group>
            <Field.Label for="description">Description</Field.Label>
            <textarea
              id="description"
              bind:value={description}
              class="border-input bg-background selection:bg-primary dark:bg-input/30 selection:text-primary-foreground ring-offset-background placeholder:text-muted-foreground flex min-h-[120px] w-full rounded-md border px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              rows="5"
              placeholder="Describe your project..."
              required
            ></textarea>
          </Field.Group>

          <Field.Group>
            <Field.Label for="imageUrl">Image URL</Field.Label>
            <Input type="url" id="imageUrl" bind:value={imageUrl} placeholder="https://example.com/image.png" />
          </Field.Group>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field.Group>
              <Field.Label for="githubUrl">GitHub URL</Field.Label>
              <Input type="url" id="githubUrl" bind:value={githubUrl} placeholder="https://github.com/username/repo" />
            </Field.Group>

            <Field.Group>
              <Field.Label for="liveUrl">Live URL</Field.Label>
              <Input type="url" id="liveUrl" bind:value={liveUrl} placeholder="https://project-live-site.com" />
            </Field.Group>
          </div>

          <Field.Group>
            <Field.Label for="tagsInput">Tags (comma-separated)</Field.Label>
            <Input type="text" id="tagsInput" bind:value={tagsInput} placeholder="e.g., Node.js, Express, PostgreSQL" />
          </Field.Group>

          <Field.Group>
            <Field.Label for="category">Category</Field.Label>
            <select
              id="category"
              bind:value={category}
              class="border-input bg-background selection:bg-primary dark:bg-input/30 selection:text-primary-foreground ring-offset-background placeholder:text-muted-foreground flex h-9 w-full rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              required
            >
              <option value="" disabled>Select a category</option>
              <option value="project">Project</option>
              <option value="experience">Experience</option>
              <option value="skill">Skill</option>
              <option value="education">Education</option>
            </select>
          </Field.Group>

          <div class="flex justify-end gap-3 pt-4">
            <Button variant="outline" type="button" onclick={() => goto('/dashboard')}>Cancel</Button>
            <Button type="submit" disabled={submitting}>
              {#if submitting}
                Updating...
              {:else}
                Update Portfolio Item
              {/if}
            </Button>
          </div>
        </form>
      {/if}
    </Card.Content>
  </Card.Root>
</div>
