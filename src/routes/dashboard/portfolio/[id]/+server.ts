import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from './$types';

// GET /dashboard/portfolio/[id]
// Retrieves a single portfolio item by ID for the authenticated user
export const GET: RequestHandler = async ({ params, locals }) => {
  const session = await locals.auth();
  if (!session?.user?.email) {
    return json({ message: 'Not authenticated' }, { status: 401 });
  }

  const { id } = params;
  const portfolioItem = await prisma.portfolioItem.findUnique({
    where: { id, userId: session.user.id },
  });

  if (!portfolioItem) {
    return json({ message: 'Portfolio item not found' }, { status: 404 });
  }

  return json(portfolioItem);
};

// PUT /dashboard/portfolio/[id]
// Updates a single portfolio item by ID for the authenticated user
export const PUT: RequestHandler = async ({ params, request, locals }) => {
  const session = await locals.auth();
  if (!session?.user?.email) {
    return json({ message: 'Not authenticated' }, { status: 401 });
  }

  const { id } = params;
  const { title, description, imageUrl, githubUrl, liveUrl, tags, category } = await request.json();

  if (!title || !description || !category) {
    return json({ message: 'Missing required fields' }, { status: 400 });
  }

  const existingItem = await prisma.portfolioItem.findUnique({
    where: { id, userId: session.user.id },
  });

  if (!existingItem) {
    return json({ message: 'Portfolio item not found or unauthorized' }, { status: 404 });
  }

  const tagsString = Array.isArray(tags) ? tags.join(',') : tags || '';

  const updatedPortfolioItem = await prisma.portfolioItem.update({
    where: { id },
    data: {
      title,
      description,
      imageUrl,
      githubUrl,
      liveUrl,
      tags: tagsString,
      category,
    },
  });

  return json(updatedPortfolioItem);
};

// DELETE /dashboard/portfolio/[id]
// Deletes a single portfolio item by ID for the authenticated user
export const DELETE: RequestHandler = async ({ params, locals }) => {
  const session = await locals.auth();
  if (!session?.user?.email) {
    return json({ message: 'Not authenticated' }, { status: 401 });
  }

  const { id } = params;

  const existingItem = await prisma.portfolioItem.findUnique({
    where: { id, userId: session.user.id },
  });

  if (!existingItem) {
    return json({ message: 'Portfolio item not found or unauthorized' }, { status: 404 });
  }

  await prisma.portfolioItem.delete({
    where: { id },
  });

  return json({ message: 'Portfolio item deleted successfully' }, { status: 204 });
};
