"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IndianRupee, PieChart, TrendingUp } from "lucide-react";

interface SIPCalculatorProps {
    defaultMonthly?: number;
    defaultRate?: number;
    defaultYears?: number;
}

export function SIPCalculator({
    defaultMonthly = 5000,
    defaultRate = 12,
    defaultYears = 10,
}: SIPCalculatorProps) {
    const [monthly, setMonthly] = useState(defaultMonthly);
    const [rate, setRate] = useState(defaultRate);
    const [years, setYears] = useState(defaultYears);
    const [result, setResult] = useState({ invested: 0, returns: 0, total: 0 });

    useEffect(() => {
        const calculateSIP = () => {
            const p = monthly;
            const i = rate / 12 / 100;
            const n = years * 12;

            // FV = P * ({[1 + i]^n - 1} / i) * (1 + i)  --- For Advance (Beg of period) usually used or similar
            // Standard formula for end of period: P * ({[1 + i]^n - 1} / i)
            // Usually SIPs are considered beginning of month in many calcs, but let's use standard:
            // M = P × ({[1 + i]^n - 1} / i) × (1 + i)

            const futureValue = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
            const totalInvested = p * n;
            const totalReturns = futureValue - totalInvested;

            setResult({
                invested: Math.round(totalInvested),
                returns: Math.round(totalReturns),
                total: Math.round(futureValue),
            });
        };
        calculateSIP();
    }, [monthly, rate, years]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="w-full max-w-md mx-auto space-y-6">
            <Card className="glass-card bg-white/10 dark:bg-slate-900/50 border-white/20 dark:border-white/10 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
                    <CardTitle className="text-white flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        SIP Calculator
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-8">
                    {/* Monthly Investment */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm font-medium text-slate-700 dark:text-slate-300">
                            <span>Monthly Investment</span>
                            <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full font-bold">
                                {formatCurrency(monthly)}
                            </span>
                        </div>
                        <Slider
                            value={[monthly]}
                            min={500}
                            max={100000}
                            step={500}
                            onValueChange={(val) => setMonthly(val[0])}
                            className="py-2"
                        />
                        <div className="flex justify-between text-xs text-slate-500">
                            <span>₹500</span>
                            <span>₹1L</span>
                        </div>
                    </div>

                    {/* Interest Rate */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm font-medium text-slate-700 dark:text-slate-300">
                            <span>Expected Return (p.a)</span>
                            <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full font-bold">
                                {rate}%
                            </span>
                        </div>
                        <Slider
                            value={[rate]}
                            min={5}
                            max={30}
                            step={0.5}
                            onValueChange={(val) => setRate(val[0])}
                            className="py-2"
                        />
                        <div className="flex justify-between text-xs text-slate-500">
                            <span>5%</span>
                            <span>30%</span>
                        </div>
                    </div>

                    {/* Time Period */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm font-medium text-slate-700 dark:text-slate-300">
                            <span>Time Period</span>
                            <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full font-bold">
                                {years} Years
                            </span>
                        </div>
                        <Slider
                            value={[years]}
                            min={1}
                            max={30}
                            step={1}
                            onValueChange={(val) => setYears(val[0])}
                            className="py-2"
                        />
                        <div className="flex justify-between text-xs text-slate-500">
                            <span>1 Yr</span>
                            <span>30 Yrs</span>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-500 dark:text-slate-400 text-sm">Invested Amount</span>
                            <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(result.invested)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-500 dark:text-slate-400 text-sm">Est. Returns</span>
                            <span className="font-bold text-green-600 dark:text-green-400">+{formatCurrency(result.returns)}</span>
                        </div>
                        <div className="flex justify-between items-center bg-green-50 dark:bg-green-900/20 p-4 rounded-xl mt-4">
                            <span className="font-bold text-slate-900 dark:text-white">Total Value</span>
                            <span className="font-extrabold text-xl text-green-700 dark:text-green-300">{formatCurrency(result.total)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
