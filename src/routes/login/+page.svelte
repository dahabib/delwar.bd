<script lang="ts">
  import { page } from '$app/stores';
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { AlertCircle } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let redirectTo = $derived($page.url.searchParams.get('redirectTo') || '/dashboard');
  let error = $derived($page.url.searchParams.get('error'));
  let visible = $state(false);

  onMount(() => {
    setTimeout(() => visible = true, 100);
  });
</script>

<div class="flex items-center justify-center min-h-[80vh] px-4">
  <div class="w-full max-w-md {visible ? 'animate-fade-in' : 'opacity-0'}">
    <Card.Root class="w-full shadow-2xl border-muted">
      <Card.Header class="space-y-1 text-center">
        <Card.Title class="text-3xl font-bold tracking-tight">Welcome back</Card.Title>
        <Card.Description class="text-lg">
          Sign in to manage your professional portfolio
        </Card.Description>
      </Card.Header>
      <Card.Content class="grid gap-6">
        {#if error}
          <div class="flex items-center gap-2 bg-destructive/10 text-destructive p-3 rounded-md text-sm">
            <AlertCircle class="h-4 w-4 flex-shrink-0" />
            {#if error === 'callback'}
              Authentication failed. Please check if your email is authorized.
            {:else}
              An error occurred. Please try again.
            {/if}
          </div>
        {/if}

        <form method="POST" action="?/signIn" class="w-full">
          <input type="hidden" name="provider" value="github" />
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <Button 
            type="submit"
            size="lg" 
            class="w-full h-12 text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="mr-2">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Continue with GitHub
          </Button>
        </form>
        
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <span class="w-full border-t border-muted"></span>
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-card px-3 text-muted-foreground font-medium tracking-wider">Secure Authentication</span>
          </div>
        </div>
        
        <p class="text-center text-sm text-muted-foreground px-8 leading-relaxed">
          By signing in, you agree to our 
          <a href="/" class="underline underline-offset-4 hover:text-primary transition-colors">Terms of Service</a> 
          and 
          <a href="/" class="underline underline-offset-4 hover:text-primary transition-colors">Privacy Policy</a>.
        </p>
      </Card.Content>
      
      <Card.Footer class="justify-center pb-6">
        <a 
          href="/" 
          class="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          ← Back to homepage
        </a>
      </Card.Footer>
    </Card.Root>
  </div>
</div>
