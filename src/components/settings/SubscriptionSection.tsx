"use client";

import React from "react";
import { CreditCard, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@radix-ui/react-progress";
import { useSubscription } from "@/context/SubscriptionContext";
import { billingPortal } from "@/lib/actions/stripe";

export default function SubscriptionSection() {
    const { subscription } = useSubscription();
    const onSubmit = async () => {
        try {
            await billingPortal();
        } catch (error) {
            console.error("Error fetching emails:", error);
        }
    };

    return (
        <div className="rounded-2xl p-5 lg:p-6 bg-background">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex grow flex-col">
                    <h4 className="text-lg font-semibold text-gray-800 lg:mb-6 dark:text-white/90">
                        Billing & Subscription
                    </h4>

                    <Card className={`bg-background`}>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                Current Plan
                                <Badge variant="outline" className="bg-primary/10 text-primary">
                                    Active
                                </Badge>
                            </CardTitle>
                            <CardDescription>
                                Your subscription details and usage
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold">
                    <span className={`text-cyan-500`}>
                      {subscription?.plan}
                    </span>
                                    </h3>
                                    <p className="text-muted-foreground text-sm">
                                        Billed monthly
                                    </p>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Gem className="text-primary h-4 w-4" />
                                        <span className="font-medium">Credits</span>
                                    </div>
                                    <span className="text-sm font-medium">
                    {subscription?.creditGenerate} / 1,000
                  </span>
                                </div>
                                <Progress value={75} className="h-2" />
                                <p className="text-muted-foreground mt-2 text-xs">
                                    Credits reset at the end of your billing cycle
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col items-stretch gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full justify-start"
                                onClick={onSubmit}
                            >
                                <CreditCard className="mr-2 h-4 w-4" />
                                Manage My Billing
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
