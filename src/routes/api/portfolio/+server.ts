import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from './$types';

// GET /api/portfolio
// Lists all public portfolio items
export const GET: RequestHandler = async () => {
  const portfolioItems = await prisma.portfolioItem.findMany({
    // In a real application, you might add a filter like:
    // where: { isPublic: true, userId: 'delwar_ahmed_user_id' },
    // For now, fetching all items.
  });

  return json(portfolioItems);
};
