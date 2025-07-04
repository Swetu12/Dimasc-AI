import Cookies from "js-cookie";

export async function logInUser(email: string, password: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.text();

    if (!res.ok) {
      return { error: data || "Login failed." };
    }

    if (data === "true") {
      return { success: true };
    } else if (data === "false") {
      return { error: "Invalid login credentials." };
    } else {
      return { error: "Unexpected response from server." };
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    return { error: errorMessage };
  }
}

export async function resetPassword(email: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/password/forgot`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
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

export async function registerEmail(email: string) {
  console.log("registerEmail function triggered");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/email/registration`,
      {
        method: "POST",
        credentials: "include",
        headers: {
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

export async function emailValidation(code: number) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/email/verification?code=${code}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("reg")}`,
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

export async function checkCredentials(password: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/credentials`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("reg")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
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
