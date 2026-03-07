import type { PageServerLoad } from './$types';
import { getHomepageContent } from '$lib/server/content';

export const load: PageServerLoad = async () => {
  const homepageContent = await getHomepageContent();
  return { homepageContent };
};
