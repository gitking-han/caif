import { StorageEngine } from "@/lib/models/mongodb";
import { CloudinaryEngine } from "@/lib/cloudinary";

export async function GET(request: Request) {
  try {
    const isMongo = await StorageEngine.isUsingMongo();
    const isCloudinary = CloudinaryEngine.isConfigured();
    return Response.json({
      database: isMongo ? "MongoDB Connected" : "Local database.json Fallback",
      images: isCloudinary ? "Cloudinary API Active" : "Mock Unsplash Engine",
    });
  } catch (error) {
    return Response.json({ error: "Failed to check storage status" }, { status: 500 });
  }
}
