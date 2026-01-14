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

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="px-2 py-6 space-y-2">
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
      </SidebarContent>
    </Sidebar>
  );
}
