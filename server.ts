import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { StorageEngine } from "./mongodb";
import { CloudinaryEngine } from "./cloudinary";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Set payload size limit high enough to accommodate base64 image uploads smoothly
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Middleware: Authenticate Admin using symmetric bearer token
  function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader === "Bearer secure_apex_admin_token") {
      next();
    } else {
      res.status(401).json({ error: "Access denied. Token invalid or expired." });
    }
  }

  // API Route: Secure Admin Authentication Login
  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (password === adminPassword) {
      return res.json({ success: true, token: "secure_apex_admin_token" });
    } else {
      return res.status(401).json({ success: false, error: "Incorrect administrator password credentials." });
    }
  });

  // --- Storage Mode API ---
  app.get("/api/storage-status", async (req, res) => {
    const isMongo = await StorageEngine.isUsingMongo();
    const isCloudinary = CloudinaryEngine.isConfigured();
    res.json({
      database: isMongo ? "MongoDB Connected" : "Local database.json Fallback",
      images: isCloudinary ? "Cloudinary API Active" : "Mock Unsplash Engine",
    });
  });

  // --- Cloudinary Upload API ---
  app.post("/api/upload", requireAdmin, async (req, res) => {
    try {
      const { file } = req.body;
      if (!file) {
        return res.status(400).json({ error: "No image file provided." });
      }
      const uploadedUrl = await CloudinaryEngine.uploadImage(file);
      res.json({ url: uploadedUrl });
    } catch (err: any) {
      console.error("Cloudinary upload route crash:", err);
      res.status(500).json({ error: "Failed to dispatch asset to server." });
    }
  });

  // --- Services API ---
  app.get("/api/services", async (req, res) => {
    try {
      const list = await StorageEngine.getServices();
      res.json(list);
    } catch (err) {
      res.status(500).json({ error: "Failed to extract services records." });
    }
  });

  app.post("/api/services", requireAdmin, async (req, res) => {
    try {
      const newService = await StorageEngine.addService({
        title: req.body.title,
        description: req.body.description,
        iconName: req.body.iconName,
        details: req.body.details
      });
      res.json(newService);
    } catch (err) {
      res.status(500).json({ error: "Failed to insert service item." });
    }
  });

  app.put("/api/services/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await StorageEngine.updateService(id, {
        title: req.body.title,
        description: req.body.description,
        iconName: req.body.iconName,
        details: req.body.details
      });
      if (!updated) {
        return res.status(404).json({ error: "Service item not found." });
      }
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: "Failed to modify service item." });
    }
  });

  app.delete("/api/services/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const success = await StorageEngine.deleteService(id);
      if (!success) {
        return res.status(404).json({ error: "Service item not found." });
      }
      res.json({ success: true, message: "Service successfully cleared." });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete service item." });
    }
  });

  // --- Portfolio API ---
  app.get("/api/portfolio", async (req, res) => {
    try {
      const list = await StorageEngine.getPortfolio();
      res.json(list);
    } catch (err) {
      res.status(500).json({ error: "Failed to load project files." });
    }
  });

  app.post("/api/portfolio", requireAdmin, async (req, res) => {
    try {
      const newProj = await StorageEngine.addPortfolio({
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        techUsed: req.body.techUsed,
        client: req.body.client,
        year: req.body.year,
        keyOutcome: req.body.keyOutcome
      });
      res.json(newProj);
    } catch (err) {
      res.status(500).json({ error: "Failed to establish project case file." });
    }
  });

  app.put("/api/portfolio/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await StorageEngine.updatePortfolio(id, {
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        techUsed: req.body.techUsed,
        client: req.body.client,
        year: req.body.year,
        keyOutcome: req.body.keyOutcome
      });
      if (!updated) {
        return res.status(404).json({ error: "Portfolio project not found." });
      }
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: "Failed to revise project record." });
    }
  });

  app.delete("/api/portfolio/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const success = await StorageEngine.deletePortfolio(id);
      if (!success) {
        return res.status(404).json({ error: "Portfolio project not found." });
      }
      res.json({ success: true, message: "Portfolio project removed." });
    } catch (err) {
      res.status(500).json({ error: "Failed to remove portfolio project." });
    }
  });

  // --- Popups API ---
  app.get("/api/popups", async (req, res) => {
    try {
      const list = await StorageEngine.getPopups();
      res.json(list);
    } catch (err) {
      res.status(500).json({ error: "Failed to extract alerts." });
    }
  });

  app.post("/api/popups", requireAdmin, async (req, res) => {
    try {
      const newPopup = await StorageEngine.addPopup({
        title: req.body.title,
        type: req.body.type,
        message: req.body.message,
        link: req.body.link,
        active: req.body.active
      });
      res.json(newPopup);
    } catch (err) {
      res.status(500).json({ error: "Failed to deploy alert record." });
    }
  });

  app.put("/api/popups/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await StorageEngine.updatePopup(id, {
        title: req.body.title,
        type: req.body.type,
        message: req.body.message,
        link: req.body.link,
        active: req.body.active
      });
      if (!updated) {
        return res.status(404).json({ error: "Notification popup not found." });
      }
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: "Failed to revise alert status." });
    }
  });

  app.delete("/api/popups/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const success = await StorageEngine.deletePopup(id);
      if (!success) {
        return res.status(404).json({ error: "Notification popup not found." });
      }
      res.json({ success: true, message: "Notification popup deleted." });
    } catch (err) {
      res.status(500).json({ error: "Failed to remove alert." });
    }
  });

  // --- Blogs API ---
  app.get("/api/blogs", async (req, res) => {
    try {
      const list = await StorageEngine.getBlogs();
      res.json(list);
    } catch (err) {
      res.status(500).json({ error: "Failed to index blog posts." });
    }
  });

  app.post("/api/blogs", requireAdmin, async (req, res) => {
    try {
      const newBlog = await StorageEngine.addBlog({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        author: req.body.author,
        date: req.body.date,
        readTime: req.body.readTime,
        content: req.body.content
      });
      res.json(newBlog);
    } catch (err) {
      res.status(500).json({ error: "Failed to publish blog insight." });
    }
  });

  // --- Contact API ---
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message, projectService, intent } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required." });
      }

      const contact = await StorageEngine.addContact({
        name,
        email,
        service: projectService || "General Inquiry",
        message,
        intent: intent || "Get Started",
      });
      res.json({ success: true, contact });
    } catch (err) {
      console.error("Contact endpoint failed:", err);
      res.status(500).json({ error: "Failed to submit contact request." });
    }
  });

  app.put("/api/blogs/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await StorageEngine.updateBlog(id, {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        author: req.body.author,
        date: req.body.date,
        readTime: req.body.readTime,
        content: req.body.content
      });
      if (!updated) {
        return res.status(404).json({ error: "Blog post not found." });
      }
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: "Failed to revise editorial insights." });
    }
  });

  app.delete("/api/blogs/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const success = await StorageEngine.deleteBlog(id);
      if (!success) {
        return res.status(404).json({ error: "Blog post not found." });
      }
      res.json({ success: true, message: "Blog post deleted." });
    } catch (err) {
      res.status(500).json({ error: "Failed to archive blog insight." });
    }
  });

  // Serve static UI assets and index files
  if (process.env.NODE_ENV !== "production") {
    // In development mode, mount Vite middleware for Hot Reload and source files rendering
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serving built production React files
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Express Backend Server] running smoothly on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Express initialization failed:", err);
});
