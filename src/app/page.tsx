'use client';

import { MessageList } from '@/components/MessageList';
import { ChatInput } from '@/components/ChatInput';
import { cn } from '@/lib/utils';
import {useChatStore} from "@/stores/chat-store";

import {useGetAllChatsQuery} from "@/lib/queries/Queries";
import {AppSidebar} from "@/components/app-sidebar";
import { SidebarTrigger} from "@/components/ui/sidebar";
import ActionSearchBar from "@/components/search-bar";
import {AnimatePresence, motion} from "framer-motion";

const Page = () => {
  const { sidebarOpen, currentChatId, isSearchBarOpen, setIsSearchBarOpen } = useChatStore()
  const { data: chats, isLoading, error } = useGetAllChatsQuery()

  return (
      <div className={cn("min-h-screen bg-background text-foreground transition-colors overflow-x-hidden")}>
        <div className="flex h-screen">
          <main className={cn(
              "flex-1 flex flex-col transition-all duration-300",
          )}>
            <AnimatePresence>
              {isSearchBarOpen && (
                  <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50"
                      onClick={() => setIsSearchBarOpen(false)}
                  >
                    <ActionSearchBar className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm`} isOpen={isSearchBarOpen} onClose={() => setIsSearchBarOpen(false)} />
                  </motion.div>
              )}
            </AnimatePresence>
            <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 flex flex-row space-x-2">
              <SidebarTrigger />
              <div className="max-w-full flex items-center justify-end md:justify-between">
                <h1 className={`text-lg font-semibold md:flex hidden ${!sidebarOpen ? "pl-16" : ""}`}>
                  {isLoading
                      ? 'Loading...'
                      : error
                          ? 'Error'
                          : chats && chats.length > 0
                              ? currentChatId
                                  ? chats.find((chat: { id: number; title: string }) => chat.id === currentChatId)?.title ?? 'Dimasc AI'
                                  : 'Dimasc AI'
                              : 'Dimasc AI'
                  }
                </h1>
              </div>
            </header>

            <MessageList />
            <ChatInput />
          </main>
        </div>
      </div>
  );
};

export default Page;
