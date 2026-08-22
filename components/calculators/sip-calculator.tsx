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
            <Card className="bg-white border border-slate-200 shadow-lg rounded-[2rem] overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-sky-700 via-sky-600 to-sky-800 p-6 text-white">
                    <CardTitle className="text-white flex items-center gap-2 font-black text-xl">
                        <TrendingUp className="h-5 w-5 text-white" />
                        SIP Investment Calculator
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-8 bg-white">
                    {/* Monthly Investment */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm font-bold text-slate-700">
                            <span>Monthly Investment</span>
                            <span className="bg-sky-50 text-[#0284c7] border border-sky-200 px-3 py-1 rounded-full font-black">
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
                        <div className="flex justify-between text-xs font-bold text-slate-500">
                            <span>₹500</span>
                            <span>₹1L</span>
                        </div>
                    </div>

                    {/* Interest Rate */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm font-bold text-slate-700">
                            <span>Expected Return (p.a)</span>
                            <span className="bg-sky-50 text-[#0284c7] border border-sky-200 px-3 py-1 rounded-full font-black">
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
                        <div className="flex justify-between text-xs font-bold text-slate-500">
                            <span>5%</span>
                            <span>30%</span>
                        </div>
                    </div>

                    {/* Time Period */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm font-bold text-slate-700">
                            <span>Time Period</span>
                            <span className="bg-sky-50 text-[#0284c7] border border-sky-200 px-3 py-1 rounded-full font-black">
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
                        <div className="flex justify-between text-xs font-bold text-slate-500">
                            <span>1 Yr</span>
                            <span>30 Yrs</span>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="mt-8 pt-6 border-t border-slate-200 space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500 font-bold">Invested Amount</span>
                            <span className="font-black text-slate-900">{formatCurrency(result.invested)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500 font-bold">Est. Returns</span>
                            <span className="font-black text-[#0284c7]">+{formatCurrency(result.returns)}</span>
                        </div>
                        <div className="flex justify-between items-center bg-sky-50 border border-sky-200 p-4 rounded-2xl mt-4">
                            <span className="font-black text-slate-900">Total Future Value</span>
                            <span className="font-black text-2xl text-[#0284c7]">{formatCurrency(result.total)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
