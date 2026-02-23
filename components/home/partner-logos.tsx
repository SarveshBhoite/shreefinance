"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { cn } from "@/lib/utils";

// Mock Bank Data
const banks = [
    { name: "HDFC Bank", color: "bg-[#004c8f]" },
    { name: "SBI", color: "bg-[#280071]" },
    { name: "ICICI Bank", color: "bg-[#f37e20]" },
    { name: "Axis Bank", color: "bg-[#97144d]" },
    { name: "Kotak", color: "bg-[#ed1c24]" },
    { name: "Bajaj Finserv", color: "bg-[#005a9c]" },
    { name: "Bank of Baroda", color: "bg-[#f26522]" },
    { name: "PNB", color: "bg-[#a20a3a]" },
];

export function PartnerLogos() {
    const [emblaRef] = useEmblaCarousel(
        { loop: true, dragFree: true },
        [AutoScroll({ speed: 1.5, stopOnInteraction: false })]
    );

    return (
        <section className="py-10 bg-slate-50/50 dark:bg-black/20 border-b border-white/5 backdrop-blur-sm">
            <div className="container px-4 md:px-6 mb-6">
                <p className="text-center text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                    Trusted by India's Top 50+ Banks & NBFCs
                </p>
            </div>

            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex touch-pan-y">
                    {[...banks, ...banks, ...banks, ...banks].map((bank, index) => (
                        <div
                            key={`${bank.name}-${index}`}
                            className="flex-[0_0_180px] min-w-0 mx-4 flex items-center justify-center cursor-pointer group"
                        >
                            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:-translate-y-1">
                                <div className={cn("h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-[10px] shrink-0", bank.color)}>
                                    {bank.name.substring(0, 1)}
                                </div>
                                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors whitespace-nowrap">
                                    {bank.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
