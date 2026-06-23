const { MongoClient } = require("mongodb");
import fs from "fs";
import path from "path";

// Initialize environment secrets fallback
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = "apex_studio";
const DB_FILE = path.join(process.cwd(), "database.json");

let mongoClient: InstanceType<typeof MongoClient> | null = null;
let isMongoConnected = false;

// Graceful lazy connection wrapper for MongoDB
async function getMongoClient() {
  if (!MONGO_URI) {
    return null;
  }
  if (mongoClient && isMongoConnected) {
    return mongoClient;
  }
  try {
    mongoClient = new MongoClient(MONGO_URI, {
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000,
    });
    await mongoClient.connect();
    isMongoConnected = true;
    console.log("[MongoDB Manager] Connected successfully to Cloud database cluster.");
    return mongoClient;
  } catch (err) {
    console.error("[MongoDB Manager] Connection attempts failed, falling back to database.json:", err);
    isMongoConnected = false;
    return null;
  }
}

// Local local physical fallback database helpers (from former backend logic)
function readLocalDB() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const defaultData = { services: [], portfolio: [], popups: [], blogs: [] };
      fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), "utf-8");
      return defaultData;
    }
    const rawText = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(rawText);
  } catch (err) {
    console.error("Local schema reading error, using fallback state:", err);
    return { services: [], portfolio: [], popups: [], blogs: [] };
  }
}

function writeLocalDB(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Critical: Local physical write failed:", err);
  }
}

// Document Mapping Helpers (Maps MongoDB _id to standard 'id' for clean React compatibility)
function mapDoc(doc: any) {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return { id: rest.id || String(_id), ...rest };
}

function mapDocs(docs: any[]) {
  return docs.map(mapDoc);
}

// Dynamic Multi-Storage CRUD Abstraction API
export const StorageEngine = {
  async isUsingMongo(): Promise<boolean> {
    const client = await getMongoClient();
    return client !== null;
  },

  // --- SERVICES CRUD ---
  async getServices(): Promise<any[]> {
    const client = await getMongoClient();
    if (client) {
      try {
        const db = client.db(DB_NAME);
        const list = await db.collection("services").find({}).toArray();
        if (list.length > 0) {
          return mapDocs(list);
        }
        // Seed mongo if empty
        const local = readLocalDB();
        if (local.services && local.services.length > 0) {
          const docsWithId = local.services.map((item: any) => ({ ...item, _id: undefined }));
          await db.collection("services").insertMany(docsWithId);
          return local.services;
        }
        return [];
      } catch (e) {
        console.error("Mongo getServices failed, falling back:", e);
      }
    }
    return readLocalDB().services || [];
  },

  async addService(item: any): Promise<any> {
    const client = await getMongoClient();
    const newService = {
      id: item.id || "ser_" + Date.now(),
      title: item.title || "Untitled Service",
      description: item.description || "",
      iconName: item.iconName || "HelpCircle",
      details: Array.isArray(item.details) ? item.details : []
    };

    if (client) {
      try {
        const db = client.db(DB_NAME);
        await db.collection("services").insertOne({ ...newService });
        return newService;
      } catch (e) {
        console.error("Mongo addService failed:", e);
      }
    }

    const local = readLocalDB();
    local.services = local.services || [];
    local.services.push(newService);
    writeLocalDB(local);
    return newService;
  },

  async updateService(id: string, updates: any): Promise<any> {
    const client = await getMongoClient();
    if (client) {
      try {
        const db = client.db(DB_NAME);
        const result = await db.collection("services").findOneAndUpdate(
          { id: id },
          { $set: {
            title: updates.title,
            description: updates.description,
            iconName: updates.iconName,
            details: updates.details
          }},
          { returnDocument: "after" }
        );
        if (result) return mapDoc(result);
      } catch (e) {
        console.error("Mongo updateService failed:", e);
      }
    }

    const local = readLocalDB();
    local.services = local.services || [];
    const idx = local.services.findIndex((s: any) => s.id === id);
    if (idx !== -1) {
      local.services[idx] = {
        ...local.services[idx],
        title: updates.title ?? local.services[idx].title,
        description: updates.description ?? local.services[idx].description,
        iconName: updates.iconName ?? local.services[idx].iconName,
        details: Array.isArray(updates.details) ? updates.details : local.services[idx].details
      };
      writeLocalDB(local);
      return local.services[idx];
    }
    return null;
  },

  async deleteService(id: string): Promise<boolean> {
    const client = await getMongoClient();
    if (client) {
      try {
        const db = client.db(DB_NAME);
        const result = await db.collection("services").deleteOne({ id: id });
        return result.deletedCount > 0;
      } catch (e) {
        console.error("Mongo deleteService failed:", e);
      }
    }

    const local = readLocalDB();
    local.services = local.services || [];
    const len = local.services.length;
    local.services = local.services.filter((s: any) => s.id !== id);
    if (local.services.length !== len) {
      writeLocalDB(local);
      return true;
    }
    return false;
  },

  // --- PORTFOLIO CRUD ---
  async getPortfolio(): Promise<any[]> {
    const client = await getMongoClient();
    if (client) {
      try {
        const db = client.db(DB_NAME);
        const list = await db.collection("portfolio").find({}).toArray();
        if (list.length > 0) {
          return mapDocs(list);
        }
        // Seed mongo if empty
        const local = readLocalDB();
        if (local.portfolio && local.portfolio.length > 0) {
          const docsWithId = local.portfolio.map((item: any) => ({ ...item, _id: undefined }));
          await db.collection("portfolio").insertMany(docsWithId);
          return local.portfolio;
        }
        return [];
      } catch (e) {
        console.error("Mongo getPortfolio failed:", e);
      }
    }
    return readLocalDB().portfolio || [];
  },

  async addPortfolio(item: any): Promise<any> {
    const client = await getMongoClient();
    const newProj = {
      id: item.id || "proj_" + Date.now(),
      title: item.title || "New Project Case",
      category: item.category || "Web",
      description: item.description || "",
      imageUrl: item.imageUrl || "",
      techUsed: Array.isArray(item.techUsed) ? item.techUsed : [],
      client: item.client || "Self-Initiated",
      year: item.year || new Date().getFullYear().toString(),
      keyOutcome: item.keyOutcome || ""
    };

    if (client) {
      try {
        const db = client.db(DB_NAME);
        await db.collection("portfolio").insertOne({ ...newProj });
        return newProj;
      } catch (e) {
        console.error("Mongo addPortfolio failed:", e);
      }
    }

    const local = readLocalDB();
    local.portfolio = local.portfolio || [];
    local.portfolio.push(newProj);
    writeLocalDB(local);
    return newProj;
  },

  async updatePortfolio(id: string, updates: any): Promise<any> {
    const client = await getMongoClient();
    if (client) {
      try {
        const db = client.db(DB_NAME);
        const result = await db.collection("portfolio").findOneAndUpdate(
          { id: id },
          { $set: {
            title: updates.title,
            category: updates.category,
            description: updates.description,
            imageUrl: updates.imageUrl,
            techUsed: updates.techUsed,
            client: updates.client,
            year: updates.year,
            keyOutcome: updates.keyOutcome
          }},
          { returnDocument: "after" }
        );
        if (result) return mapDoc(result);
      } catch (e) {
        console.error("Mongo updatePortfolio failed:", e);
      }
    }

    const local = readLocalDB();
    local.portfolio = local.portfolio || [];
    const idx = local.portfolio.findIndex((p: any) => p.id === id);
    if (idx !== -1) {
      local.portfolio[idx] = {
        ...local.portfolio[idx],
        title: updates.title ?? local.portfolio[idx].title,
        category: updates.category ?? local.portfolio[idx].category,
        description: updates.description ?? local.portfolio[idx].description,
        imageUrl: updates.imageUrl ?? local.portfolio[idx].imageUrl ?? local.portfolio[idx].imageName,
        techUsed: Array.isArray(updates.techUsed) ? updates.techUsed : local.portfolio[idx].techUsed,
        client: updates.client ?? local.portfolio[idx].client,
        year: updates.year ?? local.portfolio[idx].year,
        keyOutcome: updates.keyOutcome ?? local.portfolio[idx].keyOutcome
      };
      writeLocalDB(local);
      return local.portfolio[idx];
    }
    return null;
  },

  async deletePortfolio(id: string): Promise<boolean> {
    const client = await getMongoClient();
    if (client) {
      try {
        const db = client.db(DB_NAME);
        const result = await db.collection("portfolio").deleteOne({ id: id });
        return result.deletedCount > 0;
      } catch (e) {
        console.error("Mongo deletePortfolio failed:", e);
      }
    }

    const local = readLocalDB();
    local.portfolio = local.portfolio || [];
    const len = local.portfolio.length;
    local.portfolio = local.portfolio.filter((p: any) => p.id !== id);
    if (local.portfolio.length !== len) {
      writeLocalDB(local);
      return true;
    }
    return false;
  },

  // --- POPUPS CRUD ---
  async getPopups(): Promise<any[]> {
    const client = await getMongoClient();
    if (client) {
      try {
        const db = client.db(DB_NAME);
        const list = await db.collection("popups").find({}).toArray();
        if (list.length > 0) {
          return mapDocs(list);
        }
        // Seed mongo if empty
        const local = readLocalDB();
        if (local.popups && local.popups.length > 0) {
          const docsWithId = local.popups.map((item: any) => ({ ...item, _id: undefined }));
          await db.collection("popups").insertMany(docsWithId);
          return local.popups;
        }
        return [];
      } catch (e) {
        console.error("Mongo getPopups failed:", e);
      }
    }
    return readLocalDB().popups || [];
  },

  async addPopup(item: any): Promise<any> {
    const client = await getMongoClient();
    const newPopup = {
      id: item.id || "pop_" + Date.now(),
      title: item.title || "Offer Update",
      type: item.type || "News",
      message: item.message || "",
      link: item.link || "",
      active: item.active !== false
    };

    if (client) {
      try {
        const db = client.db(DB_NAME);
        await db.collection("popups").insertOne({ ...newPopup });
        return newPopup;
      } catch (e) {
        console.error("Mongo addPopup failed:", e);
      }
    }

    const local = readLocalDB();
    local.popups = local.popups || [];
    local.popups.push(newPopup);
    writeLocalDB(local);
    return newPopup;
  },

  async updatePopup(id: string, updates: any): Promise<any> {
    const client = await getMongoClient();
    if (client) {
      try {
        const db = client.db(DB_NAME);
        const result = await db.collection("popups").findOneAndUpdate(
          { id: id },
          { $set: {
            title: updates.title,
            type: updates.type,
            message: updates.message,
            link: updates.link,
            active: updates.active
          }},
          { returnDocument: "after" }
        );
        if (result) return mapDoc(result);
      } catch (e) {
        console.error("Mongo updatePopup failed:", e);
      }
    }

    const local = readLocalDB();
    local.popups = local.popups || [];
    const idx = local.popups.findIndex((p: any) => p.id === id);
    if (idx !== -1) {
      local.popups[idx] = {
        ...local.popups[idx],
        title: updates.title ?? local.popups[idx].title,
        type: updates.type ?? local.popups[idx].type,
        message: updates.message ?? local.popups[idx].message,
        link: updates.link ?? local.popups[idx].link,
        active: updates.active ?? local.popups[idx].active
      };
      writeLocalDB(local);
      return local.popups[idx];
    }
    return null;
  },

  async deletePopup(id: string): Promise<boolean> {
    const client = await getMongoClient();
    if (client) {
      try {
        const db = client.db(DB_NAME);
        const result = await db.collection("popups").deleteOne({ id: id });
        return result.deletedCount > 0;
      } catch (e) {
        console.error("Mongo deletePopup failed:", e);
      }
    }

    const local = readLocalDB();
    local.popups = local.popups || [];
    const len = local.popups.length;
    local.popups = local.popups.filter((p: any) => p.id !== id);
    if (local.popups.length !== len) {
      writeLocalDB(local);
      return true;
    }
    return false;
  },

  // --- BLOGS CRUD ---
  async getBlogs(): Promise<any[]> {
    const client = await getMongoClient();
    if (client) {
      try {
        const db = client.db(DB_NAME);
        const list = await db.collection("blogs").find({}).toArray();
        if (list.length > 0) {
          return mapDocs(list);
        }
        // Seed mongo if empty
        const local = readLocalDB();
        if (local.blogs && local.blogs.length > 0) {
          const docsWithId = local.blogs.map((item: any) => ({ ...item, _id: undefined }));
          await db.collection("blogs").insertMany(docsWithId);
          return local.blogs;
        }
        return [];
      } catch (e) {
        console.error("Mongo getBlogs failed:", e);
      }
    }
    return readLocalDB().blogs || [];
  },

  async addBlog(item: any): Promise<any> {
    const client = await getMongoClient();
    const createSlug = (title: string) => {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    };
    const newBlog = {
      id: item.id || "blog_" + Date.now(),
      title: item.title || "New Insights",
      slug: item.title ? createSlug(item.title) : "post-" + Date.now(),
      description: item.description || "",
      category: item.category || "General",
      author: item.author || "Apex Editorial",
      date: item.date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      readTime: item.readTime || "4 min read",
      content: item.content || ""
    };

    if (client) {
      try {
        const db = client.db(DB_NAME);
        await db.collection("blogs").insertOne({ ...newBlog });
        return newBlog;
      } catch (e) {
        console.error("Mongo addBlog failed:", e);
      }
    }

    const local = readLocalDB();
    local.blogs = local.blogs || [];
    local.blogs.push(newBlog);
    writeLocalDB(local);
    return newBlog;
  },

  async updateBlog(id: string, updates: any): Promise<any> {
    const client = await getMongoClient();
    const createSlug = (title: string) => {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    };

    if (client) {
      try {
        const db = client.db(DB_NAME);
        const result = await db.collection("blogs").findOneAndUpdate(
          { id: id },
          { $set: {
            title: updates.title,
            slug: updates.title ? createSlug(updates.title) : undefined,
            description: updates.description,
            category: updates.category,
            author: updates.author,
            date: updates.date,
            readTime: updates.readTime,
            content: updates.content
          }},
          { returnDocument: "after" }
        );
        if (result) return mapDoc(result);
      } catch (e) {
        console.error("Mongo updateBlog failed:", e);
      }
    }

    const local = readLocalDB();
    local.blogs = local.blogs || [];
    const idx = local.blogs.findIndex((b: any) => b.id === id);
    if (idx !== -1) {
      local.blogs[idx] = {
        ...local.blogs[idx],
        title: updates.title ?? local.blogs[idx].title,
        slug: updates.title ? createSlug(updates.title) : local.blogs[idx].slug,
        description: updates.description ?? local.blogs[idx].description,
        category: updates.category ?? local.blogs[idx].category,
        author: updates.author ?? local.blogs[idx].author,
        date: updates.date ?? local.blogs[idx].date,
        readTime: updates.readTime ?? local.blogs[idx].readTime,
        content: updates.content ?? local.blogs[idx].content
      };
      writeLocalDB(local);
      return local.blogs[idx];
    }
    return null;
  },

  async deleteBlog(id: string): Promise<boolean> {
    const client = await getMongoClient();
    if (client) {
      try {
        const db = client.db(DB_NAME);
        const result = await db.collection("blogs").deleteOne({ id: id });
        return result.deletedCount > 0;
      } catch (e) {
        console.error("Mongo deleteBlog failed:", e);
      }
    }

    const local = readLocalDB();
    local.blogs = local.blogs || [];
    const len = local.blogs.length;
    local.blogs = local.blogs.filter((b: any) => b.id !== id);
    if (local.blogs.length !== len) {
      writeLocalDB(local);
      return true;
    }
    return false;
  }
};
