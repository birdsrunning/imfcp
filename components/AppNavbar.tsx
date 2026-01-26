// components/app-navbar.tsx
import { Bell, Settings } from "lucide-react";
import { DashboardSearch } from "./dashboard-search";

export default function AppNavbar() {
  return (
    <header
      className="
        sticky top-0 z-40
        w-full
        px-6 py-4
        flex items-center justify-between gap-6
        bg-brand-black/80
        backdrop-blur-xl
        border-b border-white/10
      "
    >
      {/* left: logo (mobile) */}
      <div className="flex items-center gap-3">
        <img
          src="/images/logo/logoOrange.svg"
          alt="Logo"
          className="h-9 w-auto"
        />
        <span className="text-sm font-semibold tracking-wide text-white">
          IMFC
        </span>
      </div>

      {/* center: search */}
      <DashboardSearch />

      {/* right: actions */}
      <div className="flex items-center gap-3">
        {/* notification bell */}
        <div
          className="
            relative
            rounded-full
            p-[1px]
            bg-white/20
            backdrop-blur-md
            border border-white/30
            shadow-[0_0_12px_rgba(255,255,255,0.15)]
            hover:shadow-[0_0_18px_rgba(255,255,255,0.25)]
            transition
          "
        >
          <button
            className="
              flex h-9 w-9 items-center justify-center
              rounded-full
              bg-white/5
              hover:bg-white/10
              transition
            "
          >
            <Bell className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* settings */}
        <div
          className="
            flex h-9 w-9 items-center justify-center
            rounded-full
            bg-white/5
            border border-white/10
            backdrop-blur-md
            hover:bg-white/10
            hover:border-white/20
            transition
          "
        >
          <Settings className="h-5 w-5 text-white/80" />
        </div>
      </div>
    </header>
  );
}
