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
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 whitespace-nowrap" onMouseLeave={handleMouseLeave}>
            <Link
                href="/"
                className="text-sm font-extrabold text-slate-800 hover:text-[#00c985] py-2 transition-colors whitespace-nowrap"
            >
                Home
            </Link>
            {Object.entries(megaMenuData).map(([key, section]) => (
                <div
                    key={key}
                    className="relative group h-16 flex items-center"
                    onMouseEnter={() => handleMouseEnter(key as keyof typeof megaMenuData)}
                >
                    <button
                        className={cn(
                            "flex items-center gap-1 text-sm font-extrabold transition-colors py-2 whitespace-nowrap",
                            activeMenu === key ? "text-[#00c985]" : "text-slate-800 hover:text-[#00c985]"
                        )}
                    >
                        {section.title}
                        <ChevronDown className={cn("h-4 w-4 transition-transform duration-200 shrink-0", activeMenu === key ? "rotate-180 text-[#00c985]" : "text-slate-500 group-hover:text-[#00c985]")} />
                    </button>

                    {/* Mega Menu Dropdown */}
                    <div
                        className={cn(
                            "absolute top-full left-0 w-[600px] bg-[#24272c] text-white rounded-2xl shadow-2xl border border-slate-800 p-4 grid grid-cols-2 gap-3 transition-all duration-200 origin-top-left z-50",
                            activeMenu === key ? "opacity-100 scale-100 translate-y-0 visible" : "opacity-0 scale-95 -translate-y-2 invisible"
                        )}
                        onMouseEnter={() => handleMouseEnter(key as keyof typeof megaMenuData)}
                    >
                        {section.items.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-slate-800/80 transition-all border border-transparent hover:border-slate-700"
                            >
                                <div className="p-2 bg-[#00c985]/15 border border-[#00c985]/30 rounded-xl text-[#00c985] group-hover/item:bg-[#00c985] group-hover/item:text-slate-950 transition-colors shrink-0">
                                    <item.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="font-extrabold text-white text-sm flex items-center gap-2">
                                        {item.title}
                                        {item.rate && (
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00c985]/20 text-[#00e699] font-black border border-[#00c985]/40 whitespace-nowrap">
                                                {item.rate}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1 font-medium">
                                        {item.desc}
                                    </p>
                                    <div className="mt-2 flex gap-3 text-[10px] font-black text-[#00e699] opacity-0 group-hover/item:opacity-100 transition-opacity">
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
