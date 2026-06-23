import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Code2, Sparkles, Terminal, Cpu } from "lucide-react";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-slate-50 pt-32 pb-20 overflow-hidden"
    >
      {/* Dynamic Background Mesh Grid lines and decorative glow vectors */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />
        
        {/* Soft, minimal radial gradients */}
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-indigo-500/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-emerald-500/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        {/* Tag chip */}
        <motion.div
          id="hero-tag-chip"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-3.5 py-1.5 bg-white border border-slate-200 rounded-full text-slate-600 font-mono text-[11px] tracking-wider uppercase mb-8 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Full-Stack Development & Creative Design Labs</span>
        </motion.div>

        {/* High-impact Display Heading */}
        <motion.h1
          id="hero-main-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] max-w-5xl"
        >
          Architecting Enterprise <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">SaaS Code</span> & Creative Standards
        </motion.h1>

        {/* Sub-headline Description text */}
        <motion.p
          id="hero-subphrase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 font-sans text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed font-light"
        >
          Empowering modern organizations with world-class Web Management Systems, Mobile Platforms, 
          Golden Ratio branding, cinematic video storytelling, and automated technical diagnostic systems.
        </motion.p>

        {/* Interactive action controls */}
        <motion.div
          id="hero-action-buttons-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4.5"
        >
          <button
            id="hero-btn-gigs"
            onClick={() => onNavigate("services")}
            className="w-full sm:w-auto px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold tracking-wide flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-indigo-600/20 active:translate-y-0.5 transition-all outline-none cursor-pointer"
          >
            Explore Our Services
            <ArrowRight className="w-4 h-4" />
          </button>

        </motion.div>

        {/* Interactive Stats Panel */}
        <motion.div
          id="hero-stats-panel"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-20 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 divide-slate-100 divide-y md:divide-y-0 md:divide-x border border-slate-200 bg-white rounded-3xl shadow-xl p-6"
        >
          <div className="p-4 flex flex-col items-center">
            <span className="text-3xl font-extrabold text-slate-900 font-display tracking-tight">99.9%</span>
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono mt-1.5">WAMS Uptime SLA</span>
          </div>
          <div className="p-4 flex flex-col items-center">
            <span className="text-3xl font-extrabold text-slate-900 font-display tracking-tight">15M+</span>
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono mt-1.5">App Video Views</span>
          </div>
          <div className="p-4 flex flex-col items-center">
            <span className="text-3xl font-extrabold text-slate-900 font-display tracking-tight">280+</span>
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono mt-1.5">Brands Perfected</span>
          </div>
          <div className="p-4 flex flex-col items-center">
            <span className="text-3xl font-extrabold text-indigo-650 font-display tracking-tight">REAL-TIME</span>
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono mt-1.5">Tech Diagnostician</span>
          </div>
        </motion.div>

        {/* Technical architecture micro badges */}
        <motion.div
          id="tech-badge-labels"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-16 flex flex-wrap justify-center items-center gap-7 text-xs font-mono text-slate-400 uppercase tracking-widest"
        >
          <span>• REACT / VITE</span>
          <span>• EXPRESS NODE</span>
          <span>• CLOUD DEVOPS</span>
          <span>• MOTION LABS</span>
          <span>• VECTOR GRAPHICS</span>
        </motion.div>
      </div>
    </section>
  );
}
