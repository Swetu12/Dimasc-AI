import axios from "axios";
import Cookies from "js-cookie";

export const sendToChat = async (message: string, chatId: number | null) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/message`,
        {
            input: message,
            chatId: chatId,
        },
        {
            headers: {
                'Authorization': `Bearer ${Cookies.get("auth")}`,
                'Content-Type': 'application/json'
            }
        }
        )
    return response.data;
}

export const createChat = async (title: string) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/chat`,
        {
            title: title,
        },
        {
            headers: {
                'Authorization': `Bearer ${Cookies.get("auth")}`,
                'Content-Type': 'application/json'
            }
        }
        )
    return response.data;
}

export const getChats = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chat`,
        {
            headers: {
                'Authorization': `Bearer ${Cookies.get("auth")}`,
                'Content-Type': 'application/json'
            }
        }
        )
    return response.data;
}

export const getMessagesById = async (
    chatId: number | null,
    limit = 20,
    offset = 0
) => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/message/${chatId}?limit=${limit}&offset=${offset}`,
        {
            headers: {
                Authorization: `Bearer ${Cookies.get("auth")}`,
                'Content-Type': 'application/json',
            }
        }
    );
    return response.data;
};

export const deleteChat = async (chatId: number) => {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/chat/${chatId}`,
        {
            headers: {
                Authorization: `Bearer ${Cookies.get("auth")}`,
                'Content-Type': 'application/json',
            }
        }
        )
    return response.data;
}

export const editChatTitle = async (chatId: number, title: string) => {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/chat`,
        {
            id: chatId,
            title: title,
        },
        {
            headers: {
                'Authorization': `Bearer ${Cookies.get("auth")}`,
                'Content-Type': 'application/json'
            }
        }
        )
    return response.data;
}
