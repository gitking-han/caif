import { CloudinaryEngine } from "@/lib/cloudinary";

function verifyAdminToken(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  return authHeader === `Bearer secure_apex_admin_token`;
}

export async function POST(request: Request) {
  if (!verifyAdminToken(request)) {
    return Response.json({ error: "Access denied. Token invalid or expired." }, { status: 401 });
  }

  try {
    const { file } = await request.json();
    if (!file) {
      return Response.json({ error: "No image file provided." }, { status: 400 });
    }

    const uploadedUrl = await CloudinaryEngine.uploadImage(file);
    return Response.json({ url: uploadedUrl });
  } catch (err: any) {
    console.error("Cloudinary upload route crash:", err);
    return Response.json({ error: "Failed to dispatch asset to server." }, { status: 500 });
  }
}
