import React from "react";

export default function Terms() {
  return (
    <section className="py-28 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">Terms & Conditions</h1>
        <p className="text-sm text-slate-600 leading-relaxed">These Terms and Conditions govern your use of our services. By accessing or using our website, you agree to be bound by these terms. Please read them carefully.</p>
        <div className="mt-6 space-y-4 text-sm text-slate-600">
          <p><strong>1. Acceptance of Terms</strong> — Using our services indicates acceptance of these terms.</p>
          <p><strong>2. Service Scope</strong> — Descriptions of services are provided for informational purposes and do not form a contractual obligation unless otherwise agreed in writing.</p>
          <p><strong>3. Payment & Refunds</strong> — Payment terms are set per project and documented in quotes or invoices.</p>
        </div>
      </div>
    </section>
  );
}
