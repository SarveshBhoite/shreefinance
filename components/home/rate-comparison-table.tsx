"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TrendingDown, ShieldCheck, Building2, Zap, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { LeadFormModal } from "@/components/dialogs/lead-form-modal";

const ratesData = [
    { bank: "Shree Finance Direct", logo: "SF", type: "Home Loan", rate: 8.35, fee: "Nil Processing Fee", tenure: "Up to 30 Yrs", special: "Lowest Rate Guarantee", isDirect: true },
    { bank: "State Bank of India (SBI)", logo: "SBI", type: "Home Loan", rate: 8.40, fee: "Nil for Women", tenure: "Up to 30 Yrs", special: "Public Sector Trust", isDirect: false },
    { bank: "YES Bank", logo: "YB", type: "Home Loan", rate: 8.40, fee: "₹4,999 Flat", tenure: "Up to 30 Yrs", special: "100% Digital Approval", isDirect: false },
    { bank: "HDFC Bank", logo: "HDFC", type: "Home Loan", rate: 8.50, fee: "0.50% + GST", tenure: "Up to 30 Yrs", special: "Instant Pre-approval", isDirect: false },
    { bank: "ICICI Bank", logo: "ICICI", type: "Home Loan", rate: 8.55, fee: "0.25% + GST", tenure: "Up to 30 Yrs", special: "Minimal Docs", isDirect: false },

    { bank: "Shree Finance Direct", logo: "SF", type: "Personal Loan", rate: 10.25, fee: "Nil", tenure: "1-6 Yrs", special: "Disbursal in 24 Hrs", isDirect: true },
    { bank: "YES Bank", logo: "YB", type: "Personal Loan", rate: 10.50, fee: "Up to 1.5%", tenure: "1-6 Yrs", special: "Instant Paperless", isDirect: false },
    { bank: "HDFC Bank", logo: "HDFC", type: "Personal Loan", rate: 10.50, fee: "Up to 2.50%", tenure: "1-6 Yrs", special: "Existing Customer Perk", isDirect: false },
    { bank: "ICICI Bank", logo: "ICICI", type: "Personal Loan", rate: 10.75, fee: "Up to 2.25%", tenure: "1-6 Yrs", special: "Pre-approved Limit", isDirect: false },
    { bank: "Axis Bank", logo: "AXIS", type: "Personal Loan", rate: 10.99, fee: "Up to 2.0%", tenure: "1-5 Yrs", special: "Flexible Tenures", isDirect: false },

    { bank: "Shree Finance Direct", logo: "SF", type: "Business Loan", rate: 13.99, fee: "0.50%", tenure: "1-7 Yrs", special: "Collateral-Free", isDirect: true },
    { bank: "YES Bank", logo: "YB", type: "Business Loan", rate: 14.50, fee: "1.00%", tenure: "1-5 Yrs", special: "MSME Special", isDirect: false },
];

export function RateComparisonTable() {
    const [filterType, setFilterType] = useState<"Home Loan" | "Personal Loan" | "Business Loan">("Home Loan");
    const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
    const [selectedBankName, setSelectedBankName] = useState("");

    const filteredData = ratesData.filter(item => item.type === filterType);
    const sortedData = [...filteredData].sort((a, b) => a.rate - b.rate);

    const handleApply = (bankName: string) => {
        setSelectedBankName(bankName);
        setIsLeadModalOpen(true);
    };

    return (
        <section className="py-16 md:py-20 bg-[#f8fafc] text-slate-900 relative overflow-hidden font-sans border-t border-slate-200">
            <div className="container px-4 md:px-6 relative z-10 mx-auto space-y-10">
                <div className="text-center space-y-3 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-50 px-3.5 py-1 text-xs font-black text-sky-800 uppercase tracking-wider">
                        <TrendingDown className="h-4 w-4 text-[#0284c7]" />
                        Live Multi-Bank Interest Matrix
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                        Compare Live Interest Rates
                    </h2>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                        Transparent comparison across top commercial banks & NBFCs with no hidden pre-closure penalties.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex justify-center">
                    <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                        {(["Home Loan", "Personal Loan", "Business Loan"] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setFilterType(tab)}
                                className={cn(
                                    "px-5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer",
                                    filterType === tab
                                        ? "bg-[#0284c7] text-white shadow-xs"
                                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Rates Table */}
                <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-white">
                    <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3 bg-[#f8fafc]">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                            <Building2 className="h-4 w-4 text-[#0284c7]" />
                            Showing Top Lending Partners for <span className="text-[#0284c7] font-black">{filterType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-[#0284c7] animate-pulse" />
                            <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">
                                Live Verified Rates (2026)
                            </span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-xs sm:text-sm text-left">
                            <thead className="text-[11px] text-slate-600 uppercase font-black tracking-wider bg-slate-100/80 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4">Bank Partner</th>
                                    <th className="px-6 py-4 text-[#0284c7]">Interest Rate</th>
                                    <th className="px-6 py-4">Processing Fee</th>
                                    <th className="px-6 py-4">Max Tenure</th>
                                    <th className="px-6 py-4">Key Advantage</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                <AnimatePresence mode="popLayout">
                                    {sortedData.map((item, idx) => (
                                        <motion.tr
                                            key={`${item.bank}-${item.type}-${idx}`}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className={cn(
                                                "hover:bg-[#f8fafc] transition-colors",
                                                item.isDirect ? "bg-sky-50/40" : ""
                                            )}
                                        >
                                            <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-3">
                                                <div className={cn(
                                                    "h-9 w-9 rounded-xl flex items-center justify-center font-black text-xs shadow-xs border",
                                                    item.isDirect
                                                        ? "bg-[#0284c7] text-white border-sky-600"
                                                        : "bg-slate-900 text-white border-slate-800"
                                                )}>
                                                    {item.logo}
                                                </div>
                                                <div>
                                                    <span className="text-sm font-bold block text-slate-900">{item.bank}</span>
                                                    {item.isDirect && (
                                                        <span className="text-[10px] font-black uppercase text-[#0284c7] tracking-wider">In-House Preferred Partner</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xl font-extrabold text-[#0284c7]">{item.rate.toFixed(2)}%</span>
                                                    {idx === 0 && (
                                                        <span className="text-[10px] bg-sky-100 text-sky-800 border border-sky-300 px-2 py-0.5 rounded-full font-bold uppercase">
                                                            ★ Lowest
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 font-medium">{item.fee}</td>
                                            <td className="px-6 py-4 text-slate-600 font-medium">{item.tenure}</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 border border-slate-200 text-slate-800">
                                                    <Award className="h-3.5 w-3.5 text-amber-500" />
                                                    {item.special}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleApply(item.bank)}
                                                    className="bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs uppercase tracking-wider rounded-xl px-4 h-9 cursor-pointer shadow-xs"
                                                >
                                                    Apply Now
                                                </Button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <LeadFormModal
                isOpen={isLeadModalOpen}
                onClose={() => setIsLeadModalOpen(false)}
                type="general"
            />
        </section>
    );
}
