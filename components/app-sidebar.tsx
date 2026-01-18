// components/app-sidebar.tsx
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import CategoryFilter from "./layouts/category-filter";
import OrientationFilter from "./layouts/orientation-filter";
import SidebarHeader from "./SidebarHeader";
import PlanBoardHome from "./layouts/planBoardHome";
import LogoutButton from "./logout-button";

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent
        className="
    px-2 py-2 space-y-2
    overflow-y-auto
    scrollbar-thin
    scrollbar-thumb-white/5
    scrollbar-track-transparent
  "
      >
        <SidebarGroup className="space-y-4">
          <div className="text-brand-white font-medium flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <img
                src="/images/logo/logoOrange.svg"
                alt="Logo"
                className="h-10 w-auto"
              />
              <p>IMFC</p>
            </div>
          </div>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarHeader />
        </SidebarGroup>
        <SidebarGroup className="space-y-4">
          <PlanBoardHome />
        </SidebarGroup>
        <SidebarGroup className="space-y-4">
          <SidebarGroupLabel className="text-xs uppercase tracking-wide text-white/40">
            Categories
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <CategoryFilter />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="space-y-4">
          <SidebarGroupLabel className="text-xs uppercase tracking-wide text-white/40">
            Orientation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <OrientationFilter />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="pt-4 border-t border-white/5">
          <LogoutButton />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
