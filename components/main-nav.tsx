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
                className="text-sm font-extrabold text-slate-800 hover:text-[#0284c7] py-2 transition-colors whitespace-nowrap"
            >
                Home
            </Link>

            {/* Loans Mega Menu */}
            <div
                className="relative group h-16 flex items-center"
                onMouseEnter={() => handleMouseEnter("loans")}
            >
                <button
                    className={cn(
                        "flex items-center gap-1 text-sm font-extrabold transition-colors py-2 whitespace-nowrap",
                        activeMenu === "loans" ? "text-[#0284c7]" : "text-slate-800 hover:text-[#0284c7]"
                    )}
                >
                    {megaMenuData.loans.title}
                    <ChevronDown className={cn("h-4 w-4 transition-transform duration-200 shrink-0", activeMenu === "loans" ? "rotate-180 text-[#0284c7]" : "text-slate-500 group-hover:text-[#0284c7]")} />
                </button>

                {/* Mega Menu Dropdown */}
                <div
                    className={cn(
                        "absolute top-full left-0 w-[600px] bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 p-4 grid grid-cols-2 gap-3 transition-all duration-200 origin-top-left z-50",
                        activeMenu === "loans" ? "opacity-100 scale-100 translate-y-0 visible" : "opacity-0 scale-95 -translate-y-2 invisible"
                    )}
                    onMouseEnter={() => handleMouseEnter("loans")}
                >
                    {megaMenuData.loans.items.map((item) => (
                        <Link
                            key={item.title}
                            href={item.href}
                            className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200"
                        >
                            <div className="p-2 bg-sky-50 border border-sky-200 rounded-xl text-[#0284c7] group-hover/item:bg-[#0284c7] group-hover/item:text-white transition-colors shrink-0">
                                <item.icon className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                                    {item.title}
                                    {item.rate && (
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 font-black border border-sky-300 whitespace-nowrap">
                                            {item.rate}
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1 font-medium">
                                    {item.desc}
                                </p>
                                <div className="mt-2 flex gap-3 text-[10px] font-black text-[#0284c7] opacity-0 group-hover/item:opacity-100 transition-opacity">
                                    <span className="hover:underline">Check Eligibility</span>
                                    <span className="hover:underline">Calculate EMI</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Direct "Become a Partner" page link right after Loans */}
            <Link
                href="/become-a-partner"
                className="text-sm font-extrabold text-slate-800 hover:text-[#0284c7] py-2 transition-colors whitespace-nowrap flex items-center gap-1"
            >
                Become a Partner
            </Link>

            {/* Remaining categories */}
            {(["cards", "insurance", "investments", "tools"] as const).map((key) => {
                const section = megaMenuData[key];
                return (
                    <div
                        key={key}
                        className="relative group h-16 flex items-center"
                        onMouseEnter={() => handleMouseEnter(key)}
                    >
                        <button
                            className={cn(
                                "flex items-center gap-1 text-sm font-extrabold transition-colors py-2 whitespace-nowrap",
                                activeMenu === key ? "text-[#0284c7]" : "text-slate-800 hover:text-[#0284c7]"
                            )}
                        >
                            {section.title}
                            <ChevronDown className={cn("h-4 w-4 transition-transform duration-200 shrink-0", activeMenu === key ? "rotate-180 text-[#0284c7]" : "text-slate-500 group-hover:text-[#0284c7]")} />
                        </button>

                        {/* Mega Menu Dropdown */}
                        <div
                            className={cn(
                                "absolute top-full left-0 w-[600px] bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 p-4 grid grid-cols-2 gap-3 transition-all duration-200 origin-top-left z-50",
                                activeMenu === key ? "opacity-100 scale-100 translate-y-0 visible" : "opacity-0 scale-95 -translate-y-2 invisible"
                            )}
                            onMouseEnter={() => handleMouseEnter(key)}
                        >
                            {section.items.map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200"
                                >
                                    <div className="p-2 bg-sky-50 border border-sky-200 rounded-xl text-[#0284c7] group-hover/item:bg-[#0284c7] group-hover/item:text-white transition-colors shrink-0">
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                                            {item.title}
                                            {item.rate && (
                                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 font-black border border-sky-300 whitespace-nowrap">
                                                    {item.rate}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1 font-medium">
                                            {item.desc}
                                        </p>
                                        <div className="mt-2 flex gap-3 text-[10px] font-black text-[#0284c7] opacity-0 group-hover/item:opacity-100 transition-opacity">
                                            <span className="hover:underline">Check Eligibility</span>
                                            <span className="hover:underline">Calculate EMI</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                );
            })}

            {/* Direct Blogs Link */}
            <Link
                href="/blogs"
                className="text-sm font-extrabold text-slate-800 hover:text-[#0284c7] py-2 transition-colors whitespace-nowrap"
            >
                Blogs
            </Link>
        </nav>
    );
}
