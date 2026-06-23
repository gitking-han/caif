import { StorageEngine } from "@/lib/models/mongodb";

function verifyAdminToken(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  return authHeader === `Bearer secure_apex_admin_token`;
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!verifyAdminToken(request)) {
    return Response.json({ error: "Access denied. Token invalid or expired." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const body = await request.json();
    const updated = await StorageEngine.updateBlog(id, {
      title: body.title,
      description: body.description,
      category: body.category,
      author: body.author,
      date: body.date,
      readTime: body.readTime,
      content: body.content
    });

    if (!updated) {
      return Response.json({ error: "Blog post not found." }, { status: 404 });
    }
    return Response.json(updated);
  } catch (err) {
    return Response.json({ error: "Failed to revise editorial insights." }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!verifyAdminToken(request)) {
    return Response.json({ error: "Access denied. Token invalid or expired." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const success = await StorageEngine.deleteBlog(id);

    if (!success) {
      return Response.json({ error: "Blog post not found." }, { status: 404 });
    }
    return Response.json({ success: true, message: "Blog post deleted." });
  } catch (err) {
    return Response.json({ error: "Failed to archive blog insight." }, { status: 500 });
  }
}
