const { v2: cloudinary } = require("cloudinary");

let isCloudinaryConfigured = false;

function getCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    if (!isCloudinaryConfigured) {
      console.warn("[Cloudinary Manager] WARNING: Credentials missing in process.env. Fallback URL generator active.");
      isCloudinaryConfigured = false;
    }
    return null;
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true
  });

  isCloudinaryConfigured = true;
  return cloudinary;
}

export const CloudinaryEngine = {
  isConfigured(): boolean {
    return getCloudinary() !== null;
  },

  async uploadImage(fileDataUri: string): Promise<string> {
    const client = getCloudinary();
    if (!client) {
      console.warn("[Cloudinary Generator] Using dynamic aesthetic mock SVG because credentials are not filled in .env.");

      const topics = ["abstract", "dashboard", "minimalist", "tech", "web", "charts"];
      const randomTopic = topics[Math.floor(Math.random() * topics.length)];
      return `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80&sig=${Math.floor(Math.random() * 1000)}`;
    }

    try {
      const result = await client.uploader.upload(fileDataUri, {
        folder: "apex_portfolio",
        resource_type: "image"
      });
      return result.secure_url;
    } catch (err) {
      console.error("[Cloudinary Manager] Upload operation failed, returning fallback placeholder:", err);
      return `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80`;
    }
  }
};
