"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowUpDown, Zap, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

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

    // Simple sort by rate
    const sortedData = [...filteredData].sort((a, b) => a.rate - b.rate);

    return (
        <section className="py-20 md:py-28 bg-slate-50 dark:bg-black border-y border-white/5 relative overflow-hidden">
            {/* Background Beams */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]"></div>

            <div className="container px-4 md:px-6 relative z-10">
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-900 dark:from-blue-300 dark:to-indigo-500">Compare Rates</span> Live
                    </h2>
                    <p className="text-muted-foreground md:text-xl max-w-2xl mx-auto font-light">
                        We track interest rates from India's top banks so you don't have to.
                        <span className="block mt-2 font-medium text-amber-500">Save up to 2% with the right choice.</span>
                    </p>
                </div>

                <div className="glass-card max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20 dark:ring-white/10">
                    <div className="p-6 border-b border-border/50 flex flex-col sm:flex-row justify-between items-center gap-6 bg-white/50 dark:bg-slate-900/50">
                        <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                            {["All", "Personal Loan", "Home Loan"].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setFilterType(type as any)}
                                    className={cn(
                                        "px-6 py-2 rounded-full text-sm font-bold transition-all",
                                        filterType === type
                                            ? "bg-white dark:bg-slate-700 text-primary shadow-sm"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                            Last updated: Just now
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-muted-foreground uppercase bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-sm">
                                <tr>
                                    <th className="px-6 py-5 font-bold tracking-wider">Bank Partner</th>
                                    <th className="px-6 py-5 font-bold tracking-wider">Loan Type</th>
                                    <th className="px-6 py-5 font-bold tracking-wider text-primary">Interest Rate</th>
                                    <th className="px-6 py-5 font-bold tracking-wider">Processing Fee</th>
                                    <th className="px-6 py-5 font-bold tracking-wider">Tenure</th>
                                    <th className="px-6 py-5 font-bold tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {sortedData.map((item, idx) => (
                                    <tr key={idx} className="bg-white/40 dark:bg-slate-900/40 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors group">
                                        <td className="px-6 py-5 font-bold text-foreground flex items-center gap-3">
                                            <div className="h-8 w-8 rounded bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[10px] text-muted-foreground font-bold">
                                                {item.bank[0]}
                                            </div>
                                            {item.bank}
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={cn(
                                                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wide border",
                                                item.type === "Personal Loan" ? "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800" :
                                                    item.type === "Home Loan" ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800" :
                                                        "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800"
                                            )}>
                                                {item.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold text-slate-900 dark:text-white">{item.rate.toFixed(2)}%</span>
                                                {idx === 0 && (
                                                    <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold border border-amber-200 flex items-center">
                                                        <Zap className="h-3 w-3 mr-1 fill-amber-500 text-amber-500" /> Lowest
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-muted-foreground font-medium">{item.fee}</td>
                                        <td className="px-6 py-5 text-muted-foreground font-medium">{item.tenure}</td>
                                        <td className="px-6 py-5 text-right">
                                            <Button size="sm" className="rounded-full font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700">
                                                Apply Now
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}
