"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const DropDownThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <DropdownMenuItem
      className="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-muted-foreground" />
      ) : (
        <Moon className="h-4 w-4 text-muted-foreground" />
      )}
      <div className="flex-1">
        <p className="text-sm font-medium">
          {isDark ? "Change to Light Mode" : "Change to Dark Mode"}
        </p>
        <p className="text-xs text-muted-foreground">Switch theme mode</p>
      </div>
    </DropdownMenuItem>
  );
};

export default DropDownThemeToggle;
