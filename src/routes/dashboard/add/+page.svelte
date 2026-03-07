<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Field from "$lib/components/ui/field/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { GregorianCalendar } from '@internationalized/date';
  import { Group } from '@/components/ui/item';

  let { data } = $props(); // Use $props() for data

  let title = $state('');
  let description = $state('');
  let imageUrl = $state('');
  let githubUrl = $state('');
  let liveUrl = $state('');
  let tagsInput = $state(''); // Comma-separated string for tags
  let category = $state('');
  let submitting = $state(false);
  let error: string | null = $state(null);

  onMount(() => {
    if (!data.session?.user) { // Check data.session instead of $session
      goto('/dashboard'); // Redirect if not logged in
    }
  });

  async function handleSubmit() {
    submitting = true;
    error = null;
    try {
      const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

      const res = await fetch('/dashboard/portfolio', {
        method: 'POST',
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
        await goto('/dashboard'); // Redirect to dashboard on success
      } else {
        const errData = await res.json();
        error = errData.message || 'Failed to add portfolio item';
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
      <Card.Title class="text-3xl">Add New Portfolio Item</Card.Title>
      <Card.Description>Fill out the details below to add a new project or experience to your portfolio.</Card.Description>
    </Card.Header>
    <Card.Content>
      {#if error}
        <div class="bg-destructive/15 text-destructive text-sm font-medium p-3 rounded-md mb-6">
          {error}
        </div>
      {/if}

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
        </Field.Group >

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
              Adding...
            {:else}
              Add Portfolio Item
            {/if}
          </Button>
        </div>
      </form>
    </Card.Content>
  </Card.Root>
</div>
