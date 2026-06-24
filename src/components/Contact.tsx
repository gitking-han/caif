import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Lock } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [projectService, setProjectService] = useState("Web Application Management");
  const [intent, setIntent] = useState("Get Started");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const applyUrlParams = () => {
      if (typeof window === "undefined") return;
      const params = new URLSearchParams(window.location.search);
      const serviceParam = params.get("service");
      const intentParam = params.get("intent");

      if (serviceParam) {
        setProjectService(serviceParam);
        // auto-fill demo fields when navigated from a service modal
        if (!name) setName(`Demo - ${serviceParam} Request`);
        if (!email) setEmail("demo@apextech.studio");
        if (!message)
          setMessage(`Hello, I'm interested in ${serviceParam}. Please share pricing, timeline, and next steps.`);
      }
      if (intentParam) {
        setIntent(intentParam);
      }
    };

    applyUrlParams();

    const normalizeHandler = () => applyUrlParams();
    window.addEventListener("popstate", normalizeHandler);
    window.addEventListener("caif:navigate", normalizeHandler as EventListener);
    return () => {
      window.removeEventListener("popstate", normalizeHandler);
      window.removeEventListener("caif:navigate", normalizeHandler as EventListener);
    };
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSending(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          projectService,
          intent,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setSubmitError(result.error || "Unable to submit your request.");
        return;
      }

      setIsSent(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setSubmitError("Unable to submit your request. Please try again.");
      console.error("Contact submission error:", err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-28 bg-white overflow-hidden font-sans border-t border-slate-200"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Module Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 inline-block mb-3">• CONSULTATION ROUTING</span>
          <h2 id="contact-header-title" className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Schedule a Custom Scope Review
          </h2>
          <p className="mt-4 text-slate-600 text-sm font-light">
            Fill out your technical requirements below to initiate a streamlined project estimation sequence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-stretch">
          
          {/* Office Credentials Column Left */}
          <div className="col-span-1 lg:col-span-5 flex flex-col justify-between bg-slate-50 border border-slate-200 p-8 sm:p-10 rounded-2xl shadow-sm">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-indigo-600 uppercase block mb-2">• DIRECT DIRECTORY</span>
              <h3 className="text-xl font-bold text-slate-850 font-sans tracking-tight">Our Core Offices</h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed mt-2.5 mb-10">
                Liaise with our system administrators, vector designers, and director editors directly across global node zones.
              </p>

              <div id="office-info-list" className="flex flex-col gap-6">
                
                {/* Mail */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-indigo-50 border border-indigo-200 text-indigo-600 rounded-lg shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Email Inbound</span>
                    <span className="text-xs font-bold text-slate-800 block mt-1">caiftechsolutions@gmail.com</span>
                  </div>
                </div>

                {/* NOC Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-purple-50 border border-purple-200 text-purple-600 rounded-lg shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Active Network NOC</span>
                    <span className="text-xs font-bold text-slate-800 block mt-1">+92 349 2129057</span>
                  </div>
                </div>

                {/* HQ Location */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-emerald-50 border border-emerald-250 text-emerald-600 rounded-lg shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">HQ Operations</span>
                    <span className="text-xs font-bold text-slate-800 block mt-1">Iftikhar Town Jauharabad, District Khushab, Pakistan</span>
                  </div>
                </div>

              </div>
            </div>

            {/* GDPR disclosure */}
            <div className="mt-8 pt-6 border-t border-slate-200 text-[10.5px] text-slate-500 flex items-center gap-1.5 leading-relaxed font-light">
              <Lock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>Submission values encrypted end-to-end of modern TLS configurations.</span>
            </div>
          </div>

          {/* Dynamic Interception Form Column Right */}
          <div className="col-span-1 lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-lg relative">
              
              <AnimatePresence mode="wait">
                {!isSent ? (
                  <form onSubmit={handleContactSubmit} id="contact-form" className="flex flex-col gap-5">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-2">Your Name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Aris Thorne"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:border-indigo-600 outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-2">Email Address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="cto@velocitycloud.com"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:border-indigo-600 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-2">Target Inquiry Suite</label>
                      <select
                        id="inquiry-service-select"
                        value={projectService}
                        onChange={(e) => setProjectService(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-700 outline-none focus:border-indigo-600 appearance-none cursor-pointer"
                      >
                        <option value="Web App Management">Web Application Management (WAMS)</option>
                        <option value="Mobile App Platform">Mobile Apps Dev</option>
                        <option value="Graphic Identity Manual">Brand & Graphic Design</option>
                        <option value="Cinema Video Timeline">Bespoke Video Editing</option>
                        <option value="Golden Ratio Logo">Golden Ratio Logo Mark</option>
                        <option value="Organic SEO Campaigns">Digital Marketing & SEO</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-2">Project Brief Details</label>
                      <textarea
                        id="contact-brief-input"
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about your active business targets, timelines, hosting preferences..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-800 placeholder-slate-400 focus:border-indigo-600 outline-none resize-none"
                      />
                    </div>

                    {submitError && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-800 text-xs font-medium">
                        {submitError}
                      </div>
                    )}
                    <button
                      type="submit"
                      id="contact-send-btn"
                      disabled={isSending}
                      className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/15 flex items-center justify-center gap-2 cursor-pointer transition-all active:translate-y-0.5"
                    >
                      {isSending ? (
                        "Transmitting Credentials..."
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 text-white" />
                          Submit Secure Request
                        </>
                      )}
                    </button>

                  </form>
                ) : (
                  /* Success Screen */
                  <div className="h-full py-12 flex flex-col justify-center items-center text-center">
                    <div className="w-16 h-16 bg-emerald-50 border border-emerald-250 text-emerald-600 flex items-center justify-center rounded-2xl mb-6 shadow-xl shadow-emerald-500/5 animate-bounce">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-emerald-700 uppercase mb-2">Brief Received Symmetrically</span>
                    <h4 className="text-xl font-bold text-slate-900 font-sans tracking-tight">
                      Proposals Dispatched Successfully!
                    </h4>
                    <p className="mt-3 text-xs text-slate-600 leading-relaxed font-light max-w-sm">
                      Our system administration officer will digest your project brief and return a detailed scope within 4 business hours.
                    </p>
                    <button
                      id="contact-reset-btn"
                      onClick={() => setIsSent(false)}
                      className="mt-8 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                    >
                      Submit Another Brief
                    </button>
                  </div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
