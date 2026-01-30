import React from "react";

export default function TestimonialCard({
  name,
  role,
  comment,
}: {
  name: string;
  role: string;
  comment: string;
}) {
  return (
    <div
      className="p-6 max-w-md rounded-2xl border border-brand-white/10 bg-gradient-to-br from-brand-white/10 via-brand-white/5 to-transparent
  hover:border-white/30 hover:ring-white/20 transition-all duration-300"
    >
      <p className="text-white/80 leading-relaxed">{comment}</p>

      <div className="mt-6 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full border border-white/20" />
        <div>
          <p className="text-sm font-medium text-white">{name}</p>
          <p className="text-xs text-white/50">{role}</p>
        </div>
      </div>
    </div>
  );
}
