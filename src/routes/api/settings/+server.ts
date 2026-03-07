import { json } from '@sveltejs/kit';
import { getSiteSettings, updateSiteSettings, type SiteSettingsData } from '$lib/server/content';

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return json(settings);
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return json({ error: 'Failed to fetch site settings' }, { status: 500 });
  }
}

export async function POST({ request }) {
  try {
    const data = (await request.json()) as SiteSettingsData;
    await updateSiteSettings(data);
    return json({ success: true });
  } catch (error) {
    console.error('Error updating site settings:', error);
    return json({ error: 'Failed to update site settings' }, { status: 500 });
  }
}
