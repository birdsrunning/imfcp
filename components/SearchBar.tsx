"use client";
import { useState } from "react";

export default function SearchBar() {
  const [value, setValue] = useState("");
  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.querySelector("input");
    console.log(input?.value);
  }
  return (
    <form onSubmit={handleSearch}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
        className="w-full rounded-lg border px-4 py-2"
      />
    </form>
  );
}
