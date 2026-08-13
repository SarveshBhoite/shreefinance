"use client";

import { useState } from "react";
import { EMICalculator } from "@/components/calculators/emi-calculator";
import { BalanceTransferCalculator } from "@/components/calculators/balance-transfer-calculator";
import { TaxBenefitCalculator } from "@/components/calculators/tax-benefit-calculator";
import { StampDutyCalculator } from "@/components/calculators/stamp-duty-calculator";
import { Calculator, TrendingDown, Percent, Building2 } from "lucide-react";
import { motion } from "framer-motion";

export default function CalculatorsPage() {
    const [activeTool, setActiveTool] = useState<"emi" | "hlbt" | "tax" | "stamp">("emi");

    return (
        <div className="pb-20 bg-[#181a1d] text-white font-sans mx-auto min-h-screen">
            {/* Hero Section */}
            <section className="pt-16 pb-16 bg-[#181a1d] text-white border-b border-slate-800">
                <div className="container px-4 md:px-6 mx-auto text-center space-y-4 max-w-3xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-black text-[#00e699] uppercase tracking-widest">
                        <Calculator className="h-3.5 w-3.5" />
                        Fintech Financial Tools Suite
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                        Loan & Property Calculators Hub
                    </h1>
                    <p className="text-slate-300 text-base md:text-lg font-medium">
                        Calculate exact monthly EMIs, balance transfer savings, stamp duty & registration fees, and tax deductions.
                    </p>

                    {/* Tool Selection Buttons */}
                    <div className="flex flex-wrap justify-center gap-3 pt-6">
                        <button
                            onClick={() => setActiveTool("emi")}
                            className={`px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                                activeTool === "emi"
                                    ? "bg-[#00c985] text-slate-950 shadow-xl shadow-[#00c985]/30 scale-105"
                                    : "bg-[#24272c] text-slate-300 hover:text-white border border-slate-800"
                            }`}
                        >
                            <Calculator className="h-4 w-4" /> EMI Calculator
                        </button>
                        <button
                            onClick={() => setActiveTool("hlbt")}
                            className={`px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                                activeTool === "hlbt"
                                    ? "bg-[#00c985] text-slate-950 shadow-xl shadow-[#00c985]/30 scale-105"
                                    : "bg-[#24272c] text-slate-300 hover:text-white border border-slate-800"
                            }`}
                        >
                            <TrendingDown className="h-4 w-4" /> Balance Transfer (HLBT)
                        </button>
                        <button
                            onClick={() => setActiveTool("stamp")}
                            className={`px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                                activeTool === "stamp"
                                    ? "bg-[#00c985] text-slate-950 shadow-xl shadow-[#00c985]/30 scale-105"
                                    : "bg-[#24272c] text-slate-300 hover:text-white border border-slate-800"
                            }`}
                        >
                            <Building2 className="h-4 w-4" /> Stamp Duty Calculator
                        </button>
                        <button
                            onClick={() => setActiveTool("tax")}
                            className={`px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                                activeTool === "tax"
                                    ? "bg-amber-400 text-slate-950 shadow-xl shadow-amber-400/30 scale-105"
                                    : "bg-[#24272c] text-slate-300 hover:text-white border border-slate-800"
                            }`}
                        >
                            <Percent className="h-4 w-4" /> Income Tax Savings
                        </button>
                    </div>
                </div>
            </section>

            {/* Active Calculator Component */}
            <section className="py-16 container px-4 mx-auto max-w-5xl">
                {activeTool === "emi" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#24272c] p-8 rounded-[2.5rem] border border-slate-800 shadow-xl text-white">
                        <h2 className="text-2xl font-black text-white mb-6">Standard Loan EMI Calculator</h2>
                        <EMICalculator defaultAmount={2500000} defaultRate={10.25} defaultTenure={5} />
                    </motion.div>
                )}

                {activeTool === "hlbt" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <BalanceTransferCalculator />
                    </motion.div>
                )}

                {activeTool === "stamp" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <StampDutyCalculator />
                    </motion.div>
                )}

                {activeTool === "tax" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <TaxBenefitCalculator />
                    </motion.div>
                )}
            </section>
        </div>
    );
}
