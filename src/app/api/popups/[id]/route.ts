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
    const updated = await StorageEngine.updatePopup(id, {
      title: body.title,
      type: body.type,
      message: body.message,
      link: body.link,
      active: body.active
    });

    if (!updated) {
      return Response.json({ error: "Notification popup not found." }, { status: 404 });
    }
    return Response.json(updated);
  } catch (err) {
    return Response.json({ error: "Failed to revise alert status." }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!verifyAdminToken(request)) {
    return Response.json({ error: "Access denied. Token invalid or expired." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const success = await StorageEngine.deletePopup(id);

    if (!success) {
      return Response.json({ error: "Notification popup not found." }, { status: 404 });
    }
    return Response.json({ success: true, message: "Notification popup deleted." });
  } catch (err) {
    return Response.json({ error: "Failed to remove alert." }, { status: 500 });
  }
}
