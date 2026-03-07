import { redirect } from '@sveltejs/kit';
import { signIn, signOut } from '$lib/auth';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
  const session = await locals.auth();
  const redirectTo = url.searchParams.get('redirectTo') || '/dashboard';

  if (session?.user) {
    throw redirect(303, redirectTo);
  }

  return { redirectTo };
};

export const actions: Actions = {
  signIn: signIn,
  signOut: signOut
};
