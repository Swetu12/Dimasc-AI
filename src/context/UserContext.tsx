"use client";

import React, { createContext, useContext } from "react";
import { UserData } from "@/lib/actions/global";
import { useQuery } from "@tanstack/react-query";

interface User {
  id: number;
  email: string;
  password: string | null;
  role: string;
  stripeId: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, isError } = useQuery<User>({
    queryKey: ["user"],
    queryFn: UserData,
  });

  if (isError) {
    console.error("Error fetching user data");
  }

  return (
    <UserContext.Provider value={{ user: data ?? null, loading: isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
