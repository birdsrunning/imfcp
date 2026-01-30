"use client";

import Link from "next/link";

export default function TermsAndConditionsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/cta-poster.webp')",
        }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-brand-black/70" />

      {/* Subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,120,0,0.12),transparent_60%)]" />

      {/* Content */}
      <div className="relative mx-auto max-w-4xl px-6 py-24">
        <div className="rounded-2xl border border-brand-white/10 bg-brand-black/80 backdrop-blur p-8 shadow-xl space-y-6">
          <header className="space-y-2">
            <h1 className="text-4xl font-bold text-brand-white">
              Terms & Conditions
            </h1>
            <p className="text-brand-white/60">
              Last updated: January 29, 2026
            </p>
          </header>

          <section className="space-y-4 text-brand-white/80 leading-relaxed">
            <p>
              These Terms and Conditions {`("Terms")`} govern your use of{" "}
              <strong>IMFC</strong> {`("we", "our", "us")`}. By accessing or
              using our website and services, you agree to be bound by these
              Terms.
            </p>

            <h2 className="text-xl font-semibold text-brand-white">
              1. Accounts
            </h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities that occur under your
              account.
            </p>

            <h2 className="text-xl font-semibold text-brand-white">
              2. Acceptable Use
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Do not misuse or interfere with the platform</li>
              <li>Do not attempt unauthorized access</li>
              <li>Do not use the service for unlawful purposes</li>
            </ul>

            <h2 className="text-xl font-semibold text-brand-white">
              3. Security & Passwords
            </h2>
            <p>
              You are responsible for safeguarding your password. We are not
              liable for losses caused by unauthorized access resulting from
              your failure to secure your credentials.
            </p>

            <h2 className="text-xl font-semibold text-brand-white">
              4. Notifications
            </h2>
            <p>
              We may send in-app notifications related to your account,
              including security alerts and important service updates. These
              notifications are part of normal service operation.
            </p>

            <h2 className="text-xl font-semibold text-brand-white">
              5. Intellectual Property
            </h2>
            <p>
              All content, trademarks, and materials provided by IMFC are owned
              by us or licensed to us and may not be used without permission.
            </p>

            <h2 className="text-xl font-semibold text-brand-white">
              6. Termination
            </h2>
            <p>
              We reserve the right to suspend or terminate accounts that violate
              these Terms or pose a risk to the platform.
            </p>

            <h2 className="text-xl font-semibold text-brand-white">
              7. Disclaimer
            </h2>
            <p>
              Our services are provided {`"as is"`} without warranties of any
              kind. We do not guarantee uninterrupted or error-free service.
            </p>

            <h2 className="text-xl font-semibold text-brand-white">
              8. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, IMFC shall not be liable
              for any indirect or consequential damages.
            </p>

            <h2 className="text-xl font-semibold text-brand-white">
              9. Changes to These Terms
            </h2>
            <p>
              We may update these Terms at any time. Continued use of the
              service means you accept the revised Terms.
            </p>

            <h2 className="text-xl font-semibold text-brand-white">
              10. Contact
            </h2>
            <p>
              If you have questions about these Terms, contact us at{" "}
              <span className="text-brand-orange">support@yourdomain.com</span>.
            </p>
          </section>

          <footer className="pt-6 border-t border-brand-white/10">
            <Link href="/" className="text-brand-orange hover:underline">
              ← Back to home
            </Link>
          </footer>
        </div>
      </div>
    </main>
  );
}
