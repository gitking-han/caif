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
    const updated = await StorageEngine.updatePortfolio(id, {
      title: body.title,
      category: body.category,
      description: body.description,
      imageUrl: body.imageUrl,
      techUsed: body.techUsed,
      client: body.client,
      year: body.year,
      keyOutcome: body.keyOutcome
    });

    if (!updated) {
      return Response.json({ error: "Portfolio project not found." }, { status: 404 });
    }
    return Response.json(updated);
  } catch (err) {
    return Response.json({ error: "Failed to revise project record." }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!verifyAdminToken(request)) {
    return Response.json({ error: "Access denied. Token invalid or expired." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const success = await StorageEngine.deletePortfolio(id);

    if (!success) {
      return Response.json({ error: "Portfolio project not found." }, { status: 404 });
    }
    return Response.json({ success: true, message: "Portfolio project removed." });
  } catch (err) {
    return Response.json({ error: "Failed to remove portfolio project." }, { status: 500 });
  }
}
