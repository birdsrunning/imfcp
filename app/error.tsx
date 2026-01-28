"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, LayoutGrid } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#231F20] px-6 text-center text-[#EAE8E8]">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#F4683D]/40">
        <AlertTriangle className="h-8 w-8 text-[#F4683D]" />
      </div>

      <p className="mt-6 text-xs uppercase tracking-widest text-[#EAE8E8]/60">
        Unexpected error
      </p>

      <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
        This frame broke
      </h1>

      <p className="mt-4 max-w-md text-[#EAE8E8]/70">
        Something went wrong while loading this page.
        It’s not your fault.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-xl bg-[#F4683D] px-6 py-3 text-sm font-medium text-[#231F20] transition hover:opacity-90"
        >
          <RotateCcw className="h-4 w-4" />
          Try again
        </button>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-xl border border-[#EAE8E8]/20 px-6 py-3 text-sm font-medium transition hover:border-[#F4683D]/60 hover:text-[#F4683D]"
        >
          <LayoutGrid className="h-4 w-4" />
          Back to dashboard
        </Link>
      </div>
    </main>
  );
}
