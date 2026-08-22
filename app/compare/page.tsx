"use client";

import { RateComparisonTable } from "@/components/home/rate-comparison-table";
import { QuoteFinderWizard } from "@/components/home/quote-finder-wizard";
import { Sparkles, ShieldCheck, CheckCircle2, TrendingDown, Building2 } from "lucide-react";

export default function ComparePage() {
    return (
        <div className="pb-20 bg-white dark:bg-[#f8fafc] text-slate-900 dark:text-white font-sans mx-auto min-h-screen relative overflow-hidden transition-colors duration-300">
            {/* Hero Header */}
            <section className="pt-16 pb-12 border-b border-slate-200 dark:border-slate-200 bg-[#f8fafc] dark:bg-[#f8fafc] relative z-10">
                <div className="container px-4 md:px-6 mx-auto text-center space-y-4 max-w-3xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-50 dark:bg-sky-500/15 px-3.5 py-1 text-xs font-black text-sky-800 dark:text-[#0284c7] uppercase tracking-wider">
                        <Sparkles className="h-3.5 w-3.5 text-[#0284c7]" />
                        Multi-Bank Comparison Engine (2026)
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                        Compare Online Loans in India
                    </h1>
                    <p className="text-slate-600 dark:text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                        Compare live interest rates, processing fees, and EMI structures across top nationalized, government, and private banks in one place.
                    </p>
                </div>
            </section>

            {/* Instant Multi-Bank Quote Finder Wizard */}
            <section className="py-12 container px-4 mx-auto relative z-10">
                <QuoteFinderWizard />
            </section>

            {/* Rate Comparison Table */}
            <section className="relative z-10">
                <RateComparisonTable />
            </section>

            {/* Trust Badges */}
            <section className="container px-4 mx-auto py-12 border-t border-slate-200 dark:border-slate-200 text-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-xs font-bold text-slate-700 dark:text-slate-600 uppercase tracking-wider">
                    <div className="p-5 bg-[#f8fafc] dark:bg-white rounded-2xl border border-slate-200 dark:border-slate-200 flex flex-col items-center shadow-xs">
                        <ShieldCheck className="h-6 w-6 text-[#0284c7] mb-2" />
                        <span>100% Free & Transparent</span>
                    </div>
                    <div className="p-5 bg-[#f8fafc] dark:bg-white rounded-2xl border border-slate-200 dark:border-slate-200 flex flex-col items-center shadow-xs">
                        <Building2 className="h-6 w-6 text-slate-900 dark:text-white mb-2" />
                        <span>40+ Partner Lenders</span>
                    </div>
                    <div className="p-5 bg-[#f8fafc] dark:bg-white rounded-2xl border border-slate-200 dark:border-slate-200 flex flex-col items-center shadow-xs">
                        <CheckCircle2 className="h-6 w-6 text-amber-500 mb-2" />
                        <span>Zero Hidden Charges</span>
                    </div>
                    <div className="p-5 bg-[#f8fafc] dark:bg-white rounded-2xl border border-slate-200 dark:border-slate-200 flex flex-col items-center shadow-xs">
                        <TrendingDown className="h-6 w-6 text-[#0284c7] mb-2" />
                        <span>Real-time Rate Updates</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
