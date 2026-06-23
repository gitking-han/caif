import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TESTIMONIALS_DATA } from "../data";
import { 
  Quote, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  CloudLightning, 
  Gem, 
  Activity, 
  ShoppingBag, 
  Coins 
} from "lucide-react";

export default function ClientSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const activeReview = TESTIMONIALS_DATA[currentIndex];

  const clientLogos = [
    { 
      name: "Velocity Cloud", 
      desc: "Enterprise Infra", 
      icon: <CloudLightning className="w-5 h-5 text-sky-500" />,
      color: "bg-sky-500/5 border-sky-100 hover:border-sky-300 hover:bg-sky-500/10 hover:shadow-sky-500/5",
      tagColor: "text-sky-600 bg-sky-500/10"
    },
    { 
      name: "Sunder NYC", 
      desc: "Fine Art Curation", 
      icon: <Gem className="w-5 h-5 text-amber-500" />,
      color: "bg-amber-500/5 border-amber-100 hover:border-amber-300 hover:bg-amber-550/10 hover:shadow-amber-500/5",
      tagColor: "text-amber-750 bg-amber-500/10"
    },
    { 
      name: "ZenFit Global", 
      desc: "Fitness & IoT Solutions", 
      icon: <Activity className="w-5 h-5 text-emerald-500" />,
      color: "bg-emerald-500/5 border-emerald-100 hover:border-emerald-300 hover:bg-emerald-500/10 hover:shadow-emerald-500/5",
      tagColor: "text-emerald-600 bg-emerald-500/10"
    },
    { 
      name: "StoreFront In.", 
      desc: "Commerce Analytics", 
      icon: <ShoppingBag className="w-5 h-5 text-fuchsia-500" />,
      color: "bg-fuchsia-500/5 border-fuchsia-100 hover:border-fuchsia-300 hover:bg-fuchsia-500/10 hover:shadow-fuchsia-500/5",
      tagColor: "text-fuchsia-600 bg-fuchsia-500/10"
    },
    { 
      name: "Midas Trading", 
      desc: "Fintech Ledgers", 
      icon: <Coins className="w-5 h-5 text-indigo-500" />,
      color: "bg-indigo-500/5 border-indigo-100 hover:border-indigo-300 hover:bg-indigo-500/10 hover:shadow-indigo-500/5",
      tagColor: "text-indigo-600 bg-indigo-500/10"
    },
  ];

  return (
    <section
      id="clients"
      className="relative py-28 bg-white border-t border-b border-slate-200 overflow-hidden font-sans"
    >
      <div className="absolute inset-0 bg-slate-50/20" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-indigo-550/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Module Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 inline-block mb-3">• PREFERRED PARTNERS</span>
          <h2 id="clients-header-title" className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            Our Clients & Trust Ecosystem
          </h2>
          <p className="mt-4 text-slate-650 text-sm font-light">
            We collaborate with ambitious start-ups and enterprise organizations worldwide to ship zero-downtime products.
          </p>
        </div>

        {/* Brand Logos Row Panels - Fully stylized with custom pseudo-logos */}
        <div id="clients-logo-panels-row" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-20">
          {clientLogos.map((logo, lIdx) => (
            <motion.div
              key={lIdx}
              id={`client-logo-box-${lIdx}`}
              whileHover={{ y: -4, transition: { duration: 0.15 } }}
              className={`border p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-all shadow-sm ${logo.color}`}
            >
              <div className="p-2.5 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-4 text-slate-800">
                {logo.icon}
              </div>
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider font-sans">
                {logo.name}
              </div>
              <span className={`text-[8.5px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md mt-2.5 font-mono ${logo.tagColor}`}>
                {logo.desc}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Carousel Testimonials reviews card - Exquisite layout with double borders */}
        <div 
          id="testimonials-carousel-box" 
          className="max-w-4xl mx-auto bg-slate-50 border border-slate-205 p-8 sm:p-12 rounded-3xl relative shadow-lg overflow-hidden"
        >
          {/* Accent decoration overlay */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="absolute top-8 left-8 text-indigo-100 p-2 border border-slate-100 bg-white rounded-xl shadow-xs">
            <Quote className="w-8 h-8 text-indigo-600/15" />
          </div>

          <div className="relative min-h-[220px] flex flex-col justify-between pt-6">
            
            {/* Review Commentary Slider */}
            <div>
              {/* Star counts */}
              <div className="flex items-center gap-1 text-amber-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>

              <blockquote className="text-slate-700 text-sm sm:text-base leading-relaxed font-light italic font-sans">
                &ldquo;{activeReview.comment}&rdquo;
              </blockquote>
            </div>

            {/* Author Profile block */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-sm tracking-wide shadow-md shadow-indigo-600/15">
                  {activeReview.imageLetter}
                </div>
                <div>
                  <span className="text-xs font-bold font-sans text-slate-900 block">{activeReview.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono tracking-wide uppercase block mt-0.5">
                    {activeReview.role} &mdash; <span className="text-indigo-600 font-semibold">{activeReview.company}</span>
                  </span>
                </div>
              </div>

              {/* Slider arrow navigations */}
              <div className="flex items-center gap-2">
                <button
                  id="testimonial-prev-arrow"
                  onClick={prevReview}
                  className="p-2.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 rounded-xl transition-all cursor-pointer focus:outline-none shadow-xs hover:scale-103"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  id="testimonial-next-arrow"
                  onClick={nextReview}
                  className="p-2.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 rounded-xl transition-all cursor-pointer focus:outline-none shadow-xs hover:scale-103"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
