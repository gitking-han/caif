import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sparkles } from "lucide-react";
import { CaifLogo } from "./CaifLogo";

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  theme?: "light" | "dark";
}

export default function Navbar({ currentPath, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/blogs", label: "Blogs" },
    { path: "/contact?intent=Get%20Started", label: "Contact" },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      id="main-navigation-bar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200 py-3 shadow-md"
          : "bg-slate-50/20 backdrop-blur-xs py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo and Brand */}
        <button
          id="nav-logo-btn"
          onClick={() => handleNavClick("/")}
          className="flex items-center group focus:outline-none border-none bg-transparent cursor-pointer"
        >
          <CaifLogo iconSize={32} textSize="text-lg" textClassName="text-slate-900 duration-200 transition-colors" />
        </button>

        {/* Desktop Navigation Links */}
        <div 
          id="desktop-menu-links" 
          className="hidden md:flex items-center gap-1.5 p-1 rounded-full border bg-slate-100 border-slate-200 shadow-inner"
        >
          {navItems.map((item) => {
            const isActive = currentPath === item.path || (item.path !== "/" && currentPath.startsWith(item.path));
            return (
              <button
                key={item.path}
                id={`nav-link-${item.path.replace(/\//g, "root")}`}
                onClick={() => handleNavClick(item.path)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-205 outline-none border-none bg-transparent cursor-pointer ${
                  isActive ? "text-indigo-700" : "text-slate-600 hover:text-slate-950"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBg"
                    className="absolute inset-0 rounded-full -z-10 shadow-sm bg-white border border-slate-200/50"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Active Utilities (Admin Action) */}
        <div className="hidden md:flex items-center gap-4">
          <button
            id="nav-cta-admin"
            onClick={() => handleNavClick("/contact?intent=Get%20Started")}
            className="font-sans text-xs font-bold tracking-wide px-4 py-2 rounded-xl transition-all border outline-none cursor-pointer flex items-center gap-1.5 bg-indigo-600 text-white border-indigo-500 hover:bg-indigo-700 shadow-md shadow-indigo-600/15 group/admin"
          >
            <Sparkles className="w-3.5 h-3.5 shrink-0 group-hover/admin:scale-120 group-hover/admin:rotate-12 transition-transform duration-300 text-indigo-200" />
            <span>Get Started</span>
          </button>
        </div>

        {/* Mobile menu row */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Hamburger */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 focus:outline-none cursor-pointer bg-transparent border-none text-slate-600 hover:text-slate-900"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-drawer-sheet"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-b bg-white border-slate-205"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = currentPath === item.path || (item.path !== "/" && currentPath.startsWith(item.path));
                return (
                  <button
                    key={item.path}
                    id={`mobile-nav-link-${item.path.replace(/\//g, "root")}`}
                    onClick={() => handleNavClick(item.path)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-colors border-none bg-transparent cursor-pointer ${
                      isActive
                        ? "bg-indigo-600/5 text-indigo-600 border-l-2 border-indigo-600"
                        : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <button
                id="mobile-nav-cta-admin"
                onClick={() => handleNavClick("/contact")}
                className="w-full text-center mt-2 text-xs font-bold tracking-wide bg-indigo-600 text-white py-3 rounded-xl shadow-lg shadow-indigo-600/15 border-none cursor-pointer"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
