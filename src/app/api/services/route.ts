import { StorageEngine } from "@/lib/models/mongodb";

function verifyAdminToken(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  return authHeader === `Bearer secure_apex_admin_token`;
}

export async function GET(request: Request) {
  try {
    const list = await StorageEngine.getServices();
    return Response.json(list);
  } catch (err) {
    return Response.json({ error: "Failed to extract services records." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!verifyAdminToken(request)) {
    return Response.json({ error: "Access denied. Token invalid or expired." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const newService = await StorageEngine.addService({
      title: body.title,
      description: body.description,
      iconName: body.iconName,
      details: body.details
    });
    return Response.json(newService);
  } catch (err) {
    return Response.json({ error: "Failed to insert service item." }, { status: 500 });
  }
}
