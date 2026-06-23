import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  CloudLightning, 
  RefreshCw, 
  Trophy, 
  Users, 
  Globe2, 
  Flame, 
  Check, 
  Zap, 
  Github, 
  Linkedin, 
  Twitter, 
  Cpu, 
  Sparkles, 
  Gauge, 
  Search, 
  CheckCircle2, 
  ArrowRight,
  Palette
} from "lucide-react";

interface AboutProps {
  isDark?: boolean;
}

export default function About({ isDark = false }: AboutProps) {
  // Existing Credentials data
  const credentials = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-indigo-600" />,
      title: "Meticulous Systems Safety",
      description: "Every web code build undergoes full security stress audits and precise permission isolation to prevent credentials compromises."
    },
    {
      icon: <CloudLightning className="w-6 h-6 text-purple-600" />,
      title: "Extremely Swift Deployments",
      description: "We ship assets, containers, codes, and promotional graphics with high turnaround consistency and flawless standard compliance."
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-emerald-600" />,
      title: "Agile Continuous Delivery",
      description: "Your pipelines stay fresh, updated, and optimized using Git procedures, automated diagnostic scripts, and full compatibility."
    }
  ];

  // Team Members Dataset
  const teamMembers = [
    {
      name: "Alexander Sterling",
      role: "Founder & Chief Architect",
      bio: "A technology architect specializing in secure container infrastructure, database integration, and high-performance algorithms.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      tag: "Core Systems",
      color: "border-indigo-500 text-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40"
    },
    {
      name: "Elena Rostova",
      role: "Creative Director",
      bio: "An award-winning interactive designer focusing on typographic layouts, modern brand aesthetics, and user journey optimization.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      tag: "Layout & Brand",
      color: "border-purple-500 text-purple-500 bg-purple-50/50 dark:bg-purple-950/40"
    },
    {
      name: "Marcus Thorne",
      role: "Head of Operations & SRE",
      bio: "Directing active security control operations, server scaling, automated testing scripting, and multi-user performance.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      tag: "SecOps / Cloud",
      color: "border-emerald-500 text-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40"
    },
    {
      name: "Siddharth Mehta",
      role: "Lead Integrations Engineer",
      bio: "Developing server-side generative cognitive services, context parsing pipelines, and automated metadata search architectures.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
      tag: "AI Systems",
      color: "border-amber-500 text-amber-500 bg-amber-50/50 dark:bg-amber-950/40"
    }
  ];

  // Interactive Live Playground / Demonstration Sandbox States
  const [activeDemoTab, setActiveDemoTab] = useState<"speed" | "brand" | "seo">("speed");

  // Speed Demo state
  const [speedRunning, setSpeedRunning] = useState(false);
  const [speedProgress, setSpeedProgress] = useState(0);
  const [speedOptimized, setSpeedOptimized] = useState(false);
  const [speedLog, setSpeedLog] = useState<string[]>([]);

  // Brand Theme Demo State
  const [selectedBrandTheme, setSelectedBrandTheme] = useState<"slate" | "crimson" | "emerald" | "violet">("slate");

  // SEO Index Demo state
  const [seoKeyword, setSeoKeyword] = useState("Best Tech & Creative Agency");
  const [seoRunning, setSeoRunning] = useState(false);
  const [seoScore, setSeoScore] = useState(62);
  const [seoLogs, setSeoLogs] = useState<string[]>([]);
  const [seoAnalyzed, setSeoAnalyzed] = useState(false);
  const [copiedPromoId, setCopiedPromoId] = useState<string | null>(null);

  // Speed Optimizations simulator execution loop
  const runSpeedOptimization = () => {
    if (speedRunning) return;
    setSpeedRunning(true);
    setSpeedOptimized(false);
    setSpeedProgress(0);
    setSpeedLog(["[Init] Initializing raw performance benchmark..."]);

    const logs = [
      "[Scan] Scanning unoptimized image payloads (Discovered 14.2MB total).",
      "[Compress] Compressing image binaries to next-gen WebP & AVIF formats.",
      "[Minify] Trimming unused CSS style modules & static JS dependency scripts.",
      "[Cache] Establishing Cloudflare CDN routing rules with precise headers.",
      "[Complete] Apex Optimization successfully compiled! Deployment secure."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep += 1;
      setSpeedProgress(currentStep * 20);
      if (currentStep <= logs.length) {
        setSpeedLog(prev => [...prev, logs[currentStep - 1]]);
      }
      if (currentStep >= 5) {
        clearInterval(interval);
        setSpeedRunning(false);
        setSpeedOptimized(true);
      }
    }, 850);
  };

  // SEO Scanner execution
  const runSeoScanner = () => {
    if (seoRunning) return;
    setSeoRunning(true);
    setSeoAnalyzed(false);
    setSeoLogs(["[SEO Engine] Initializing digital crawler..."]);

    const steps = [
      "[Crawler] Analyzing indexable metadata & open-graph tags...",
      "[Schema] Inspecting JSON-LD semantic structure for LocalBusiness tags.",
      "[Speed] Checking Core Web Vitals (Largest Contentful Paint audit).",
      "[Compile] Calculating visibility coefficients for premium queries."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep += 1;
      if (currentStep <= steps.length) {
        setSeoLogs(prev => [...prev, steps[currentStep - 1]]);
      }
      if (currentStep >= 4) {
        clearInterval(interval);
        setSeoRunning(false);
        setSeoScore(97);
        setSeoAnalyzed(true);
      }
    }, 700);
  };

  return (
    <div className={`transition-colors duration-300 ${isDark ? "bg-slate-950 text-slate-100" : "bg-white text-slate-900"}`}>
      
      {/* SECTION 1: WHO WE ARE (Original Brand Presentation) */}
      <section
        id="about"
        className={`relative py-36 overflow-hidden border-b ${isDark ? "border-slate-900 bg-slate-950" : "border-slate-200 bg-white"}`}
      >
        <div className={`absolute inset-0 ${isDark ? "bg-slate-900/10" : "bg-slate-50/30"}`} />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Brand Presentation Left Column */}
            <div className="col-span-1 lg:col-span-12 xl:col-span-5 flex flex-col justify-center">
              
              <div className="text-xs font-mono uppercase tracking-widest text-indigo-650 mb-4 font-semibold">• WHO WE ARE</div>
              
              <h2 id="about-title" className={`font-sans text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                A Singular Hub for Complex Code Systems and Elegant Design Assets
              </h2>
              
              <p className={`mt-6 text-sm sm:text-base leading-relaxed font-light ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Apex Tech & Creative Agency is a premium multi-disciplinary firm built on the convergence of 
                technical engineering and artistic mastery. We believe beautiful code deserves exceptional visuals, 
                and complex server infrastructure shouldn't be a mystery to business operators.
              </p>
              
              <p className={`mt-4 text-sm sm:text-base leading-relaxed font-light ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                From our real-time cloud management suites to responsive custom logos carved on geometric 
                vector patterns, we serve as the unified structural partner for businesses growing across 
                physical and virtual frontiers.
              </p>

              {/* Micro visual stats block */}
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-900 pt-8">
                <div>
                  <span className="text-2xl font-extrabold font-sans text-indigo-550">100%</span>
                  <p className="text-[9.5px] text-slate-500 font-mono uppercase mt-1">Success Delivery</p>
                </div>
                <div>
                  <span className={`text-2xl font-extrabold font-sans ${isDark ? "text-white" : "text-slate-900"}`}>80+</span>
                  <p className="text-[9.5px] text-slate-500 font-mono uppercase mt-1">Creative Experts</p>
                </div>
                <div>
                  <span className="text-2xl font-extrabold font-sans text-emerald-500">24/7</span>
                  <p className="text-[9.5px] text-slate-500 font-mono uppercase mt-1">Network Active NOC</p>
                </div>
              </div>

            </div>

            {/* Core Credentials Cards Right Column */}
            <div className="col-span-1 lg:col-span-12 xl:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Mission Card 1 */}
              <div
                id="about-card-mission"
                className={`col-span-1 md:col-span-2 p-8 border rounded-2xl flex flex-col justify-between hover:border-slate-300 transition-all shadow-sm ${
                  isDark ? "bg-slate-900/40 border-slate-900" : "bg-slate-50/50 border-slate-200"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900 rounded-lg">
                      <Globe2 className="w-5 h-5 text-indigo-650" />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-medium">Our Core Mandate</span>
                  </div>
                  <h3 className={`text-lg font-bold font-sans ${isDark ? "text-slate-100" : "text-slate-900"}`}>Engineering Global Trust Online</h3>
                  <p className={`mt-2.5 text-xs leading-relaxed font-light ${isDark ? "text-slate-400" : "text-slate-60) text-slate-600"}`}>
                    We empower teams to eliminate tech bottlenecks permanently. Our interactive diagnostics systems and 
                    dedicated engineering frameworks ensure your servers stay alive, your apps load instantly, and your products look clean across all platforms.
                  </p>
                </div>
              </div>

              {/* Loops of smaller credential components */}
              {credentials.map((cred, i) => (
                <div
                  key={i}
                  id={`about-cred-card-${i}`}
                  className={`p-6 border rounded-xl hover:border-indigo-600/30 transition-all flex flex-col justify-start hover:shadow-md ${
                    isDark ? "bg-slate-900/30 border-slate-900" : "bg-white border-slate-200/80"
                  }`}
                >
                  <div className="p-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg w-max mb-4">
                    {cred.icon}
                  </div>
                  <h4 className={`text-sm font-semibold font-sans ${isDark ? "text-slate-200" : "text-slate-900"}`}>{cred.title}</h4>
                  <p className={`mt-2 text-xs leading-relaxed font-light ${isDark ? "text-slate-400" : "text-slate-600"}`}>{cred.description}</p>
                </div>
              ))}

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: THE EXECUTIVE TEAM */}
      <section className={`py-28 relative overflow-hidden border-b ${isDark ? "bg-slate-950 border-slate-900" : "bg-slate-50/55 border-slate-200"}`}>
        {/* Subtle background circles */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-indigo-505/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-505/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mb-16 text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-650 font-bold flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-500 animate-pulse" />
              <span>• SPECIALIST ROSTER</span>
            </span>
            <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-3 font-sans ${isDark ? "text-white" : "text-slate-900"}`}>
              The Engineers & Creatives Delivering Your Code Solutions
            </h2>
            <p className={`mt-4 text-xs sm:text-sm font-light leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              Our leadership coordinates visual style mappings, backend payload audits, and custom cognitive server deployments with transparent SLA parameters and flawless precision.
            </p>
          </div>

          <div id="team-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className={`group rounded-3xl border transition-all duration-500 flex flex-col overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 ${
                  isDark ? "bg-slate-900/40 border-slate-850 hover:border-indigo-500/40" : "bg-white border-slate-200 hover:border-indigo-500/30 shadow-sm"
                }`}
              >
                {/* Team Professional Photo Frame */}
                <div className="relative h-72 overflow-hidden bg-slate-100 flex items-center justify-center">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Styled glassmorphic overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider mb-1 font-semibold">{member.role}</span>
                    <h3 className="text-sm font-bold text-white mb-2">{member.name}</h3>
                    
                    <div className="flex gap-2">
                      <a href="#" className="p-1 px-2 text-[9px] font-mono uppercase bg-indigo-600/90 text-white rounded hover:bg-indigo-550 transition-colors tracking-wide pointer-events-auto">LinkedIn</a>
                      <a href="#" className="p-1 px-2 text-[9px] font-mono uppercase bg-slate-900/95 text-white rounded hover:bg-slate-800 transition-colors tracking-wide pointer-events-auto">Portfolio</a>
                    </div>
                  </div>

                  {/* Top Static Badge with tag */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border shadow-md ${member.color}`}>
                      {member.tag}
                    </span>
                  </div>

                  {/* Pulsing online status indicator icon */}
                  <div className="absolute top-4 right-4 z-20 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </div>
                </div>

                {/* Team Info Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className={`text-base font-extrabold group-hover:text-indigo-600 transition-colors uppercase font-sans tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>{member.name}</h3>
                    <span className="text-[10px] font-mono tracking-wider uppercase text-indigo-650 font-bold block mt-1.5">{member.role}</span>
                    <p className={`mt-4 text-[11.5px] leading-relaxed font-light ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                      {member.bio}
                    </p>
                  </div>

                  {/* Micro stats and connections meter for visuals */}
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-400 uppercase">Availability Status</span>
                    <span className="text-emerald-500 font-semibold uppercase flex items-center gap-1">
                      <Flame className="w-3 h-3 text-emerald-500 animate-pulse" />
                      <span>Ready to Deploy</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

    </div>
  );
}
