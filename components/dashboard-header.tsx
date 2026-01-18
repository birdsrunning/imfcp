// components/dashboard-header.tsx
import { DashboardSearch } from "./dashboard-search";

export function DashboardHeader() {
  return (
    <header
      className="
        flex
        items-center
        justify-between
        px-4
        
      "
    >
      <DashboardSearch />
    </header>
  );
}
