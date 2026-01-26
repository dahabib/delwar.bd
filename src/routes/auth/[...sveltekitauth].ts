import { SvelteKitAuth } from "@auth/sveltekit";
import { handle as authHandle } from "$lib/auth";

// This route handles all Auth.js callbacks and redirects
// The actual configuration is in $lib/auth.ts
export const GET = authHandle as any;
export const POST = authHandle as any;
