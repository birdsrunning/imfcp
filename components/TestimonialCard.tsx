import React from "react";

export default function TestimonialCard() {
  return (
    <div
      className="p-6 max-w-md rounded-2xl border border-brand-white/10 bg-gradient-to-br from-brand-white/10 via-brand-white/5 to-transparent
  hover:border-white/30 hover:ring-white/20 transition-all duration-300"
    >
      <p className="text-white/80 leading-relaxed">
        “This product completely changed the way we approach design. Everything
        feels intentional, clean, and modern.”
      </p>

      <div className="mt-6 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full border border-white/20" />
        <div>
          <p className="text-sm font-medium text-white">Alex Morgan</p>
          <p className="text-xs text-white/50">Creative Director</p>
        </div>
      </div>
    </div>
  );
}
