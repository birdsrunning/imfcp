"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export function DashboardSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    () => searchParams.get("q") ?? "",
  );

  function updateParams(
    updates: Record<string, string | string[] | undefined>,
  ) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");

    for (const [key, value] of Object.entries(updates)) {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        params.delete(key);
      } else if (Array.isArray(value)) {
        params.delete(key);
        value.forEach((v) => params.append(key, v));
      } else {
        params.set(key, value);
      }
    }

    router.push(`?${params.toString()}`);
  }

  function handleSearch() {
    updateParams({
      q: searchValue.trim() || undefined,
    });
  }

  return (
    <div
      className="
    relative
    w-full
    max-w-xs
    md:max-w-64
    hidden
    sm:block
  "
    >
      {/* glass border */}
      <div
        className="
      relative
      rounded-full
      p-[1px]
      bg-white/20
      backdrop-blur-md
      border border-white/30
      shadow-[0_0_18px_rgba(255,255,255,0.12)]
    "
      >
        <Input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search images..."
          className="
        w-full
        rounded-full
        bg-white/5
        border-none
        pl-4
        pr-11
        py-2.5
        text-sm
        text-white
        placeholder:text-white/50
        focus-visible:ring-0
        focus-visible:ring-offset-0
      "
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />

        {/* search action */}
        <button
          onClick={handleSearch}
          className="
        absolute
        right-1
        top-1
        h-8
        w-8
        rounded-full
        flex
        items-center
        justify-center
        bg-brand-orange/90
        text-brand-white
        shadow-[0_0_12px_rgba(255,140,0,0.5)]
        hover:bg-brand-orange
        hover:shadow-[0_0_18px_rgba(255,140,0,0.75)]
        transition-all
      "
        >
          <Search className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
