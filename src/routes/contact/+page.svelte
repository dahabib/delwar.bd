<script lang="ts">
  import { enhance } from '$app/forms';
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import * as Field from '$lib/components/ui/field';
  import { Input } from '$lib/components/ui/input';
  import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Phone, Linkedin, Twitter, Github } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let { data, form } = $props();
  let loading = $state(false);
  let visible = $state(false);

  onMount(() => {
    setTimeout(() => visible = true, 100);
  });
</script>

<div class="container mx-auto px-4 py-16 max-w-6xl">
  <div class="text-center mb-12 {visible ? 'animate-fade-in' : 'opacity-0'}">
    <h1 class="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">Get in Touch</h1>
    <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
      Have a project in mind or just want to say hi? I'd love to hear from you. 
      Fill out the form below and I'll get back to you as soon as possible.
    </p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-5 gap-12">
    <div class="lg:col-span-2 space-y-8 {visible ? 'animate-slide-left' : 'opacity-0'}" style="animation-delay: 200ms">
      <div class="space-y-6">
        <h2 class="text-2xl font-bold">Contact Information</h2>
        <p class="text-muted-foreground">
          You can also reach me directly through my social channels or email.
        </p>
        
        <div class="space-y-4">
          <a href="mailto:{data.siteSettings.profile.email}" class="flex items-center gap-4 p-4 rounded-xl border bg-card/50 hover:bg-card transition-colors">
            <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Mail class="h-5 w-5" />
            </div>
            <div>
              <p class="text-sm font-medium text-muted-foreground">Email</p>
              <p class="font-semibold text-foreground">{data.siteSettings.profile.email}</p>
            </div>
          </a>
          
          <div class="flex items-center gap-4 p-4 rounded-xl border bg-card/50">
            <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <MapPin class="h-5 w-5" />
            </div>
            <div>
              <p class="text-sm font-medium text-muted-foreground">Location</p>
              <p class="font-semibold text-foreground">{data.siteSettings.profile.location}</p>
            </div>
          </div>

          <a href="tel:{data.siteSettings.profile.phone}" class="flex items-center gap-4 p-4 rounded-xl border bg-card/50">
            <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Phone class="h-5 w-5" />
            </div>
            <div>
              <p class="text-sm font-medium text-muted-foreground">Phone</p>
              <p class="font-semibold text-foreground">{data.siteSettings.profile.phone}</p>
            </div>
          </a>
        </div>

        <div class="pt-4">
          <p class="text-sm font-medium text-muted-foreground mb-3">Social Links</p>
          <div class="flex gap-3">
            {#if data.siteSettings.profile.linkedin}
              <a href={data.siteSettings.profile.linkedin} target="_blank" rel="noopener noreferrer" class="h-10 w-10 rounded-lg border bg-card hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
                <Linkedin class="h-5 w-5" />
              </a>
            {/if}
            {#if data.siteSettings.profile.twitter}
              <a href={data.siteSettings.profile.twitter} target="_blank" rel="noopener noreferrer" class="h-10 w-10 rounded-lg border bg-card hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
                <Twitter class="h-5 w-5" />
              </a>
            {/if}
            {#if data.siteSettings.profile.github}
              <a href={data.siteSettings.profile.github} target="_blank" rel="noopener noreferrer" class="h-10 w-10 rounded-lg border bg-card hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
                <Github class="h-5 w-5" />
              </a>
            {/if}
          </div>
        </div>
      </div>
    </div>

    <div class="lg:col-span-3 {visible ? 'animate-slide-right' : 'opacity-0'}" style="animation-delay: 300ms">
      {#if form?.success}
        <Card.Root class="border-primary/20 bg-primary/5">
          <Card.Content class="pt-6 text-center py-12">
            <div class="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 animate-scale-in">
              <CheckCircle2 class="h-8 w-8" />
            </div>
            <h3 class="text-2xl font-bold mb-2">Message Sent!</h3>
            <p class="text-muted-foreground mb-6">{form.success}</p>
            <Button variant="outline" onclick={() => location.reload()}>Send another message</Button>
          </Card.Content>
        </Card.Root>
      {:else}
        <Card.Root class="shadow-xl border-muted/50">
          <Card.Header>
            <Card.Title>Send a Message</Card.Title>
            <Card.Description>I'll respond to your inquiry within 24 hours.</Card.Description>
          </Card.Header>
          <Card.Content>
            {#if form?.error}
              <div class="flex items-center gap-2 bg-destructive/10 text-destructive p-3 rounded-md mb-6 text-sm font-medium">
                <AlertCircle class="h-4 w-4" />
                {form.error}
              </div>
            {/if}

            <form 
              method="POST" 
              use:enhance={() => {
                loading = true;
                return async ({ update }) => {
                  loading = false;
                  await update();
                };
              }}
              class="space-y-6"
            >
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field.Group>
                  <Field.Label for="name">Your Name</Field.Label>
                  <Input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="John Doe" 
                    required 
                    value={form?.values?.name ?? ''}
                  />
                </Field.Group>
                
                <Field.Group>
                  <Field.Label for="email">Email Address</Field.Label>
                  <Input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="john@example.com" 
                    required 
                    value={form?.values?.email ?? ''}
                  />
                </Field.Group>
              </div>

              <Field.Group>
                <Field.Label for="subject">Subject</Field.Label>
                <Input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  placeholder="Project inquiry..." 
                  required 
                  value={String(form?.values?.subject ?? '')}
                />
              </Field.Group>

              <Field.Group>
                <Field.Label for="message">Message</Field.Label>
                <textarea
                  id="message"
                  name="message"
                  class="border-input bg-background ring-offset-background placeholder:text-muted-foreground flex min-h-[150px] w-full rounded-md border px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  placeholder="Tell me about your project..."
                  required
                >{String(form?.values?.message ?? '')}</textarea>
              </Field.Group>

              <Button type="submit" class="w-full h-11" disabled={loading}>
                {#if loading}
                  <span class="animate-spin mr-2">⏳</span>
                  Sending...
                {:else}
                  <Send class="mr-2 h-4 w-4" />
                  Send Message
                {/if}
              </Button>
            </form>
          </Card.Content>
        </Card.Root>
      {/if}
    </div>
  </div>
</div>
