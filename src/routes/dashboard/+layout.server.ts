import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const session = await locals.auth();

  if (!session?.user?.email) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }

  return { session };
};
