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
        <div className="pb-20 bg-white dark:bg-[#f8fafc] text-slate-900 dark:text-white font-sans mx-auto min-h-screen transition-colors duration-300">
            {/* Hero Section */}
            <section className="pt-16 pb-16 bg-[#f8fafc] dark:bg-[#f8fafc] text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-200">
                <div className="container px-4 md:px-6 mx-auto text-center space-y-4 max-w-3xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-50 dark:bg-sky-500/15 px-3.5 py-1 text-xs font-black text-sky-800 dark:text-[#0284c7] uppercase tracking-wider">
                        <Calculator className="h-3.5 w-3.5 text-[#0284c7]" />
                        Financial Tools Suite
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                        Loan & Property Calculators
                    </h1>
                    <p className="text-slate-600 dark:text-slate-600 text-sm md:text-base font-normal">
                        Calculate exact monthly EMIs, balance transfer savings, stamp duty & registration fees, and tax deductions.
                    </p>

                    {/* Tool Selection Buttons */}
                    <div className="flex flex-wrap justify-center gap-2.5 pt-6">
                        <button
                            onClick={() => setActiveTool("emi")}
                            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                                activeTool === "emi"
                                    ? "bg-[#0284c7] text-white shadow-xs"
                                    : "bg-white dark:bg-white text-slate-700 dark:text-slate-600 hover:text-slate-900 border border-slate-200 dark:border-slate-200"
                            }`}
                        >
                            <Calculator className="h-4 w-4" /> EMI Calculator
                        </button>
                        <button
                            onClick={() => setActiveTool("hlbt")}
                            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                                activeTool === "hlbt"
                                    ? "bg-[#0284c7] text-white shadow-xs"
                                    : "bg-white dark:bg-white text-slate-700 dark:text-slate-600 hover:text-slate-900 border border-slate-200 dark:border-slate-200"
                            }`}
                        >
                            <TrendingDown className="h-4 w-4" /> Balance Transfer (HLBT)
                        </button>
                        <button
                            onClick={() => setActiveTool("stamp")}
                            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                                activeTool === "stamp"
                                    ? "bg-[#0284c7] text-white shadow-xs"
                                    : "bg-white dark:bg-white text-slate-700 dark:text-slate-600 hover:text-slate-900 border border-slate-200 dark:border-slate-200"
                            }`}
                        >
                            <Building2 className="h-4 w-4" /> Stamp Duty Calculator
                        </button>
                        <button
                            onClick={() => setActiveTool("tax")}
                            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                                activeTool === "tax"
                                    ? "bg-[#0284c7] text-white shadow-xs"
                                    : "bg-white dark:bg-white text-slate-700 dark:text-slate-600 hover:text-slate-900 border border-slate-200 dark:border-slate-200"
                            }`}
                        >
                            <Percent className="h-4 w-4" /> Tax Benefit Calculator
                        </button>
                    </div>
                </div>
            </section>

            {/* Active Calculator Component */}
            <section className="py-12 container px-4 mx-auto max-w-5xl">
                {activeTool === "emi" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-200 shadow-sm text-slate-900 dark:text-white">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Standard Loan EMI Calculator</h2>
                        <EMICalculator defaultAmount={2500000} defaultRate={10.25} defaultTenure={5} />
                    </motion.div>
                )}

                {activeTool === "hlbt" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-200 shadow-sm text-slate-900 dark:text-white">
                        <BalanceTransferCalculator />
                    </motion.div>
                )}

                {activeTool === "stamp" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-200 shadow-sm text-slate-900 dark:text-white">
                        <StampDutyCalculator />
                    </motion.div>
                )}

                {activeTool === "tax" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-200 shadow-sm text-slate-900 dark:text-white">
                        <TaxBenefitCalculator />
                    </motion.div>
                )}
            </section>
        </div>
    );
}
