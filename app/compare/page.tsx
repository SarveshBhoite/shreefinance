"use client";

import { RateComparisonTable } from "@/components/home/rate-comparison-table";
import { QuoteFinderWizard } from "@/components/home/quote-finder-wizard";
import { Sparkles, ShieldCheck, CheckCircle2, TrendingDown, Building2 } from "lucide-react";

export default function ComparePage() {
    return (
        <div className="pb-20 bg-[#181a1d] text-white font-sans mx-auto min-h-screen relative overflow-hidden">
            {/* Background Beams */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00c985]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-400/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Hero Header */}
            <section className="pt-16 pb-12 border-b border-slate-800 relative z-10">
                <div className="container px-4 md:px-6 mx-auto text-center space-y-4 max-w-3xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-black text-[#00e699] uppercase tracking-widest">
                        <Sparkles className="h-3.5 w-3.5" />
                        Multi-Bank Comparison Engine (2026)
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                        Compare Online Loans in India
                    </h1>
                    <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium">
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
            <section className="container px-4 mx-auto py-12 border-t border-slate-800 text-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-xs font-black text-slate-300 uppercase tracking-widest">
                    <div className="p-5 bg-[#24272c] rounded-2xl border border-slate-800 flex flex-col items-center">
                        <ShieldCheck className="h-6 w-6 text-[#00c985] mb-2" />
                        <span>100% Free & Transparent</span>
                    </div>
                    <div className="p-5 bg-[#24272c] rounded-2xl border border-slate-800 flex flex-col items-center">
                        <Building2 className="h-6 w-6 text-white mb-2" />
                        <span>40+ Partner Lenders</span>
                    </div>
                    <div className="p-5 bg-[#24272c] rounded-2xl border border-slate-800 flex flex-col items-center">
                        <CheckCircle2 className="h-6 w-6 text-amber-400 mb-2" />
                        <span>Zero Hidden Charges</span>
                    </div>
                    <div className="p-5 bg-[#24272c] rounded-2xl border border-slate-800 flex flex-col items-center">
                        <TrendingDown className="h-6 w-6 text-[#00e699] mb-2" />
                        <span>Real-time Rate Updates</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
