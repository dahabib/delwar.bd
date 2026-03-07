import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getSiteSettings } from '$lib/server/content';

export const load: PageServerLoad = async () => {
  const siteSettings = await getSiteSettings();
  return { siteSettings };
};

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    if (!name || !email || !message) {
      return fail(400, {
        error: 'All fields are required',
        values: { name, email, subject, message },
      });
    }

    // In a real application, you would send an email here using a service like Resend, Nodemailer, etc.
    // For now, we'll just mock a success response.
    console.log('Contact form submission:', { name, email, subject, message });

    // Simulate some work
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: 'Thank you for your message! I will get back to you soon.',
    };
  },
} satisfies Actions;
