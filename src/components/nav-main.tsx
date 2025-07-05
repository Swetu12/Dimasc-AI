"use client"

import { type LucideIcon } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {usePathname, useRouter} from "next/navigation";

export function NavMain({
                          items,
                          onItemClick,
                        }: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    onClick?: string
  }[]
  onItemClick?: (action: string) => void
}) {
  const pathname = usePathname()
  const router = useRouter()
  const handleClick = (item: any, e: React.MouseEvent) => {
    if (item.onClick && onItemClick && pathname !== "/") {
      router.push("/")
      onItemClick(item.onClick)
    } else if (item.onClick && onItemClick) {
      e.preventDefault()
      onItemClick(item.onClick)
    }
  }

  return (
      <SidebarMenu>
        {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={item.isActive}>
                <a
                    href={item.url}
                    onClick={(e) => handleClick(item, e)}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
        ))}
      </SidebarMenu>
  )
}