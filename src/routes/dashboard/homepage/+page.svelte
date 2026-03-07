<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import { Switch } from "$lib/components/ui/switch/index.js";
  import { onMount } from 'svelte';
  import { Save, Loader2, CheckCircle2, Code2, Database, Cloud, Sparkles } from 'lucide-svelte';

  let { data } = $props();

  let visible = $state(false);
  let saving = $state(false);
  let saved = $state(false);

  let content = $state(data.homepageContent);

  const iconOptions = [
    { value: 'code', label: 'Code', icon: Code2 },
    { value: 'database', label: 'Database', icon: Database },
    { value: 'cloud', label: 'Cloud', icon: Cloud },
  ];

  async function saveContent() {
    saving = true;
    try {
      const response = await fetch('/api/homepage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      });
      if (response.ok) {
        saved = true;
        setTimeout(() => saved = false, 3000);
      }
    } finally {
      saving = false;
    }
  }

  onMount(() => {
    setTimeout(() => visible = true, 100);
  });
</script>

<div class="space-y-8 max-w-4xl">
  <div class="{visible ? 'animate-fade-in' : 'opacity-0'}">
    <h1 class="text-3xl font-bold tracking-tight">Homepage Sections</h1>
    <p class="text-muted-foreground mt-1">Manage the content displayed on your homepage.</p>
  </div>

  <!-- Hero Section -->
  <Card.Root class="{visible ? 'animate-fade-in delay-100' : 'opacity-0'}">
    <Card.Header>
      <Card.Title class="flex items-center gap-2">
        <Sparkles class="h-5 w-5 text-primary" />
        Hero Section
      </Card.Title>
      <Card.Description>The main banner at the top of your homepage.</Card.Description>
    </Card.Header>
    <Card.Content class="space-y-4">
      <div class="flex items-center justify-between">
        <Label for="showBadge" class="text-base">Show availability badge</Label>
        <Switch id="showBadge" bind:checked={content.hero.showBadge} />
      </div>
      
      <div class="grid gap-2">
        <Label for="tagline">Tagline</Label>
        <Input id="tagline" bind:value={content.hero.tagline} placeholder="Available for freelance work" />
      </div>

      <div class="grid gap-2">
        <Label for="heroTitle">Title</Label>
        <Input id="heroTitle" bind:value={content.hero.title} placeholder="Building Digital Excellence" />
      </div>

      <div class="grid gap-2">
        <Label for="heroSubtitle">Subtitle</Label>
        <Textarea id="heroSubtitle" bind:value={content.hero.subtitle} placeholder="Your subtitle text..." rows={3} />
      </div>
    </Card.Content>
  </Card.Root>

  <!-- Skills Section -->
  <Card.Root class="{visible ? 'animate-fade-in delay-200' : 'opacity-0'}">
    <Card.Header>
      <Card.Title class="flex items-center gap-2">
        <Code2 class="h-5 w-5 text-primary" />
        Skills Section
      </Card.Title>
      <Card.Description>Showcase your core expertise areas.</Card.Description>
    </Card.Header>
    <Card.Content class="space-y-6">
      <div class="grid gap-2">
        <Label for="skillsTitle">Section Title</Label>
        <Input id="skillsTitle" bind:value={content.skills.title} />
      </div>

      <div class="grid gap-2">
        <Label for="skillsSubtitle">Section Subtitle</Label>
        <Textarea id="skillsSubtitle" bind:value={content.skills.subtitle} rows={2} />
      </div>

      <Separator />

      <div class="space-y-4">
        <h3 class="font-medium">Skill Items</h3>
        {#each content.skills.items as item, i}
          <div class="p-4 rounded-lg border bg-card/50 space-y-3">
            <div class="flex items-center justify-between">
              <span class="font-medium">Item {i + 1}</span>
            </div>
            <div class="grid gap-2">
              <Label for="skillTitle{i}">Title</Label>
              <Input id="skillTitle{i}" bind:value={item.title} />
            </div>
            <div class="grid gap-2">
              <Label for="skillDesc{i}">Description</Label>
              <Textarea id="skillDesc{i}" bind:value={item.description} rows={2} />
            </div>
          </div>
        {/each}
      </div>
    </Card.Content>
  </Card.Root>

  <!-- CTA Section -->
  <Card.Root class="{visible ? 'animate-fade-in delay-300' : 'opacity-0'}">
    <Card.Header>
      <Card.Title class="flex items-center gap-2">
        <CheckCircle2 class="h-5 w-5 text-primary" />
        Call to Action Section
      </Card.Title>
      <Card.Description>The final section encouraging visitors to get in touch.</Card.Description>
    </Card.Header>
    <Card.Content class="space-y-4">
      <div class="grid gap-2">
        <Label for="ctaTitle">Title</Label>
        <Input id="ctaTitle" bind:value={content.cta.title} />
      </div>

      <div class="grid gap-2">
        <Label for="ctaSubtitle">Subtitle</Label>
        <Textarea id="ctaSubtitle" bind:value={content.cta.subtitle} rows={2} />
      </div>

      <div class="grid gap-2">
        <Label for="ctaButton">Button Text</Label>
        <Input id="ctaButton" bind:value={content.cta.buttonText} />
      </div>
    </Card.Content>
  </Card.Root>

  <!-- Save Button -->
  <div class="flex items-center gap-4 {visible ? 'animate-fade-in delay-400' : 'opacity-0'}">
    <Button onclick={saveContent} disabled={saving} class="gap-2">
      {#if saving}
        <Loader2 class="h-4 w-4 animate-spin" />
        Saving...
      {:else if saved}
        <CheckCircle2 class="h-4 w-4" />
        Saved!
      {:else}
        <Save class="h-4 w-4" />
        Save Changes
      {/if}
    </Button>
    
    <Button variant="outline" href="/">Preview Homepage</Button>
  </div>
</div>
