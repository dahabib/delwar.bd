import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '$lib/server/prisma';
import { env } from '$env/dynamic/private';

const AUTH_GITHUB_ID = env.AUTH_GITHUB_ID || '';
const AUTH_GITHUB_SECRET = env.AUTH_GITHUB_SECRET || '';
const AUTH_SECRET = env.AUTH_SECRET || '';
const AUTH_ALLOWED_EMAIL = env.AUTH_ALLOWED_EMAIL || '';

export const { handle, signIn, signOut } = SvelteKitAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: AUTH_GITHUB_ID,
      clientSecret: AUTH_GITHUB_SECRET,
      authorization: {
        params: { scope: 'read:user user:email' },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!AUTH_ALLOWED_EMAIL) return true;
      const allowedEmails = AUTH_ALLOWED_EMAIL.split(',').map((e) => e.trim());
      return !!user.email && allowedEmails.includes(user.email);
    },
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  secret: AUTH_SECRET,
  trustHost: true,
});
