import {ChatStoreTypes} from "@/types/chat";
import {create} from "zustand/react";

export const useChatStore = create<ChatStoreTypes>((set) => ({
    chatResponse: [],
    currentChatId: null,
    sidebarOpen: true,
    isSendingMessage: false,
    isSearchBarOpen: false,

    setChatResponse: (data) => set((state) => ({
        chatResponse: [...state.chatResponse, data]
    })),
    setCurrentChatId: (id) => set({ currentChatId: id}),
    clearCurrentChatId: () => set({ currentChatId: null }),
    setSidebarOpen: (open) => set({ sidebarOpen: open }),
    setIsSendingMessage: (isSending) => set({ isSendingMessage: isSending }),
    setIsSearchBarOpen: (isOpen) => set({ isSearchBarOpen: isOpen }),
}))
