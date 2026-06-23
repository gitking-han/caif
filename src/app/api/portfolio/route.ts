import { StorageEngine } from "@/lib/models/mongodb";

function verifyAdminToken(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  return authHeader === `Bearer secure_apex_admin_token`;
}

export async function GET(request: Request) {
  try {
    const list = await StorageEngine.getPortfolio();
    return Response.json(list);
  } catch (err) {
    return Response.json({ error: "Failed to load project files." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!verifyAdminToken(request)) {
    return Response.json({ error: "Access denied. Token invalid or expired." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const newProj = await StorageEngine.addPortfolio({
      title: body.title,
      category: body.category,
      description: body.description,
      imageUrl: body.imageUrl,
      techUsed: body.techUsed,
      client: body.client,
      year: body.year,
      keyOutcome: body.keyOutcome
    });
    return Response.json(newProj);
  } catch (err) {
    return Response.json({ error: "Failed to establish project case file." }, { status: 500 });
  }
}
