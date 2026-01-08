"use client"

import { type LucideIcon } from "lucide-react"
import Link from "next/link"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { toast } from "sonner";

export function NavMain({
  items,
  userRole,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    isAdminOnly?: boolean
  }[]
  userRole: string
}) {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton asChild tooltip={item.title} isActive={pathname === item.url} >
                {userRole === "MEMBER" && item.isAdminOnly ? (
                  <span className="cursor-not-allowed" onClick={() => { toast.error("You are not authorized to access this page"); }}>
                    <item.icon />
                    <span>{item.title}</span>
                  </span>
                ) : (
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
