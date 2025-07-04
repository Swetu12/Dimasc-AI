
import React, {useEffect, useRef} from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {User, Loader} from 'lucide-react';
import { cn } from '@/lib/utils';
import {useChatStore} from "@/stores/chat-store";
import Image from "next/image";
import {useTheme} from "next-themes";
import {useGetMessagesByIdQuery} from "@/lib/queries/Queries";
import {ChatMessage} from "@/types/chat";

const MessageItem = ({ message, isSubmitting }: { message: ChatMessage & { isLoading?: boolean }, isSubmitting: boolean }) => {
    const isUser = message.sender === "USER";
    const { resolvedTheme } = useTheme();

    let displayContent = message.content;
    try {
        const parsed = JSON.parse(message.content);
        displayContent = parsed.response || message.content;
    } catch {
        displayContent = message.content;
    }

    return (
        <div className={cn("flex gap-4 p-6")}>
            <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarFallback className="text-xs font-medium">
                    {isUser ? (
                        <User className="w-4 h-4" />
                    ) : (
                        <Image
                            src={resolvedTheme === 'light' ? '/logo-black.svg' : '/logo.svg'}
                            alt="logo"
                            width={23}
                            height={23}
                        />
                    )}
                </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">
                        {isUser ? 'You' : 'Dimasc AI'}
                    </span>
                </div>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                    {message.isLoading || (isSubmitting && !isUser) ? (
                        <div className="flex items-center gap-2">
                            <Loader className="w-4 h-4 animate-spin" />
                            <span className="text-sm text-muted-foreground">Thinking...</span>
                        </div>
                    ) : (
                        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                            {displayContent || "Empty message"}
                        </pre>
                    )}
                </div>
                <div className="text-xs text-muted-foreground">
                    {new Date(message.createdAt).toLocaleDateString()}
                </div>
            </div>
        </div>
    );
};

export const MessageList = () => {
    const { currentChatId, isSendingMessage } = useChatStore()
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useGetMessagesByIdQuery(currentChatId)

    const messages = React.useMemo(() => {
        if (!data?.pages) return []
        return data.pages.flat()
    }, [data])

    const { resolvedTheme } = useTheme()
    const bottomRef = useRef<HTMLDivElement | null>(null)

    const displayMessages = React.useMemo(() => {
        if (!messages) return []

        if (isSendingMessage || isLoading) {
            return [
                ...messages,
                {
                    id: 'temp-loading',
                    content: '',
                    sender: 'ASSISTANT',
                    createdAt: new Date().toISOString(),
                    isLoading: true
                }
            ]
        }

        return messages
    }, [messages, isSendingMessage, isLoading])

    const handleScroll = React.useCallback((event: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop } = event.currentTarget

        if (scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [displayMessages])

    if (!displayMessages || displayMessages.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center">
                        <Image src={resolvedTheme === 'light' ? '/logo-black.svg' : '/logo.svg'} alt="logo" width={100} height={100} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Welcome to Dimasc AI</h2>
                        <p className="text-muted-foreground">
                            Start a new conversation or select an existing chat from the sidebar.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <ScrollArea className="flex-1" onScrollCapture={handleScroll}>
            <div className="max-w-4xl mx-auto">
                {isFetchingNextPage && (
                    <div className="flex justify-center p-4">
                        <Loader className="w-4 h-4 animate-spin" />
                    </div>
                )}
                <div className="divide-y divide-border">
                    {displayMessages.map((message: ChatMessage & { isLoading?: boolean }) => (
                        <MessageItem
                            key={message.id}
                            message={message}
                            isSubmitting={message.isLoading || false}
                        />
                    ))}
                    <div ref={bottomRef} />
                </div>
            </div>
        </ScrollArea>
    );
};