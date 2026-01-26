import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import prisma from "$lib/prisma";

export const GET: RequestHandler = async ({ url }) => {
  try {
    const portfolioId = url.searchParams.get("portfolioId") || "main";
    const testimonials = await prisma.testimonial.findMany({
      where: { portfolioId },
      orderBy: { createdAt: "desc" },
    });
    return json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request, locals }) => {
  try {
    const session = await locals.auth();
    if (!session) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const testimonial = await prisma.testimonial.create({
      data: {
        ...data,
        portfolioId: data.portfolioId || "main",
        rating: data.rating || 5,
      },
    });

    return json(testimonial);
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return json({ error: "Failed to create testimonial" }, { status: 500 });
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

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: updateData,
    });

    return json(testimonial);
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return json({ error: "Failed to update testimonial" }, { status: 500 });
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

    await prisma.testimonial.delete({
      where: { id },
    });

    return json({ success: true });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
};
