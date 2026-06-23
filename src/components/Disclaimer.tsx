import React from "react";

export default function Disclaimer() {
  return (
    <section className="py-28 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">Disclaimer</h1>
        <p className="text-sm text-slate-600 leading-relaxed">The information on this site is provided "as-is" and for general informational purposes only. We disclaim warranties and limit liability where permitted by law.</p>
        <div className="mt-6 space-y-4 text-sm text-slate-600">
          <p><strong>No Guarantee</strong> — We make no guarantee of results from using our services or content.</p>
          <p><strong>External Links</strong> — External resources are provided for convenience; we do not endorse external content.</p>
        </div>
      </div>
    </section>
  );
}
