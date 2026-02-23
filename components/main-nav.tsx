"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    CreditCard,
    Home,
    Car,
    Briefcase,
    GraduationCap,
    Landmark,
    Shield,
    TrendingUp,
    Smartphone,
    ChevronDown
} from "lucide-react";

// Data for the Mega Menu
const megaMenuData = {
    loans: {
        title: "Loans",
        items: [
            {
                title: "Personal Loan",
                href: "/loans/personal-loan",
                icon: Briefcase,
                rate: "10.50% p.a.",
                desc: "Quick funds for personal needs"
            },
            {
                title: "Home Loan",
                href: "/loans/home-loan",
                icon: Home,
                rate: "8.35% p.a.",
                desc: "Buy or construct your dream home"
            },
            {
                title: "Car Loan",
                href: "/loans/car-loan",
                icon: Car,
                rate: "8.85% p.a.",
                desc: "Drive home your new car today"
            },
            {
                title: "Education Loan",
                href: "/loans/education-loan",
                icon: GraduationCap,
                rate: "9.50% p.a.",
                desc: "Invest in your future"
            },
            {
                title: "Business Loan",
                href: "/loans/business-loan",
                icon: Landmark,
                rate: "15% p.a.",
                desc: "Expand your business horizons"
            },
            {
                title: "Government Schemes",
                href: "/loans/government-schemes",
                icon: Landmark,
                rate: "Subsidies & Grants",
                desc: "PMAY, Mudra & more"
            },
        ]
    },
    cards: {
        title: "Cards",
        items: [
            {
                title: "Credit Cards",
                href: "/cards/credit-cards",
                icon: CreditCard,
                rate: "Rewards & Cashback",
                desc: "Compare best credit cards"
            },
            {
                title: "Business Cards",
                href: "/cards/business-cards",
                icon: Briefcase,
                rate: "Premium Perks",
                desc: "For corporate expenses"
            },
        ]
    },
    insurance: {
        title: "Insurance",
        items: [
            {
                title: "Life Insurance",
                href: "/insurance/life",
                icon: Shield,
                rate: "Cover upto 1Cr",
                desc: "Secure your family's future"
            },
            {
                title: "Health Insurance",
                href: "/insurance/health",
                icon: Shield,
                rate: "Cashless Claims",
                desc: "Protect against medical bills"
            },
            {
                title: "Vehicle Insurance",
                href: "/insurance/vehicle",
                icon: Car,
                rate: "Instant Policy",
                desc: "Mandatory third-party cover"
            },
        ]
    },
    investments: {
        title: "Investments",
        items: [
            {
                title: "Mutual Funds",
                href: "/investments/mutual-funds",
                icon: TrendingUp,
                rate: "High Returns",
                desc: "SIP starting ₹500"
            },
            {
                title: "Stocks",
                href: "/investments/stocks",
                icon: TrendingUp,
                rate: "Zero Brokrage",
                desc: "Invest in top companies"
            },
        ]
    }
};

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
