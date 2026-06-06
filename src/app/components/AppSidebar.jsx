"use client";

import * as React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Plus,
  List,
  ShoppingCart,
  Settings,
  LogOut,
  User,
  Boxes,
  House,
  Newspaper,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

const data = {
  user: {
    name: "Mazhar",
    email: "admin@example.com",
  },

  navMain: [
    {
      title: "Home",
      url: "/",
      icon: House,
    },
    // {
    //   title: "Dashboard",
    //   url: "/admin/dashboard",
    //   icon: LayoutDashboard,
    // },
    {
      title: "News",
      icon: Newspaper,
      items: [
        {
          title: "Add News",
          url: "/admin/news/create",
          icon: Plus,
        },
        {
          title: "News List",
          url: "/admin/news",
          icon: List,
        },
      ],
    },
  ],
};

export function AppSidebar(props) {
  return (
    <Sidebar className="p-4 poppins" collapsible="offcanvas" {...props}>
      {/* Header */}
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href="/" className="flex items-center gap-2 mb-5">
              <Image
                src="/the_sylheti_black.png"
                alt="news portal"
                width={100}
                height={100}
                className="rounded-sm"
              />
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      {/* Main Menu */}
      <SidebarContent>
        <SidebarMenu>
          {data.navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              {item.url && (
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <item.icon size={18} />
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              )}

              {item.items && (
                <>
                  <SidebarMenuButton>
                    <item.icon size={18} />
                    {item.title}
                  </SidebarMenuButton>

                  <SidebarMenuSub>
                    {item.items.map((sub) => (
                      <SidebarMenuSubItem key={sub.title}>
                        <SidebarMenuSubButton asChild>
                          <Link href={sub.url}>
                            <sub.icon size={16} />
                            {sub.title}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* User Footer Dropdown */}
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 border-t p-3 cursor-pointer hover:bg-muted rounded-md">
              <User size={22} />
              <div className="flex flex-col text-sm">
                <span className="font-medium">{data.user.name}</span>
                <span className="text-xs text-muted-foreground">
                  {data.user.email}
                </span>
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>{data.user.name}</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href="/admin/settings">
                <Settings size={16} className="mr-2" />
                Settings
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/logout">
                <LogOut size={16} className="mr-2" />
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
