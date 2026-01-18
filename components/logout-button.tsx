"use client";

import { LogOut } from "lucide-react";
import { signOut } from "@/lib/actions/auth-actions";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="
        w-full justify-start gap-2
        text-brand-white/80
        text-brand-white
        hover:text-white
       hover:bg-brand-black/70
        pl-0
        flex items-center
      "
    >
      <LogOut className="h-4 w-4" />
      Log out
    </button>
  );
}
