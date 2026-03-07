import type { PageServerLoad } from './$types';
import { getSiteSettings } from '$lib/server/content';

export const load: PageServerLoad = async () => {
  const siteSettings = await getSiteSettings();
  return { siteSettings };
};
