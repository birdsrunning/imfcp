// app/coming-soon/page.tsx
import Link from "next/link";

export default function ComingSoon() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#231F20] text-[#EAE8E8] px-6">
      <div className="max-w-md text-center space-y-6">
        <span className="inline-block text-sm tracking-widest uppercase text-[#F4683D]">
          Site not ready
        </span>

        <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
          We’re building something worth the wait
        </h1>

        <p className="text-sm md:text-base text-[#EAE8E8]/70">
          The main experience isn’t live yet. Join the waitlist to get early
          access, updates, and launch perks.
        </p>

        <div className="pt-2">
          <Link
            href="/waitlist"
            className="inline-flex items-center justify-center rounded-full
                       bg-[#F4683D] text-[#231F20]
                       px-6 py-3 text-sm font-medium
                       transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#F4683D]/60"
          >
            Join the waitlist
          </Link>
        </div>

        <p className="text-xs text-[#EAE8E8]/40">
          No spam. Just one email when we’re ready.
        </p>
      </div>
    </main>
  );
}