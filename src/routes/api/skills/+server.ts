import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import prisma from "$lib/prisma";

export const GET: RequestHandler = async ({ url }) => {
  try {
    const portfolioId = url.searchParams.get("portfolioId") || "main";
    const skills = await prisma.skill.findMany({
      where: { portfolioId },
      orderBy: { createdAt: "desc" },
    });
    return json(skills);
  } catch (error) {
    console.error("Error fetching skills:", error);
    return json({ error: "Failed to fetch skills" }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request, locals }) => {
  try {
    const session = await locals.auth();
    if (!session) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const skill = await prisma.skill.create({
      data: {
        ...data,
        portfolioId: data.portfolioId || "main",
      },
    });

    return json(skill);
  } catch (error) {
    console.error("Error creating skill:", error);
    return json({ error: "Failed to create skill" }, { status: 500 });
  }
};

export const PUT: RequestHandler = async ({ request, locals }) => {
  try {
    const session = await locals.auth();
    if (!session) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const { id, ...updateData } = data;

    const skill = await prisma.skill.update({
      where: { id },
      data: updateData,
    });

    return json(skill);
  } catch (error) {
    console.error("Error updating skill:", error);
    return json({ error: "Failed to update skill" }, { status: 500 });
  }
};

export const DELETE: RequestHandler = async ({ url, locals }) => {
  try {
    const session = await locals.auth();
    if (!session) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = url.searchParams.get("id");
    if (!id) {
      return json({ error: "ID required" }, { status: 400 });
    }

    await prisma.skill.delete({
      where: { id },
    });

    return json({ success: true });
  } catch (error) {
    console.error("Error deleting skill:", error);
    return json({ error: "Failed to delete skill" }, { status: 500 });
  }
};
