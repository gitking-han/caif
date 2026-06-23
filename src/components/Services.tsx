import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SERVICES_DATA } from "../data";
import { ServiceItem } from "../types";

import { 
  AppWindow, 
  Smartphone, 
  Palette, 
  Film, 
  Compass, 
  TrendingUp, 
  X, 
  Check, 
  ArrowUpRight 
} from "lucide-react";

// Helper map to translate static icon code strings to JSX component representations
const IconMap: Record<string, React.ReactNode> = {
  AppWindow: <AppWindow className="w-5 h-5 text-indigo-600" />,
  Smartphone: <Smartphone className="w-5 h-5 text-purple-600" />,
  Palette: <Palette className="w-5 h-5 text-pink-600" />,
  Film: <Film className="w-5 h-5 text-sky-600" />,
  Compass: <Compass className="w-5 h-5 text-amber-600" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-emerald-600" />,
};

// Highly attractive badges and tag configurations for cards
const ServiceMetaMap: Record<string, { 
  badge: string; 
  badgeColor: string; 
  pulseBg: string;
  tags: string[];
}> = {
  wams: {
    badge: "Cloud Autopilot Pro",
    badgeColor: "bg-indigo-50/90 text-indigo-700 border-indigo-200/60 shadow-sm shadow-indigo-100/50",
    pulseBg: "bg-indigo-600",
    tags: ["React Suite", "DevOps GCP", "Secure API", "SSL Certs"]
  },
  mobile: {
    badge: "Hi-FPS Fluid UI",
    badgeColor: "bg-purple-50/90 text-purple-700 border-purple-200/60 shadow-sm shadow-purple-100/50",
    pulseBg: "bg-purple-600",
    tags: ["React Native", "Offline Persistence", "Push Routes", "Biometrics"]
  },
  graphics: {
    badge: "Visual Archetype",
    badgeColor: "bg-pink-50/90 text-pink-700 border-pink-200/60 shadow-sm shadow-pink-100/50",
    pulseBg: "bg-pink-600",
    tags: ["UI Systems", "Branding Assets", "Hi-Fi Vectors", "Figma Spec"]
  },
  editing: {
    badge: "4K Motion Cuts",
    badgeColor: "bg-sky-50/90 text-sky-700 border-sky-200/60 shadow-sm shadow-sky-100/50",
    pulseBg: "bg-sky-600",
    tags: ["Cinema Grade", "Sound SFX", "S-Log Color", "Dynamic Cuts"]
  },
  logo: {
    badge: "Golden Ratio Grid",
    badgeColor: "bg-amber-50/90 text-amber-700 border-amber-200/60 shadow-sm shadow-amber-100/50",
    pulseBg: "bg-amber-600",
    tags: ["Grid Vectors", "SVG Formats", "Brand Manual", "IP Handover"]
  },
  seo: {
    badge: "Lighthouse 100",
    badgeColor: "bg-emerald-50/90 text-emerald-700 border-emerald-200/60 shadow-sm shadow-emerald-100/50",
    pulseBg: "bg-emerald-600",
    tags: ["Schema Markup", "Rank Booster", "Dynamic Tagging", "Ad Funnels"]
  }
};

interface ServicesProps {
  onSelectServicePricing: (serviceId: string) => void;
  onNavigate?: (path: string) => void;
  services?: ServiceItem[];
}

export default function Services({ onSelectServicePricing, onNavigate, services }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const displayServices = services && services.length > 0 ? services : SERVICES_DATA;

  const handleOpenDetailModal = (service: ServiceItem) => {
    setSelectedService(service);
  };

  const handleCloseDetailModal = () => {
    setSelectedService(null);
  };

  const handleGetStartedClick = (service: ServiceItem) => {
    onNavigate?.(`/contact?service=${encodeURIComponent(service.title)}&intent=${encodeURIComponent("Get Started")}`);
    handleCloseDetailModal();
  };

  const handlePriceCheckoutClick = (serviceId: string) => {
    onSelectServicePricing(serviceId);
    handleCloseDetailModal();
  };

  return (
    <section
      id="services"
      className="relative py-28 bg-slate-50 overflow-hidden border-t border-slate-200"
    >
      {/* Decorative vectors */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Module Title */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 inline-block mb-3">• CAPABILITIES</span>
          <h2 id="services-header-title" className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight md:whitespace-nowrap">
            Our Elite Creative & Technology Core
          </h2>
          <p className="mt-4 text-slate-600 text-sm font-light max-w-2xl mx-auto">
            We deliver highly structured operations and bespoke design files optimized for modern tech ecosystems.
          </p>
        </div>

        {/* Services Grid layout */}
        <div id="services-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service) => {
            const icon = IconMap[service.iconName] || <AppWindow className="w-5 h-5 text-indigo-600" />;
            const meta = ServiceMetaMap[service.id];
            
            // Map corresponding gradient highlight lines for each category to look gorgeous
            const cardTheme: Record<string, { line: string, glow: string, bg: string }> = {
              wams: { line: "from-indigo-500 to-cyan-500", glow: "bg-indigo-500/10", bg: "group-hover:bg-indigo-50/50" },
              mobile: { line: "from-purple-500 to-pink-500", glow: "bg-purple-500/10", bg: "group-hover:bg-purple-50/50" },
              graphics: { line: "from-pink-500 to-rose-400", glow: "bg-pink-500/10", bg: "group-hover:bg-pink-50/50" },
              editing: { line: "from-sky-400 to-blue-500", glow: "bg-sky-500/10", bg: "group-hover:bg-sky-50/50" },
              logo: { line: "from-amber-400 to-orange-500", glow: "bg-amber-500/10", bg: "group-hover:bg-amber-50/50" },
              seo: { line: "from-emerald-400 to-teal-500", glow: "bg-emerald-500/10", bg: "group-hover:bg-emerald-50/50" },
            };

            const theme = cardTheme[service.id] || { line: "from-indigo-500 to-purple-500", glow: "bg-indigo-500/10", bg: "group-hover:bg-indigo-50/50" };

            return (
              <motion.div
                key={service.id}
                id={`service-card-${service.id}`}
                whileHover={{ y: -8, transition: { duration: 0.2, ease: "easeOut" } }}
                className="relative bg-white border border-slate-200/80 hover:border-indigo-500/20 p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-550/5 group cursor-pointer overflow-hidden"
                onClick={() => handleOpenDetailModal(service)}
              >
                {/* Accent top gradient indicator bar */}
                <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${theme.line} opacity-60 group-hover:opacity-100 transition-opacity`} />
                
                {/* Glow backdrop behind icon */}
                <div className={`absolute -right-12 -top-12 w-32 h-32 rounded-full ${theme.glow} blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500`} />

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl w-max transition-all group-hover:scale-110 duration-300">
                      {icon}
                    </div>
                    {meta && (
                      <div className={`flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono tracking-wider font-semibold rounded-full border ${meta.badgeColor} transition-all duration-300 group-hover:shadow-md`}>
                        <span className="relative flex h-1.5 w-1.5">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${meta.pulseBg} opacity-75`}></span>
                          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${meta.pulseBg}`}></span>
                        </span>
                        <span>{meta.badge}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="mt-6 text-base font-extrabold font-sans text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center justify-between tracking-tight">
                    {service.title}
                    <ArrowUpRight className="w-4 h-4 text-indigo-600 opacity-20 group-hover:opacity-100 transition-all duration-200" />
                  </h3>
                  <p className="mt-2.5 text-slate-600 text-xs leading-relaxed font-light line-clamp-3">
                    {service.description}
                  </p>

                  {/* Micro-tags list inside card */}
                  {meta && (
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {meta.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-md bg-slate-50 hover:bg-indigo-50 border border-slate-150 text-slate-500 hover:text-indigo-600 font-mono text-[9px] transition-colors duration-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100/80 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Service Suite Specs</span>
                  <span className="text-[11px] font-medium text-indigo-600 group-hover:underline flex items-center gap-1">
                    Examine Specs
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Services Full Specifications Overlay Dialog Modal */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                id="modal-backdrop-shield"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseDetailModal}
                className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
              />

              {/* Modal Container */}
              <motion.div
                id="service-details-modal-box"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl border border-slate-200 w-full max-w-xl p-8 relative z-10 shadow-2xl overflow-hidden"
              >
                {/* Close Button */}
                <button
                  id="modal-close-icon-btn"
                  onClick={handleCloseDetailModal}
                  className="absolute top-6 right-6 p-2 bg-slate-50 border border-slate-150 hover:border-slate-300 text-slate-500 hover:text-slate-800 rounded-lg transition-colors outline-none cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Content */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-indigo-50 border border-indigo-105 rounded-xl">
                    {IconMap[selectedService.iconName]}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-600">Detailed Specs</span>
                    <h3 className="text-xl font-bold font-sans text-slate-900 leading-none mt-1">
                      {selectedService.title}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-600 text-sm font-light leading-relaxed mb-6">
                  {selectedService.description}
                </p>

                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">Core Specifications Include:</h4>
                <div id="modal-specs-list" className="flex flex-col gap-3.5 mb-8">
                  {selectedService.details.map((detail, index) => (
                    <div key={index} className="flex items-start gap-2.5 text-xs text-slate-600 font-normal">
                      <div className="p-0.5 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-light">{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Actions inside modal */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 font-mono uppercase">Package scope and pricing</span>
                  <button
                    id="modal-pricing-jump-btn"
                    onClick={() => {
                      onNavigate?.(`/contact?service=${encodeURIComponent(selectedService.title)}&intent=${encodeURIComponent("Get Started")}`);
                      handleCloseDetailModal();
                    }}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-lg shadow-indigo-600/15 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    Get started
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
