import { StorageEngine } from "@/lib/models/mongodb";

function verifyAdminToken(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  return authHeader === `Bearer secure_apex_admin_token`;
}

export async function GET(request: Request) {
  try {
    const list = await StorageEngine.getBlogs();
    return Response.json(list);
  } catch (err) {
    return Response.json({ error: "Failed to index blog posts." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!verifyAdminToken(request)) {
    return Response.json({ error: "Access denied. Token invalid or expired." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const newBlog = await StorageEngine.addBlog({
      title: body.title,
      description: body.description,
      category: body.category,
      author: body.author,
      date: body.date,
      readTime: body.readTime,
      content: body.content
    });
    return Response.json(newBlog);
  } catch (err) {
    return Response.json({ error: "Failed to publish blog insight." }, { status: 500 });
  }
}
