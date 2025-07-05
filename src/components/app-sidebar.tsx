"use client"

import * as React from "react"
import { NavFavorites } from "@/components/nav-favorites"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image";
import {useTheme} from "next-themes";
import {useChatStore} from "@/stores/chat-store";
import {Button} from "@/components/ui/button";
import { data } from "@/data/navbar-data"
import {NavRecents} from "@/components/NavRecents";
import {usePathname, useRouter} from "next/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { resolvedTheme } = useTheme()
  const { clearCurrentChatId, setIsSearchBarOpen } = useChatStore()
  const pathname = usePathname()
  const router = useRouter()

  const handleNavClick = (action: string) => {
    if (action === "clearCurrentChatId") {
      clearCurrentChatId()
    }
    if (action === "setIsSearchBarOpen") {
      setIsSearchBarOpen(true)
    }
  }

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <div>
        <div className={`flex items-center justify-start flex-row space-x-3 ml-2 my-2`}>
          <Image src={`${resolvedTheme === 'light' ? '/logo-black.svg' : '/logo.svg'}`} alt={`logo`} width={25} height={25} />
          <h1 className="text-lg font-bold text-black dark:text-white">
            Dimasc AI
          </h1>
        </div>
          <Button variant={`ghost`} className={`w-full hover:cursor-pointer dark:bg-[#1a1a1a] bg-gray-100 border border-white/5 my-2`} onClick={() => {
            if (pathname !== "/") {
                router.push("/")
                clearCurrentChatId()
            } else {
              clearCurrentChatId()
            }
          }}>New Chat</Button>
        </div>
        <NavMain items={data.navMain} onItemClick={handleNavClick} />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites favorites={data.favorites} />
        <NavRecents />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
