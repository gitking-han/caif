import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { CaifLogo } from "./components/CaifLogo";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import Portfolio from "./components/Portfolio";
import ClientSection from "./components/ClientSection";
import Contact from "./components/Contact";
import AdminPanel from "./components/AdminPanel";
import PopupDisplay from "./components/PopupDisplay";
import {
  ArrowRight,
  ArrowUp,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Calendar,
  ShieldCheck,
  BookOpen,
  User,
  Clock,
  Search,
  Layers,
  Tag,
  ArrowLeft,
  ChevronRight,
  FileText,
  Lock,
  Sparkles,
  Award
} from "lucide-react";
import { ServiceItem, PortfolioProject, BlogPost } from "./types";
import { SERVICES_DATA, PORTFOLIO_DATA } from "./data";

export default function App() {
  const [currentPath, setCurrentPath] = useState("/");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Real-time API database state variables (with design data as fallback)
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioProject[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  const [selectedServicePricingId, setSelectedServicePricingId] = useState("wams");
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);
  const [searchBlogQuery, setSearchBlogQuery] = useState("");
  const [selectedBlogCategory, setSelectedBlogCategory] = useState("All");
  const [footerEmail, setFooterEmail] = useState("");
  const [footerSuccess, setFooterSuccess] = useState(false);

  // Load persistent theme settings and databases on mount
  useEffect(() => {
    localStorage.setItem("apex_theme", "light");
    setTheme("light");

    // Capture direct URL navigation on initial load
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname || "/");
      window.scrollTo({ top: 0 });
    };

    window.addEventListener("popstate", handleLocationChange);
    setCurrentPath(window.location.pathname || "/");

    // Pull database states
    fetchDatabases();

    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  // Track scrolling
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchDatabases = async () => {
    try {
      const [resS, resP, resB] = await Promise.all([
        fetch("/api/services"),
        fetch("/api/portfolio"),
        fetch("/api/blogs")
      ]);

      if (resS.ok) {
        const sData = await resS.json();
        setServices(sData.length > 0 ? sData : SERVICES_DATA);
      } else {
        setServices(SERVICES_DATA);
      }

      if (resP.ok) {
        const pData = await resP.json();
        setPortfolio(pData.length > 0 ? pData : PORTFOLIO_DATA);
      } else {
        setPortfolio(PORTFOLIO_DATA);
      }

      if (resB.ok) {
        setBlogs(await resB.json());
      }
    } catch (err) {
      console.error("DB connection offline, mapping backup data metrics:", err);
      setServices(SERVICES_DATA);
      setPortfolio(PORTFOLIO_DATA);
    }
  };

  const navigateTo = (path: string) => {
    window.history.pushState(null, "", path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });

    // De-register read blog when page changes
    setActiveBlog(null);

    // Refresh database whenever visitors walk around pages
    fetchDatabases();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isDark = false;

  // Category listing for bento blog sorting
  const blogCategories = ["All", ...Array.from(new Set(blogs.map(b => b.category || "General")))];

  // Filtered blogs list
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchBlogQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchBlogQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchBlogQuery.toLowerCase());
    const matchesCategory = selectedBlogCategory === "All" || blog.category === selectedBlogCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`min-h-screen relative font-sans antialiased selection:bg-indigo-600 selection:text-white transition-colors duration-300 ${isDark ? "bg-slate-950 text-slate-100 dark" : "bg-[#F8F9FA] text-slate-900 light"
      }`}>

      {/* Dynamic Slide notifications popups */}
      <PopupDisplay theme={theme} onNavigate={navigateTo} />

      {/* Modern sticky Navbar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigateTo}
        theme={theme}
      />

      {/* Core Dynamic Page Renderer */}
      <main id="core-application-viewport">

        {/* --- PAGE: HOME --- */}
        {currentPath === "/" && (
          <div className="animate-fade-in">
            {/* Hero Section */}
            <Hero onNavigate={(dest) => {
              if (dest === "about") navigateTo("/about");
              else if (dest === "services") navigateTo("/services");
              else if (dest === "pricing") navigateTo("/services");
              else if (dest === "portfolio") navigateTo("/portfolio");
              else if (dest === "contact") navigateTo("/contact");
            }} />

            {/* Curated Services Teaser */}
            <section className={`py-24 border-t ${isDark ? "bg-slate-950/20 border-slate-900" : "bg-white border-slate-200"}`}>
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                  <div>
                    <span className={`text-xs font-mono uppercase tracking-widest block mb-2.5 ${isDark ? "text-indigo-400" : "text-indigo-600"}`}>• DYNAMIC SOLUTIONS SUITE</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">Our Elite Capabilities Core</h2>
                    <p className={`text-xs sm:text-sm mt-3 font-light ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      Bespoke system designs, dynamic vector brandbooks, and continuous performance telemetry setups.
                    </p>
                  </div>
                  <button
                    onClick={() => navigateTo("/services")}
                    className={`px-5 py-3 rounded-xl border text-xs font-semibold flex items-center gap-2 outline-none bg-transparent cursor-pointer hover:scale-103 transition-all ${isDark ? "border-slate-800 text-slate-200 hover:border-slate-705 text-slate-100" : "border-slate-220 text-slate-800 hover:bg-slate-100"
                      }`}
                  >
                    <span>Inspect Specs & Packages</span>
                    <ArrowRight className="w-4 h-4 text-indigo-500" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services.slice(0, 3).map((item) => {
                    const cardTheme: Record<string, string> = {
                      wams: "from-indigo-500 to-cyan-500",
                      mobile: "from-purple-500 to-pink-500",
                      graphics: "from-pink-500 to-rose-400",
                    };
                    const gradient = cardTheme[item.id] || "from-indigo-500 to-purple-500";

                    // Teaser badges to mirror the beautiful main services board
                    const teaserMeta: Record<string, { badge: string; badgeColor: string; pulseBg: string }> = {
                      wams: {
                        badge: "Cloud Autopilot Pro",
                        badgeColor: "bg-indigo-50/90 text-indigo-700 border-indigo-200/50 shadow-sm shadow-indigo-100/30",
                        pulseBg: "bg-indigo-600"
                      },
                      mobile: {
                        badge: "Hi-FPS Fluid UI",
                        badgeColor: "bg-purple-50/90 text-purple-700 border-purple-200/50 shadow-sm shadow-purple-100/30",
                        pulseBg: "bg-purple-600"
                      },
                      graphics: {
                        badge: "Visual Archetype",
                        badgeColor: "bg-pink-50/90 text-pink-700 border-pink-200/50 shadow-sm shadow-pink-100/30",
                        pulseBg: "bg-pink-600"
                      }
                    };

                    const meta = teaserMeta[item.id];

                    return (
                      <div
                        key={item.id}
                        onClick={() => navigateTo("/services")}
                        className={`p-8 rounded-3xl border flex flex-col justify-between group cursor-pointer transition-all hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-500/5 relative overflow-hidden ${isDark ? "bg-slate-900/40 border-slate-800 hover:border-indigo-500/30" : "bg-white border-slate-200/80 hover:border-indigo-650/15"
                          }`}
                      >
                        {/* Top gradient highlight bar */}
                        <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />

                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <div className={`p-3 rounded-2xl border w-max shadow-xs transition-transform group-hover:scale-105 ${isDark ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-100"
                              }`}>
                              <Sparkles className="w-5 h-5 text-indigo-600" />
                            </div>
                            {meta && (
                              <div className={`flex items-center gap-1.5 px-2.5 py-0.5 text-[9px] font-mono tracking-wider font-semibold rounded-full border ${meta.badgeColor}`}>
                                <span className="relative flex h-1.5 w-1.5">
                                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${meta.pulseBg} opacity-75`}></span>
                                  <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${meta.pulseBg}`}></span>
                                </span>
                                <span>{meta.badge}</span>
                              </div>
                            )}
                          </div>
                          <h3 className={`mt-6 text-base sm:text-lg font-bold font-display group-hover:text-indigo-600 transition-colors ${isDark ? "text-slate-100" : "text-slate-900"}`}>{item.title}</h3>
                          <p className={`mt-3 text-xs leading-relaxed font-light line-clamp-3 ${isDark ? "text-slate-400" : "text-slate-655"}`}>{item.description}</p>
                        </div>
                        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-805 flex items-center justify-between text-[10.5px] font-mono text-slate-450">
                          <span>SUITE PACK</span>
                          <span className="text-indigo-600 font-semibold group-hover:underline flex items-center gap-0.5">Explore Specs →</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Showcase Case Studies Teaser */}
            <section className={`py-24 border-t border-b ${isDark ? "bg-slate-900/30 border-slate-900" : "bg-slate-50 border-slate-200/80"}`}>
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                  <div>
                    <span className={`text-xs font-mono uppercase tracking-widest block mb-2.5 ${isDark ? "text-indigo-400" : "text-indigo-650"}`}>• STUDIO ARCHIVES</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">Curated Project Case Studies</h2>
                    <p className={`text-xs sm:text-sm mt-3 font-light ${isDark ? "text-slate-400" : "text-slate-550"}`}>
                      Explore custom telemetry systems, mathematical corporate logomarks, and cinematic overlays.
                    </p>
                  </div>
                  <button
                    onClick={() => navigateTo("/portfolio")}
                    className={`px-5 py-3 rounded-xl border text-xs font-semibold flex items-center gap-2 outline-none bg-transparent cursor-pointer hover:scale-103 transition-all ${isDark ? "border-slate-800 text-slate-200 hover:border-slate-705 text-slate-100" : "border-slate-220 text-slate-800 hover:bg-slate-100"
                      }`}
                  >
                    <span>View Full Case Galleries</span>
                    <ArrowRight className="w-4 h-4 text-indigo-500" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {portfolio.slice(0, 3).map((item) => {
                    const categoryTags: Record<string, string> = {
                      Web: "bg-indigo-50 text-indigo-700 border-indigo-100",
                      Mobile: "bg-purple-50 text-purple-700 border-purple-100",
                      Design: "bg-pink-50 text-pink-700 border-pink-100",
                    };
                    const tagStyle = categoryTags[item.category] || "bg-slate-150 text-slate-750 border-slate-250";

                    return (
                      <div
                        key={item.id}
                        onClick={() => navigateTo("/portfolio")}
                        className={`p-7 rounded-3xl border flex flex-col justify-between group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/5 ${isDark ? "bg-slate-900/20 border-slate-800/80 hover:border-slate-700" : "bg-white border-slate-200/80 hover:border-indigo-650/20"
                          }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className={`px-2 py-0.5 text-[8.5px] font-extrabold font-mono rounded-md uppercase border ${tagStyle}`}>
                              {item.category}
                            </span>
                            <span className={`text-[10px] font-semibold font-mono ${isDark ? "text-slate-500" : "text-slate-400"}`}>{item.year}</span>
                          </div>
                          <h3 className={`mt-2 text-base font-bold font-display group-hover:text-indigo-600 transition-colors ${isDark ? "text-slate-100" : "text-slate-900"}`}>{item.title}</h3>
                          <p className={`mt-2.5 text-xs leading-relaxed font-light line-clamp-3 ${isDark ? "text-slate-400" : "text-slate-650"}`}>{item.description}</p>
                        </div>
                        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-850 flex flex-col gap-1 text-[10px] font-mono text-slate-500">
                          <span>CLIENT: <strong className={isDark ? "text-slate-350" : "text-slate-700"}>{item.client}</strong></span>
                          <span>OUTCOME: <strong className="text-emerald-600">{item.keyOutcome}</strong></span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <ClientSection />

            {/* Contact brief teaser */}
            <section className={`py-20 text-center ${isDark ? "bg-slate-950" : "bg-white"}`}>
              <div className="max-w-4xl mx-auto px-6">
                <span className={`text-xs font-mono uppercase tracking-widest inline-block mb-3 ${isDark ? "text-indigo-400" : "text-indigo-600"}`}>• GET STARTED</span>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Have a Sophisticated Web Request?</h2>
                <p className={`mt-4 text-xs sm:text-sm font-light max-w-2xl mx-auto leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  Submit your visual parameters, database configurations, and performance requirements to receive premium quotes or a direct custom bid.
                </p>
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => navigateTo("/contact")}
                    className="px-7 py-3.5 bg-indigo-600 hover:bg-indigo-550 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/15 cursor-pointer border-none transition-all flex items-center gap-1.5"
                  >
                    <span>Submit Consultation Brief</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* --- PAGE: ABOUT --- */}
        {currentPath === "/about" && (
          <div className="animate-fade-in">
            <About isDark={isDark} />

            {/* Corporate Team Grid / Trust Badges and Preferred partners */}
            <section className={`py-20 border-t ${isDark ? "bg-slate-950 border-slate-900" : "bg-white border-slate-200"}`}>
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                <div className="col-span-1 md:col-span-5">
                  <span className={`text-xs font-mono uppercase tracking-widest block mb-2.5 ${isDark ? "text-indigo-400" : "text-indigo-600"}`}>• BRAND METRICS</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Our Trust Framework</h3>
                  <p className={`mt-4 text-xs sm:text-sm leading-relaxed font-light ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    Apex Tech operates on complete transparency. We deliver detailed telemetry logs, clean version-controlled repository architectures, and registered style guides to build ultimate corporate continuity.
                  </p>

                  {/* Team badges */}
                  <div className="mt-8 flex flex-col gap-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg border ${isDark ? "bg-slate-900 border-slate-800 text-teal-400" : "bg-slate-100 border-slate-220 text-teal-600"}`}>
                        <Award className="w-4 h-4 text-indigo-500" />
                      </div>
                      <span className="text-xs font-semibold">100% Trademark Clearance Safeguards</span>
                    </div>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {["AWS Partner", "GCP Core Architect", "DaVinci Certified", "Figma Expert", "SEO Schema Qualified", "GDPR Compliance Security"].map((partner, i) => (
                    <div
                      key={i}
                      className={`p-6 rounded-xl border text-center font-mono text-[10.5px] font-semibold tracking-wider ${isDark ? "bg-slate-900/30 border-slate-900 text-slate-400" : "bg-slate-100/60 border-slate-200 text-slate-600"
                        }`}
                    >
                      {partner}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* --- PAGE: SERVICES --- */}
        {currentPath === "/services" && (
          <div className="animate-fade-in">
            {/* Servicescapabilities grid */}
            <Services services={services} onSelectServicePricing={(id) => {
              setSelectedServicePricingId(id);
              const el = document.getElementById("pricing");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }} />

            {/* Price tiers / Package prices */}
            {/* <div id="pricing" className="border-t dark:border-slate-900 border-slate-200">
              <Pricing
                selectedServiceId={selectedServicePricingId}
                onSelectService={(serviceId) => setSelectedServicePricingId(serviceId)}
              />
            </div> */}
          </div>
        )}

        {/* --- PAGE: PORTFOLIO --- */}
        {currentPath === "/portfolio" && (
          <div className="animate-fade-in">
            <Portfolio portfolio={portfolio} />
          </div>
        )}

        {/* --- PAGE: BLOGS & EDITORIAL --- */}
        {currentPath === "/blogs" && (
          <div className={`animate-fade-in py-28 ${isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
            <div className="max-w-7xl mx-auto px-6">

              {/* Blog Landing Header text */}
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className={`text-xs font-mono uppercase tracking-widest inline-block mb-3 ${isDark ? "text-indigo-400" : "text-indigo-650"}`}>• APEX PUBLICATIONS</span>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">The Digital Autopilot & Craft logs</h1>
                <p className={`mt-4 text-xs sm:text-sm font-light ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  Technological editorial posts on secure hosting scaling, geometric logomarks physics, and conversion optimization audits.
                </p>
              </div>

              {/* Filters & Search Row */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-12">
                {/* Categories */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {blogCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedBlogCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-full text-[10.5px] font-semibold tracking-wide border transition-all cursor-pointer outline-none ${selectedBlogCategory === cat
                          ? "bg-indigo-600 text-white border-indigo-500 shadow"
                          : isDark
                            ? "bg-slate-900/40 border-slate-805 text-slate-400 hover:text-white"
                            : "bg-white border-slate-220 text-slate-655 hover:bg-slate-100"
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Search query box */}
                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    value={searchBlogQuery}
                    onChange={(e) => setSearchBlogQuery(e.target.value)}
                    placeholder="Search logs..."
                    className={`w-full text-xs px-10 py-2.5 rounded-xl border outline-none ${isDark
                        ? "bg-slate-900 border-slate-800 text-slate-150 focus:border-indigo-500 placeholder-slate-600"
                        : "bg-white border-slate-200 text-slate-905 focus:border-indigo-600 placeholder-slate-400"
                      }`}
                  />
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                </div>
              </div>

              {/* Publication list Grid */}
              {filteredBlogs.length === 0 ? (
                <div className={`p-16 text-center rounded-3xl border ${isDark ? "bg-slate-900/10 border-slate-900 text-slate-600" : "bg-slate-100 border-slate-200 text-slate-400 animate-fade-in"}`}>
                  No published articles match this category or query filter.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredBlogs.map((blog) => (
                    <article
                      key={blog.id}
                      onClick={() => setActiveBlog(blog)}
                      className={`p-6 rounded-2xl border flex flex-col justify-between group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl ${isDark ? "bg-slate-900/30 border-slate-850 hover:bg-slate-900/50" : "bg-white border-slate-210 hover:border-indigo-600/10"
                        }`}
                    >
                      <div>
                        {/* Meta tags top */}
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 text-[8.5px] font-extrabold font-mono rounded select-none uppercase">
                            {blog.category}
                          </span>
                          <div className={`flex items-center gap-1.5 text-[10px] font-mono leading-none ${isDark ? "text-slate-500" : "text-slate-450"}`}>
                            <Clock className="w-3 h-3" />
                            <span>{blog.readTime}</span>
                          </div>
                        </div>

                        {/* Title descriptions */}
                        <h3 className={`mt-4 text-sm sm:text-base font-extrabold tracking-tight group-hover:text-indigo-400 leading-snug transition-colors ${isDark ? "text-slate-100" : "text-slate-900"
                          }`}>
                          {blog.title}
                        </h3>

                        <p className={`mt-2.5 text-xs font-light leading-relaxed line-clamp-3 ${isDark ? "text-slate-400" : "text-slate-600"
                          }`}>
                          {blog.description}
                        </p>
                      </div>

                      {/* Editorial baseline author info */}
                      <div className="mt-6 pt-4 border-t border-slate-205/50 dark:border-slate-850 flex items-center justify-between text-[10.5px] font-mono text-slate-505">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-indigo-505" />
                          <span>{blog.author}</span>
                        </div>
                        <span>Read Post →</span>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Full Article Reader Modal overlay */}
              {activeBlog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
                  {/* Backdrop */}
                  <div
                    onClick={() => setActiveBlog(null)}
                    className="absolute inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
                  />

                  {/* Document layout sheet */}
                  <div className={`relative z-10 w-full max-w-3xl max-h-[85vh] overflow-y-auto p-8 rounded-3xl border shadow-2xl transition-all ${isDark ? "bg-slate-900 border-slate-850 text-slate-100" : "bg-white border-slate-200 text-slate-900"
                    }`}>
                    {/* Back header action */}
                    <div className="flex items-center justify-between mb-8 pb-4 border-b dark:border-slate-800 border-slate-200">
                      <button
                        onClick={() => setActiveBlog(null)}
                        className={`flex items-center gap-1.5 text-xs font-semibold outline-none bg-transparent border-none cursor-pointer ${isDark ? "text-slate-400 hover:text-white" : "text-slate-550 hover:text-slate-950"
                          }`}
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Return to publications</span>
                      </button>

                      <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 text-[9px] font-extrabold font-mono rounded uppercase">
                          {activeBlog.category}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">{activeBlog.readTime}</span>
                      </div>
                    </div>

                    {/* Blog title */}
                    <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight mb-2.5 leading-snug">
                      {activeBlog.title}
                    </h1>

                    {/* Author metadata */}
                    <div className="flex items-center gap-4 text-xs font-mono text-slate-500 mb-8">
                      <span>By <strong>{activeBlog.author}</strong></span>
                      <span>•</span>
                      <span>Published: {activeBlog.date}</span>
                    </div>

                    {/* Main content body (renders beautifully with margin spacing) */}
                    <div className={`text-xs sm:text-sm leading-relaxed space-y-5 font-light ${isDark ? "text-slate-350" : "text-slate-700"
                      }`}>
                      {/* Interactive block mappings for standard markdown elements to support nice formatting */}
                      {activeBlog.content.split("\n\n").map((chunk, i) => {
                        if (chunk.startsWith("### ")) {
                          return <h3 key={i} className="text-sm font-bold uppercase tracking-wide pt-4 text-slate-950 dark:text-slate-100">{chunk.replace("### ", "")}</h3>;
                        }
                        if (chunk.startsWith("> ")) {
                          return (
                            <blockquote key={i} className="pl-4 border-l-2 border-indigo-500 italic py-1 dark:text-slate-400 text-slate-655 p-1">
                              {chunk.replace("> ", "").replace(/"/g, "")}
                            </blockquote>
                          );
                        }
                        if (chunk.includes("1. ") || chunk.includes("- ")) {
                          const items = chunk.split("\n");
                          return (
                            <ul key={i} className="list-disc pl-5 space-y-2">
                              {items.map((it, j) => (
                                <li key={j}>{it.replace(/^(- |\d+\. )/, "")}</li>
                              ))}
                            </ul>
                          );
                        }
                        // Handle simple paragraphs
                        return <p key={i}>{chunk}</p>;
                      })}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* --- PAGE: CONTACT --- */}
        {currentPath === "/contact" && (
          <div className="animate-fade-in">
            <Contact />

            {/* Micro FAQ or coordinates cards */}
            <section className={`py-12 border-t text-xs leading-relaxed ${isDark ? "bg-slate-950 border-slate-900 text-slate-500" : "bg-white border-slate-200 text-slate-500"}`}>
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center font-mono uppercase tracking-wider">
                <div>
                  <h4 className="font-semibold text-slate-450 block mb-2">Primary Office</h4>
                  <span>Manhattan, New York, USA</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-450 block mb-2">Telemetry SLA Status</h4>
                  <span className="text-emerald-500 font-extrabold">• ALL SYSTEMS ONLINE</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-450 block mb-2">Inquiries Email</h4>
                  <span>projects@apextech.studio</span>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* --- PAGE: ADMIN CONTROL --- */}
        {currentPath === "/admin" && (
          <div className="animate-fade-in">
            <AdminPanel theme={theme} onNavigate={navigateTo} />
          </div>
        )}

        {/* --- PAGE: LEGAL TERMS --- */}
        {currentPath === "/terms" && (
          <div className={`py-28 font-light ${isDark ? "bg-slate-950 text-slate-350" : "bg-slate-50 text-slate-655"}`}>
            <div className={`max-w-3xl mx-auto px-6 p-10 rounded-3xl border ${isDark ? "bg-slate-900/40 border-slate-850" : "bg-white border-slate-205"}`}>
              <div className="flex items-center gap-2 mb-6">
                <FileText className="w-5 h-5 text-indigo-500" />
                <span className="text-[11px] font-mono uppercase tracking-widest font-semibold text-slate-500">APEX REGULATORY DEPT</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-950 dark:text-slate-100 mb-2">Terms and Conditions</h1>
              <span className="text-[10px] font-mono uppercase text-slate-500 block mb-8">LAST REVISED: JUNE 19, 2026</span>

              <div className="text-xs space-y-4 leading-relaxed">
                <p>Welcome to Apex Tech & Creative Agency. By accessing, purchasing packaged services, or using our Web Application Management Systems (WAMS), you signify legal agreement with these parameters.</p>
                <h3 className="font-bold text-slate-950 dark:text-slate-100 uppercase font-mono mt-5">1. Engineering Deliverables</h3>
                <p>Deliverables are executed under rigorous sandboxed criteria. Client is single-owner of custom vector files and custom written codes. Cloud hosting deployment parameters are evaluated individually under designated Service Level Agreements (SLAs).</p>
                <h3 className="font-bold text-slate-950 dark:text-slate-100 uppercase font-mono mt-5">2. Security Responsibility Limits</h3>
                <p>While we perform high-fidelity system-hardening configurations and vulnerability reviews, operational server environments are influenced by third-party credentials actions. Apex Tech remains immune to subsequent security breaches outside active escrow maintenance routines.</p>
                <p>For inquiries, handshake custom administrative queries to: active NOC channels.</p>
              </div>
            </div>
          </div>
        )}

        {/* --- PAGE: PRIVACY POLICY --- */}
        {currentPath === "/privacy" && (
          <div className={`py-28 font-light ${isDark ? "bg-slate-950 text-slate-350" : "bg-slate-50 text-slate-655"}`}>
            <div className={`max-w-3xl mx-auto px-6 p-10 rounded-3xl border ${isDark ? "bg-slate-900/40 border-slate-850" : "bg-white border-slate-205"}`}>
              <div className="flex items-center gap-2 mb-6">
                <Lock className="w-5 h-5 text-emerald-505" />
                <span className="text-[11px] font-mono uppercase tracking-widest font-semibold text-slate-500">APEX PRIVACY OFFICE</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-950 dark:text-slate-100 mb-2">Privacy Policy & HIPAA</h1>
              <span className="text-[10px] font-mono uppercase text-slate-500 block mb-8">LAST REVISED: JUNE 19, 2026</span>

              <div className="text-xs space-y-4 leading-relaxed">
                <p>Our commitment is securing corporate secrets and visitor transaction databases. We utilize standard SSL/TLS keys encrypting consultation briefs, and keep all communications confidential.</p>
                <h3 className="font-bold text-slate-950 dark:text-slate-100 uppercase font-mono mt-5">1. Cookie Telemetry Logs</h3>
                <p>We trace standard visual preferences (like Light/Dark mode state values) inside browser local storage elements. This occurs strictly client-side without storing tracking metadata on central servers.</p>
                <h3 className="font-bold text-slate-950 dark:text-slate-100 uppercase font-mono mt-5">2. Data Security & Storage</h3>
                <p>All admin-provided CRUD documents are kept private inside highly secured system nodes. No data is leased to marketing databases.</p>
              </div>
            </div>
          </div>
        )}

        {/* --- PAGE: DISCLAIMER --- */}
        {currentPath === "/disclaimer" && (
          <div className={`py-28 font-light ${isDark ? "bg-slate-950 text-slate-350" : "bg-slate-50 text-slate-655"}`}>
            <div className={`max-w-3xl mx-auto px-6 p-10 rounded-3xl border ${isDark ? "bg-slate-900/40 border-slate-850" : "bg-white border-slate-205"}`}>
              <div className="flex items-center gap-2 mb-6">
                <ShieldCheck className="w-5 h-5 text-indigo-500" />
                <span className="text-[11px] font-mono uppercase tracking-widest font-semibold text-slate-500">APEX LEGAL COUNSEL</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-950 dark:text-slate-100 mb-2">Disclaimer Notice</h1>
              <span className="text-[10px] font-mono uppercase text-slate-500 block mb-8">LAST REVISED: JUNE 19, 2026</span>

              <div className="text-xs space-y-4 leading-relaxed">
                <p>All technological tools, custom web application management systems, and technical scripts provided by Apex Tech & Creative agency are provided "as is" without warranty of any kind, express or implied.</p>
                <h3 className="font-bold text-slate-950 dark:text-slate-100 uppercase font-mono mt-5">1. Operational SLA Exclusions</h3>
                <p>Performance outcomes and digital search indexes vary strictly according to hosting parameters, dynamic algorithmic changes, and corporate network configurations. Handshake queries may be analyzed periodically under separate manual SLAs.</p>
                <h3 className="font-bold text-slate-950 dark:text-slate-100 uppercase font-mono mt-5">2. No Financial Advice</h3>
                <p>Our audit briefs, speed optimizations, and SEO campaign metrics do not represent formal financial or tax advice. We assist with creative design files and systems engineering.</p>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Unified Master Global Footer */}
      <footer id="master-footer" className={`border-t font-sans transition-all duration-300 relative overflow-hidden ${isDark
          ? "bg-slate-950/90 border-slate-900 text-slate-400"
          : "bg-[#EEF2F6] border-slate-200/60 text-slate-500 shadow-[0_-8px_30px_rgba(0,0,0,0.01)]"
        }`}>
        {/* Aesthetic Background Grid Accents */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-slate-500/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-12 gap-12 items-start relative z-10">

          {/* Logo & Agency Description Section */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-5">
            <CaifLogo
              iconSize={36}
              textSize="text-xl"
              textClassName={isDark ? "text-slate-100" : "text-slate-950 font-black tracking-tight"}
            />
            <p className={`text-xs font-light leading-relaxed max-w-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              Global multi-disciplinary technical engineering and branding agency, crafting premium autopilot suites,
              custom mobile platforms, high-impact semantic SEO schemas, and professional cine motion designs.
            </p>

            {/* Social Icons Hub with Brand colors on hover */}
            <div className="flex items-center gap-2.5 mt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer noopener"
                className={`p-2.5 rounded-xl border transition-all duration-300 hover:scale-110 flex items-center justify-center ${isDark
                    ? "bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850"
                    : "bg-slate-50 border-slate-200/60 text-slate-600 hover:text-black hover:bg-slate-100 hover:border-slate-300"
                  }`}
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer noopener"
                className={`p-2.5 rounded-xl border transition-all duration-300 hover:scale-110 flex items-center justify-center ${isDark
                    ? "bg-slate-900/40 border-slate-800 text-slate-400 hover:text-sky-400 hover:bg-slate-850"
                    : "bg-slate-50 border-slate-200/60 text-slate-600 hover:text-sky-550 hover:bg-sky-50/20 hover:border-sky-200/60"
                  }`}
                aria-label="Twitter Feed"
              >
                <Twitter className="w-4 h-4" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer noopener"
                className={`p-2.5 rounded-xl border transition-all duration-300 hover:scale-110 flex items-center justify-center ${isDark
                    ? "bg-slate-900/40 border-slate-800 text-slate-400 hover:text-indigo-400 hover:bg-slate-850"
                    : "bg-slate-50 border-slate-200/60 text-slate-600 hover:text-indigo-600 hover:bg-[#5D3EFC]/5 hover:border-[#5D3EFC]/20"
                  }`}
                aria-label="LinkedIn Network"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer noopener"
                className={`p-2.5 rounded-xl border transition-all duration-300 hover:scale-110 flex items-center justify-center ${isDark
                    ? "bg-slate-900/40 border-slate-800 text-slate-400 hover:text-[#E1306C] hover:bg-slate-850"
                    : "bg-slate-50 border-slate-200/60 text-slate-600 hover:text-[#E1306C] hover:bg-pink-50/20 hover:border-pink-200/60"
                  }`}
                aria-label="Instagram Gallery"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer noopener"
                className={`p-2.5 rounded-xl border transition-all duration-300 hover:scale-110 flex items-center justify-center ${isDark
                    ? "bg-slate-900/40 border-slate-800 text-slate-400 hover:text-rose-500 hover:bg-slate-850"
                    : "bg-slate-50 border-slate-200/60 text-slate-600 hover:text-rose-600 hover:bg-rose-50/20 hover:border-rose-200/60"
                  }`}
                aria-label="YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-2 flex items-center gap-2 text-[10px] font-mono text-slate-400 dark:text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Symmetric SSL & HIPAA Verified Escrow Safeguard</span>
            </div>
          </div>

          {/* Quick Navigation Archives Column */}
          <div className="col-span-1 md:col-span-5 grid grid-cols-2 gap-8 text-xs font-light">
            <div>
              <span className={`font-semibold block mb-4 uppercase tracking-widest font-mono text-[9px] ${isDark ? "text-slate-350" : "text-slate-450"}`}>
                Category Pages
              </span>
              <div className="flex flex-col gap-3">
                {[
                  { name: "Home Dashboard", path: "/" },
                  { name: "Company Credentials", path: "/about" },
                  { name: "Specs & Pricing", path: "/services" },
                  { name: "Studio Archives", path: "/portfolio" },
                ].map((link) => (
                  <button
                    key={link.path}
                    onClick={() => navigateTo(link.path)}
                    className={`text-left border-none bg-transparent cursor-pointer font-light hover:text-indigo-650 hover:translate-x-1 duration-200 transition-all ${isDark ? "text-slate-400" : "text-slate-600"}`}
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className={`font-semibold block mb-4 uppercase tracking-widest font-mono text-[9px] ${isDark ? "text-slate-350" : "text-slate-450"}`}>
                Information
              </span>
              <div className="flex flex-col gap-3">
                {[
                  { name: "Editorial Blogs", path: "/blogs" },
                  { name: "Custom Brief Brief", path: "/contact" },
                  { name: "Access Console", path: "/admin" },
                ].map((link) => (
                  <button
                    key={link.path}
                    onClick={() => navigateTo(link.path)}
                    className={`text-left border-none bg-transparent cursor-pointer font-light hover:text-indigo-650 hover:translate-x-1 duration-200 transition-all ${isDark ? "text-slate-400" : "text-slate-600"}`}
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter / Custom Brief Dispatch Hub */}
          <div className="col-span-1 md:col-span-3 flex flex-col gap-4">
            <div>
              <span className={`font-semibold block mb-1 uppercase tracking-widest font-mono text-[9px] ${isDark ? "text-slate-350" : "text-slate-450"}`}>
                STUDIO BULLETINS
              </span>
              <h4 className="text-[12px] font-extrabold text-slate-800 dark:text-slate-200 tracking-tight">
                Insights for Studio Scale-up
              </h4>
              <p className={`mt-1.5 text-[11px] font-light leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Join local creators list. Unsubscribe any time.
              </p>
            </div>

            {footerSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-250 text-emerald-800 text-[11px] font-mono leading-relaxed transition-all duration-300 animate-fade-in">
                <span className="font-bold block text-emerald-900">✓ VERIFIED INSIGHT LISTED</span>
                <span>You've been added. Welcome to the CAIF Dispatch circle.</span>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (footerEmail.trim().includes("@")) {
                    setFooterSuccess(true);
                  }
                }}
                className="flex flex-col gap-2"
              >
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter email..."
                    value={footerEmail}
                    onChange={(e) => setFooterEmail(e.target.value)}
                    className={`w-full text-xs px-4 py-3 rounded-xl border outline-none transition-all placeholder:text-slate-400 ${isDark
                        ? "bg-slate-900/30 border-slate-800 text-slate-200 focus:border-indigo-500"
                        : "bg-white border-slate-200 text-slate-800 focus:border-indigo-600 focus:shadow-sm"
                      }`}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-semibold rounded-xl cursor-pointer shadow-md shadow-indigo-600/10 transition-all transform active:translate-y-0.5 border-none"
                >
                  <span>Join Dispatch</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <div className={`pt-3 border-t ${isDark ? "border-slate-900" : "border-slate-100"} flex flex-col gap-1 text-[10px] font-mono`}>
              <div className="flex items-center gap-1.5 text-slate-500">
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-500"></span>
                </span>
                <span>CAIF CDN Node Sync: <strong>ACTIVE</strong></span>
              </div>
              <span className="text-slate-400">NOC Support: 24/7 Priority</span>
            </div>
          </div>

        </div>

        {/* Legal links copyright bar */}
        <div className={`max-w-7xl mx-auto px-6 py-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono leading-none ${isDark ? "border-slate-900" : "border-slate-150"
          }`}>
          <span>&copy; {new Date().getFullYear()} CAIF TECH & CREATIVE STUDIO. All Rights Secured.</span>
          <div className="flex items-center gap-3 text-slate-500">
            <button onClick={() => navigateTo("/terms")} className="hover:text-indigo-600 bg-transparent border-none cursor-pointer text-[10px] font-mono uppercase transition-colors">Terms & Conditions</button>
            <span>•</span>
            <button onClick={() => navigateTo("/privacy")} className="hover:text-indigo-600 bg-transparent border-none cursor-pointer text-[10px] font-mono uppercase transition-colors">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => navigateTo("/disclaimer")} className="hover:text-indigo-600 bg-transparent border-none cursor-pointer text-[10px] font-mono uppercase transition-colors">Disclaimer</button>
          </div>
        </div>
      </footer>

      {/* Floating Scroll to Top button */}
      {showScrollTop && (
        <button
          id="floating-scroll-top-btn"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-600/25 border border-indigo-500 hover:bg-indigo-500 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none transition-all z-40 cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
