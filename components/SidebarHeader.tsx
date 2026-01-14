import React from "react";
import NameGenerator from "./NameGenerator";

export default function SidebarHeader() {
  return (
    <div className="space-y-1">
      <p className="text-3xl font-bold leading-snug text-white">Welcome,</p>
      <p className="text-3xl font-bold leading-snug text-white/90">
        <NameGenerator />
      </p>
    </div>
  );
}
