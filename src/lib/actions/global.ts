import Cookies from "js-cookie";
import axios from "axios";

export async function UserData() {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        withCredentials: true,
        headers: {
            "Authorization": `Bearer ${Cookies.get("auth")}`,
            "Content-Type": "application/json",
        }
    })
    return response.data;
}

export async function SubscriptionData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscription`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Authorization": `Bearer ${Cookies.get("auth")}`,
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        throw new Error("Failed to fetch subscription data");
    }
    return res.json();
}
