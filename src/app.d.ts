// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { PrismaClient } from '@prisma/client';
import type { DefaultSession } from '@auth/sveltekit'; // Import Session type

declare module "@auth/sveltekit" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth(): Promise<import("@auth/sveltekit").Session | null>; // Add auth method to locals
		}
		interface PageData {
			session: import("@auth/sveltekit").Session | null; // Add session to page data
		}
		// interface PageState {}
		// interface Platform {}
	}
  var __prisma: PrismaClient; // Add this line
}

export {};
