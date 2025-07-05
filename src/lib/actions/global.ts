import Cookies from "js-cookie";

export async function UserData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Authorization": `Bearer ${Cookies.get("auth")}`,
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        throw new Error("Failed to fetch user data");
    }
    return res.json();
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
