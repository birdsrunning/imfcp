import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="">
        <NuqsAdapter>{children}</NuqsAdapter>

        {/* Sonner Toaster */}
      </div>
    </SidebarProvider>
  );
}
