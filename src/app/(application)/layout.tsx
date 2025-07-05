'use client'

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <div className="flex w-full min-h-screen bg-background text-foreground overflow-x-hidden">
                <AppSidebar />
                <main className="flex-1 flex flex-col transition-all duration-300">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}
