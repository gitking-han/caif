import React, { useState, useEffect } from "react";
import { 
  Key, 
  Plus, 
  Trash2, 
  Edit3, 
  FolderGit2, 
  AppWindow, 
  BellRing, 
  BookOpen, 
  LogOut, 
  Check, 
  AlertCircle, 
  RefreshCw, 
  ArrowLeft,
  ToggleLeft,
  ToggleRight,
  Eye,
  Calendar,
  Layers,
  ChevronRight,
  Sparkles
} from "lucide-react";

interface AdminPanelProps {
  theme?: "light" | "dark";
  onNavigate: (path: string) => void;
  onDataRefresh?: () => void;
}

export default function AdminPanel({ onNavigate, onDataRefresh }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"services" | "portfolio" | "popups" | "blogs">("services");
  
  // Lists data states
  const [services, setServices] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [popups, setPopups] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [apiSuccessMsg, setApiSuccessMsg] = useState("");
  const [apiErrorMsg, setApiErrorMsg] = useState("");

  // Editor modal/form states
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Form Field states: Services
  const [serTitle, setSerTitle] = useState("");
  const [serDesc, setSerDesc] = useState("");
  const [serIcon, setSerIcon] = useState("AppWindow");
  const [serDetails, setSerDetails] = useState(""); // comma separated

  // Form Field states: Portfolio
  const [portTitle, setPortTitle] = useState("");
  const [portCategory, setPortCategory] = useState<"Web" | "Mobile" | "Design" | "Editing" | "SEO">("Web");
  const [portDesc, setPortDesc] = useState("");
  const [portTech, setPortTech] = useState(""); // comma separated
  const [portClient, setPortClient] = useState("");
  const [portYear, setPortYear] = useState("");
  const [portOutcome, setPortOutcome] = useState("");
  const [portImageBase64, setPortImageBase64] = useState("");
  const [portImageUrl, setPortImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Form Field states: Popups
  const [popTitle, setPopTitle] = useState("");
  const [popType, setPopType] = useState<"Event" | "Offer" | "News">("News");
  const [popMessage, setPopMessage] = useState("");
  const [popLink, setPopLink] = useState("");
  const [popActive, setPopActive] = useState(true);

  // Form Field states: Blogs
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDesc, setBlogDesc] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogReadTime, setBlogReadTime] = useState("5 min read");
  const [blogContent, setBlogContent] = useState("");

  const isDark = false;

  useEffect(() => {
    const token = localStorage.getItem("apex_admin_token");
    if (token === "secure_apex_admin_token") {
      setIsAuthenticated(true);
      fetchDashboardData();
    }
  }, []);

  // Fetch initial collections
  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [resS, resP, resPop, resB] = await Promise.all([
        fetch("/api/services"),
        fetch("/api/portfolio"),
        fetch("/api/popups"),
        fetch("/api/blogs")
      ]);
      
      if (resS.ok) setServices(await resS.json());
      if (resP.ok) setPortfolio(await resP.json());
      if (resPop.ok) setPopups(await resPop.json());
      if (resB.ok) setBlogs(await resB.json());
    } catch (err) {
      console.error("Failed to load dashboard parameters:", err);
      setApiErrorMsg("Unable to synchronize local databases.");
    } finally {
      setIsLoading(false);
      if (onDataRefresh) {
        onDataRefresh();
      }
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        localStorage.setItem("apex_admin_token", data.token);
        setIsAuthenticated(true);
        fetchDashboardData();
        setApiSuccessMsg("Administrative access authenticated successfully!");
        setTimeout(() => setApiSuccessMsg(""), 3000);
      } else {
        setLoginError(data.error || "Invalid entry code.");
      }
    } catch (err) {
      setLoginError("Failed to handshake security server.");
    }
  };

  const logout = () => {
    localStorage.removeItem("apex_admin_token");
    setIsAuthenticated(false);
    setServices([]);
    setPortfolio([]);
    setPopups([]);
    setBlogs([]);
  };

  const getHeaders = () => {
    const token = localStorage.getItem("apex_admin_token");
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
  };

  const resetFormFields = () => {
    setIsEditing(false);
    setEditId(null);
    
    // Services
    setSerTitle("");
    setSerDesc("");
    setSerIcon("AppWindow");
    setSerDetails("");

    // Portfolio
    setPortTitle("");
    setPortCategory("Web");
    setPortDesc("");
    setPortTech("");
    setPortClient("");
    setPortYear("");
    setPortOutcome("");
    setPortImageBase64("");
    setPortImageUrl("");
    setIsUploading(false);

    // Popups
    setPopTitle("");
    setPopType("News");
    setPopMessage("");
    setPopLink("");
    setPopActive(true);

    // Blogs
    setBlogTitle("");
    setBlogDesc("");
    setBlogCategory("");
    setBlogAuthor("");
    setBlogReadTime("5 min read");
    setBlogContent("");
  };

  const displaySuccess = (msg: string) => {
    setApiSuccessMsg(msg);
    setTimeout(() => setApiSuccessMsg(""), 4000);
  };

  const displayError = (msg: string) => {
    setApiErrorMsg(msg);
    setTimeout(() => setApiErrorMsg(""), 4000);
  };

  // --- CRUD Services ---
  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: serTitle,
      description: serDesc,
      iconName: serIcon,
      details: serDetails.split(",").map(s => s.trim()).filter(Boolean)
    };

    try {
      const url = isEditing ? `/api/services/${editId}` : "/api/services";
      const method = isEditing ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });

      if (response.status === 401) return logout();
      if (response.ok) {
        displaySuccess(isEditing ? "Service item updated." : "New Service item appended.");
        resetFormFields();
        fetchDashboardData();
      } else {
        displayError("Transaction rejected by database system.");
      }
    } catch (err) {
      displayError("Execution error encountered.");
    }
  };

  const triggerEditService = (item: any) => {
    setIsEditing(true);
    setEditId(item.id);
    setSerTitle(item.title);
    setSerDesc(item.description);
    setSerIcon(item.iconName);
    setSerDetails(Array.isArray(item.details) ? item.details.join(", ") : "");
  };

  const deleteService = async (id: string) => {
    if (!window.confirm("Confirm deletion of this service item?")) return;
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      if (response.status === 401) return logout();
      if (response.ok) {
        displaySuccess("Service cleared.");
        fetchDashboardData();
      } else {
        displayError("Failed to clear service record.");
      }
    } catch (err) {
      displayError("Execution failed.");
    }
  };

  // --- CRUD Portfolio ---
  const handlePortfolioSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    let finalImageUrl = portImageUrl;

    // Dispatch base64 payload to Cloudinary if we have a locally selected file
    if (portImageBase64) {
      try {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({ file: portImageBase64 })
        });
        if (uploadRes.status === 401) return logout();
        if (uploadRes.ok) {
          const data = await uploadRes.json();
          if (data && data.url) {
            finalImageUrl = data.url;
          }
        } else {
          console.warn("Cloudinary upload failed, using fallback Unsplash dynamic render.");
        }
      } catch (err) {
        console.error("Cloudinary upload connection failed:", err);
      }
    }

    const payload = {
      title: portTitle,
      category: portCategory,
      description: portDesc,
      imageUrl: finalImageUrl,
      techUsed: portTech.split(",").map(t => t.trim()).filter(Boolean),
      client: portClient,
      year: portYear,
      keyOutcome: portOutcome
    };

    try {
      const url = isEditing ? `/api/portfolio/${editId}` : "/api/portfolio";
      const method = isEditing ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });

      if (response.status === 401) return logout();
      if (response.ok) {
        displaySuccess(isEditing ? "Case study updated." : "New case study saved.");
        resetFormFields();
        fetchDashboardData();
      } else {
        displayError("Portfolio transaction rejected.");
      }
    } catch (err) {
      displayError("Connection failure.");
    } finally {
      setIsUploading(false);
    }
  };

  const triggerEditPortfolio = (item: any) => {
    setIsEditing(true);
    setEditId(item.id);
    setPortTitle(item.title);
    setPortCategory(item.category);
    setPortDesc(item.description);
    setPortTech(Array.isArray(item.techUsed) ? item.techUsed.join(", ") : "");
    setPortClient(item.client || "");
    setPortYear(item.year || "");
    setPortOutcome(item.keyOutcome || "");
    setPortImageUrl(item.imageUrl || item.imageName || "");
  };

  const deletePortfolio = async (id: string) => {
    if (!window.confirm("Verify removal of this portfolio case registry?")) return;
    try {
      const response = await fetch(`/api/portfolio/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      if (response.status === 401) return logout();
      if (response.ok) {
        displaySuccess("Portfolio case file deleted.");
        fetchDashboardData();
      } else {
        displayError("Removal fail.");
      }
    } catch (err) {
      displayError("Network glitch.");
    }
  };

  // --- CRUD Popups ---
  const handlePopupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: popTitle,
      type: popType,
      message: popMessage,
      link: popLink,
      active: popActive
    };

    try {
      const url = isEditing ? `/api/popups/${editId}` : "/api/popups";
      const method = isEditing ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });

      if (response.status === 401) return logout();
      if (response.ok) {
        displaySuccess(isEditing ? "Notification alert updated." : "Popup alert appended.");
        resetFormFields();
        fetchDashboardData();
      } else {
        displayError("Popup write failed.");
      }
    } catch (err) {
      displayError("Popup write error.");
    }
  };

  const triggerEditPopup = (item: any) => {
    setIsEditing(true);
    setEditId(item.id);
    setPopTitle(item.title);
    setPopType(item.type);
    setPopMessage(item.message);
    setPopLink(item.link || "");
    setPopActive(item.active);
  };

  const togglePopupStatus = async (item: any) => {
    const payload = { ...item, active: !item.active };
    try {
      const response = await fetch(`/api/popups/${item.id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        displaySuccess("Popup status switched dynamically.");
        fetchDashboardData();
      }
    } catch (err) {
      displayError("Toggle network delay.");
    }
  };

  const deletePopup = async (id: string) => {
    if (!window.confirm("Clear this popup alert from layouts?")) return;
    try {
      const response = await fetch(`/api/popups/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      if (response.status === 401) return logout();
      if (response.ok) {
        displaySuccess("Popup wiped.");
        fetchDashboardData();
      } else {
        displayError("Popup delete failure.");
      }
    } catch (err) {
      displayError("Network block.");
    }
  };

  // --- CRUD Blogs ---
  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: blogTitle,
      description: blogDesc,
      category: blogCategory,
      author: blogAuthor || "Apex Editor",
      readTime: blogReadTime,
      content: blogContent
    };

    try {
      const url = isEditing ? `/api/blogs/${editId}` : "/api/blogs";
      const method = isEditing ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });

      if (response.status === 401) return logout();
      if (response.ok) {
        displaySuccess(isEditing ? "Blog post revised." : "Blog post published.");
        resetFormFields();
        fetchDashboardData();
      } else {
        displayError("Blog transaction declined.");
      }
    } catch (err) {
      displayError("Server error.");
    }
  };

  const triggerEditBlog = (item: any) => {
    setIsEditing(true);
    setEditId(item.id);
    setBlogTitle(item.title);
    setBlogDesc(item.description);
    setBlogCategory(item.category);
    setBlogAuthor(item.author || "");
    setBlogReadTime(item.readTime || "");
    setBlogContent(item.content || "");
  };

  const deleteBlog = async (id: string) => {
    if (!window.confirm("Verify permanent archiving of this editorial blog post?")) return;
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      if (response.status === 401) return logout();
      if (response.ok) {
        displaySuccess("Blog post deleted from database.");
        fetchDashboardData();
      } else {
        displayError("Deletion blocked.");
      }
    } catch (err) {
      displayError("Internal delay.");
    }
  };

  // Login page layout
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen py-32 flex items-center justify-center font-sans ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}>
        <div className={`w-full max-w-md p-8 rounded-3xl border shadow-2xl transition-all ${
          isDark ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"
        }`}>
          <button
            onClick={() => onNavigate("/")}
            className={`flex items-center gap-1.5 text-xs font-semibold mb-6 outline-none bg-transparent border-none cursor-pointer ${
              isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-950"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Abandon Admin</span>
          </button>

          <div className="text-center mb-8">
            <div className={`w-12 h-12 rounded-2xl mx-auto flex items-center justify-center mb-4 transition-all ${
              isDark ? "bg-indigo-650/15 border border-indigo-500/20 text-indigo-400" : "bg-indigo-600/10 border border-indigo-200 text-indigo-600"
            }`}>
              <Key className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Administrative Handshake</h1>
            <p className={`mt-2 text-xs font-light ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Input your credential passcode to manipulate services, portfolio logs, blogs, and notifications.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
            <div>
              <label className={`text-[10px] uppercase font-mono tracking-wider block mb-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}>Credential Passcode</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password (default: admin123)"
                className={`w-full text-xs font-mono px-4 py-3 rounded-xl border outline-none ${
                  isDark 
                    ? "bg-slate-950 border-slate-850 text-slate-100 placeholder-slate-700 focus:border-indigo-550" 
                    : "bg-slate-50 border-slate-250 text-slate-900 placeholder-slate-400 focus:border-indigo-600"
                }`}
              />
              <span className={`text-[9.5px] font-mono mt-1.5 block ${isDark ? "text-slate-650" : "text-slate-400"}`}>
                Tip: Password can be customized via ADMIN_PASSWORD on server environment variables.
              </span>
            </div>

            {loginError && (
              <div className="p-3.5 bg-rose-500/10 border border-rose-505/20 rounded-xl text-rose-500 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-2 py-3.5 bg-indigo-600 hover:bg-indigo-500 font-bold text-white text-xs rounded-xl shadow-lg shadow-indigo-600/15 cursor-pointer border-none transition-all"
            >
              Authenticate & Unlock Console
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard authenticated layout
  return (
    <div className={`min-h-screen py-28 font-sans ${
      isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Dashboard Header Status Box */}
        <div className={`p-6 rounded-3xl border mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 ${
          isDark ? "bg-slate-900/40 border-slate-900" : "bg-white border-slate-200/80 shadow-sm"
        }`}>
          <div>
            <span className={`text-[10px] font-mono tracking-widest uppercase block ${isDark ? "text-indigo-400" : "text-indigo-600"}`}>• DYNAMIC APEX ADMINISTRATIVE SYSTEM</span>
            <div className="flex items-center gap-2 mt-1">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">Manager Center</h1>
              <div className="px-2 py-0.5 rounded text-[8.5px] font-mono uppercase bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">authenticated</div>
            </div>
            <p className={`text-xs mt-1 font-light ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Direct database synchronization. Changes reflect instantly to system clients and pages.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="admin-refresh-db-btn"
              onClick={fetchDashboardData}
              disabled={isLoading}
              className={`p-2.5 rounded-xl border outline-none bg-transparent cursor-pointer hover:scale-105 transition-all ${
                isDark ? "border-slate-800 text-slate-400 hover:border-slate-705" : "border-slate-200 text-slate-655 hover:bg-slate-100"
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>
            <button
              id="admin-logout-btn"
              onClick={logout}
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-lg shadow-rose-600/10 border-none cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log out</span>
            </button>
          </div>
        </div>

        {/* Global APIs feedback cards */}
        {apiSuccessMsg && (
          <div className="mb-8 p-4 bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-xl flex items-center gap-2.5">
            <Check className="w-4.5 h-4.5 shrink-0" />
            <span>{apiSuccessMsg}</span>
          </div>
        )}

        {apiErrorMsg && (
          <div className="mb-8 p-4 bg-rose-600/10 border border-rose-505/20 text-rose-450 text-xs font-semibold rounded-xl flex items-center gap-2.5">
            <AlertCircle className="w-4.5 h-4.5 shrink-0" />
            <span>{apiErrorMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Sidebar & Controls Left Column */}
          <div className="col-span-1 lg:col-span-3">
            <div className={`p-4 rounded-3xl border flex flex-col gap-1.5 ${
              isDark ? "bg-slate-900/25 border-slate-900" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <span className={`text-[9.5px] font-mono uppercase tracking-widest pl-3 mb-2.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>Select Database</span>
              
              <button
                onClick={() => { setActiveTab("services"); resetFormFields(); }}
                className={`w-full px-4 py-3 rounded-xl text-left text-xs font-semibold flex items-center justify-between gap-2 border-none cursor-pointer outline-none transition-all ${
                  activeTab === "services"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/15"
                    : isDark ? "text-slate-400 hover:text-white hover:bg-slate-900/60" : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <AppWindow className="w-4 h-4" />
                  <span>Services</span>
                </div>
                <span className="text-[10px] font-mono">{services.length}</span>
              </button>

              <button
                onClick={() => { setActiveTab("portfolio"); resetFormFields(); }}
                className={`w-full px-4 py-3 rounded-xl text-left text-xs font-semibold flex items-center justify-between gap-2 border-none cursor-pointer outline-none transition-all ${
                  activeTab === "portfolio"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/15"
                    : isDark ? "text-slate-400 hover:text-white hover:bg-slate-900/60" : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4" />
                  <span>Portfolio Projects</span>
                </div>
                <span className="text-[10px] font-mono">{portfolio.length}</span>
              </button>

              <button
                onClick={() => { setActiveTab("popups"); resetFormFields(); }}
                className={`w-full px-4 py-3 rounded-xl text-left text-xs font-semibold flex items-center justify-between gap-2 border-none cursor-pointer outline-none transition-all ${
                  activeTab === "popups"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/15"
                    : isDark ? "text-slate-400 hover:text-white hover:bg-slate-900/60" : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <BellRing className="w-4 h-4" />
                  <span>Interactive Popups</span>
                </div>
                <span className="text-[10px] font-mono">{popups.length}</span>
              </button>

              <button
                onClick={() => { setActiveTab("blogs"); resetFormFields(); }}
                className={`w-full px-4 py-3 rounded-xl text-left text-xs font-semibold flex items-center justify-between gap-2 border-none cursor-pointer outline-none transition-all ${
                  activeTab === "blogs"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/15"
                    : isDark ? "text-slate-400 hover:text-white hover:bg-slate-900/60" : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Editorial Blogs</span>
                </div>
                <span className="text-[10px] font-mono">{blogs.length}</span>
              </button>
            </div>

            {/* Quick exit card */}
            <div className={`mt-6 p-5 rounded-3xl border ${
              isDark ? "bg-slate-900/10 border-slate-900 text-slate-500" : "bg-slate-100 border-slate-200 text-slate-600"
            }`}>
              <div className="text-[10.5px] leading-relaxed font-light">
                Secure SSL database token: active.<br />
                Press the checkmarks on popups to toggle visibility instantly for guests.
              </div>
            </div>
          </div>

          {/* Form Editors & Lists Grid Right Column */}
          <div className="col-span-1 lg:col-span-9 flex flex-col gap-8">
            
            {/* 1. Services Tab Editor Zone */}
            {activeTab === "services" && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Form Editor left */}
                <div id="service-form-editor-box" className={`col-span-1 md:col-span-12 lg:col-span-5 p-6 rounded-3xl border ${
                  isDark ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-205 shadow-sm"
                }`}>
                  <h3 className="text-sm font-bold tracking-tight mb-5 flex items-center gap-2 uppercase font-mono">
                    <Sparkles className="w-4.5 h-4.5 text-indigo-500 shrink-0" />
                    <span>{isEditing ? "Modify Service Item" : "Create Service Item"}</span>
                  </h3>

                  <form onSubmit={handleServiceSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="text-[9.5px] uppercase font-mono tracking-wider text-slate-550 block mb-1">Service Title</label>
                      <input
                        type="text"
                        required
                        value={serTitle}
                        onChange={(e) => setSerTitle(e.target.value)}
                        placeholder="e.g. Bespoke Cloud Hosting"
                        className={`w-full text-xs px-3.5 py-2.5 rounded-xl border outline-none ${
                          isDark ? "bg-slate-950 border-slate-850 text-slate-100 focus:border-indigo-500" : "bg-slate-50 border-slate-250 text-slate-900 focus:border-indigo-600"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="text-[9.5px] uppercase font-mono tracking-wider text-slate-550 block mb-1">Visual Icon Name</label>
                      <select
                        value={serIcon}
                        onChange={(e) => setSerIcon(e.target.value)}
                        className={`w-full text-xs px-3.5 py-2.5 rounded-xl border outline-none ${
                          isDark ? "bg-slate-950 border-slate-850 text-slate-200" : "bg-slate-50 border-slate-250 text-slate-900"
                        }`}
                      >
                        <option value="AppWindow">AppWindow (Web/SaaS)</option>
                        <option value="Smartphone">Smartphone (Mobile)</option>
                        <option value="Palette">Palette (Graphic Design)</option>
                        <option value="Film">Film (Video Edit)</option>
                        <option value="Compass">Compass (Logo Design)</option>
                        <option value="TrendingUp">TrendingUp (SEO/Marketing)</option>
                        <option value="HelpCircle">HelpCircle (General Support)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[9.5px] uppercase font-mono tracking-wider text-slate-550 block mb-1">Short Description</label>
                      <textarea
                        required
                        rows={3}
                        value={serDesc}
                        onChange={(e) => setSerDesc(e.target.value)}
                        placeholder="Core features, audience, target outcomes..."
                        className={`w-full text-xs p-3.5 rounded-xl border outline-none resize-none ${
                          isDark ? "bg-slate-950 border-slate-850 text-slate-100 focus:border-indigo-500" : "bg-slate-50 border-slate-250 text-slate-900 focus:border-indigo-600"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="text-[9.5px] uppercase font-mono tracking-wider text-slate-550 block mb-1">Details Checklists (Comma separated)</label>
                      <input
                        type="text"
                        value={serDetails}
                        onChange={(e) => setSerDetails(e.target.value)}
                        placeholder="Server Clusters, 24/7 Monitoring, Backups"
                        className={`w-full text-xs px-3.5 py-2.5 rounded-xl border outline-none ${
                          isDark ? "bg-slate-950 border-slate-850 text-slate-100 focus:border-indigo-500" : "bg-slate-50 border-slate-250 text-slate-900 focus:border-indigo-600"
                        }`}
                      />
                      <span className="text-[9px] text-slate-450 mt-1 block leading-relaxed">Separate multiple entries with a comma. Will render as structured checklists in services.</span>
                    </div>

                    <div className="flex gap-2 mt-2">
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-550 text-white text-xs font-semibold rounded-xl cursor-pointer border-none transition-all"
                      >
                        {isEditing ? "Save Edits" : "Create Core Service"}
                      </button>
                      {isEditing && (
                        <button
                          type="button"
                          onClick={resetFormFields}
                          className={`px-4 py-3 text-xs rounded-xl border cursor-pointer outline-none ${
                            isDark ? "bg-slate-950 border-slate-800 text-slate-400 hover:text-white" : "bg-slate-100 border-slate-205 text-slate-650 hover:bg-slate-200"
                          }`}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Lists table right */}
                <div className="col-span-1 md:col-span-12 lg:col-span-7 flex flex-col gap-4">
                  <h3 className="text-xs uppercase font-mono tracking-widest font-semibold pl-1 text-slate-450">Active Services List</h3>
                  
                  {services.length === 0 ? (
                    <div className={`p-8 text-center rounded-3xl border ${isDark ? "bg-slate-900/20 border-slate-900 text-slate-600" : "bg-white border-slate-150 text-slate-400 shadow-sm"}`}>
                      No service items stored.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {services.map((item: any) => (
                        <div
                          key={item.id}
                          className={`p-5 rounded-2xl border flex items-start justify-between gap-4 group transition-colors ${
                            isDark ? "bg-slate-900/30 border-slate-850/80 hover:bg-slate-900/60" : "bg-white border-slate-200 hover:bg-slate-150 shadow-sm"
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-mono tracking-wider capitalize px-2 py-0.5 rounded ${isDark ? "bg-slate-950 text-slate-400" : "bg-slate-100 text-slate-600"}`}>
                                {item.iconName}
                              </span>
                              <h4 className="text-sm font-bold text-slate-250 truncate">{item.title}</h4>
                            </div>
                            <p className={`mt-1.5 text-xs text-slate-405 leading-relaxed truncate max-w-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                              {item.description}
                            </p>
                            {Array.isArray(item.details) && item.details.length > 0 && (
                              <div className="mt-2.5 flex flex-wrap gap-1">
                                {item.details.map((det: string, idx: number) => (
                                  <span key={idx} className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded text-[9px] font-mono font-medium">
                                    {det}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="flex gap-1">
                            <button
                              onClick={() => triggerEditService(item)}
                              className={`p-2 rounded-xl border cursor-pointer outline-none ${
                                isDark ? "border-slate-800 text-slate-400 hover:text-indigo-400" : "border-slate-200 text-slate-600 hover:text-indigo-650"
                              }`}
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteService(item.id)}
                              className="p-2 border border-rose-500/20 text-rose-500 hover:bg-rose-500/10 rounded-xl cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* 2. Portfolio Tab Editor Zone */}
            {activeTab === "portfolio" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Editor Box */}
                <div className={`col-span-1 lg:col-span-5 p-6 rounded-3xl border ${
                  isDark ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-205 shadow-sm"
                }`}>
                  <h3 className="text-sm font-bold tracking-tight mb-5 flex items-center gap-2 uppercase font-mono">
                    <FolderGit2 className="w-4.5 h-4.5 text-indigo-500 shrink-0" />
                    <span>{isEditing ? "Modify Project Record" : "Append Project Case"}</span>
                  </h3>

                  <form onSubmit={handlePortfolioSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="text-[9.5px] uppercase font-mono tracking-wider block mb-1">Project Case Name</label>
                      <input
                        type="text"
                        required
                        value={portTitle}
                        onChange={(e) => setPortTitle(e.target.value)}
                        placeholder="e.g. Helix Trading Platform"
                        className={`w-full text-xs px-3.5 py-2.5 rounded-xl border outline-none ${
                          isDark ? "bg-slate-950 border-slate-850 text-slate-100" : "bg-slate-50 border-slate-250 text-slate-900"
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9.5px] uppercase font-mono tracking-wider block mb-1">Category Category</label>
                        <select
                          value={portCategory}
                          onChange={(e) => setPortCategory(e.target.value as any)}
                          className={`w-full text-xs px-3 px-2.5 py-2.5 rounded-xl border outline-none ${
                            isDark ? "bg-slate-950 border-slate-850 text-slate-200" : "bg-slate-50 border-slate-250 text-slate-900"
                          }`}
                        >
                          <option value="Web">Web Apps</option>
                          <option value="Mobile">Mobile platforms</option>
                          <option value="Design">Graphic design</option>
                          <option value="Editing">Video cinematics</option>
                          <option value="SEO">SEO campaigns</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[9.5px] uppercase font-mono tracking-wider block mb-1">Year</label>
                        <input
                          type="text"
                          required
                          value={portYear}
                          onChange={(e) => setPortYear(e.target.value)}
                          placeholder="e.g. 2026"
                          className={`w-full text-xs px-3.5 py-2.5 rounded-xl border outline-none ${
                            isDark ? "bg-slate-950 border-slate-850 text-slate-100" : "bg-slate-50 border-slate-250 text-slate-900"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9.5px] uppercase font-mono tracking-wider block mb-1">Client Business</label>
                        <input
                          type="text"
                          required
                          value={portClient}
                          onChange={(e) => setPortClient(e.target.value)}
                          placeholder="e.g. Helix fintech"
                          className={`w-full text-xs px-3.5 py-2.5 rounded-xl border outline-none ${
                            isDark ? "bg-slate-950 border-slate-850 text-slate-100" : "bg-slate-50 border-slate-250 text-slate-900"
                          }`}
                        />
                      </div>

                      <div>
                        <label className="text-[9.5px] uppercase font-mono tracking-wider block mb-1">Key Scaled Outcome</label>
                        <input
                          type="text"
                          required
                          value={portOutcome}
                          onChange={(e) => setPortOutcome(e.target.value)}
                          placeholder="e.g. 50% checkout boost"
                          className={`w-full text-xs px-3.5 py-2.5 rounded-xl border outline-none ${
                            isDark ? "bg-slate-950 border-slate-850 text-slate-100" : "bg-slate-50 border-slate-250 text-slate-900"
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[9.5px] uppercase font-mono tracking-wider block mb-1">Description</label>
                      <textarea
                        required
                        rows={3}
                        value={portDesc}
                        onChange={(e) => setPortDesc(e.target.value)}
                        placeholder="Describe exact business scopes, technologies, architecture implemented..."
                        className={`w-full text-xs p-3.5 rounded-xl border outline-none resize-none ${
                          isDark ? "bg-slate-950 border-slate-850 text-slate-100 focus:border-indigo-550" : "bg-slate-50 border-slate-250 text-slate-900 focus:border-indigo-600"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="text-[9.5px] uppercase font-mono tracking-wider block mb-1">Technology Stack (Comma separated)</label>
                      <input
                        type="text"
                        value={portTech}
                        onChange={(e) => setPortTech(e.target.value)}
                        placeholder="React, AWS, Node, GraphQL"
                        className={`w-full text-xs px-3.5 py-2.5 rounded-xl border outline-none ${
                          isDark ? "bg-slate-950 border-slate-850 text-slate-100" : "bg-slate-50 border-slate-250 text-slate-900"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="text-[9.5px] uppercase font-mono tracking-wider block mb-2">Project Display Image (Cloudinary Linked)</label>
                      <div className={`p-4 rounded-2xl border border-dashed flex flex-col items-center justify-center gap-3 transition-colors ${
                        isDark ? "border-slate-800 bg-slate-950/45" : "border-slate-205 bg-slate-50/50"
                      }`}>
                        
                        {/* Preview Selected or Loaded Image */}
                        {(portImageBase64 || portImageUrl) ? (
                          <div className="relative w-full h-32 rounded-lg overflow-hidden border border-slate-200">
                            <img 
                              src={portImageBase64 || portImageUrl} 
                              alt="Case preview" 
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => { setPortImageBase64(""); setPortImageUrl(""); }}
                              className="absolute top-2 right-2 p-1 bg-rose-600 hover:bg-rose-550 text-white rounded-lg text-[9px] uppercase font-mono px-2 py-1 outline-none cursor-pointer border-none shadow-md"
                            >
                              Reset
                            </button>
                          </div>
                        ) : (
                          <div className="text-center py-2 flex flex-col items-center gap-1.5">
                            <span className="text-[10px] text-slate-500 block uppercase tracking-wide font-mono">Select raw file image asset</span>
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setPortImageBase64(reader.result as string);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="text-slate-550 text-[10px] font-mono file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-mono file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                            />
                          </div>
                        )}
                        
                        {(portImageBase64 || portImageUrl) && (
                          <div className="text-[9px] font-mono text-emerald-600 flex items-center gap-1.5 uppercase font-semibold">
                            <span>Image resource fully prepared</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={isUploading}
                        className={`flex-1 py-3 text-white text-xs font-semibold rounded-xl cursor-pointer border-none flex items-center justify-center gap-2 ${
                          isUploading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-550"
                        }`}
                      >
                        {isUploading ? (
                          <span className="animate-pulse">Uploading Media to Cloudinary...</span>
                        ) : (
                          <span>{isEditing ? "Apply updates" : "Publish Project"}</span>
                        )}
                      </button>
                      {isEditing && (
                        <button
                          type="button"
                          onClick={resetFormFields}
                          className={`px-4 py-3 text-xs rounded-xl border cursor-pointer outline-none ${
                            isDark ? "bg-slate-950 border-slate-800 text-slate-400" : "bg-slate-100 border-slate-205 text-slate-655"
                          }`}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* List Table Grid */}
                <div className="col-span-1 lg:col-span-7 flex flex-col gap-4 animate-fade-in">
                  <h3 className="text-xs uppercase font-mono tracking-widest font-semibold pl-1 text-slate-450">Active Portfolio cases</h3>

                  {portfolio.length === 0 ? (
                    <div className={`p-8 text-center rounded-3xl border ${isDark ? "bg-slate-900/20 border-slate-900 text-slate-600" : "bg-white border-slate-150 text-slate-400"}`}>
                      No case records currently saved.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {portfolio.map((item: any) => (
                        <div
                          key={item.id}
                          className={`p-5 rounded-2xl border flex items-start justify-between gap-4 group transition-colors ${
                            isDark ? "bg-slate-900/30 border-slate-850/80 hover:bg-slate-900/60" : "bg-white border-slate-200 hover:bg-slate-150"
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`text-[9px] font-bold font-mono uppercase px-2 py-0.5 rounded ${
                                isDark ? "bg-slate-950 text-indigo-400" : "bg-indigo-650/5 text-indigo-650 border border-indigo-100"
                              }`}>
                                {item.category}
                              </span>
                              <h4 className="text-sm font-bold text-slate-250 truncate">{item.title}</h4>
                            </div>
                            <p className={`mt-2 text-xs leading-relaxed max-w-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                              {item.description}
                            </p>
                            
                            <div className="mt-3 flex flex-col gap-1 text-[10.5px] font-mono text-slate-500">
                              <span>Client: <strong className="text-slate-400">{item.client}</strong></span>
                              <span>Outcome: <strong className="text-emerald-500">{item.keyOutcome}</strong></span>
                            </div>
                          </div>

                          <div className="flex gap-1">
                            <button
                              onClick={() => triggerEditPortfolio(item)}
                              className={`p-2 rounded-xl border cursor-pointer outline-none ${
                                isDark ? "border-slate-800 text-slate-400 hover:text-indigo-400" : "border-slate-200 text-slate-610"
                              }`}
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deletePortfolio(item.id)}
                              className="p-2 border border-rose-500/20 text-rose-500 hover:bg-rose-500/10 rounded-xl cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* 3. Popups Tab Editor Zone */}
            {activeTab === "popups" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Editor Box */}
                <div className={`col-span-1 lg:col-span-5 p-6 rounded-3xl border ${
                  isDark ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-205 shadow-sm"
                }`}>
                  <h3 className="text-sm font-bold tracking-tight mb-5 flex items-center gap-2 uppercase font-mono">
                    <BellRing className="w-4.5 h-4.5 text-indigo-500 shrink-0" />
                    <span>{isEditing ? "Modify Popup Alert" : "Append Notification Popup"}</span>
                  </h3>

                  <form onSubmit={handlePopupSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="text-[9.5px] uppercase font-mono tracking-wider block mb-1">Popup Banner Header</label>
                      <input
                        type="text"
                        required
                        value={popTitle}
                        onChange={(e) => setPopTitle(e.target.value)}
                        placeholder="e.g. ⚡ Limited Time Event"
                        className={`w-full text-xs px-3.5 py-2.5 rounded-xl border outline-none ${
                          isDark ? "bg-slate-950 border-slate-850 text-slate-100" : "bg-slate-50 border-slate-250 text-slate-900"
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9.5px] uppercase font-mono tracking-wider block mb-1">Popup Alert Type</label>
                        <select
                          value={popType}
                          onChange={(e) => setPopType(e.target.value as any)}
                          className={`w-full text-xs px-3 px-2.5 py-2.5 rounded-xl border outline-none ${
                            isDark ? "bg-slate-950 border-slate-850 text-slate-200" : "bg-slate-50 border-slate-250 text-slate-900"
                          }`}
                        >
                          <option value="News">News Alert</option>
                          <option value="Offer">Promo Offer</option>
                          <option value="Event">Special Event</option>
                        </select>
                      </div>

                      <div className="flex flex-col justify-end pb-1.5 pl-2">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={popActive}
                            onChange={(e) => setPopActive(e.target.checked)}
                            className="rounded text-indigo-650 bg-slate-955"
                          />
                          <span className="text-[10.5px] font-semibold text-slate-350 font-sans">Toggle Active</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="text-[9.5px] uppercase font-mono tracking-wider block mb-1">Popup Body Message</label>
                      <textarea
                        required
                        rows={4}
                        value={popMessage}
                        onChange={(e) => setPopMessage(e.target.value)}
                        placeholder="Type alert description, news message, promotion text for users..."
                        className={`w-full text-xs p-3.5 rounded-xl border outline-none resize-none ${
                          isDark ? "bg-slate-950 border-slate-850 text-slate-100 focus:border-indigo-550" : "bg-slate-50 border-slate-250 text-slate-900 focus:border-indigo-600"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="text-[9.5px] uppercase font-mono tracking-wider block mb-1">Optional Link / CTA Route</label>
                      <input
                        type="text"
                        value={popLink}
                        onChange={(e) => setPopLink(e.target.value)}
                        placeholder="e.g. /services or /contact"
                        className={`w-full text-xs px-3.5 py-2.5 rounded-xl border outline-none ${
                          isDark ? "bg-slate-950 border-slate-850 text-slate-100" : "bg-slate-50 border-slate-250 text-slate-900"
                        }`}
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-550 text-white text-xs font-semibold rounded-xl cursor-pointer border-none"
                      >
                        {isEditing ? "Save changes" : "Deploy Popup Alert"}
                      </button>
                      {isEditing && (
                        <button
                          type="button"
                          onClick={resetFormFields}
                          className={`px-4 py-3 text-xs rounded-xl border cursor-pointer outline-none ${
                            isDark ? "bg-slate-950 border-slate-800 text-slate-400" : "bg-slate-100 border-slate-205 text-slate-655"
                          }`}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* List Table Grid */}
                <div className="col-span-1 lg:col-span-7 flex flex-col gap-4">
                  <h3 className="text-xs uppercase font-mono tracking-widest font-semibold pl-1 text-slate-450">Active Layout Popups</h3>

                  {popups.length === 0 ? (
                    <div className={`p-8 text-center rounded-3xl border ${isDark ? "bg-slate-900/20 border-slate-900 text-slate-600" : "bg-white border-slate-150 text-slate-400"}`}>
                      No popup banners currently initialized.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {popups.map((item: any) => (
                        <div
                          key={item.id}
                          className={`p-5 rounded-2xl border flex items-start justify-between gap-4 group transition-colors ${
                            isDark ? "bg-slate-900/30 border-slate-850/80 hover:bg-slate-900/60" : "bg-white border-slate-200 hover:bg-slate-150"
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`text-[8.5px] font-bold font-mono tracking-wider uppercase px-2 py-0.5 rounded ${
                                item.type === "Offer" ? "bg-amber-500/10 text-amber-500" :
                                item.type === "Event" ? "bg-teal-500/10 text-teal-500" : "bg-indigo-505/10 text-indigo-400"
                              }`}>
                                {item.type}
                              </span>
                              <h4 className="text-sm font-bold text-slate-250 truncate">{item.title}</h4>
                            </div>
                            <p className={`mt-2 text-xs leading-relaxed max-w-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                              {item.message}
                            </p>
                            {item.link && (
                              <span className="text-[10px] text-indigo-400 font-mono mt-1.5 block">CTA target: {item.link}</span>
                            )}
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {/* Toggle active button */}
                            <button
                              onClick={() => togglePopupStatus(item)}
                              className={`p-1.5 rounded-lg border cursor-pointer ${
                                isDark ? "border-slate-800 text-slate-450" : "border-slate-220 text-slate-600"
                              }`}
                              title={item.active ? "Click to set hidden" : "Click to set visible"}
                            >
                              {item.active ? (
                                <ToggleRight className="w-5 h-5 text-indigo-550 fill-indigo-650/40" />
                              ) : (
                                <ToggleLeft className="w-5 h-5 text-slate-500" />
                              )}
                            </button>
                            
                            <button
                              onClick={() => triggerEditPopup(item)}
                              className={`p-2 rounded-xl border cursor-pointer outline-none ${
                                isDark ? "border-slate-800 text-slate-400 hover:text-indigo-404" : "border-slate-200 text-slate-635"
                              }`}
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deletePopup(item.id)}
                              className="p-2 border border-rose-500/20 text-rose-500 hover:bg-rose-500/10 rounded-xl cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* 4. Blogs Tab Editor Zone */}
            {activeTab === "blogs" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Editor Box */}
                <div className={`col-span-1 lg:col-span-5 p-6 rounded-3xl border ${
                  isDark ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-205 shadow-sm"
                }`}>
                  <h3 className="text-sm font-bold tracking-tight mb-5 flex items-center gap-2 uppercase font-mono">
                    <BookOpen className="w-4.5 h-4.5 text-indigo-500 shrink-0" />
                    <span>{isEditing ? "Modify Editorial Post" : "Draft Editorial Blog Post"}</span>
                  </h3>

                  <form onSubmit={handleBlogSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="text-[9.5px] uppercase font-mono tracking-wider block mb-1">Blog Title</label>
                      <input
                        type="text"
                        required
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
                        placeholder="e.g. Secrets to Zero-Downtime SaaS Web Autopilot"
                        className={`w-full text-xs px-3.5 py-2.5 rounded-xl border outline-none ${
                          isDark ? "bg-slate-950 border-slate-850 text-slate-100" : "bg-slate-50 border-slate-250 text-slate-900"
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9.5px] uppercase font-mono tracking-wider block mb-1">Category</label>
                        <input
                          type="text"
                          required
                          value={blogCategory}
                          onChange={(e) => setBlogCategory(e.target.value)}
                          placeholder="e.g. Web Tech, Brand Design"
                          className={`w-full text-xs px-3.5 py-2.5 rounded-xl border outline-none ${
                            isDark ? "bg-slate-950 border-slate-850 text-slate-100" : "bg-slate-50 border-slate-250 text-slate-900"
                          }`}
                        />
                      </div>

                      <div>
                        <label className="text-[9.5px] uppercase font-mono tracking-wider block mb-1">Read Time estimate</label>
                        <input
                          type="text"
                          required
                          value={blogReadTime}
                          onChange={(e) => setBlogReadTime(e.target.value)}
                          placeholder="e.g. 5 min read"
                          className={`w-full text-xs px-3.5 py-2.5 rounded-xl border outline-none ${
                            isDark ? "bg-slate-950 border-slate-850 text-slate-100" : "bg-slate-50 border-slate-250 text-slate-900"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9.5px] uppercase font-mono tracking-wider block mb-1">Author Name</label>
                        <input
                          type="text"
                          required
                          value={blogAuthor}
                          onChange={(e) => setBlogAuthor(e.target.value)}
                          placeholder="e.g. Aris Thorne"
                          className={`w-full text-xs px-3.5 py-2.5 rounded-xl border outline-none ${
                            isDark ? "bg-slate-950 border-slate-850 text-slate-100" : "bg-slate-50 border-slate-250 text-slate-900"
                          }`}
                        />
                      </div>

                      <div className="flex items-center pt-5 pl-2">
                        <span className="text-[9.5px] font-light text-slate-500 leading-normal">
                          Slugs are auto-compiled lowercased URL compatible slugs.
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="text-[9.5px] uppercase font-mono tracking-wider block mb-1">Short Outline Description</label>
                      <input
                        type="text"
                        required
                        value={blogDesc}
                        onChange={(e) => setBlogDesc(e.target.value)}
                        placeholder="In-short description summarizing core post ideas..."
                        className={`w-full text-xs px-3.5 py-2.5 rounded-xl border outline-none ${
                          isDark ? "bg-slate-950 border-slate-850 text-slate-100" : "bg-slate-50 border-slate-250 text-slate-900"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="text-[9.5px] uppercase font-mono tracking-wider block mb-1">Article Editorial Content (Markdown Markdown)</label>
                      <textarea
                        required
                        rows={10}
                        value={blogContent}
                        onChange={(e) => setBlogContent(e.target.value)}
                        placeholder="Write dynamic content details using markdown headers, quotes, lists..."
                        className={`w-full text-xs p-3.5 font-mono rounded-xl border outline-none resize-none ${
                          isDark ? "bg-slate-950 border-slate-850 text-slate-100 focus:border-indigo-550" : "bg-slate-50 border-slate-250 text-slate-900 focus:border-indigo-600"
                        }`}
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-550 text-white text-xs font-semibold rounded-xl cursor-pointer border-none"
                      >
                        {isEditing ? "Apply Revise" : "Publish Article"}
                      </button>
                      {isEditing && (
                        <button
                          type="button"
                          onClick={resetFormFields}
                          className={`px-4 py-3 text-xs rounded-xl border cursor-pointer outline-none ${
                            isDark ? "bg-slate-950 border-slate-800 text-slate-400" : "bg-slate-100 border-slate-205 text-slate-655"
                          }`}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* List Table Grid */}
                <div className="col-span-1 lg:col-span-7 flex flex-col gap-4 animate-fade-in">
                  <h3 className="text-xs uppercase font-mono tracking-widest font-semibold pl-1 text-slate-450">Active Editorial Blogs</h3>

                  {blogs.length === 0 ? (
                    <div className={`p-8 text-center rounded-3xl border ${isDark ? "bg-slate-900/20 border-slate-900 text-slate-600" : "bg-white border-slate-150 text-slate-400"}`}>
                      No blog records found.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {blogs.map((item: any) => (
                        <div
                          key={item.id}
                          className={`p-5 rounded-2xl border flex items-start justify-between gap-4 group transition-colors ${
                            isDark ? "bg-slate-900/30 border-slate-850/80 hover:bg-slate-900/60" : "bg-white border-slate-200 hover:bg-slate-150"
                          }`}
                        >
                          <div className="truncate">
                            <div className="flex items-center gap-2">
                              <span className={`text-[9px] font-bold font-mono uppercase px-2 py-0.5 rounded ${
                                isDark ? "bg-slate-950 text-teal-400" : "bg-teal-50/10 text-teal-650 border border-teal-100"
                              }`}>
                                {item.category}
                              </span>
                              <span className="text-[10px] text-slate-500 font-mono">{item.readTime}</span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-250 truncate mt-1.5">{item.title}</h4>
                            <p className={`mt-1 text-xs leading-relaxed max-w-sm truncate ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                              {item.description}
                            </p>
                            <span className="text-[9.5px] font-mono text-slate-500 mt-2 block">By {item.author} &mdash; {item.date}</span>
                          </div>

                          <div className="flex gap-1 shrink-0">
                            <button
                              onClick={() => triggerEditBlog(item)}
                              className={`p-2 rounded-xl border cursor-pointer outline-none ${
                                isDark ? "border-slate-800 text-slate-400 hover:text-indigo-404" : "border-slate-200 text-slate-640"
                              }`}
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteBlog(item.id)}
                              className="p-2 border border-rose-500/20 text-rose-500 hover:bg-rose-500/10 rounded-xl cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
