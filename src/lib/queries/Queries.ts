import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {getChats, getMessagesById} from "@/lib/actions/Chat";

const PAGE_SIZE = 5;

export const useGetAllChatsQuery = () => {
    return useQuery({
        queryKey: ['chats'],
        queryFn: getChats,
    })
}

export const useGetMessagesByIdQuery = (chatId: number | null) => {
    return useInfiniteQuery({
        queryKey: ['messages', chatId],
        queryFn: async ({ pageParam = 0 }) => {
            return await getMessagesById(chatId, PAGE_SIZE, pageParam);
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < PAGE_SIZE) return undefined;
            return allPages.length * PAGE_SIZE;
        },
        initialPageParam: 0,
        enabled: !!chatId,
    });
};
