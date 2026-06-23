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
    const updated = await StorageEngine.updateService(id, {
      title: body.title,
      description: body.description,
      iconName: body.iconName,
      details: body.details
    });

    if (!updated) {
      return Response.json({ error: "Service item not found." }, { status: 404 });
    }
    return Response.json(updated);
  } catch (err) {
    return Response.json({ error: "Failed to modify service item." }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!verifyAdminToken(request)) {
    return Response.json({ error: "Access denied. Token invalid or expired." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const success = await StorageEngine.deleteService(id);

    if (!success) {
      return Response.json({ error: "Service item not found." }, { status: 404 });
    }
    return Response.json({ success: true, message: "Service successfully cleared." });
  } catch (err) {
    return Response.json({ error: "Failed to delete service item." }, { status: 500 });
  }
}
