import Cookies from "js-cookie";

export async function billingPortal() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/stripe/portal`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${Cookies.get("auth")}`,
                    "Content-Type": "application/json",
                },
            },
        );

        const data = await res.text();
        if (!res.ok) {
            throw new Error(
                typeof data === "string" ? data : "Payment initialization failed",
            );
        }

        window.open(data, "_blank");
        return data;
    } catch (err) {
        console.error("Stripe checkout error: ", err);
        throw err;
    }
}
