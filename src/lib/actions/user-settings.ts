import Cookies from "js-cookie";

export const updateEmail = async (email: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/email/update`,
            {
                method: "PUT",
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${Cookies.get("um")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            },
        );
        const data = await res.text();

        if (!res.ok) {
            return { error: data || "An error occurred" };
        }

        if (data === "true") {
            return { success: true };
        } else if (data === "false") {
            return { error: "Error occurred" };
        } else {
            return { error: "Unexpected response from server." };
        }
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Something went wrong";
        return { error: errorMessage };
    }
};

export async function userEmailRegistration(email: string) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/email/registration`,
            {
                method: "PUT",
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${Cookies.get("auth")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            },
        );

        const data = await res.text();

        if (!res.ok) {
            return { error: data || "An error occurred" };
        }

        if (data === "true") {
            return { success: true };
        } else if (data === "false") {
            return { error: "Error occurred" };
        } else {
            return { error: "Unexpected response from server." };
        }
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Something went wrong";
        return { error: errorMessage };
    }
}

export async function userEmailValidation(code: any) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/email/verification?code=${code}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${Cookies.get("um")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code }),
            },
        );

        if (!res.ok) {
            const errorData = await res.text();
            return { error: errorData || "An error occurred" };
        }

        const data = await res.text();

        if (data === "true") {
            return { success: true };
        } else if (data === "false") {
            return { error: "Error occurred" };
        } else {
            return { error: "Unexpected response from server." };
        }
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Something went wrong";
        console.error("Caught error:", errorMessage);
        return { error: errorMessage };
    }
}

export async function userResetPassword(
    currentPassword: string,
    newPassword: string,
) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/password/update`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${Cookies.get("auth")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ currentPassword, newPassword }),
            },
        );

        const error = await res.text();

        if (!res.ok) {
            return { error: error || "An error occurred" };
        }

        return { success: true };
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Something went wrong";
        return { error: errorMessage };
    }
}
