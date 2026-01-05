"use client";

import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useRouter, useSearchParams } from "next/navigation";

const CATEGORIES = ["abstract", "fashion", "food", "travel"];

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selected = searchParams.getAll("category"); // array of selected categories

  function toggleCategory(category: string) {
    const params = new URLSearchParams(searchParams.toString());

    let next: string[] = [];

    if (selected.includes(category)) {
      // Remove the category
      next = selected.filter((c) => c !== category);
    } else {
      // Add the category
      next = [...selected, category];
    }

    // Reset page whenever filter changes
    params.delete("page");

    // Remove all existing category entries
    params.delete("category");

    // Append updated categories
    next.forEach((c) => params.append("category", c));

    router.push(`?${params.toString()}`);
  }

  return (
    <div className="space-y-3">
      {CATEGORIES.map((category) => (
        <div key={category} className="flex items-center gap-2">
          <Checkbox
            id={category}
            checked={selected.includes(category)}
            onCheckedChange={() => toggleCategory(category)}
          />
          <Label htmlFor={category} className="cursor-pointer capitalize">
            {category}
          </Label>
        </div>
      ))}
    </div>
  );
}
