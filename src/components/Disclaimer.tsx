import React from "react";

export default function Disclaimer() {
  return (
    <section className="py-28 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">Disclaimer</h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          The information presented on the CAIF website is intended to provide general guidance about our digital strategy and experience services.
          It is not tailored advice for any individual situation and should not be relied upon as a substitute for professional consultation.
        </p>

        <div className="mt-10 space-y-8 text-sm text-slate-600">
          <div>
            <h2 className="text-xl font-semibold mb-3">1. Information Accuracy</h2>
            <p className="leading-relaxed">
              While we strive to keep information current, CAIF makes no guarantees regarding the completeness, accuracy, or suitability of the content on this site.
              We reserve the right to modify or remove information at any time without prior notice.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">2. No Professional Advice</h2>
            <p className="leading-relaxed">
              Content on this website is for informational purposes only and does not constitute legal, financial, marketing, or technical advice.
              For decisions that affect your business strategy, brand, or digital platform, please consult with a qualified professional before acting.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">3. No Guarantee of Results</h2>
            <p className="leading-relaxed">
              CAIF provides services designed to support growth and performance, but we cannot guarantee specific outcomes or results.
              Actual performance depends on many factors beyond our control, including market conditions, client execution, and third-party systems.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">4. External Links</h2>
            <p className="leading-relaxed">
              Our website may include links to external sites or resources.
              These links are provided for convenience only, and we do not endorse or control third-party content.
              We are not responsible for the content or practices of any linked websites.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">5. Limitation of Liability</h2>
            <p className="leading-relaxed">
              To the fullest extent permitted by law, CAIF, its affiliates, partners, and team members shall not be liable for any direct, indirect, incidental,
              consequential, or punitive damages arising from your use of this website or reliance on its content.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">6. Testimonials and Examples</h2>
            <p className="leading-relaxed">
              Any testimonials, case studies, or project examples are illustrative and reflect the experience of individual clients.
              Past performance is not necessarily indicative of future results, and individual outcomes may vary.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">7. Changes to This Disclaimer</h2>
            <p className="leading-relaxed">
              We may update this Disclaimer as our business and services evolve. Continued use of the site after changes are published constitutes acceptance of the revised terms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
