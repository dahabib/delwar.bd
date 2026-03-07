import { json } from '@sveltejs/kit';
import { getHomepageContent, updateHomepageContent, type HomepageData } from '$lib/server/content';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  try {
    const content = await getHomepageContent();
    return json(content);
  } catch (error) {
    console.error('Error fetching homepage content:', error);
    return json({ error: 'Failed to fetch homepage content' }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = (await request.json()) as HomepageData;
    await updateHomepageContent(data);
    return json({ success: true });
  } catch (error) {
    console.error('Error updating homepage content:', error);
    return json({ error: 'Failed to update homepage content' }, { status: 500 });
  }
};
