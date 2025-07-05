import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

interface ThemeCardProps {
    theme: "light" | "dark";
    isActive: boolean;
    onClick: () => void;
}

export function DarkThemeToggle({ theme, isActive, onClick }: ThemeCardProps) {
    return (
        <div
            className={cn(
                "relative flex cursor-pointer flex-col items-center rounded-xl border p-6 transition-all duration-200",
                "transform hover:scale-105",
                isActive ? "ring-primary shadow-lg ring-2" : "hover:shadow-md",
                theme === "light"
                    ? "border-gray-200 bg-white"
                    : "border-slate-800 bg-[#121212]",
            )}
            onClick={onClick}
        >
            <div
                className={cn(
                    "mb-4 flex h-12 w-12 items-center justify-center rounded-full",
                    theme === "light"
                        ? "bg-blue-50 text-blue-500"
                        : "bg-indigo-900/30 text-indigo-300",
                )}
            >
                {theme === "light" ? (
                    <Sun className="h-6 w-6" />
                ) : (
                    <Moon className="h-6 w-6" />
                )}
            </div>

            <h3
                className={cn(
                    "text-lg font-medium",
                    theme === "light" ? "text-gray-900" : "text-white",
                )}
            >
                {theme === "light" ? "Light Mode" : "Dark Mode"}
            </h3>

            <p
                className={cn(
                    "mt-2 text-sm",
                    theme === "light" ? "text-gray-500" : "text-gray-400",
                )}
            >
                {theme === "light"
                    ? "Bright and clean interface"
                    : "Easy on the eyes at night"}
            </p>

            {isActive && (
                <div className="bg-primary text-primary-foreground absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full text-xs">
                    ✓
                </div>
            )}
        </div>
    );
}
