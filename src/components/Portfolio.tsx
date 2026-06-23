import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PORTFOLIO_DATA } from "../data";
import { PortfolioProject } from "../types";
import { ArrowUpRight, FolderGit2, Calendar, Award } from "lucide-react";

interface PortfolioProps {
  portfolio?: PortfolioProject[];
}

export default function Portfolio({ portfolio }: PortfolioProps) {
  const [activeTab, setActiveTab] = useState<"All" | "Web" | "Mobile" | "Design" | "Editing" | "SEO">("All");

  const displayPortfolio = portfolio && portfolio.length > 0 ? portfolio : PORTFOLIO_DATA;

  const filterTabs = [
    { id: "All", label: "All Projects" },
    { id: "Web", label: "Web Apps" },
    { id: "Mobile", label: "Mobile Platforms" },
    { id: "Design", label: "Graphic Assets" },
    { id: "Editing", label: "Video Cinematics" },
    { id: "SEO", label: "SEO Campaigns" },
  ];

  const filteredProjects = activeTab === "All" 
    ? displayPortfolio 
    : displayPortfolio.filter(proj => proj.category === activeTab);

  return (
    <section
      id="portfolio"
      className="relative py-28 bg-slate-50 overflow-hidden border-t border-slate-200"
    >
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Module Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 inline-block mb-3">• PROVEN RECORDS</span>
          <h2 id="portfolio-header-title" className="font-sans text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our Elite Projects & Work
          </h2>
          <p className="mt-4 text-slate-600 text-sm font-light">
            Review detailed case scopes, technologies implemented, and high-convert outcome metrics of previous systems.
          </p>
        </div>

        {/* Dynamic Category Tabs */}
        <div id="portfolio-filter-tabs-row" className="flex flex-wrap justify-center gap-1.5 mb-12 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 max-w-2xl mx-auto shadow-inner">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              id={`tab-portfolio-filter-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 px-4 py-2 rounded-xl text-center text-xs font-semibold tracking-wide transition-all outline-none cursor-pointer ${
                activeTab === tab.id
                  ? "bg-white text-indigo-700 shadow-sm border border-slate-200/50"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Layout Bento Grid */}
        <motion.div
          id="portfolio-projects-grid"
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              // Categorize and theme key details nicely
              const categoryTags: Record<string, string> = {
                Web: "bg-indigo-50 text-indigo-700 border-indigo-100",
                Mobile: "bg-purple-50 text-purple-700 border-purple-100",
                Design: "bg-pink-50 text-pink-700 border-pink-100",
                Editing: "bg-sky-50 text-sky-700 border-sky-100",
                SEO: "bg-emerald-50 text-emerald-700 border-emerald-100",
              };
              const tagStyle = categoryTags[project.category] || "bg-slate-50 text-slate-700 border-slate-200";

              return (
                <motion.div
                  key={project.id}
                  id={`project-card-${project.id}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="bg-white border border-slate-200/80 hover:border-indigo-500/25 rounded-3xl overflow-hidden p-7 flex flex-col justify-between hover:shadow-2xl hover:shadow-indigo-500/5 transition-all relative group"
                >
                  {/* Accent glow backdrop */}
                  <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-indigo-500/0 group-hover:bg-indigo-500/5 blur-xl transition-all duration-500 pointer-events-none" />

                  <div>
                    {/* Decorative Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-extrabold font-mono tracking-widest uppercase px-2 py-0.5 rounded border ${tagStyle}`}>
                          {project.category} Core Case
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-semibold font-mono text-slate-400">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{project.year}</span>
                      </div>
                    </div>

                    {/* Project Graphic Image / Case Frame - Renders Dynamic Cloudinary URL */}
                    <div className="w-full h-44 rounded-2xl overflow-hidden mb-5 bg-slate-50 relative border border-slate-100 flex items-center justify-center">
                      <img 
                        src={project.imageUrl || `https://images.unsplash.com/photo-161805182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80`}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Title & Desc */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display group-hover:text-indigo-600 transition-colors flex items-center justify-between">
                      {project.title}
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-indigo-600 transition-all duration-200" />
                    </h3>
                    <p className="mt-2.5 text-slate-600 text-xs font-light leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technology tokens */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.techUsed.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-slate-50 text-slate-550 rounded-lg text-[9px] font-semibold font-mono border border-slate-150"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Outcome Metrics Block */}
                  <div className="mt-6 pt-5 border-t border-slate-100/85">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Award className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400">Core Scaled Outcome</span>
                    </div>
                    <span className="text-[11.5px] font-bold text-slate-800 font-sans block truncate group-hover:text-emerald-600 transition-colors">
                      {project.keyOutcome}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
