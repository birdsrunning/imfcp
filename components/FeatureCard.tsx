import React from "react";

export default function FeatureCard({
  icon,
  title,
}: {
  icon: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 px-5 h-20 w-64 bg-white border rounded-lg">
      <span className="text-xl">{icon}</span>
      <span className="text-sm font-medium whitespace-nowrap">{title}</span>
    </div>
  );
}
