import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from './$types';

// GET /dashboard/portfolio
// Lists all portfolio items for the authenticated user
export const GET: RequestHandler = async ({ locals }) => {
  const session = await locals.auth();
  if (!session?.user?.id) {
    return json({ message: 'Not authenticated' }, { status: 401 });
  }

  const portfolioItems = await prisma.portfolioItem.findMany({
    where: { userId: session.user.id },
  });

  return json(portfolioItems);
};

// POST /dashboard/portfolio
// Creates a new portfolio item for the authenticated user
export const POST: RequestHandler = async ({ request, locals }) => {
  const session = await locals.auth();
  if (!session?.user?.email) {
    return json({ message: 'Not authenticated' }, { status: 401 });
  }

  const { title, description, imageUrl, githubUrl, liveUrl, tags, category } = await request.json();

  if (!title || !description || !category) {
    return json({ message: 'Missing required fields' }, { status: 400 });
  }

  const tagsString = Array.isArray(tags) ? tags.join(',') : tags || '';

  const newPortfolioItem = await prisma.portfolioItem.create({
    data: {
      title,
      description,
      imageUrl,
      githubUrl,
      liveUrl,
      tags: tagsString,
      category,
      userId: session?.user?.id,
    },
  });

  return json(newPortfolioItem, { status: 201 });
};
