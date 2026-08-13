"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Zap, CheckCircle2, TrendingDown, ShieldCheck, Sparkles, Building2, ChevronRight, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { LeadFormModal } from "@/components/dialogs/lead-form-modal";

// Top Partner Banks Rate Comparison Data
const ratesData = [
    { bank: "Shree Finance Direct", logo: "SF", type: "Home Loan", rate: 8.35, fee: "Nil Processing Fee", tenure: "Up to 30 Yrs", special: "Lowest Rate Guarantee", isDirect: true },
    { bank: "YES Bank", logo: "YB", type: "Home Loan", rate: 8.40, fee: "₹4,999 Flat", tenure: "Up to 30 Yrs", special: "100% Digital Approval", isDirect: false },
    { bank: "State Bank of India (SBI)", logo: "SBI", type: "Home Loan", rate: 8.40, fee: "Nil for Women", tenure: "Up to 30 Yrs", special: "Public Sector Trust", isDirect: false },
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
        <section className="py-20 md:py-24 bg-[#181a1d] text-white relative overflow-hidden font-sans border-t border-slate-800">
            {/* Background Light Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00c985]/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container px-4 md:px-6 relative z-10 mx-auto space-y-12">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-black text-[#00e699] uppercase tracking-widest"
                    >
                        <TrendingDown className="h-4 w-4" />
                        Live Multi-Bank Interest Matrix
                    </motion.div>
                    <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
                        Compare Live Interest Rates
                    </h2>
                    <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-medium">
                        Compare interest rates, fees, and sanction speed across top banks in India before applying.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex justify-center">
                    <div className="inline-flex p-1.5 bg-[#24272c] rounded-2xl border border-slate-800 shadow-inner">
                        {(["Home Loan", "Personal Loan", "Business Loan"] as const).map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={cn(
                                    "px-6 py-3 rounded-xl text-xs md:text-sm font-black transition-all duration-300 uppercase tracking-wider",
                                    filterType === type
                                        ? "bg-[#00c985] text-slate-950 shadow-xl scale-105"
                                        : "text-slate-300 hover:text-white"
                                )}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* White Table Card */}
                <div className="max-w-6xl mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 bg-white text-slate-900">
                    <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50">
                        <div className="flex items-center gap-2 text-xs font-black text-slate-700 uppercase tracking-widest">
                            <Building2 className="h-4 w-4 text-[#00c985]" />
                            Showing Top Partners for <span className="text-[#00c985] font-black ml-1">{filterType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                            <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">
                                Live Verified Rates (2026)
                            </span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-[11px] text-slate-600 uppercase font-black tracking-widest bg-slate-100 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-5 font-black">Bank Partner</th>
                                    <th className="px-6 py-5 font-black text-[#00c985]">Interest Rate</th>
                                    <th className="px-6 py-5 font-black">Processing Fee</th>
                                    <th className="px-6 py-5 font-black">Max Tenure</th>
                                    <th className="px-6 py-5 font-black">Key Advantage</th>
                                    <th className="px-6 py-5 font-black text-right uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                                <AnimatePresence mode="popLayout">
                                    {sortedData.map((item, idx) => (
                                        <motion.tr
                                            key={`${item.bank}-${item.type}-${idx}`}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className={cn(
                                                "hover:bg-slate-50/80 transition-colors duration-200 group",
                                                item.isDirect ? "bg-emerald-50/50" : ""
                                            )}
                                        >
                                            <td className="px-6 py-5 font-extrabold text-slate-900 flex items-center gap-3">
                                                <div className={cn(
                                                    "h-10 w-10 rounded-2xl flex items-center justify-center font-black text-xs shadow-md border",
                                                    item.isDirect
                                                        ? "bg-[#00c985] text-slate-950 border-emerald-400"
                                                        : "bg-slate-900 text-white border-slate-800"
                                                )}>
                                                    {item.logo}
                                                </div>
                                                <div>
                                                    <span className="text-base font-black block text-slate-900">{item.bank}</span>
                                                    {item.isDirect && (
                                                        <span className="text-[9px] font-black uppercase text-emerald-600 tracking-widest">In-house Preferred Partner</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-2xl font-black text-[#00c985]">{item.rate.toFixed(2)}%</span>
                                                    {idx === 0 && (
                                                        <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full font-black uppercase tracking-wider flex items-center">
                                                            <Zap className="h-3 w-3 mr-1 fill-emerald-600 text-emerald-600" /> Lowest
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-slate-700 font-bold">{item.fee}</td>
                                            <td className="px-6 py-5 text-slate-700 font-bold">{item.tenure}</td>
                                            <td className="px-6 py-5">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-slate-100 border border-slate-200 text-slate-800">
                                                    <Award className="h-3.5 w-3.5 text-amber-500" />
                                                    {item.special}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleApply(item.bank)}
                                                    className={cn(
                                                        "rounded-xl font-black px-5 h-10 uppercase text-xs tracking-wider transition-all shadow-md",
                                                        item.isDirect
                                                            ? "bg-[#00c985] hover:bg-[#00b074] text-slate-950 shadow-emerald-500/20"
                                                            : "bg-slate-900 hover:bg-slate-800 text-white"
                                                    )}
                                                >
                                                    Apply Now <ChevronRight className="h-4 w-4 ml-1" />
                                                </Button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                            *Rates updated daily. Interest rates subject to borrower credit profile & CIBIL score.
                        </p>
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
