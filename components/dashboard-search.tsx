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
        md:max-w-lg
       
      "
    >
      <Input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search images..."
        className="
          flex-1
          bg-[#2e2a2b]
          border border-[#3a3536]
          rounded-lg
          px-3
          py-2.5
          text-sm
          w-full
        "
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />

      <Search
        onClick={handleSearch}
        className="h-7 w-7 absolute right-1 top-1 bg-brand-orange rounded-full p-1 text-brand-white hover:bg-brand-orange/80 transition-all duration-300 cursor-pointer"
      />
    </div>
  );
}
