// components/app-sidebar.tsx
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import CategoryFilter from "./layouts/category-filter";
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
        <SidebarGroup className="pt-4 border-t border-white/5">
          <LogoutButton />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
