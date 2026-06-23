import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, BellRing, Gift, Megaphone, ChevronRight } from "lucide-react";
import { PopupAlert } from "../types";

interface PopupDisplayProps {
  theme?: "light" | "dark";
  onNavigate: (path: string) => void;
  refreshKey?: number;
}

export default function PopupDisplay({ onNavigate, refreshKey }: PopupDisplayProps) {
  const [popups, setPopups] = useState<PopupAlert[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(-1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Fetch notifications configured in admin
    const fetchPopups = async () => {
      try {
        const response = await fetch("/api/popups");
        if (response.ok) {
          const data: PopupAlert[] = await response.json();
          const activeAlerts = data.filter(p => p.active);
          if (activeAlerts.length > 0) {
            setPopups(activeAlerts);
            setCurrentIdx(0);
            
            // Stagger popping up slightly for UX elegance
            const timer = setTimeout(() => {
              setVisible(true);
            }, 3000);
            return () => clearTimeout(timer);
          }
        }
      } catch (err) {
        console.error("Popup fetching delayed or offline:", err);
      }
    };
    fetchPopups();
  }, [refreshKey]);

  const handleClose = () => {
    setVisible(false);
    // Switch to next active popup after closing after 15 seconds if multiple exist
    if (currentIdx < popups.length - 1) {
      setTimeout(() => {
        setCurrentIdx(prev => prev + 1);
        setVisible(true);
      }, 15000);
    }
  };

  const handleAction = (link: string) => {
    onNavigate(link);
    setVisible(false);
  };

  if (currentIdx === -1 || popups.length === 0 || !visible) return null;

  const currentPopup = popups[currentIdx];

  // Helper visual mappings
  const typeConfigs = {
    Offer: {
      icon: <Gift className="w-4 h-4 text-amber-600 shrink-0" />,
      colorClass: "border-amber-200 bg-amber-50",
      badgeText: "PROMO OFFER"
    },
    Event: {
      icon: <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />,
      colorClass: "border-emerald-250 bg-emerald-50",
      badgeText: "SPECIAL EVENT"
    },
    News: {
      icon: <Megaphone className="w-4 h-4 text-indigo-600 shrink-0" />,
      colorClass: "border-indigo-150 bg-indigo-50",
      badgeText: "STUDIO NEWS"
    }
  };

  const config = typeConfigs[currentPopup.type] || typeConfigs.News;

  return (
    <AnimatePresence>
      <motion.div
        id="floating-notice-popup-card"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="fixed bottom-6 right-6 z-40 w-full max-w-sm p-5 bg-white border border-slate-200 text-slate-900 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] flex flex-col gap-3.5 transition-all outline-none"
      >
        {/* Banner header row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg border flex items-center justify-center ${config.colorClass}`}>
              {config.icon}
            </div>
            <span className="text-[9px] font-extrabold tracking-wider font-mono text-slate-500">
              {config.badgeText}
            </span>
          </div>

          <button
            onClick={handleClose}
            aria-label="Dismiss banner"
            className="p-1 rounded-lg border border-slate-100 bg-slate-50 text-slate-400 hover:text-slate-800 cursor-pointer hover:bg-slate-100 outline-none transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content text */}
        <div>
          <h4 className="text-xs sm:text-sm font-extrabold tracking-tight select-none leading-snug">
            {currentPopup.title}
          </h4>
          <p className="mt-1.5 text-xs font-light leading-relaxed text-slate-600">
            {currentPopup.message}
          </p>
        </div>

        {/* Dynamic call to action button */}
        {currentPopup.link && (
          <button
            onClick={() => handleAction(currentPopup.link || "/")}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1 border-none cursor-pointer hover:shadow-lg transition-all"
          >
            <span>Learn More Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
