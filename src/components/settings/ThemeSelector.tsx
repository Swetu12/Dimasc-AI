import { DarkThemeToggle } from "@/components/settings/DarkThemeToggle";
import { useTheme } from "next-themes";

export function ThemeSelector() {
    const { setTheme, resolvedTheme } = useTheme();

    return (
        <div className="w-full max-w-full">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <DarkThemeToggle
                    theme="light"
                    isActive={resolvedTheme === "light"}
                    onClick={() => setTheme("light")}
                />
                <DarkThemeToggle
                    theme="dark"
                    isActive={resolvedTheme === "dark"}
                    onClick={() => setTheme("dark")}
                />
            </div>
        </div>
    );
}
