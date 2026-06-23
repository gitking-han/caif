import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SERVICE_GIGS_DATA } from "../data";
import { ServiceGig, FiverrGigPackage } from "../types";
import { 
  Clock, 
  RefreshCw, 
  Check, 
  ChevronRight, 
  ShoppingCart, 
  Lock, 
  ChevronDown, 
  Sparkles,
  Command,
  CheckCircle2,
  X
} from "lucide-react";

interface PricingProps {
  selectedServiceId: string;
  onSelectService: (serviceId: string) => void;
}

export default function Pricing({ selectedServiceId, onSelectService }: PricingProps) {
  // active dynamic service
  const activeGigIndex = SERVICE_GIGS_DATA.findIndex(gig => gig.serviceId === selectedServiceId);
  const activeGig = activeGigIndex !== -1 ? SERVICE_GIGS_DATA[activeGigIndex] : SERVICE_GIGS_DATA[0];

  // Checkout modal/drawer state
  const [checkoutPackage, setCheckoutPackage] = useState<{
    gig: ServiceGig;
    packageType: "Basic" | "Standard" | "Premium";
    packageData: FiverrGigPackage;
  } | null>(null);

  // Add-on checkout extras state
  const [addExtraFastDelivery, setAddExtraFastDelivery] = useState(false);
  const [addSourceCodeFiles, setAddSourceCodeFiles] = useState(false);
  const [addExtendedSLA, setAddExtendedSLA] = useState(false);

  // Success message modal checkout
  const [isPurchaseSuccessful, setIsPurchaseSuccessful] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const basePriceValue = checkoutPackage 
    ? parseInt(checkoutPackage.packageData.price.replace(/[^0-9]/g, "")) 
    : 0;

  const extraFastCost = 75;
  const sourceCodeCost = 45;
  const extendedSLACost = 180;

  const subTotalCalculated = basePriceValue 
    + (addExtraFastDelivery ? extraFastCost : 0)
    + (addSourceCodeFiles ? sourceCodeCost : 0)
    + (addExtendedSLA ? extendedSLACost : 0);

  // Reset extra add-ons whenever the package selection edits
  useEffect(() => {
    setAddExtraFastDelivery(false);
    setAddSourceCodeFiles(false);
    setAddExtendedSLA(false);
    setIsPurchaseSuccessful(false);
  }, [checkoutPackage]);

  const handleOpenCheckout = (packageType: "Basic" | "Standard" | "Premium", packageData: FiverrGigPackage) => {
    setCheckoutPackage({
      gig: activeGig,
      packageType,
      packageData
    });
  };

  const handleCloseCheckout = () => {
    setCheckoutPackage(null);
  };

  const handleMockCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail || !customerName) return;
    setIsPurchaseSuccessful(true);
  };

  return (
    <section
      id="pricing"
      className="relative py-28 bg-white border-t border-b border-slate-200 overflow-hidden"
    >
      <div className="absolute inset-0 bg-slate-50/50" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Module Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 inline-block mb-3">• SERVICE PACKAGE PRICING</span>
          <h2 id="pricing-header-title" className="font-sans text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Transparent Service Package Pricing
          </h2>
          <p className="mt-4 text-slate-600 text-sm font-light">
            Toggle services below to view our standard package scopes, delivery timelines, and interactive add-ons.
          </p>
        </div>

        {/* Dynamic Services Tab Toggles */}
        <div id="pricing-service-tabs-row" className="flex flex-wrap justify-center gap-2 mb-12">
          {SERVICE_GIGS_DATA.map((gig) => (
            <button
              key={gig.serviceId}
              id={`tab-pricing-service-${gig.serviceId}`}
              onClick={() => onSelectService(gig.serviceId)}
              className={`px-5 py-2.5 rounded-xl font-sans text-xs font-semibold tracking-wide transition-all outline-none border cursor-pointer ${
                selectedServiceId === gig.serviceId
                  ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/15"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900 shadow-sm"
              }`}
            >
              {gig.serviceTitle}
            </button>
          ))}
        </div>

        {/* Selected Gig Intro block */}
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-700 px-2 py-0.5 bg-emerald-50 border border-emerald-250 rounded">
              Active Contract Scope
            </span>
            <h3 id="pricing-active-gig-title" className="mt-3 text-lg sm:text-xl font-bold font-sans text-slate-800 leading-relaxed italic">
              &ldquo;{activeGig.gigTitle}&rdquo;
            </h3>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 bg-white border border-slate-200 px-4 py-2 rounded-xl text-[11px] font-mono text-slate-500 shadow-sm">
            <Lock className="w-3.5 h-3.5 text-indigo-650" />
            <span>Secure Package Quote</span>
          </div>
        </div>

        {/* Packages Cards Side-by-Side Comparison Grid */}
        <div id="gigs-packages-grid" className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Basic Package Box */}
          <div
            id="gig-card-basic"
            className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col justify-between hover:border-slate-300 transition-colors shadow-md relative"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold font-mono tracking-wider text-slate-400 uppercase">BASIC TIER</span>
                <span className="text-3xl font-black text-slate-900 font-sans">{activeGig.packages.basic.price}</span>
              </div>
              <h4 className="mt-4 text-base font-bold text-slate-800 font-sans">
                {activeGig.packages.basic.title}
              </h4>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-[10.5px] text-slate-500 font-mono border-t border-b border-slate-100 py-3.5">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-600" /> {activeGig.packages.basic.deliveryTime}
                </span>
                <span className="flex items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 text-purple-600" /> {activeGig.packages.basic.revisions}
                </span>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                {activeGig.packages.basic.specs.map((spec, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                    <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span className="font-light">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              id="basic-package-checkout-btn"
              onClick={() => handleOpenCheckout("Basic", activeGig.packages.basic)}
              className="mt-8 w-full py-3 bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer transition-all shadow-sm"
            >
              Order Basic Package
            </button>
          </div>

          {/* Standard Package Box (Highly-Popular Accents) */}
          <div
            id="gig-card-standard"
            className="bg-white border-2 border-indigo-600 rounded-2xl p-8 flex flex-col justify-between hover:border-indigo-700 transition-all shadow-xl shadow-indigo-600/5 relative"
          >
            {/* Pop badge tag */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-indigo-600 text-[10px] font-sans font-bold tracking-widest text-white rounded-full uppercase shadow">
              🚀 Highly Selected
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold font-mono tracking-wider text-indigo-600 uppercase">STANDARD TIER</span>
                <span className="text-3xl font-black text-slate-900 font-sans">{activeGig.packages.standard.price}</span>
              </div>
              <h4 className="mt-4 text-base font-bold text-slate-800 font-sans">
                {activeGig.packages.standard.title}
              </h4>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-[10.5px] text-indigo-600 font-mono border-t border-b border-indigo-50 py-3.5">
                <span className="flex items-center gap-1 text-indigo-600">
                  <Clock className="w-3.5 h-3.5 text-indigo-600" /> {activeGig.packages.standard.deliveryTime}
                </span>
                <span className="flex items-center gap-1 text-indigo-600">
                  <RefreshCw className="w-3.5 h-3.5 text-purple-600" /> {activeGig.packages.standard.revisions}
                </span>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                {activeGig.packages.standard.specs.map((spec, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-800">
                    <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span className="font-semibold">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              id="standard-package-checkout-btn"
              onClick={() => handleOpenCheckout("Standard", activeGig.packages.standard)}
              className="mt-8 w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/15 active:translate-y-0.5 cursor-pointer transition-all"
            >
              Order Standard Package
            </button>
          </div>

          {/* Premium Package Box */}
          <div
            id="gig-card-premium"
            className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col justify-between hover:border-slate-300 transition-colors shadow-md relative"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold font-mono tracking-wider text-slate-400 uppercase">PREMIUM TIER</span>
                <span className="text-3xl font-black text-slate-900 font-sans">{activeGig.packages.premium.price}</span>
              </div>
              <h4 className="mt-4 text-base font-bold text-slate-800 font-sans">
                {activeGig.packages.premium.title}
              </h4>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-[10.5px] text-slate-500 font-mono border-t border-b border-slate-100 py-3.5">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-600" /> {activeGig.packages.premium.deliveryTime}
                </span>
                <span className="flex items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 text-purple-600" /> {activeGig.packages.premium.revisions}
                </span>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                {activeGig.packages.premium.specs.map((spec, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                    <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span className="font-light">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              id="premium-package-checkout-btn"
              onClick={() => handleOpenCheckout("Premium", activeGig.packages.premium)}
              className="mt-8 w-full py-3 bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer transition-all shadow-sm"
            >
              Order Premium Package
            </button>
          </div>

        </div>

        {/* Real-time Checkout Side Drawer overlay */}
        <AnimatePresence>
          {checkoutPackage && (
            <div className="fixed inset-0 z-50 flex justify-end p-0">
              {/* Overlay shadow mask */}
              <motion.div
                id="checkout-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseCheckout}
                className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
              />

              {/* Slider Sheet */}
              <motion.div
                id="checkout-drawer-sheet"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                className="relative w-full max-w-lg bg-white border-l border-slate-200 h-full overflow-y-auto shadow-2xl p-8 z-10 font-sans"
              >
                {/* Close Button */}
                <button
                  id="checkout-close-btn"
                  onClick={handleCloseCheckout}
                  className="absolute top-6 right-6 p-2 bg-slate-50 border border-slate-200 text-slate-400 hover:text-slate-800 rounded-lg cursor-pointer hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Drawer Structure content */}
                {!isPurchaseSuccessful ? (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <ShoppingCart className="w-4 h-4 text-indigo-600" />
                      <span className="text-[10px] font-mono tracking-widest text-indigo-600 uppercase">Secure Quote Summary</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 font-sans tracking-tight">
                       Order Specifications Setup
                    </h3>
                    <p className="text-xs text-slate-500 font-light mt-1 mb-6">
                      Customize additional capabilities below to automatically calculate precise sub-totals before confirming contracts.
                    </p>

                    {/* Summary Card box */}
                    <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl mb-6">
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-none">Selected Package</div>
                      <h4 className="text-base font-bold text-slate-800 font-sans mt-2">
                        {checkoutPackage.gig.serviceTitle} &mdash; <span className="text-indigo-600">{checkoutPackage.packageType}</span>
                      </h4>
                      <p className="text-[11px] text-slate-600 italic mt-1.5 leading-relaxed">
                        &ldquo;{checkoutPackage.packageData.title}&rdquo;
                      </p>
                      
                      <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center text-xs font-mono">
                        <span className="text-slate-500 font-medium">Base Gig Price</span>
                        <span className="text-slate-900 font-black">{checkoutPackage.packageData.price}</span>
                      </div>
                    </div>

                    {/* Checkbox options - Extras Configurator */}
                    <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4 font-bold">Add Project Extras:</h4>
                    <div id="checkout-extras-list" className="flex flex-col gap-3 mb-6">
                      
                      {/* Extra 1 */} 
                      <div 
                        onClick={() => setAddExtraFastDelivery(!addExtraFastDelivery)}
                        className={`p-4 border rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                          addExtraFastDelivery 
                            ? "bg-indigo-50 border-indigo-200" 
                            : "bg-slate-50/50 border-slate-250 hover:bg-slate-50/10 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input type="checkbox" checked={addExtraFastDelivery} readOnly className="mt-0.5 accent-indigo-650" />
                          <div>
                            <span className="text-xs font-semibold text-slate-800 block">Express Fast Track Delivery</span>
                            <span className="text-[10px] text-slate-500 block mt-0.5">Cuts package delivery timelines by complete 50%</span>
                          </div>
                        </div>
                        <span className="text-xs font-bold font-mono text-indigo-650 shrink-0">+${extraFastCost}</span>
                      </div>

                      {/* Extra 2 */}
                      <div 
                        onClick={() => setAddSourceCodeFiles(!addSourceCodeFiles)}
                        className={`p-4 border rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                          addSourceCodeFiles 
                            ? "bg-indigo-50 border-indigo-200" 
                            : "bg-slate-50/50 border-slate-250 hover:bg-slate-50/10 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input type="checkbox" checked={addSourceCodeFiles} readOnly className="mt-0.5 accent-indigo-650" />
                          <div>
                            <span className="text-xs font-semibold text-slate-800 block">Complete Source Files Handover</span>
                            <span className="text-[10px] text-slate-500 block mt-0.5">Exposes raw codes, vectors, or timeline project blueprints</span>
                          </div>
                        </div>
                        <span className="text-xs font-bold font-mono text-indigo-650 shrink-0">+${sourceCodeCost}</span>
                      </div>

                      {/* Extra 3 */}
                      <div 
                        onClick={() => setAddExtendedSLA(!addExtendedSLA)}
                        className={`p-4 border rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                          addExtendedSLA 
                            ? "bg-indigo-50 border-indigo-200" 
                            : "bg-slate-50/50 border-slate-250 hover:bg-slate-50/10 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input type="checkbox" checked={addExtendedSLA} readOnly className="mt-0.5 accent-indigo-650" />
                          <div>
                            <span className="text-xs font-semibold text-slate-800 block">1-Year Tech Maintenance SLA</span>
                            <span className="text-[10px] text-slate-500 block mt-0.5">Priority troubleshooting, server logs mapping and security updates</span>
                          </div>
                        </div>
                        <span className="text-xs font-bold font-mono text-indigo-650 shrink-0">+${extendedSLACost}</span>
                      </div>

                    </div>

                    {/* Interactive Invoice Math calculation readout */}
                    <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between mb-8">
                      <div>
                        <span className="text-xs text-slate-500 uppercase tracking-wider block font-mono">Invoice Total</span>
                        <span className="text-[10px] text-slate-400 block">Includes VAT and secure handling coverage</span>
                      </div>
                      <span className="text-3xl font-black text-slate-900 font-sans tracking-tight">
                        ${subTotalCalculated}
                      </span>
                    </div>

                    {/* Secure Checkout Form */}
                    <form onSubmit={handleMockCheckoutSubmit} id="checkout-form" className="flex flex-col gap-4">
                      <div>
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1.5">Your Full Name</label>
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Aris Thorne"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-450 focus:border-indigo-600 outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1.5">Email Address</label>
                        <input
                          type="email"
                          required
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          placeholder="cto@velocitycloud.com"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-450 focus:border-indigo-600 outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        id="checkout-submit-order-btn"
                        className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold tracking-wide shadow-lg shadow-emerald-700/15 flex items-center justify-center gap-2 mt-4 cursor-pointer transition-colors"
                      >
                        <Lock className="w-4 h-4 text-white" />
                        Initiate Secured Contract Order
                      </button>
                    </form>
                  </>
                ) : (
                  /* Success Screen inside Checkout Box */
                  <div className="h-full flex flex-col justify-center items-center text-center py-12">
                    <div className="w-16 h-16 bg-emerald-50 border border-emerald-250 text-emerald-600 flex items-center justify-center rounded-2xl mb-6 shadow-xl shadow-emerald-500/5">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-emerald-700 uppercase mb-2">Checkout Escrow Activated</span>
                    <h4 className="text-xl font-bold text-slate-900 font-sans tracking-tight">
                      Order Initiated, {customerName}!
                    </h4>
                    <p className="mt-3 text-xs text-slate-650 leading-relaxed font-light max-w-md">
                        A secured quote summary for the <span className="text-indigo-600 font-semibold">{checkoutPackage.packageType}</span> tier has been successfully dispatched to <span className="text-slate-800 underline font-medium">{customerEmail}</span> representing your service request.
                    </p>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 w-full mt-8 text-left">
                      <div className="text-[11px] font-semibold text-slate-850">Next Action Steps:</div>
                      <div className="flex flex-col gap-3 mt-4 text-[11px] text-slate-600">
                        <div className="flex gap-2">
                          <span className="text-indigo-600 font-mono font-bold">1.</span>
                          <span>Complete contract setup questionnaire inside your email dashboard.</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-indigo-600 font-mono font-bold">2.</span>
                          <span>Submit active server credentials or vector branding manuals.</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-indigo-600 font-mono font-bold">3.</span>
                          <span>Track real-time progress of your milestone via our workspace log portal.</span>
                        </div>
                      </div>
                    </div>

                    <button
                      id="checkout-success-close-btn"
                        onClick={handleCloseCheckout}
                        className="mt-8 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                      >
                        Return to Services
                      </button>
                  </div>
                )}

              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
