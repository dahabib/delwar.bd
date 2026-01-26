import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import prisma from "$lib/prisma";

export const GET: RequestHandler = async ({ url }) => {
  try {
    const portfolioId = url.searchParams.get("portfolioId") || "main";
    const projects = await prisma.project.findMany({
      where: { portfolioId },
      orderBy: { createdAt: "desc" },
    });
    return json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return json({ error: "Failed to fetch projects" }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request, locals }) => {
  try {
    const session = await locals.auth();
    if (!session) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const project = await prisma.project.create({
      data: {
        ...data,
        portfolioId: data.portfolioId || "main",
        technologies: data.technologies
          ? JSON.stringify(data.technologies)
          : null,
        images: data.images ? JSON.stringify(data.images) : null,
      },
    });

    return json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    return json({ error: "Failed to create project" }, { status: 500 });
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

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...updateData,
        technologies: updateData.technologies
          ? JSON.stringify(updateData.technologies)
          : undefined,
        images: updateData.images
          ? JSON.stringify(updateData.images)
          : undefined,
      },
    });

    return json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    return json({ error: "Failed to update project" }, { status: 500 });
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

    await prisma.project.delete({
      where: { id },
    });

    return json({ success: true });
  } catch (error) {
    console.error("Error deleting project:", error);
    return json({ error: "Failed to delete project" }, { status: 500 });
  }
};
