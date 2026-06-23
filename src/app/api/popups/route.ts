import { StorageEngine } from "@/lib/models/mongodb";

function verifyAdminToken(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  return authHeader === `Bearer secure_apex_admin_token`;
}

export async function GET(request: Request) {
  try {
    const list = await StorageEngine.getPopups();
    return Response.json(list);
  } catch (err) {
    return Response.json({ error: "Failed to extract alerts." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!verifyAdminToken(request)) {
    return Response.json({ error: "Access denied. Token invalid or expired." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const newPopup = await StorageEngine.addPopup({
      title: body.title,
      type: body.type,
      message: body.message,
      link: body.link,
      active: body.active
    });
    return Response.json(newPopup);
  } catch (err) {
    return Response.json({ error: "Failed to deploy alert record." }, { status: 500 });
  }
}
