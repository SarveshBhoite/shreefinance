"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Sparkles, Percent, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function TaxBenefitCalculator() {
    const [loanAmount, setLoanAmount] = useState<number>(4000000); // 40 Lakhs
    const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5%
    const [taxSlab, setTaxSlab] = useState<number>(30); // 30% slab

    // Approximate year 1 interest & principal breakdown
    const annualInterest = Math.min(200000, Math.round(loanAmount * (interestRate / 100)));
    const annualPrincipal = Math.min(150000, Math.round(loanAmount * 0.03)); // approx principal portion year 1

    const totalDeduction = annualInterest + annualPrincipal;
    const annualTaxSavings = Math.round(totalDeduction * (taxSlab / 100));

    const formatCurrency = (val: number) => `₹${val.toLocaleString('en-IN')}`;

    return (
        <div className="bg-white dark:bg-sky-950/40 rounded-[2.5rem] p-6 md:p-10 border border-sky-100 dark:border-sky-900 shadow-xl space-y-8 font-sans">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 dark:border-sky-900/60 pb-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary dark:bg-primary/20 text-xs font-black uppercase tracking-widest mb-2">
                        <Shield className="h-3.5 w-3.5" />
                        Income Tax Act (Sec 24b & 80C)
                    </div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                        Home Loan Tax Benefit Calculator
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                        Save up to ₹1,05,000 annually in taxes on your Home Loan EMI payments.
                    </p>
                </div>

                {/* Tax Slab Selector */}
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-sky-900/50 p-1.5 rounded-2xl border border-slate-200 dark:border-sky-800">
                    <span className="text-xs font-extrabold text-slate-500 dark:text-slate-400 px-2 uppercase">Tax Slab:</span>
                    {[10, 20, 30].map((slab) => (
                        <button
                            key={slab}
                            onClick={() => setTaxSlab(slab)}
                            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                                taxSlab === slab
                                    ? "bg-primary text-white shadow-md shadow-primary/20"
                                    : "text-slate-600 dark:text-slate-300 hover:text-primary"
                            }`}
                        >
                            {slab}%
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-center">
                {/* Sliders */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm font-bold">
                            <span className="text-slate-700 dark:text-slate-300">Loan Amount</span>
                            <span className="text-xl font-black text-primary">₹{(loanAmount / 100000).toFixed(1)} Lakhs</span>
                        </div>
                        <Slider
                            value={[loanAmount]}
                            min={1000000}
                            max={20000000}
                            step={500000}
                            onValueChange={(val) => setLoanAmount(val[0])}
                            className="py-2"
                        />
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm font-bold">
                            <span className="text-slate-700 dark:text-slate-300">Interest Rate</span>
                            <span className="text-xl font-black text-primary">{interestRate}% p.a.</span>
                        </div>
                        <Slider
                            value={[interestRate]}
                            min={7.5}
                            max={12.0}
                            step={0.1}
                            onValueChange={(val) => setInterestRate(parseFloat(val[0].toFixed(2)))}
                            className="py-2"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="bg-sky-50 dark:bg-sky-900/20 p-4 rounded-2xl border border-sky-100 dark:border-sky-800">
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-wider">Sec 24b Interest Limit</p>
                            <p className="text-lg font-black text-slate-900 dark:text-white mt-1">{formatCurrency(annualInterest)} / yr</p>
                        </div>
                        <div className="bg-sky-50 dark:bg-sky-900/20 p-4 rounded-2xl border border-sky-100 dark:border-sky-800">
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-wider">Sec 80C Principal Limit</p>
                            <p className="text-lg font-black text-slate-900 dark:text-white mt-1">{formatCurrency(annualPrincipal)} / yr</p>
                        </div>
                    </div>
                </div>

                {/* Savings Summary */}
                <div className="lg:col-span-5">
                    <Card className="bg-gradient-to-br from-primary to-sky-700 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden border-0">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Sparkles className="h-32 w-32 text-white" />
                        </div>
                        <CardContent className="p-0 space-y-6 relative z-10 text-center">
                            <p className="text-xs font-black uppercase tracking-widest text-sky-200">
                                Total Annual Tax Saved
                            </p>
                            <motion.div
                                key={annualTaxSavings}
                                initial={{ scale: 0.9, opacity: 0.8 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-5xl font-black text-amber-300 tracking-tight"
                            >
                                {formatCurrency(annualTaxSavings)}
                            </motion.div>
                            <p className="text-xs text-sky-100 font-bold uppercase tracking-wider">
                                At {taxSlab}% Income Tax Bracket
                            </p>

                            <div className="bg-white/10 p-4 rounded-2xl border border-white/20 text-left space-y-2 text-xs">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-sky-300 shrink-0" />
                                    <span>Interest deduction up to ₹2,00,000 under Sec 24b</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-sky-300 shrink-0" />
                                    <span>Principal deduction up to ₹1,50,000 under Sec 80C</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-sky-300 shrink-0" />
                                    <span>Stamp Duty & Registration fee tax exemption</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
