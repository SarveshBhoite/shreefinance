"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { megaMenuData } from "@/config/navigation";
import { ChevronDown } from "lucide-react";

export function MainNav() {
    const [activeMenu, setActiveMenu] = React.useState<keyof typeof megaMenuData | null>(null);

    const handleMouseEnter = (menu: keyof typeof megaMenuData) => {
        setActiveMenu(menu);
    };

    const handleMouseLeave = () => {
        setActiveMenu(null);
    };

    return (
        <nav className="hidden md:flex items-center gap-6" onMouseLeave={handleMouseLeave}>
            {Object.entries(megaMenuData).map(([key, section]) => (
                <div
                    key={key}
                    className="relative group h-16 flex items-center"
                    onMouseEnter={() => handleMouseEnter(key as keyof typeof megaMenuData)}
                >
                    <button
                        className={cn(
                            "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary py-2",
                            activeMenu === key ? "text-primary" : "text-muted-foreground"
                        )}
                    >
                        {section.title}
                        <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", activeMenu === key ? "rotate-180" : "")} />
                    </button>

                    {/* Mega Menu Dropdown */}
                    <div
                        className={cn(
                            "absolute top-full left-0 w-[600px] bg-white rounded-md shadow-xl border border-border p-4 grid grid-cols-2 gap-4 transition-all duration-200 origin-top-left z-50",
                            activeMenu === key ? "opacity-100 scale-100 translate-y-0 visible" : "opacity-0 scale-95 -translate-y-2 invisible"
                        )}
                        // Keep menu open when hovering the menu itself
                        onMouseEnter={() => handleMouseEnter(key as keyof typeof megaMenuData)}
                    >
                        {section.items.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                className="group/item flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                            >
                                <div className="p-2 bg-primary/10 rounded-md text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                                    <item.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="font-medium text-foreground text-sm flex items-center gap-2">
                                        {item.title}
                                        {item.rate && (
                                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 font-bold whitespace-nowrap">
                                                {item.rate}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                        {item.desc}
                                    </p>
                                    <div className="mt-2 flex gap-3 text-[10px] font-medium text-primary opacity-0 group-hover/item:opacity-100 transition-opacity">
                                        <span className="hover:underline">Check Eligibility</span>
                                        <span className="hover:underline">Calculate EMI</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </nav>
    );
}
