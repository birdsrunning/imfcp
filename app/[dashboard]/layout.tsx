import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import AppNavbar from "@/components/AppNavbar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/auth");
  }
  return (
    <SidebarProvider>
      <AppSidebar />

      <div className="relative min-h-screen w-full bg-brand-black">
        <AppNavbar />
        <main className="relative pt-4">
          <SidebarTrigger className="absolute top-2 left-1 z-20" />
          {children}
        </main>
        <Toaster />
      </div>
    </SidebarProvider>
  );
}
