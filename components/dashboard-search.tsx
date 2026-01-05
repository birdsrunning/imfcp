// components/dashboard-search.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function DashboardSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize from URL once
  const [searchValue, setSearchValue] = useState(
    () => searchParams.get("q") ?? ""
  );

  function updateParams(
    updates: Record<string, string | string[] | undefined>
  ) {
    const params = new URLSearchParams(searchParams.toString());

    // 🔹 Reset pagination on filter change
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
    <div className="flex items-center gap-4">
      <Input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search images..."
        className="bg-[#2e2a2b] border border-[#3a3536] rounded-md px-3 py-4 min-w-96"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />

      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
}
