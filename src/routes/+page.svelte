<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { onMount } from 'svelte';
  import { ArrowRight, Sparkles, Code2, Database, Cloud } from 'lucide-svelte';

  let { data } = $props();

  let visible = $state(false);

  onMount(() => {
    visible = true;
  });

  const getIcon = (iconName: string) => {
    const icons: Record<string, any> = { code: Code2, database: Database, cloud: Cloud };
    return icons[iconName] || Code2;
  };
</script>

<div class="relative overflow-hidden">
  <div class="absolute inset-0 -z-10 overflow-hidden">
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
    <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-300"></div>
  </div>

  <section class="relative isolate px-6 pt-14 lg:px-8 min-h-[80vh] flex items-center">
    <div class="mx-auto max-w-2xl py-20 sm:py-32 lg:py-40">
      <div class="text-center {visible ? 'animate-fade-in' : 'opacity-0'}">
        {#if data.homepageContent.hero.showBadge}
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles class="w-4 h-4" />
            <span>{data.homepageContent.hero.tagline}</span>
          </div>
        {/if}
        
        <h1 class="text-5xl font-extrabold tracking-tight sm:text-7xl mb-6">
          <span class="bg-gradient-to-r from-foreground via-primary to-primary/60 bg-clip-text text-transparent">
            {data.homepageContent.hero.title}
          </span>
        </h1>
        <p class="mt-6 text-lg font-medium text-muted-foreground sm:text-xl/8 max-w-xl mx-auto">
          {data.homepageContent.hero.subtitle}
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6 flex-wrap">
          <Button href="/portfolio" size="lg" class="group">
            View Portfolio
            <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button href="/contact" variant="ghost" size="lg">
            Get in touch
          </Button>
        </div>
      </div>
    </div>
  </section>

  <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
    <div class="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary/40 to-secondary/40 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
  </div>
</div>

<section class="py-24 sm:py-32 bg-muted/30">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl lg:text-center {visible ? 'animate-fade-in delay-200' : 'opacity-0'}">
      <h2 class="text-base font-semibold leading-7 text-primary">Core Expertise</h2>
      <p class="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{data.homepageContent.skills.title}</p>
      <p class="mt-6 text-lg leading-8 text-muted-foreground">
        {data.homepageContent.skills.subtitle}
      </p>
    </div>
    
    <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
      <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
        {#each data.homepageContent.skills.items as skill, i}
          {@const Icon = getIcon(skill.icon)}
          <div class="flex flex-col {visible ? `animate-fade-in delay-${(i + 1) * 100}` : 'opacity-0'}"
               style="animation-delay: {200 + i * 150}ms">
            <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
              <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Icon class="h-5 w-5" />
              </div>
              {skill.title}
            </dt>
            <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
              <p class="flex-auto">{skill.description}</p>
            </dd>
          </div>
        {/each}
      </dl>
    </div>
  </div>
</section>

<section class="py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl text-center {visible ? 'animate-fade-in delay-400' : 'opacity-0'}">
      <h2 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{data.homepageContent.cta.title}</h2>
      <p class="mt-6 text-lg leading-8 text-muted-foreground">
        {data.homepageContent.cta.subtitle}
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <Button href="/contact" size="lg">
          {data.homepageContent.cta.buttonText}
          <ArrowRight class="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  </div>
</section>
