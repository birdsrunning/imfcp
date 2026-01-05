// components/dashboard-header.tsx
import { DashboardSearch } from "./dashboard-search";

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <DashboardSearch />
    </div>
  );
}
