"use client";

import React, { useState } from "react";
import { CaifLogo } from "@/components/CaifLogo";
import { Github, Twitter, Linkedin, Instagram, Youtube, ShieldCheck, ArrowRight } from "lucide-react";

export default function Footer() {
  const navigateTo = (path: string) => {
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", path);
      window.dispatchEvent(new CustomEvent("caif:navigate", { detail: path }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const [isDark] = useState(false);
  const [footerSuccess, setFooterSuccess] = useState(false);
  const [footerEmail, setFooterEmail] = useState("");

  return (
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
                  { name: "Home", path: "/" },
                  { name: "About Us", path: "/about" },
                  { name: "Services", path: "/services" },
                  { name: "Portfolio", path: "/portfolio" },
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
                  { name: "Blogs", path: "/blogs" },
                  { name: "Contact Us", path: "/contact?intent=Get%20Started" },
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
  );
}
