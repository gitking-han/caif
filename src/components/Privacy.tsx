import React from "react";

export default function Privacy() {
  return (
    <section className="py-28 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">Privacy Policy</h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          At CAIF, protecting your privacy is a core part of how we design digital experiences.
          This policy explains what information we collect, how we use it, and how we protect your personal data when you visit our website or engage our services.
        </p>

        <div className="mt-10 space-y-8 text-sm text-slate-600">
          <div>
            <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
            <p className="leading-relaxed">
              We collect information you provide directly, such as your name, email address, company name, and project details submitted through contact forms.
              We also collect technical data through analytics tools, including browser type, device information, IP address, and pages visited.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
            <p className="leading-relaxed">
              We use your information to respond to inquiries, prepare proposals, maintain our website, and improve the quality of our services.
              When you contact us, we may use your details to follow up about your project or share relevant insights about how CAIF can support your digital growth.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">3. Analytics and Cookies</h2>
            <p className="leading-relaxed">
              We use cookies and similar tracking technologies to understand visitor behavior, optimize website performance, and personalize content.
              These tools help us measure interest in our services and ensure a smooth experience for site visitors.
            </p>
            <p className="leading-relaxed">
              You may disable cookies through your browser settings, though some website functionality may be affected.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">4. Third-Party Services</h2>
            <p className="leading-relaxed">
              CAIF does not sell your personal information. We may share limited data with trusted service providers who help us operate our website,
              analyze traffic, process inquiries, or deliver digital services. These providers act on our behalf and are contractually required to protect your data.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">5. Data Security</h2>
            <p className="leading-relaxed">
              We implement appropriate organizational and technical measures to protect personal information against unauthorized access, disclosure, alteration, or destruction.
              While no system can be completely secure, we maintain industry-standard safeguards to protect the information we collect.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">6. Data Retention</h2>
            <p className="leading-relaxed">
              We retain personal information only as long as necessary to fulfill the purposes described in this policy or to comply with legal obligations.
              When information is no longer needed, we will securely delete or anonymize it.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">7. Your Rights</h2>
            <p className="leading-relaxed">
              You may request access to, correction of, or deletion of your personal information by contacting us.
              If you have questions about our privacy practices or want to update your information, please reach out through the contact form on our website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">8. Updates to this Policy</h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.
              We encourage you to review this page periodically for the latest information on how we protect your privacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
