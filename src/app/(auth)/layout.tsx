'use client'

import {ThemeProvider, useTheme} from "next-themes";
import React from "react";
import {Moon, Sun} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <div className="relative z-1 bg-white p-6 sm:p-0 dark:bg-[#1a1a1a]">
      <ThemeProvider attribute={`class`}>{children}</ThemeProvider>
      <Button
          variant="ghost"
          className="absolute bottom-0 justify-start hover:cursor-pointer"
          onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
          suppressHydrationWarning
      >
        {resolvedTheme === 'light' ? <Moon /> : <Sun />}
        <span suppressHydrationWarning>
        {resolvedTheme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </span>
      </Button>
    </div>
  );
}
