"use client";

import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/cta-poster.webp)",
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
              Privacy Policy
            </h1>
            <p className="text-brand-white/60">
              Last updated: January 29, 2026
            </p>
          </header>

          <section className="space-y-4 text-brand-white/80 leading-relaxed">
            <p>
              Welcome to <strong>IMFC</strong>. Your privacy matters to us. This
              Privacy Policy explains how we collect, use, and protect your
              information when you use our services.
            </p>

            <h2 className="text-xl font-semibold text-brand-white">
              1. Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal information such as name and email address</li>
              <li>Authentication data (passwords are always hashed)</li>
              <li>
                Usage data such as IP address, device, and browser information
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-brand-white">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To create and manage accounts</li>
              <li>To authenticate users and secure access</li>
              <li>To process password resets and security notifications</li>
              <li>To improve and maintain our services</li>
            </ul>

            <h2 className="text-xl font-semibold text-brand-white">
              3. Notifications
            </h2>
            <p>
              We may generate in-app notifications related to your account
              activity, including security alerts and important updates. These
              notifications are essential for protecting your account.
            </p>

            <h2 className="text-xl font-semibold text-brand-white">
              4. Data Sharing
            </h2>
            <p>
              We do not sell your personal data. We only share information with
              trusted service providers or when required by law.
            </p>

            <h2 className="text-xl font-semibold text-brand-white">
              5. Data Security
            </h2>
            <p>
              We use industry-standard security practices to protect your data.
              However, no system is completely secure.
            </p>

            <h2 className="text-xl font-semibold text-brand-white">
              6. Your Rights
            </h2>
            <p>
              You may request access, correction, or deletion of your personal
              data by contacting support.
            </p>

            <h2 className="text-xl font-semibold text-brand-white">
              7. Updates to This Policy
            </h2>
            <p>
              We may update this policy from time to time. Any changes will be
              posted on this page.
            </p>

            <h2 className="text-xl font-semibold text-brand-white">
              8. Contact
            </h2>
            <p>
              If you have questions about this policy, contact us at{" "}
              <span className="text-brand-orange">
                support@imgeforcreatives.com
              </span>
              .
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
