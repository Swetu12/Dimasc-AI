import React from "react";
import { ThemeSelector } from "@/components/settings/ThemeSelector";

export default function ThemeToggle() {
    return (
        <div className="rounded-2xl p-5 lg:p-6 bg-background">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex grow flex-col">
                    <div className="items-left flex flex-col justify-start px-4 transition-colors duration-300">
                        <div className="mb-10 text-left">
                            <h1 className="text-2xl font-bold">Theme Selector</h1>
                            <p className="text-muted-foreground">
                                Choose between light and dark mode for your application
                            </p>
                        </div>
                        <ThemeSelector />
                    </div>
                </div>
            </div>
        </div>
    );
}
