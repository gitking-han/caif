'use client';

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import ClientSection from "@/components/ClientSection";
import Contact from "@/components/Contact";
import AdminPanel from "@/components/AdminPanel";
import PopupDisplay from "@/components/PopupDisplay";
import Terms from "@/components/Terms";
import Privacy from "@/components/Privacy";
import Disclaimer from "@/components/Disclaimer";
import { ServiceItem, PortfolioProject, BlogPost } from "@/types";
import { SERVICES_DATA, PORTFOLIO_DATA } from "@/data";
import { ChevronRight, ArrowRight, Sparkles, Search, Clock, User, ArrowLeft } from "lucide-react";

export default function Home() {
  const [currentPath, setCurrentPath] = useState("/");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [services, setServices] = useState<ServiceItem[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioProject[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [popupRefreshKey, setPopupRefreshKey] = useState(0);

  const [selectedServicePricingId, setSelectedServicePricingId] = useState("wams");
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);
  const [searchBlogQuery, setSearchBlogQuery] = useState("");
  const [selectedBlogCategory, setSelectedBlogCategory] = useState("All");

  useEffect(() => {
    setTheme("light");
    setCurrentPath(window.location.pathname || "/");
    fetchDatabases();
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (typeof detail === "string") {
        const routePath = detail.split("?")[0] || "/";
        setCurrentPath(routePath);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    window.addEventListener("caif:navigate", handler as EventListener);

    const popstateHandler = () => {
      const routePath = window.location.pathname || "/";
      setCurrentPath(routePath);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("popstate", popstateHandler);

    return () => {
      window.removeEventListener("caif:navigate", handler as EventListener);
      window.removeEventListener("popstate", popstateHandler);
    };
  }, []);

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
      console.error("DB connection offline, using fallback data:", err);
      setServices(SERVICES_DATA);
      setPortfolio(PORTFOLIO_DATA);
    }
  };

  const handleDataRefresh = () => {
    fetchDatabases();
    setPopupRefreshKey((prev) => prev + 1);
  };

  const navigateTo = (path: string) => {
    const routePath = path.split("?")[0] || "/";
    window.history.pushState(null, "", path);
    setCurrentPath(routePath);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveBlog(null);
    fetchDatabases();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isDark = false;
  const blogCategories = ["All", ...Array.from(new Set(blogs.map(b => b.category || "General")))];
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchBlogQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchBlogQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchBlogQuery.toLowerCase());
    const matchesCategory = selectedBlogCategory === "All" || blog.category === selectedBlogCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`min-h-screen relative font-sans antialiased selection:bg-indigo-600 selection:text-white transition-colors duration-300 ${
      isDark ? "bg-slate-950 text-slate-100 dark" : "bg-[#F8F9FA] text-slate-900 light"
    }`}>
      <PopupDisplay theme={theme} onNavigate={navigateTo} refreshKey={popupRefreshKey} />

      <Navbar
        currentPath={currentPath}
        onNavigate={navigateTo}
        theme={theme}
      />

      <main id="core-application-viewport">
        {/* HOME PAGE */}
        {currentPath === "/" && (
          <div className="animate-fade-in">
            <Hero onNavigate={(dest) => {
              if (dest === "about") navigateTo("/about");
              else if (dest === "services") navigateTo("/services");
              else if (dest === "pricing") navigateTo("/services");
              else if (dest === "portfolio") navigateTo("/portfolio");
              else if (dest === "contact") navigateTo("/contact?intent=Get%20Started");
            }} />

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
                    className={`px-5 py-3 rounded-xl border text-xs font-semibold flex items-center gap-2 outline-none bg-transparent cursor-pointer hover:scale-103 transition-all ${
                      isDark ? "border-slate-800 text-slate-200 hover:border-slate-705 text-slate-100" : "border-slate-220 text-slate-800 hover:bg-slate-100"
                    }`}
                  >
                    <span>Inspect Specs & Packages</span>
                    <ArrowRight className="w-4 h-4 text-indigo-500" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => navigateTo("/services")}
                      className={`p-8 rounded-3xl border flex flex-col justify-between group cursor-pointer transition-all hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-500/5 relative overflow-hidden ${
                        isDark ? "bg-slate-900/40 border-slate-800 hover:border-indigo-500/30" : "bg-white border-slate-200/80 hover:border-indigo-650/15"
                      }`}
                    >
                      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 to-cyan-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <div className={`p-3 rounded-2xl border w-max shadow-xs transition-transform group-hover:scale-105 ${
                            isDark ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-100"
                          }`}>
                            <Sparkles className="w-5 h-5 text-indigo-600" />
                          </div>
                        </div>
                        <h3 className={`mt-6 text-base sm:text-lg font-bold font-display group-hover:text-indigo-600 transition-colors ${isDark ? "text-slate-100" : "text-slate-900"}`}>{item.title}</h3>
                        <p className={`mt-3 text-xs leading-relaxed font-light line-clamp-3 ${isDark ? "text-slate-400" : "text-slate-655"}`}>{item.description}</p>
                      </div>
                      <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-805 flex items-center justify-between text-[10.5px] font-mono text-slate-450">
                        <span>SUITE PACK</span>
                        <span className="text-indigo-600 font-semibold group-hover:underline flex items-center gap-0.5">Explore Specs →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <ClientSection />

            <section className={`py-20 text-center ${isDark ? "bg-slate-950" : "bg-white"}`}>
              <div className="max-w-4xl mx-auto px-6">
                <span className={`text-xs font-mono uppercase tracking-widest inline-block mb-3 ${isDark ? "text-indigo-400" : "text-indigo-600"}`}>• GET STARTED</span>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Have a Sophisticated Web Request?</h2>
                <button
                  onClick={() => navigateTo("/contact?intent=Get%20Started")}
                  className="mt-8 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-550 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/15 cursor-pointer border-none transition-all inline-flex items-center gap-1.5"
                >
                  <span>Submit Consultation Brief</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </section>
          </div>
        )}

        {/* ABOUT PAGE */}
        {currentPath === "/about" && (
          <div className="animate-fade-in">
            <About isDark={isDark} />
          </div>
        )}

        {/* TERMS / PRIVACY / DISCLAIMER PAGES */}
        {currentPath === "/terms" && (
          <div className="animate-fade-in">
            <Terms />
          </div>
        )}

        {currentPath === "/privacy" && (
          <div className="animate-fade-in">
            <Privacy />
          </div>
        )}

        {currentPath === "/disclaimer" && (
          <div className="animate-fade-in">
            <Disclaimer />
          </div>
        )}

        {/* SERVICES PAGE */}
        {currentPath === "/services" && (
          <div className="animate-fade-in">
            <Services
              services={services}
              onSelectServicePricing={(id) => {
                setSelectedServicePricingId(id);
                const el = document.getElementById("pricing");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              onNavigate={navigateTo}
            />
          </div>
        )}

        {/* PORTFOLIO PAGE */}
        {currentPath === "/portfolio" && (
          <div className="animate-fade-in">
            <Portfolio portfolio={portfolio} />
          </div>
        )}

        {/* BLOGS PAGE */}
        {currentPath === "/blogs" && (
          <div className={`animate-fade-in py-28 ${isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className={`text-xs font-mono uppercase tracking-widest inline-block mb-3 ${isDark ? "text-indigo-400" : "text-indigo-600"}`}>• APEX PUBLICATIONS</span>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">The Digital Autopilot & Craft Logs</h1>
                <p className={`mt-4 text-xs sm:text-sm font-light ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  Technological editorial posts on secure hosting scaling, geometric logomarks physics, and conversion optimization audits.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-12">
                <div className="flex flex-wrap items-center gap-1.5">
                  { ["All", ...Array.from(new Set(blogs.map(b => b.category || "General")))] .map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedBlogCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-full text-[10.5px] font-semibold tracking-wide border transition-all cursor-pointer outline-none ${selectedBlogCategory === cat ? "bg-indigo-600 text-white border-indigo-500 shadow" : isDark ? "bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"}`}
                    >
                      {cat}
                    </button>
                  )) }
                </div>

                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={searchBlogQuery}
                    onChange={(e) => setSearchBlogQuery(e.target.value)}
                    placeholder="Search logs..."
                    className={`w-full text-xs pl-10 pr-3 py-2.5 rounded-xl border outline-none ${isDark ? "bg-slate-900 border-slate-800 text-slate-150 focus:border-indigo-500 placeholder-slate-600" : "bg-white border-slate-200 text-slate-900 focus:border-indigo-600 placeholder-slate-400"}`}
                  />
                </div>
              </div>

              {filteredBlogs.length === 0 ? (
                <div className={`p-16 text-center rounded-3xl border ${isDark ? "bg-slate-900/10 border-slate-900 text-slate-600" : "bg-slate-100 border-slate-200 text-slate-400"}`}>
                  No published articles match this category or query filter.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredBlogs.map((blog) => (
                    <article
                      key={blog.id}
                      onClick={() => setActiveBlog(blog)}
                      className={`p-6 rounded-2xl border flex flex-col justify-between group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl ${isDark ? "bg-slate-900/30 border-slate-850 hover:bg-slate-900/50" : "bg-white border-slate-210 hover:border-indigo-600/10"}`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 text-[8.5px] font-extrabold font-mono rounded select-none uppercase">
                            {blog.category}
                          </span>
                          <div className={`flex items-center gap-1.5 text-[10px] font-mono leading-none ${isDark ? "text-slate-500" : "text-slate-450"}`}>
                            <Clock className="w-3 h-3" />
                            <span>{blog.readTime}</span>
                          </div>
                        </div>
                        <h3 className={`mt-4 text-sm sm:text-base font-extrabold tracking-tight group-hover:text-indigo-400 leading-snug ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                          {blog.title}
                        </h3>
                        <p className={`mt-2.5 text-xs font-light leading-relaxed line-clamp-3 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                          {blog.description}
                        </p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-slate-205/50 dark:border-slate-800 flex items-center justify-between text-[10.5px] font-mono text-slate-505">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-indigo-500" />
                          <span>{blog.author}</span>
                        </div>
                        <span>Read Post →</span>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {activeBlog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <div onClick={() => setActiveBlog(null)} className="absolute inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer" />
                  <div className={`relative z-10 w-full max-w-3xl max-h-[85vh] overflow-y-auto p-8 rounded-3xl border shadow-2xl transition-all ${isDark ? "bg-slate-900 border-slate-850 text-slate-100" : "bg-white border-slate-200 text-slate-900"}`}>
                    <div className="flex items-center justify-between mb-8 pb-4 border-b dark:border-slate-800 border-slate-200">
                      <button onClick={() => setActiveBlog(null)} className={`flex items-center gap-1.5 text-xs font-semibold outline-none bg-transparent border-none cursor-pointer ${isDark ? "text-slate-400 hover:text-white" : "text-slate-550 hover:text-slate-950"}`}>
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
                    <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight mb-2.5 leading-snug">{activeBlog.title}</h1>
                    <div className="flex items-center gap-4 text-xs font-mono text-slate-500 mb-8">
                      <span>By <strong>{activeBlog.author}</strong></span>
                      <span>•</span>
                      <span>Published: {activeBlog.date}</span>
                    </div>
                    <div className={`text-xs sm:text-sm leading-relaxed space-y-5 font-light ${isDark ? "text-slate-350" : "text-slate-700"}`}>
                      {activeBlog.content.split("\n\n").map((chunk, i) => {
                        if (chunk.startsWith("### ")) {
                          return <h3 key={i} className="text-sm font-bold uppercase tracking-wide pt-4 text-slate-950 dark:text-slate-100">{chunk.replace("### ", "")}</h3>;
                        }
                        if (chunk.startsWith("> ")) {
                          return (
                            <blockquote key={i} className="pl-4 border-l-2 border-indigo-500 italic py-1 dark:text-slate-400 text-slate-655 p-1">
                              {chunk.replace("> ", "").replace(/\"/g, "")}
                            </blockquote>
                          );
                        }
                        return <p key={i}>{chunk}</p>;
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CONTACT PAGE */}
        {currentPath === "/contact" && (
          <div className="animate-fade-in">
            <Contact />
          </div>
        )}

        {/* ADMIN PAGE */}
        {currentPath === "/admin" && (
          <div className="animate-fade-in">
            <AdminPanel onNavigate={navigateTo} onDataRefresh={handleDataRefresh} />
          </div>
        )}

        {/* SCROLL TO TOP BUTTON */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all z-50"
            aria-label="Scroll to top"
          >
            ↑
          </button>
        )}
      </main>
    </div>
  );
}
