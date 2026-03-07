import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { id } = params;
  const portfolioItem = await prisma.portfolioItem.findUnique({
    where: { id },
  });

  if (!portfolioItem) {
    throw error(404, 'Portfolio item not found');
  }

  return {
    portfolioItem,
  };
};
