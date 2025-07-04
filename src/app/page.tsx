'use client';

import { Sidebar } from '@/components/Sidebar';
import { MessageList } from '@/components/MessageList';
import { ChatInput } from '@/components/ChatInput';
import { cn } from '@/lib/utils';
import {useChatStore} from "@/stores/chat-store";

import {useGetAllChatsQuery} from "@/lib/queries/Queries";

const Page = () => {
  const { sidebarOpen, currentChatId } = useChatStore()
  const { data: chats, isLoading, error } = useGetAllChatsQuery()

  return (
      <div className={cn("min-h-screen bg-background text-foreground transition-colors overflow-x-hidden")}>
        <div className="flex h-screen">
          <Sidebar />

          <main className={cn(
              "flex-1 flex flex-col transition-all duration-300",
              sidebarOpen ? "ml-80" : "ml-0"
          )}>
            <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4">
              <div className="max-w-full mx-auto flex items-center justify-end md:justify-between">
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
