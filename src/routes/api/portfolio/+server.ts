import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import prisma from "$lib/prisma";

export const GET: RequestHandler = async () => {
  try {
    const portfolio = await prisma.portfolio.findFirst({
      include: {
        skills: true,
        experiences: true,
        projects: true,
        testimonials: true,
        contact: true,
      },
    });

    if (!portfolio) {
      return json(null);
    }

    return json(portfolio);
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return json({ error: "Failed to fetch portfolio" }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();

    const portfolio = await prisma.portfolio.upsert({
      where: { id: data.id || "main" },
      update: data,
      create: {
        id: "main",
        name: "Delwar Ahmed",
        title: "Fullstack Developer",
        ...data,
      },
    });

    return json(portfolio);
  } catch (error) {
    console.error("Error updating portfolio:", error);
    return json({ error: "Failed to update portfolio" }, { status: 500 });
  }
};
