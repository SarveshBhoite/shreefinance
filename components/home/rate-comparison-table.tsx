"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowUpDown, Zap, CheckCircle2, TrendingDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data
const ratesData = [
    { bank: "HDFC Bank", type: "Personal Loan", rate: 10.50, fee: "Up to 2.50%", tenure: "1-6 Yrs" },
    { bank: "ICICI Bank", type: "Personal Loan", rate: 10.75, fee: "Up to 2.25%", tenure: "1-6 Yrs" },
    { bank: "SBI", type: "Home Loan", rate: 8.40, fee: "Nil", tenure: "Up to 30 Yrs" },
    { bank: "Axis Bank", type: "Home Loan", rate: 8.75, fee: "10,000 + GST", tenure: "Up to 30 Yrs" },
    { bank: "Kotak", type: "Personal Loan", rate: 10.99, fee: "Up to 3%", tenure: "1-5 Yrs" },
    { bank: "Bajaj Finserv", type: "Personal Loan", rate: 11.00, fee: "Up to 3.93%", tenure: "1-8 Yrs" },
    { bank: "Bank of Baroda", type: "Car Loan", rate: 8.85, fee: "Nil", tenure: "Up to 7 Yrs" },
];

export function RateComparisonTable() {
    const [filterType, setFilterType] = useState<"All" | "Personal Loan" | "Home Loan" | "Car Loan">("All");

    const filteredData = filterType === "All"
        ? ratesData
        : ratesData.filter(item => item.type === filterType);

    const sortedData = [...filteredData].sort((a, b) => a.rate - b.rate);

    return (
        <section className="py-20 md:py-28 bg-white dark:bg-black relative overflow-hidden font-sans">
            {/* Background Beams - Ocean Theme */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px]"></div>

            <div className="container px-4 md:px-6 relative z-10 mx-auto">
                <div className="text-center mb-16 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-bold text-primary dark:border-primary/50 dark:bg-primary/20 dark:text-sky-200"
                    >
                        <TrendingDown className="h-4 w-4 text-accent" />
                        Live Competitive Analysis
                    </motion.div>
                    <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl max-w-3xl mx-auto">
                        <span className="text-gradient">Compare Rates</span> from India's Top Banks
                    </h2>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        We scan the financial market in real-time to bring you the lowest available interest rates.
                        <span className="block mt-2 font-bold text-primary">Save lakhs over your loan tenure with the right partner.</span>
                    </p>
                </div>

                <div className="glass-card max-w-6xl mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-primary/10 dark:ring-white/5 bg-white/80 dark:bg-sky-950/20 backdrop-blur-3xl">
                    <div className="p-8 border-b border-primary/10 flex flex-col sm:flex-row justify-between items-center gap-8 bg-sky-50/50 dark:bg-slate-900/50">
                        <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-sky-950/80 rounded-2xl border border-primary/5 shadow-inner">
                            {["All", "Personal Loan", "Home Loan"].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setFilterType(type as any)}
                                    className={cn(
                                        "px-8 py-3 rounded-xl text-sm font-extrabold transition-all duration-300",
                                        filterType === type
                                            ? "bg-white dark:bg-primary text-primary dark:text-white shadow-xl shadow-primary/10 scale-105 border border-primary/10"
                                            : "text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-sky-200"
                                    )}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                                Live Market Data
                            </p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-extrabold tracking-widest bg-slate-50/50 dark:bg-sky-950/40 backdrop-blur-sm border-b border-primary/10">
                                <tr>
                                    <th className="px-8 py-6 font-extrabold">Bank Partner</th>
                                    <th className="px-8 py-6 font-extrabold">Loan Type</th>
                                    <th className="px-8 py-6 font-extrabold text-primary">Interest Rate</th>
                                    <th className="px-8 py-6 font-extrabold">Processing Fee</th>
                                    <th className="px-8 py-6 font-extrabold">Tenure</th>
                                    <th className="px-8 py-6 font-extrabold text-right uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-primary/5">
                                <AnimatePresence mode="popLayout">
                                    {sortedData.map((item, idx) => (
                                        <motion.tr 
                                            key={`${item.bank}-${item.type}-${idx}`}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="bg-white/40 dark:bg-transparent hover:bg-sky-50 dark:hover:bg-primary/5 transition-all duration-300 group"
                                        >
                                            <td className="px-8 py-6 font-extrabold text-slate-900 dark:text-sky-50 flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center font-black shadow-lg shadow-primary/20 rotate-3 group-hover:rotate-0 transition-transform">
                                                    {item.bank[0]}
                                                </div>
                                                <span className="text-lg tracking-tight">{item.bank}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={cn(
                                                    "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] uppercase font-black tracking-widest border shadow-sm",
                                                    item.type === "Personal Loan" ? "bg-sky-50 text-primary border-primary/20 dark:bg-primary/20 dark:text-sky-200" :
                                                        item.type === "Home Loan" ? "bg-accent/10 text-accent border-accent/20 dark:bg-accent/20 dark:text-accent" :
                                                            "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800"
                                                )}>
                                                    <div className={cn("h-1.5 w-1.5 rounded-full animate-pulse", 
                                                        item.type === "Personal Loan" ? "bg-primary" : "bg-accent"
                                                    )}></div>
                                                    {item.type}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-2xl font-black text-slate-900 dark:text-white">{item.rate.toFixed(2)}%</span>
                                                    {idx === 0 && (
                                                        <span className="text-[10px] bg-accent/90 text-slate-900 px-3 py-1 rounded-full font-black uppercase tracking-tighter border border-white/20 flex items-center shadow-lg shadow-accent/20">
                                                            <Zap className="h-3 w-3 mr-1 fill-slate-900" /> Best
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-slate-500 dark:text-slate-400 font-bold">{item.fee}</td>
                                            <td className="px-8 py-6 text-slate-500 dark:text-slate-400 font-bold">{item.tenure}</td>
                                            <td className="px-8 py-6 text-right">
                                                <Link href={
                                                    item.type === "Personal Loan" ? "/loans/personal-loan" :
                                                    item.type === "Home Loan" ? "/loans/home-loan" :
                                                    item.type === "Car Loan" ? "/loans/car-loan" :
                                                    "/loans/personal-loan"
                                                }>
                                                    <Button size="sm" className="rounded-xl font-bold px-6 h-10 border border-primary/20 bg-primary hover:bg-sky-600 text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 min-w-[120px]">
                                                        Get Quote
                                                    </Button>
                                                </Link>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                    {/* Bottom Link Table Footer */}
                    <div className="p-6 bg-slate-50 dark:bg-sky-950/60 border-t border-primary/10 text-center">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            *Interest rates are subject to change by banks. Final rate depends on CIBIL and Eligibility.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
