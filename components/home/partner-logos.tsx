"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { cn } from "@/lib/utils";

// Mock Bank Data - Refined for "Ocean Blue" Theme
const banks = [
    { name: "HDFC Bank", color: "bg-primary" },
    { name: "SBI", color: "bg-sky-700" },
    { name: "ICICI Bank", color: "bg-accent" },
    { name: "Axis Bank", color: "bg-sky-600" },
    { name: "Kotak", color: "bg-primary" },
    { name: "Bajaj Finserv", color: "bg-sky-800" },
    { name: "Bank of Baroda", color: "bg-accent" },
    { name: "PNB", color: "bg-sky-900" },
];

export function PartnerLogos() {
    const [emblaRef] = useEmblaCarousel(
        { loop: true, dragFree: true },
        [AutoScroll({ speed: 1.5, stopOnInteraction: false })]
    );

    return (
        <section className="py-12 bg-white dark:bg-black border-y border-primary/10 relative overflow-hidden font-sans">
            <div className="container px-4 md:px-6 mb-10 mx-auto">
                <p className="text-center text-xs font-bold tracking-[0.3em] text-slate-400 dark:text-slate-500 uppercase">
                    Trusted by India's Top 50+ Financial Institutions
                </p>
            </div>

            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex touch-pan-y">
                    {[...banks, ...banks, ...banks, ...banks].map((bank, index) => (
                        <div
                            key={`${bank.name}-${index}`}
                            className="flex-[0_0_220px] min-w-0 mx-6 flex items-center justify-center cursor-pointer group"
                        >
                            <div className="flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/80 dark:bg-sky-950/20 border border-slate-100 dark:border-sky-900/50 shadow-sm group-hover:shadow-2xl group-hover:shadow-primary/20 transition-all duration-500 group-hover:-translate-y-2 ring-1 ring-primary/5">
                                <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0 shadow-lg transform group-hover:rotate-6 transition-transform", bank.color)}>
                                    {bank.name.substring(0, 1)}
                                </div>
                                <span className="text-sm font-black text-slate-700 dark:text-slate-300 group-hover:text-primary dark:group-hover:text-white transition-colors whitespace-nowrap tracking-tight">
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
