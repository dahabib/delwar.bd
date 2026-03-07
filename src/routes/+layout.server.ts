import type { LayoutServerLoad } from './$types';
import { getSiteSettings } from '$lib/server/content';

export const load: LayoutServerLoad = async ({ locals }) => {
  const siteSettings = await getSiteSettings();
  return {
    session: await locals.auth(),
    title: siteSettings.site.title,
    description: siteSettings.site.description,
    siteSettings,
  };
};
