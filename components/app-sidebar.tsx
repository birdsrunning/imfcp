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
import PlanBoard from "./PlanBoard";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>{/* this would be the name section */}</SidebarGroup>
        <SidebarGroup>
          <PlanBoard plan="free" />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <CategoryFilter />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Orientation</SidebarGroupLabel>
          <SidebarGroupContent>
            <OrientationFilter />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
