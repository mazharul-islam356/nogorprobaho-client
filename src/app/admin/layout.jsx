"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/AppSidebar";
import { SiteHeader } from "../components/SiteHeader";

export default function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex w-full">
        <AppSidebar />

        <main className="flex-1 p-6">
          <SiteHeader />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
