import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import prisma from "$lib/prisma";

export const GET: RequestHandler = async ({ url }) => {
  try {
    const portfolioId = url.searchParams.get("portfolioId") || "main";
    const experiences = await prisma.experience.findMany({
      where: { portfolioId },
      orderBy: { startDate: "desc" },
    });
    return json(experiences);
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return json({ error: "Failed to fetch experiences" }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request, locals }) => {
  try {
    const session = await locals.auth();
    if (!session) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const experience = await prisma.experience.create({
      data: {
        ...data,
        portfolioId: data.portfolioId || "main",
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
    });

    return json(experience);
  } catch (error) {
    console.error("Error creating experience:", error);
    return json({ error: "Failed to create experience" }, { status: 500 });
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

    const experience = await prisma.experience.update({
      where: { id },
      data: {
        ...updateData,
        startDate: updateData.startDate
          ? new Date(updateData.startDate)
          : undefined,
        endDate: updateData.endDate ? new Date(updateData.endDate) : null,
      },
    });

    return json(experience);
  } catch (error) {
    console.error("Error updating experience:", error);
    return json({ error: "Failed to update experience" }, { status: 500 });
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

    await prisma.experience.delete({
      where: { id },
    });

    return json({ success: true });
  } catch (error) {
    console.error("Error deleting experience:", error);
    return json({ error: "Failed to delete experience" }, { status: 500 });
  }
};
