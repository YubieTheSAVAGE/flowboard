import { Toaster } from "@/components/ui/sonner"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getUser } from "@/lib/dal/dal";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { LayoutBreadcrumb } from "@/components/ui/layout-breadcrumb";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  if (!user) {
    redirect("/signin");
  }
  return (
    <SidebarProvider>
      <AppSidebar user={{ name: user.name || "", email: user.email || "", role: user.role || "MEMBER" }} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <LayoutBreadcrumb />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  )
}
