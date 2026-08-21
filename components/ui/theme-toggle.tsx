"use client";

import { useTheme } from "@/components/theme-provider";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

interface ThemeToggleProps {
    className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <button
            onClick={toggleTheme}
            type="button"
            className={`relative flex items-center justify-center h-10 w-10 rounded-full border transition-all duration-300 shadow-sm cursor-pointer ${
                isDark
                    ? "bg-slate-900 border-slate-700 text-amber-300 hover:bg-slate-800 hover:border-amber-400/50"
                    : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"
            } ${className}`}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
        >
            <motion.div
                key={theme}
                initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
            >
                {isDark ? (
                    <Sun className="h-4 w-4 fill-amber-300" />
                ) : (
                    <Moon className="h-4 w-4 fill-slate-700" />
                )}
            </motion.div>
        </button>
    );
}
