"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface EMICalculatorProps {
    defaultAmount?: number;
    defaultRate?: number;
    defaultTenure?: number;
}

export function EMICalculator({
    defaultAmount = 500000,
    defaultRate = 10.5,
    defaultTenure = 5,
}: EMICalculatorProps) {
    const [amount, setAmount] = useState(defaultAmount);
    const [rate, setRate] = useState(defaultRate);
    const [tenure, setTenure] = useState(defaultTenure); // in years

    const [emi, setEmi] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);

    useEffect(() => {
        const r = rate / 12 / 100;
        const n = tenure * 12;

        const calculatedEmi = amount * r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
        const totalPay = calculatedEmi * n;
        const totalInt = totalPay - amount;

        setEmi(Math.round(calculatedEmi));
        setTotalPayment(Math.round(totalPay));
        setTotalInterest(Math.round(totalInt));
    }, [amount, rate, tenure]);

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const chartData = [
        { name: "Principal", value: amount },
        { name: "Interest", value: totalInterest },
    ];

    const COLORS = ["#3b82f6", "#1e1b4b"]; // Blue-500, Indigo-950

    return (
        <Card className="shadow-lg border-t-4 border-t-primary">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                    <span>🔢</span> EMI Calculator
                </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                    {/* Amount Slider */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium">Loan Amount</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₹</span>
                                <Input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    className="w-32 pl-6 h-8"
                                />
                            </div>
                        </div>
                        <Slider
                            value={[amount]}
                            onValueChange={(vals) => setAmount(vals[0])}
                            min={10000}
                            max={10000000}
                            step={10000}
                            className="py-2"
                        />
                    </div>

                    {/* Rate Slider */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium">Interest Rate (%)</label>
                            <Input
                                type="number"
                                value={rate}
                                onChange={(e) => setRate(Number(e.target.value))}
                                className="w-20 h-8"
                            />
                        </div>
                        <Slider
                            value={[rate]}
                            onValueChange={(vals) => setRate(vals[0])}
                            min={1}
                            max={30}
                            step={0.1}
                            className="py-2"
                        />
                    </div>

                    {/* Tenure Slider */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium">Tenure (Years)</label>
                            <Input
                                type="number"
                                value={tenure}
                                onChange={(e) => setTenure(Number(e.target.value))}
                                className="w-20 h-8"
                            />
                        </div>
                        <Slider
                            value={[tenure]}
                            onValueChange={(vals) => setTenure(vals[0])}
                            min={1}
                            max={30}
                            step={1}
                            className="py-2"
                        />
                    </div>
                </div>

                {/* Results */}
                <div className="rounded-xl bg-slate-50 dark:bg-slate-900 p-6 flex flex-col items-center justify-center text-center space-y-4">
                    {/* Chart */}
                    <div className="h-32 w-32 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            {isMounted ? (
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={60}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            ) : <div></div>}
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-muted-foreground pointer-events-none">
                            Breakdown
                        </div>
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Monthly EMI</p>
                        <p className="text-3xl font-bold text-primary">₹ {emi.toLocaleString()}</p>
                    </div>

                    <div className="w-full text-xs space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex justify-between">
                            <span>Principal</span>
                            <span className="font-semibold">₹ {amount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Total Interest</span>
                            <span className="font-semibold text-red-500">+ ₹ {totalInterest.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Total Payable</span>
                            <span className="font-semibold">₹ {totalPayment.toLocaleString()}</span>
                        </div>
                    </div>

                    <Button className="w-full mt-2" variant="premium">
                        Apply with this Plan
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
