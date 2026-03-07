<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import { Switch } from "$lib/components/ui/switch/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import { onMount } from 'svelte';
  import { Save, Loader2, CheckCircle2, User, Mail, Globe, Palette, Bell, Shield } from 'lucide-svelte';

  let { data } = $props();

  let visible = $state(false);
  let saving = $state(false);
  let saved = $state(false);

  let settings = $state({
    profile: {
      name: data.siteSettings.profile.name,
      title: data.siteSettings.profile.title,
      bio: data.siteSettings.profile.bio,
      email: data.siteSettings.profile.email,
      phone: data.siteSettings.profile.phone,
      location: data.siteSettings.profile.location,
      linkedin: data.siteSettings.profile.linkedin,
      twitter: data.siteSettings.profile.twitter,
      github: data.siteSettings.profile.github
    },
    site: {
      title: data.siteSettings.site.title,
      description: data.siteSettings.site.description,
      keywords: data.siteSettings.site.keywords,
      showGithubStats: data.siteSettings.site.showGithubStats,
      showVisitorCount: data.siteSettings.site.showVisitorCount
    },
    appearance: {
      theme: data.siteSettings.appearance.theme,
      primaryColor: data.siteSettings.appearance.primaryColor,
      animationEnabled: data.siteSettings.appearance.animationEnabled,
      reducedMotion: data.siteSettings.appearance.reducedMotion
    },
    notifications: {
      emailNotifications: data.siteSettings.notifications.emailNotifications,
      newVisitorAlert: data.siteSettings.notifications.newVisitorAlert,
      contactFormAlert: data.siteSettings.notifications.contactFormAlert,
      weeklyReport: data.siteSettings.notifications.weeklyReport
    }
  });

  const colorOptions = [
    { value: '#6366f1', label: 'Indigo' },
    { value: '#8b5cf6', label: 'Violet' },
    { value: '#ec4899', label: 'Pink' },
    { value: '#14b8a6', label: 'Teal' },
    { value: '#f59e0b', label: 'Amber' },
    { value: '#ef4444', label: 'Red' },
  ];

  async function saveSettings() {
    saving = true;
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
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
    <h1 class="text-3xl font-bold tracking-tight">Settings</h1>
    <p class="text-muted-foreground mt-1">Manage your profile, site settings, and preferences.</p>
  </div>

  <!-- Profile Settings -->
  <Card.Root class="{visible ? 'animate-fade-in delay-100' : 'opacity-0'}">
    <Card.Header>
      <Card.Title class="flex items-center gap-2">
        <User class="h-5 w-5 text-primary" />
        Profile
      </Card.Title>
      <Card.Description>Your personal information displayed on the site.</Card.Description>
    </Card.Header>
    <Card.Content class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="grid gap-2">
          <Label for="name">Full Name</Label>
          <Input id="name" bind:value={settings.profile.name} />
        </div>
        <div class="grid gap-2">
          <Label for="title">Professional Title</Label>
          <Input id="title" bind:value={settings.profile.title} />
        </div>
      </div>

      <div class="grid gap-2">
        <Label for="bio">Bio</Label>
        <Textarea id="bio" bind:value={settings.profile.bio} rows={3} />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" bind:value={settings.profile.email} />
        </div>
        <div class="grid gap-2">
          <Label for="phone">Phone</Label>
          <Input id="phone" type="tel" bind:value={settings.profile.phone} />
        </div>
      </div>

      <div class="grid gap-2">
        <Label for="location">Location</Label>
        <Input id="location" bind:value={settings.profile.location} />
      </div>

      <Separator />

      <h3 class="font-medium">Social Links</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="grid gap-2">
          <Label for="linkedin">LinkedIn</Label>
          <Input id="linkedin" bind:value={settings.profile.linkedin} placeholder="https://linkedin.com/in/..." />
        </div>
        <div class="grid gap-2">
          <Label for="twitter">Twitter</Label>
          <Input id="twitter" bind:value={settings.profile.twitter} placeholder="https://twitter.com/..." />
        </div>
        <div class="grid gap-2">
          <Label for="github">GitHub</Label>
          <Input id="github" bind:value={settings.profile.github} placeholder="https://github.com/..." />
        </div>
      </div>
    </Card.Content>
  </Card.Root>

  <!-- Site Settings -->
  <Card.Root class="{visible ? 'animate-fade-in delay-200' : 'opacity-0'}">
    <Card.Header>
      <Card.Title class="flex items-center gap-2">
        <Globe class="h-5 w-5 text-primary" />
        Site Settings
      </Card.Title>
      <Card.Description>Configure your site metadata and features.</Card.Description>
    </Card.Header>
    <Card.Content class="space-y-4">
      <div class="grid gap-2">
        <Label for="siteTitle">Site Title</Label>
        <Input id="siteTitle" bind:value={settings.site.title} />
      </div>

      <div class="grid gap-2">
        <Label for="siteDescription">Description</Label>
        <Textarea id="siteDescription" bind:value={settings.site.description} rows={2} />
      </div>

      <div class="grid gap-2">
        <Label for="keywords">Keywords (comma separated)</Label>
        <Input id="keywords" bind:value={settings.site.keywords} />
      </div>

      <Separator />

      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <Label for="githubStats">Show GitHub Stats</Label>
            <p class="text-sm text-muted-foreground">Display your GitHub contribution stats</p>
          </div>
          <Switch id="githubStats" bind:checked={settings.site.showGithubStats} />
        </div>

        <div class="flex items-center justify-between">
          <div>
            <Label for="visitorCount">Show Visitor Count</Label>
            <p class="text-sm text-muted-foreground">Display page view counter</p>
          </div>
          <Switch id="visitorCount" bind:checked={settings.site.showVisitorCount} />
        </div>
      </div>
    </Card.Content>
  </Card.Root>

  <!-- Appearance Settings -->
  <Card.Root class="{visible ? 'animate-fade-in delay-300' : 'opacity-0'}">
    <Card.Header>
      <Card.Title class="flex items-center gap-2">
        <Palette class="h-5 w-5 text-primary" />
        Appearance
      </Card.Title>
      <Card.Description>Customize how your site looks.</Card.Description>
    </Card.Header>
    <Card.Content class="space-y-4">
      <div class="grid gap-2">
        <Label>Theme</Label>
        <div class="flex gap-2">
          {#each ['light', 'dark', 'system'] as theme}
            <button
              class="flex-1 py-2 px-4 rounded-lg border-2 transition-all {settings.appearance.theme === theme ? 'border-primary bg-primary/10' : 'border-transparent bg-muted hover:bg-muted/80'}"
              onclick={() => settings.appearance.theme = theme}
            >
              <span class="capitalize">{theme}</span>
            </button>
          {/each}
        </div>
      </div>

      <div class="grid gap-2">
        <Label>Primary Color</Label>
        <div class="flex gap-2">
          {#each colorOptions as color}
            <button
              class="h-10 w-10 rounded-lg border-2 transition-all {settings.appearance.primaryColor === color.value ? 'border-foreground scale-110' : 'border-transparent hover:scale-105'}"
              style="background-color: {color.value}"
              onclick={() => settings.appearance.primaryColor = color.value}
              aria-label={color.label}
            ></button>
          {/each}
        </div>
      </div>

      <Separator />

      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <Label for="animations">Enable Animations</Label>
            <p class="text-sm text-muted-foreground">Show animated elements on the site</p>
          </div>
          <Switch id="animations" bind:checked={settings.appearance.animationEnabled} />
        </div>

        <div class="flex items-center justify-between">
          <div>
            <Label for="reducedMotion">Reduced Motion</Label>
            <p class="text-sm text-muted-foreground">Minimize animations for accessibility</p>
          </div>
          <Switch id="reducedMotion" bind:checked={settings.appearance.reducedMotion} />
        </div>
      </div>
    </Card.Content>
  </Card.Root>

  <!-- Notification Settings -->
  <Card.Root class="{visible ? 'animate-fade-in delay-400' : 'opacity-0'}">
    <Card.Header>
      <Card.Title class="flex items-center gap-2">
        <Bell class="h-5 w-5 text-primary" />
        Notifications
      </Card.Title>
      <Card.Description>Configure how you receive notifications.</Card.Description>
    </Card.Header>
    <Card.Content class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <Label for="emailNotif">Email Notifications</Label>
          <p class="text-sm text-muted-foreground">Receive notifications via email</p>
        </div>
        <Switch id="emailNotif" bind:checked={settings.notifications.emailNotifications} />
      </div>

      <div class="flex items-center justify-between">
        <div>
          <Label for="newVisitor">New Visitor Alerts</Label>
          <p class="text-sm text-muted-foreground">Get notified when someone visits your portfolio</p>
        </div>
        <Switch id="newVisitor" bind:checked={settings.notifications.newVisitorAlert} />
      </div>

      <div class="flex items-center justify-between">
        <div>
          <Label for="contactAlert">Contact Form Alerts</Label>
          <p class="text-sm text-muted-foreground">Get notified when someone sends a message</p>
        </div>
        <Switch id="contactAlert" bind:checked={settings.notifications.contactFormAlert} />
      </div>

      <div class="flex items-center justify-between">
        <div>
          <Label for="weeklyReport">Weekly Report</Label>
          <p class="text-sm text-muted-foreground">Receive a weekly summary of your site activity</p>
        </div>
        <Switch id="weeklyReport" bind:checked={settings.notifications.weeklyReport} />
      </div>
    </Card.Content>
  </Card.Root>

  <!-- Save Button -->
  <div class="flex items-center gap-4 {visible ? 'animate-fade-in delay-500' : 'opacity-0'}">
    <Button onclick={saveSettings} disabled={saving} class="gap-2">
      {#if saving}
        <Loader2 class="h-4 w-4 animate-spin" />
        Saving...
      {:else if saved}
        <CheckCircle2 class="h-4 w-4" />
        Saved!
      {:else}
        <Save class="h-4 w-4" />
        Save Settings
      {/if}
    </Button>
  </div>
</div>
