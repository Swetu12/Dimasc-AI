"use client"

import {
    MessageCircle,
    MoreHorizontal,
    Pencil,
    Trash2,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { useGetAllChatsQuery } from "@/lib/queries/Queries"
import { useChatStore } from "@/stores/chat-store"
import React, { useState, useEffect } from "react"
import { useDeleteChatMutation, useEditChatTitleMutation } from "@/lib/mutations/Mutations"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {usePathname, useRouter} from "next/navigation";

export function NavRecents() {
    const { isMobile } = useSidebar()
    const { data: chats, isLoading, error } = useGetAllChatsQuery()
    const { setCurrentChatId } = useChatStore()
    const { mutate: deleteChatById } = useDeleteChatMutation()
    const { mutate: editChatTitleById } = useEditChatTitleMutation()
    const pathname = usePathname()
    const router = useRouter()

    const [editingChat, setEditingChat] = useState<{ id: number; title: string } | null>(null)
    const [visibleCount, setVisibleCount] = useState(10)
    const showMore = () => setVisibleCount((prev) => prev + 10)

    const visibleChats = chats?.slice(0, visibleCount)
    const hasMoreChats = chats && visibleCount < chats.length

    const handleEdit = (chatId: number, title: string) => {
        editChatTitleById({ chatId, title })
    }

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Recents</SidebarGroupLabel>
            <SidebarMenu>
                {isLoading ? (
                    <SidebarMenuItem>
                        <SidebarMenuButton className="text-sidebar-foreground/70">
                            Loading...
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ) : error ? (
                    <SidebarMenuItem>
                        <SidebarMenuButton className="text-sidebar-foreground/70">
                            Error loading recents
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ) : (
                    <>
                        {visibleChats?.map((chat: any) => (
                            <SidebarMenuItem key={chat.id}>
                                <SidebarMenuButton
                                    asChild
                                    className="hover:cursor-pointer"
                                    onClick={() => {
                                        if ( pathname !== "/") {
                                            router.push("/")
                                            setCurrentChatId(chat.id)
                                        } else {
                                            setCurrentChatId(chat.id)
                                        }
                                    }}
                                >
                                    <span><MessageCircle />{chat.title}</span>
                                </SidebarMenuButton>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild className="hover:cursor-pointer">
                                        <SidebarMenuAction showOnHover>
                                            <MoreHorizontal />
                                            <span className="sr-only">More</span>
                                        </SidebarMenuAction>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="w-56 rounded-lg"
                                        side={isMobile ? "bottom" : "right"}
                                        align={isMobile ? "end" : "start"}
                                    >
                                        <DropdownMenuItem onClick={() => setEditingChat({ id: chat.id, title: chat.title })} className={`hover:cursor-pointer`}>
                                            <Pencil className="text-muted-foreground" />
                                            <span>Edit</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            variant="destructive"
                                            onClick={() => deleteChatById(chat.id)}
                                            className={`hover:cursor-pointer`}
                                        >
                                            <Trash2 className="text-muted-foreground" />
                                            <span>Delete</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem>
                        ))}
                        {hasMoreChats && (
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    className="text-sidebar-foreground/70 hover:cursor-pointer"
                                    onClick={showMore}
                                >
                                    <MoreHorizontal />
                                    <span>More</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )}
                    </>
                )}
            </SidebarMenu>

            {editingChat && (
                <ChatOptionMenuModal
                    currentTitle={editingChat.title}
                    isOptionMenuOpen={!!editingChat}
                    setIsOptionMenuOpen={(isOpen: boolean) => {
                        if (!isOpen) setEditingChat(null)
                    }}
                    onSave={(newTitle: string) => {
                        handleEdit(editingChat.id, newTitle)
                        setEditingChat(null)
                    }}
                />
            )}
        </SidebarGroup>
    )
}

type ChatOptionMenuModalProps = {
    currentTitle: string
    onSave: (newTitle: string) => void
    isOptionMenuOpen: boolean
    setIsOptionMenuOpen: (open: boolean) => void
}

const ChatOptionMenuModal = ({
                                 currentTitle,
                                 onSave,
                                 isOptionMenuOpen,
                                 setIsOptionMenuOpen,
                             }: ChatOptionMenuModalProps) => {
    const [newTitle, setNewTitle] = useState(currentTitle)

    useEffect(() => {
        setNewTitle(currentTitle)
    }, [currentTitle])

    const handleSave = () => {
        if (newTitle.trim()) {
            onSave(newTitle.trim())
        }
    }

    return (
        <Dialog open={isOptionMenuOpen} onOpenChange={setIsOptionMenuOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Chat</DialogTitle>
                    <DialogDescription>
                        Change the title of this conversation or delete it permanently.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">
                            Chat Title
                        </label>
                        <Input
                            id="title"
                            value={newTitle}
                            className={`mt-1`}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="Enter new chat title"
                        />
                    </div>
                </div>
                <DialogFooter className="flex justify-between">
                    <div className="flex gap-2">
                        <DialogClose asChild className={`hover:cursor-pointer`}>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild className={`hover:cursor-pointer`}>
                            <Button onClick={handleSave}>Save</Button>
                        </DialogClose>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
