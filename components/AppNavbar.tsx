// components/app-navbar.tsx
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardSearch } from "./dashboard-search";

export default function AppNavbar() {
  return (
    <header
      className="
      sticky
      top-0
      left-0
      right-0
      z-40
      h-14
      bg-brand-black/80
      backdrop-blur
      border-b
      border-white/10
      flex
      items-center
    px-6
      justify-between
    "
    >
      <DashboardSearch />

      <div className="">
        {/* avatar and notification bell */}
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          {/* notification bell */}
          <div>
            <Bell />
          </div>
        </div>
      </div>
    </header>
  );
}
