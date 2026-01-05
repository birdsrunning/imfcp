"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function OrientationFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selected = searchParams.get("orientation"); // single selection

  function toggleOrientation(orientation: "portrait" | "landscape") {
    const params = new URLSearchParams(searchParams.toString());

    // reset page when changing filter
    params.delete("page");

    if (selected === orientation) {
      // Clicking the same option turns it off
      params.delete("orientation");
    } else {
      // Clicking a different option sets it
      params.set("orientation", orientation);
    }

    router.push(`?${params.toString()}`);
  }

  const isSelected = (orientation: "portrait" | "landscape") =>
    selected === orientation;

  return (
    <div className="flex gap-4">
      <button
        onClick={() => toggleOrientation("portrait")}
        className={`py-2 px-2 border rounded-sm ${
          isSelected("portrait")
            ? "border-brand-white bg-brand-white/10"
            : "border-brand-white"
        }`}
      >
        <div className="bg-[#2e2a2b] h-6 w-4" />
      </button>

      <button
        onClick={() => toggleOrientation("landscape")}
        className={`py-2 px-2 border rounded-sm ${
          isSelected("landscape")
            ? "border-brand-white bg-brand-white/10"
            : "border-brand-white"
        }`}
      >
        <div className="bg-[#2e2a2b] h-6 w-8" />
      </button>
    </div>
  );
}
