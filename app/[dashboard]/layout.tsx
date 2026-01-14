import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { Toaster } from "sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="relative min-h-screen w-full bg-brand-black">
        <SidebarTrigger
          className="
      fixed
      left-4
      top-4
      z-50
      bg-white/10
      backdrop-blur
      rounded-full
      p-2
      shadow-md
    "
        />
        {children}
      </div>
    </SidebarProvider>
  );
}
