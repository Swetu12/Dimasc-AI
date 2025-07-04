'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {Loader, Send} from 'lucide-react';
import {useChatStore} from "@/stores/chat-store";
import {useCreateChatMutation, useSendToChatMutation} from "@/lib/mutations/Mutations";
import {toast, Toaster} from "sonner";
import {useGetMessagesByIdQuery} from "@/lib/queries/Queries";
import {useQueryClient} from "@tanstack/react-query";

export const ChatInput = () => {
  const [input, setInput] = useState('');
  const mutation = useSendToChatMutation()
  const createChatMutation = useCreateChatMutation()
  const { currentChatId } = useChatStore()
  const {isLoading: isMessageLoading} = useGetMessagesByIdQuery(currentChatId)
  const isSubmitting = isMessageLoading || mutation.isPending
  const queryClient = useQueryClient()
    const { setCurrentChatId } = useChatStore()

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (input === "") {
            toast.error("Input cannot be empty", { duration: 2000 });
        } else if (currentChatId != null && input !== "") {
            mutation.mutate({ input: input, chatId: currentChatId})
            setInput("")
        } else if (currentChatId == null && input !== "") {
            createChatMutation.mutate(input, {
                onSuccess: (data: { id: number }) => {
                    if (data?.id) {
                        queryClient.invalidateQueries({queryKey: ['chats']});
                        setCurrentChatId(data.id)
                        queryClient.invalidateQueries({ queryKey: ['messages', data.id] });
                        mutation.mutate({ input: input, chatId: data.id})
                        setInput("")
                    } else {
                        toast.error("Failed to create chat", { duration: 2000 });
                    }
                },
                onError: (error: Error) => {
                    console.error("Error creating chat:", error);
                    toast.error("Error creating chat", { duration: 2000 });
                }
            });
        }
    }

  const handleKeyDown = (e: React.KeyboardEvent) => {
   if (e.key === 'Enter' && !e.shiftKey && input !== '') {
      e.preventDefault();
      setInput("")
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-border bg-background p-4">
      <Toaster position={`top-center`} richColors />
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSubmitting}
            placeholder="Message Dimasc AI..."
            className="flex-1 min-h-[44px] max-h-32 resize-none bg-accent/20 border-accent"
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="background-blue min-h-[58px] hover:cursor-pointer text-white"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader className="w-4 h-4 animate-spin" />
              </span>
            ) : (
            <Send className="w-4 h-4" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};
