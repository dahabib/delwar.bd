import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
  const session = await locals.auth();
  if (!session?.user?.id) {
    throw redirect(302, '/dashboard'); // Redirect to dashboard if not authenticated
  }

  const { id } = params;
  const portfolioItem = await prisma.portfolioItem.findUnique({
    where: { id, userId: session.user.id },
  });

  if (!portfolioItem) {
    throw redirect(302, '/dashboard'); // Redirect if item not found or unauthorized
  }

  return {
    portfolioItem,
  };
};
