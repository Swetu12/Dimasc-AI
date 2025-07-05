"use client";

import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext } from "react";
import { SubscriptionData } from "@/lib/actions/global";

interface Subscription {
    id: number;
    userId: number;
    plan: string;
    creditGenerate: number;
    creditAnalyze: number;
}

interface SubscriptionContextType {
    subscription: Subscription | null;
    loading: boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType>({
    subscription: null,
    loading: true,
});

export const useSubscription = () => useContext(SubscriptionContext);

export const SubscriptionProvider = ({
                                         children,
                                     }: {
    children: React.ReactNode;
}) => {
    const { data, isLoading, isError } = useQuery<Subscription>({
        queryKey: ["subscription"],
        queryFn: SubscriptionData,
    });

    if (isError) {
        console.error("Error fetching subscription data");
    }

    return (
        <SubscriptionContext.Provider
            value={{ subscription: data ?? null, loading: isLoading }}
>
    {children}
    </SubscriptionContext.Provider>
);
};
