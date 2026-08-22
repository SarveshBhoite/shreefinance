"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, ShieldCheck, ArrowRight, Sparkles, Zap } from "lucide-react";
import { LeadFormModal } from "@/components/dialogs/lead-form-modal";
import { motion } from "framer-motion";

export function BalanceTransferCalculator() {
    const [existingLoan, setExistingLoan] = useState<number>(5000000); // 50 Lakhs
    const [currentRate, setCurrentRate] = useState<number>(9.8); // 9.8%
    const [newRate, setNewRate] = useState<number>(8.4); // 8.4%
    const [remainingTenure, setRemainingTenure] = useState<number>(18); // 18 Years
    const [isModalOpen, setIsModalOpen] = useState(false);

    // EMI Calculation Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const calculateEMI = (principal: number, annualRate: number, tenureYears: number) => {
        if (principal <= 0 || annualRate <= 0 || tenureYears <= 0) return 0;
        const monthlyRate = annualRate / 12 / 100;
        const totalMonths = tenureYears * 12;
        const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
        return Math.round(emi);
    };

    const currentEMI = calculateEMI(existingLoan, currentRate, remainingTenure);
    const newEMI = calculateEMI(existingLoan, newRate, remainingTenure);
    const monthlySavings = Math.max(0, currentEMI - newEMI);

    const totalCurrentPayment = currentEMI * remainingTenure * 12;
    const totalNewPayment = newEMI * remainingTenure * 12;
    const totalSavings = Math.max(0, totalCurrentPayment - totalNewPayment);

    const formatCurrency = (val: number) => {
        if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
        if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakhs`;
        return `₹${val.toLocaleString('en-IN')}`;
    };

    return (
        <div className="bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white rounded-[2.5rem] p-6 md:p-10 shadow-2xl border border-sky-800/50 relative overflow-hidden font-sans">
            {/* Background Light Effects */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-black uppercase tracking-widest mb-2">
                            <Sparkles className="h-3.5 w-3.5" />
                            Home Loan Balance Transfer (HLBT)
                        </div>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                            Calculate How Much You Can Save
                        </h3>
                        <p className="text-sky-200/70 text-sm mt-1">
                            Switch your existing home loan to Shree Finance & save lakhs over your remaining tenure.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 bg-sky-500/10 border border-sky-500/30 px-4 py-2 rounded-2xl text-sky-400 font-extrabold text-xs uppercase tracking-wider">
                        <TrendingDown className="h-4 w-4" />
                        Top-up Loan up to ₹50 Lakhs Available
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-center">
                    {/* Input Controls */}
                    <div className="lg:col-span-7 space-y-6 bg-white/5 p-6 md:p-8 rounded-3xl backdrop-blur-md border border-white/10">
                        {/* Outstanding Loan Amount */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm font-bold">
                                <span className="text-slate-300">Outstanding Loan Amount</span>
                                <span className="text-xl font-black text-sky-400">{formatCurrency(existingLoan)}</span>
                            </div>
                            <Slider
                                value={[existingLoan]}
                                min={500000}
                                max={30000000}
                                step={100000}
                                onValueChange={(val) => setExistingLoan(val[0])}
                                className="py-2"
                            />
                            <div className="flex justify-between text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                                <span>₹5 Lakhs</span>
                                <span>₹3 Crore</span>
                            </div>
                        </div>

                        {/* Current Interest Rate */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm font-bold">
                                <span className="text-slate-300">Existing Bank Interest Rate</span>
                                <span className="text-xl font-black text-rose-400">{currentRate.toFixed(2)}% p.a.</span>
                            </div>
                            <Slider
                                value={[currentRate]}
                                min={7.5}
                                max={14.0}
                                step={0.1}
                                onValueChange={(val) => setCurrentRate(parseFloat(val[0].toFixed(2)))}
                                className="py-2"
                            />
                            <div className="flex justify-between text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                                <span>7.50%</span>
                                <span>14.00%</span>
                            </div>
                        </div>

                        {/* Proposed Shree Finance Interest Rate */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm font-bold">
                                <span className="text-slate-300">Shree Finance Offered Rate</span>
                                <span className="text-xl font-black text-sky-400">{newRate.toFixed(2)}% p.a.</span>
                            </div>
                            <Slider
                                value={[newRate]}
                                min={7.0}
                                max={11.0}
                                step={0.05}
                                onValueChange={(val) => setNewRate(parseFloat(val[0].toFixed(2)))}
                                className="py-2"
                            />
                            <div className="flex justify-between text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                                <span>7.00%</span>
                                <span>11.00%</span>
                            </div>
                        </div>

                        {/* Remaining Tenure */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm font-bold">
                                <span className="text-slate-300">Remaining Tenure</span>
                                <span className="text-xl font-black text-sky-400">{remainingTenure} Years</span>
                            </div>
                            <Slider
                                value={[remainingTenure]}
                                min={1}
                                max={30}
                                step={1}
                                onValueChange={(val) => setRemainingTenure(val[0])}
                                className="py-2"
                            />
                            <div className="flex justify-between text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                                <span>1 Year</span>
                                <span>30 Years</span>
                            </div>
                        </div>
                    </div>

                    {/* Calculated Savings Card */}
                    <div className="lg:col-span-5">
                        <Card className="bg-gradient-to-b from-sky-600/30 to-primary/40 border border-sky-400/30 backdrop-blur-xl rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Zap className="h-32 w-32 text-white" />
                            </div>
                            <CardContent className="p-0 space-y-6 relative z-10">
                                <div className="text-center pb-6 border-b border-white/10">
                                    <p className="text-xs font-black text-sky-300 uppercase tracking-widest mb-1">
                                        Estimated Total Interest Savings
                                    </p>
                                    <motion.div
                                        key={totalSavings}
                                        initial={{ scale: 0.95, opacity: 0.8 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="text-4xl md:text-5xl font-black text-sky-400 tracking-tight"
                                    >
                                        {formatCurrency(totalSavings)}
                                    </motion.div>
                                    <p className="text-xs text-sky-200 mt-2 font-medium">
                                        Over your remaining {remainingTenure} years loan tenure
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-black/30 p-4 rounded-2xl border border-white/10">
                                        <p className="text-[10px] text-rose-300 font-extrabold uppercase tracking-wider">Current Monthly EMI</p>
                                        <p className="text-lg font-black text-rose-200 mt-1">₹{currentEMI.toLocaleString('en-IN')}</p>
                                    </div>
                                    <div className="bg-black/30 p-4 rounded-2xl border border-white/10">
                                        <p className="text-[10px] text-sky-300 font-extrabold uppercase tracking-wider">New Monthly EMI</p>
                                        <p className="text-lg font-black text-sky-300 mt-1">₹{newEMI.toLocaleString('en-IN')}</p>
                                    </div>
                                </div>

                                <div className="bg-sky-500/20 border border-emerald-400/30 p-4 rounded-2xl flex items-center justify-between">
                                    <span className="text-xs font-bold text-white">Monthly Savings:</span>
                                    <span className="text-lg font-black text-sky-300">₹{monthlySavings.toLocaleString('en-IN')} / month</span>
                                </div>

                                <Button
                                    onClick={() => setIsModalOpen(true)}
                                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black h-14 text-base rounded-2xl shadow-xl shadow-sky-500/20 transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-wider flex items-center justify-center gap-2"
                                >
                                    Instant Balance Transfer <ArrowRight className="h-5 w-5" />
                                </Button>

                                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-300 font-bold uppercase tracking-widest text-center">
                                    <ShieldCheck className="h-3.5 w-3.5 text-sky-400" />
                                    Zero Processing Fee Offers & Instant Top-up Disbursal
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <LeadFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type="general"
            />
        </div>
    );
}
