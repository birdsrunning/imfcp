"use client";
import React from "react";

type ProgressBarProps = {
  current: number;
  total: number;
  height?: number;
};

export default function ProgressBar({
  current,
  total,
  height = 8,
}: ProgressBarProps) {
  const percentage = total > 0 ? Math.min((current / total) * 100, 100) : 0;

  return (
    <div
      className="w-full bg-brand-white/10 rounded-full overflow-hidden"
      style={{ height }}
    >
      <div
        className="h-full bg-brand-orange transition-all duration-300 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
