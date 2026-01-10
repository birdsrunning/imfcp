import React from "react";

export default function FeatureCard({
  icon,
  title,
}: {
  icon: string;
  title: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-5 h-52 w-64 rounded-2xl border border-white/30 shadow-sm">
      <span className="text-4xl">{icon}</span>
      <span className="text-lg font-semibold text-center">{title}</span>
    </div>
  );
}
