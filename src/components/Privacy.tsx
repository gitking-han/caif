import React from "react";

export default function Privacy() {
  return (
    <section className="py-28 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">Privacy Policy</h1>
        <p className="text-sm text-slate-600 leading-relaxed">We respect your privacy. This policy explains what data we collect, how it's used, and your rights regarding your personal information.</p>
        <div className="mt-6 space-y-4 text-sm text-slate-600">
          <p><strong>Data Collection</strong> — We collect data necessary to provide services, such as contact form submissions and analytics.</p>
          <p><strong>Use of Data</strong> — Data is used to communicate with you and improve our services.</p>
          <p><strong>Third Parties</strong> — We do not sell personal data; third-party services may process data under contract.</p>
        </div>
      </div>
    </section>
  );
}
