"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>("light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem("shree_theme") as Theme | null;
        if (storedTheme === "dark" || storedTheme === "light") {
            setThemeState(storedTheme);
            applyTheme(storedTheme);
        } else {
            // Default to light
            setThemeState("light");
            applyTheme("light");
        }
        setMounted(true);
    }, []);

    const applyTheme = (t: Theme) => {
        const root = document.documentElement;
        if (t === "dark") {
            root.classList.add("dark");
            root.classList.remove("light");
        } else {
            root.classList.remove("dark");
            root.classList.add("light");
        }
    };

    const setTheme = (t: Theme) => {
        setThemeState(t);
        localStorage.setItem("shree_theme", t);
        applyTheme(t);
    };

    const toggleTheme = () => {
        const nextTheme = theme === "light" ? "dark" : "light";
        setTheme(nextTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        return {
            theme: "light" as Theme,
            toggleTheme: () => {},
            setTheme: () => {},
        };
    }
    return context;
}
