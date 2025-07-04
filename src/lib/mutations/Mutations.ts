import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createChat, deleteChat, editChatTitle, sendToChat} from "@/lib/actions/Chat";
import {useChatStore} from "@/stores/chat-store";

type SendToChatObject = {
    input: string;
    chatId: number | null;
}

export const useCreateChatMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (title: string) => createChat(title), onSuccess: (data) => {
            console.log("Chat created successfully:", JSON.stringify(data))
            queryClient.invalidateQueries({queryKey: ['chats']});
        },
        onError: (error) => {
            console.error("Error creating chat:", error);
        }
    })
}

export const useSendToChatMutation = () => {
    const queryClient = useQueryClient()
    const {setIsSendingMessage} = useChatStore()

    return useMutation({
        mutationFn: ({input, chatId}: SendToChatObject) => sendToChat(input, chatId),
        onMutate: () => setIsSendingMessage(true),
        onSuccess: (data) => {
            console.log("Message sent successfully:", JSON.stringify(data))
            queryClient.invalidateQueries({ queryKey: ['messages', data.chatId] });
        },
        onSettled: () => setIsSendingMessage(false),
        onError: (error) => {
            console.error("Error sending message:", error);
        }
    })
}

export const useDeleteChatMutation = () => {
    const queryClient = useQueryClient();
    const { clearCurrentChatId } = useChatStore();

    return useMutation({
        mutationFn: (chatId: number) => deleteChat(chatId),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['chats'] });
            queryClient.invalidateQueries({ queryKey: ['messages'] });
            clearCurrentChatId()
        },
        onError: (error) => {
            console.error("Error deleting chat:", error);
        }
    })
}

export const useEditChatTitleMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({chatId, title}: { chatId: number, title: string }) => editChatTitle(chatId, title),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['chats'] });
        },
        onError: (error) => {
            console.error("Error updating chat title:", error);
        }
    })
}