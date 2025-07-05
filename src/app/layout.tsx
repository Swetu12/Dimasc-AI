'use client'

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const queryClient = new QueryClient();
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
                <SidebarProvider>
                    <div className="flex w-full min-h-screen bg-background text-foreground overflow-x-hidden">
                        <AppSidebar />
                        <main className="flex-1 flex flex-col transition-all duration-300">
                            {children}
                        </main>
                    </div>
                </SidebarProvider>
            </ThemeProvider>
        </QueryClientProvider>
        </body>
        </html>
    );
}
