<script lang="ts">
  import { theme } from '$lib/stores/theme';
  import { Sun, Moon } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let mounted = $state(false);

  onMount(() => {
    theme.init();
    mounted = true;
  });
</script>

<button
  onclick={() => theme.toggle()}
  class="relative inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
  aria-label="Toggle theme"
>
  {#if mounted}
    <div class="relative h-5 w-5">
      <span
        class="absolute inset-0 rotate-0 scale-100 transition-transform duration-300 dark:rotate-90 dark:scale-0"
      >
        <Sun class="h-5 w-5 text-amber-500" />
      </span>
      <span
        class="absolute inset-0 -rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100"
      >
        <Moon class="h-5 w-5 text-indigo-400" />
      </span>
    </div>
  {/if}
</button>
