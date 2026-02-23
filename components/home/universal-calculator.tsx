"use client";

import { useState, useEffect, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calculator,
    Home,
    TrendingUp,
    Landmark,
    Wallet,
    PiggyBank,
} from "lucide-react";

/* ─── Calculator Types ─── */
type CalcType = "emi" | "sip" | "fd" | "rd" | "lumpsum";
type EMISolveFor = "emi" | "principal" | "rate" | "tenure";
type SIPSolveFor = "futureValue" | "monthly" | "duration";

const CALC_TABS: { id: CalcType; label: string; icon: React.ReactNode; color: string }[] = [
    { id: "emi", label: "EMI", icon: <Home className="h-4 w-4" />, color: "from-blue-600 to-indigo-700" },
    { id: "sip", label: "SIP", icon: <TrendingUp className="h-4 w-4" />, color: "from-green-600 to-emerald-700" },
    { id: "fd", label: "FD", icon: <Landmark className="h-4 w-4" />, color: "from-amber-500 to-orange-600" },
    { id: "rd", label: "RD", icon: <Wallet className="h-4 w-4" />, color: "from-purple-600 to-violet-700" },
    { id: "lumpsum", label: "Lumpsum", icon: <PiggyBank className="h-4 w-4" />, color: "from-rose-500 to-pink-600" },
];

const COLORS = ["#3b82f6", "#1e1b4b"];

const fmt = (v: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(v);

/* ─── EMI Section ─── */
function EMISection() {
    const [solveFor, setSolveFor] = useState<EMISolveFor>("emi");
    const [amount, setAmount] = useState(500000);
    const [rate, setRate] = useState(10.5);
    const [tenure, setTenure] = useState(5);
    const [emiVal, setEmiVal] = useState(10746);

    const result = useMemo(() => {
        const r = rate / 12 / 100;
        const n = tenure * 12;

        if (solveFor === "emi") {
            if (r === 0) return { emi: amount / n, principal: amount, totalInterest: 0, totalPayment: amount };
            const e = amount * r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
            return { emi: Math.round(e), principal: amount, totalInterest: Math.round(e * n - amount), totalPayment: Math.round(e * n) };
        }
        if (solveFor === "principal") {
            if (r === 0) return { emi: emiVal, principal: Math.round(emiVal * n), totalInterest: 0, totalPayment: Math.round(emiVal * n) };
            const p = emiVal * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
            return { emi: emiVal, principal: Math.round(p), totalInterest: Math.round(emiVal * n - p), totalPayment: Math.round(emiVal * n) };
        }
        if (solveFor === "tenure") {
            if (r === 0 || emiVal <= 0) return { emi: emiVal, principal: amount, totalInterest: 0, totalPayment: amount };
            const months = Math.log(emiVal / (emiVal - amount * r)) / Math.log(1 + r);
            const yrs = isFinite(months) ? Math.round(months / 12 * 10) / 10 : 0;
            const totalPay = Math.round(emiVal * months);
            return { emi: emiVal, principal: amount, totalInterest: Math.round(totalPay - amount), totalPayment: totalPay, tenureYears: yrs };
        }
        // solveFor === "rate" — use Newton's method
        let guess = 0.01;
        for (let i = 0; i < 100; i++) {
            const gn = Math.pow(1 + guess, n);
            const f = amount * guess * gn / (gn - 1) - emiVal;
            const dg = amount * (gn * (1 + guess * n * Math.log(1 + guess)) * (gn - 1) - guess * gn * n * Math.pow(1 + guess, n - 1)) / Math.pow(gn - 1, 2);
            if (Math.abs(dg) < 1e-10) break;
            guess = guess - f / dg;
            if (guess < 0) guess = 0.001;
        }
        const annualRate = Math.round(guess * 12 * 10000) / 100;
        const totalPay = Math.round(emiVal * n);
        return { emi: emiVal, principal: amount, totalInterest: Math.round(totalPay - amount), totalPayment: totalPay, solvedRate: annualRate };
    }, [solveFor, amount, rate, tenure, emiVal]);

    const chartData = [
        { name: "Principal", value: result.principal },
        { name: "Interest", value: Math.max(0, result.totalInterest) },
    ];

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => { setIsMounted(true); }, []);

    return (
        <div className="space-y-6">
            {/* Solve For Selector */}
            <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Solve For</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {([
                        { id: "emi", label: "EMI" },
                        { id: "principal", label: "Principal" },
                        { id: "rate", label: "Rate %" },
                        { id: "tenure", label: "Tenure" },
                    ] as { id: EMISolveFor; label: string }[]).map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => setSolveFor(opt.id)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${solveFor === opt.id
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-5">
                    {/* Loan Amount */}
                    {solveFor !== "principal" && (
                        <SliderField label="Loan Amount" prefix="₹" value={amount} onChange={setAmount} min={10000} max={10000000} step={10000} />
                    )}
                    {/* Interest Rate */}
                    {solveFor !== "rate" && (
                        <SliderField label="Interest Rate (%)" value={rate} onChange={setRate} min={1} max={30} step={0.1} />
                    )}
                    {/* Tenure */}
                    {solveFor !== "tenure" && (
                        <SliderField label="Tenure (Years)" value={tenure} onChange={setTenure} min={1} max={30} step={1} />
                    )}
                    {/* EMI input (when solving for other variables) */}
                    {solveFor !== "emi" && (
                        <SliderField label="Monthly EMI" prefix="₹" value={emiVal} onChange={setEmiVal} min={1000} max={500000} step={500} />
                    )}
                </div>

                {/* Results */}
                <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/80 p-6 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="h-28 w-28 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            {isMounted ? (
                                <PieChart>
                                    <Pie data={chartData} cx="50%" cy="50%" innerRadius={35} outerRadius={52} paddingAngle={5} dataKey="value">
                                        {chartData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            ) : <div></div>}
                        </ResponsiveContainer>
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                            {solveFor === "emi" ? "Monthly EMI" : solveFor === "principal" ? "Loan Amount" : solveFor === "rate" ? "Interest Rate" : "Tenure"}
                        </p>
                        <p className="text-3xl font-bold text-blue-600">
                            {solveFor === "emi" ? fmt(result.emi)
                                : solveFor === "principal" ? fmt(result.principal)
                                    : solveFor === "rate" ? `${result.solvedRate ?? rate}%`
                                        : `${result.tenureYears ?? tenure} Years`}
                        </p>
                    </div>

                    <div className="w-full text-xs space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex justify-between"><span>Principal</span><span className="font-semibold">{fmt(result.principal)}</span></div>
                        <div className="flex justify-between"><span>Total Interest</span><span className="font-semibold text-red-500">+ {fmt(Math.max(0, result.totalInterest))}</span></div>
                        <div className="flex justify-between"><span>Total Payable</span><span className="font-semibold">{fmt(result.totalPayment)}</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── SIP Section ─── */
function SIPSection() {
    const [solveFor, setSolveFor] = useState<SIPSolveFor>("futureValue");
    const [monthly, setMonthly] = useState(5000);
    const [rate, setRate] = useState(12);
    const [years, setYears] = useState(10);
    const [targetFV, setTargetFV] = useState(1000000);

    const result = useMemo(() => {
        const i = rate / 12 / 100;
        const n = years * 12;

        if (solveFor === "futureValue") {
            const fv = monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
            return { invested: monthly * n, returns: Math.round(fv - monthly * n), total: Math.round(fv) };
        }
        if (solveFor === "monthly") {
            const fv = targetFV;
            const m = fv / (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
            const inv = Math.round(m) * n;
            return { invested: inv, returns: Math.round(fv - inv), total: Math.round(fv), solvedMonthly: Math.round(m) };
        }
        // solveFor === "duration"
        const fv = targetFV;
        const months = Math.log((fv * i) / (monthly * (1 + i)) + 1) / Math.log(1 + i);
        const yrs = isFinite(months) ? Math.round(months / 12 * 10) / 10 : 0;
        const inv = monthly * Math.round(months);
        return { invested: inv, returns: Math.round(fv - inv), total: Math.round(fv), solvedYears: yrs };
    }, [solveFor, monthly, rate, years, targetFV]);

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Solve For</label>
                <div className="grid grid-cols-3 gap-2">
                    {([
                        { id: "futureValue", label: "Future Value" },
                        { id: "monthly", label: "Monthly SIP" },
                        { id: "duration", label: "Duration" },
                    ] as { id: SIPSolveFor; label: string }[]).map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => setSolveFor(opt.id)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${solveFor === opt.id
                                    ? "bg-green-600 text-white shadow-lg shadow-green-500/30"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-5">
                    {solveFor !== "monthly" && (
                        <SliderField label="Monthly Investment" prefix="₹" value={monthly} onChange={setMonthly} min={500} max={100000} step={500} />
                    )}
                    <SliderField label="Expected Return (% p.a)" value={rate} onChange={setRate} min={1} max={30} step={0.5} />
                    {solveFor !== "duration" && (
                        <SliderField label="Time Period (Years)" value={years} onChange={setYears} min={1} max={30} step={1} />
                    )}
                    {solveFor !== "futureValue" && (
                        <SliderField label="Target Amount" prefix="₹" value={targetFV} onChange={setTargetFV} min={100000} max={100000000} step={100000} />
                    )}
                </div>

                <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/80 p-6 space-y-3">
                    <div className="text-center space-y-1 pb-3 border-b border-slate-200 dark:border-slate-800">
                        <p className="text-sm text-muted-foreground">
                            {solveFor === "futureValue" ? "Total Value" : solveFor === "monthly" ? "Monthly SIP Needed" : "Time Required"}
                        </p>
                        <p className="text-3xl font-bold text-green-600">
                            {solveFor === "futureValue" ? fmt(result.total)
                                : solveFor === "monthly" ? fmt(result.solvedMonthly ?? 0)
                                    : `${result.solvedYears ?? 0} Years`}
                        </p>
                    </div>
                    <div className="flex justify-between"><span className="text-sm text-slate-500">Invested</span><span className="font-bold">{fmt(result.invested)}</span></div>
                    <div className="flex justify-between"><span className="text-sm text-slate-500">Returns</span><span className="font-bold text-green-600">+{fmt(Math.max(0, result.returns))}</span></div>
                    <div className="flex justify-between bg-green-50 dark:bg-green-900/20 p-3 rounded-xl">
                        <span className="font-bold">Total</span><span className="font-extrabold text-green-700 dark:text-green-300">{fmt(result.total)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── FD Section ─── */
function FDSection() {
    const [principal, setPrincipal] = useState(100000);
    const [rate, setRate] = useState(7);
    const [years, setYears] = useState(5);

    const result = useMemo(() => {
        const maturity = principal * Math.pow(1 + rate / 400, 4 * years); // quarterly compounding
        return { principal, interest: Math.round(maturity - principal), maturity: Math.round(maturity) };
    }, [principal, rate, years]);

    return (
        <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-5">
                <SliderField label="Deposit Amount" prefix="₹" value={principal} onChange={setPrincipal} min={10000} max={10000000} step={10000} />
                <SliderField label="Interest Rate (% p.a)" value={rate} onChange={setRate} min={1} max={15} step={0.1} />
                <SliderField label="Tenure (Years)" value={years} onChange={setYears} min={1} max={20} step={1} />
            </div>
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/80 p-6 space-y-3">
                <div className="text-center space-y-1 pb-3 border-b border-slate-200 dark:border-slate-800">
                    <p className="text-sm text-muted-foreground">Maturity Amount</p>
                    <p className="text-3xl font-bold text-amber-600">{fmt(result.maturity)}</p>
                </div>
                <div className="flex justify-between"><span className="text-sm text-slate-500">Deposit</span><span className="font-bold">{fmt(result.principal)}</span></div>
                <div className="flex justify-between"><span className="text-sm text-slate-500">Interest Earned</span><span className="font-bold text-amber-600">+{fmt(result.interest)}</span></div>
            </div>
        </div>
    );
}

/* ─── RD Section ─── */
function RDSection() {
    const [monthly, setMonthly] = useState(5000);
    const [rate, setRate] = useState(7);
    const [years, setYears] = useState(5);

    const result = useMemo(() => {
        const n = years * 4; // quarters
        const r = rate / 400;
        const p = monthly * 3; // per quarter deposit
        const maturity = p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
        const invested = monthly * years * 12;
        return { invested, interest: Math.round(maturity - invested), maturity: Math.round(maturity) };
    }, [monthly, rate, years]);

    return (
        <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-5">
                <SliderField label="Monthly Deposit" prefix="₹" value={monthly} onChange={setMonthly} min={500} max={100000} step={500} />
                <SliderField label="Interest Rate (% p.a)" value={rate} onChange={setRate} min={1} max={15} step={0.1} />
                <SliderField label="Tenure (Years)" value={years} onChange={setYears} min={1} max={10} step={1} />
            </div>
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/80 p-6 space-y-3">
                <div className="text-center space-y-1 pb-3 border-b border-slate-200 dark:border-slate-800">
                    <p className="text-sm text-muted-foreground">Maturity Amount</p>
                    <p className="text-3xl font-bold text-purple-600">{fmt(result.maturity)}</p>
                </div>
                <div className="flex justify-between"><span className="text-sm text-slate-500">Total Deposited</span><span className="font-bold">{fmt(result.invested)}</span></div>
                <div className="flex justify-between"><span className="text-sm text-slate-500">Interest Earned</span><span className="font-bold text-purple-600">+{fmt(result.interest)}</span></div>
            </div>
        </div>
    );
}

/* ─── Lumpsum Section ─── */
function LumpsumSection() {
    const [principal, setPrincipal] = useState(100000);
    const [rate, setRate] = useState(12);
    const [years, setYears] = useState(10);

    const result = useMemo(() => {
        const maturity = principal * Math.pow(1 + rate / 100, years);
        return { principal, returns: Math.round(maturity - principal), maturity: Math.round(maturity) };
    }, [principal, rate, years]);

    return (
        <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-5">
                <SliderField label="Investment Amount" prefix="₹" value={principal} onChange={setPrincipal} min={10000} max={10000000} step={10000} />
                <SliderField label="Expected Return (% p.a)" value={rate} onChange={setRate} min={1} max={30} step={0.5} />
                <SliderField label="Time Period (Years)" value={years} onChange={setYears} min={1} max={30} step={1} />
            </div>
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/80 p-6 space-y-3">
                <div className="text-center space-y-1 pb-3 border-b border-slate-200 dark:border-slate-800">
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <p className="text-3xl font-bold text-rose-600">{fmt(result.maturity)}</p>
                </div>
                <div className="flex justify-between"><span className="text-sm text-slate-500">Invested</span><span className="font-bold">{fmt(result.principal)}</span></div>
                <div className="flex justify-between"><span className="text-sm text-slate-500">Returns</span><span className="font-bold text-rose-600">+{fmt(result.returns)}</span></div>
            </div>
        </div>
    );
}

/* ─── Shared Slider Field ─── */
function SliderField({
    label, prefix, value, onChange, min, max, step,
}: {
    label: string; prefix?: string; value: number; onChange: (v: number) => void; min: number; max: number; step: number;
}) {
    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
                <div className="relative">
                    {prefix && (
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">{prefix}</span>
                    )}
                    <Input
                        type="number"
                        value={value}
                        onChange={(e) => onChange(Number(e.target.value))}
                        className={`${prefix ? "w-32 pl-6" : "w-20"} h-8 text-right`}
                    />
                </div>
            </div>
            <Slider
                value={[value]}
                onValueChange={(vals) => onChange(vals[0])}
                min={min}
                max={max}
                step={step}
                className="py-2"
            />
        </div>
    );
}

/* ─── Main Universal Calculator ─── */
export function UniversalCalculator() {
    const [active, setActive] = useState<CalcType>("emi");
    const activeTab = CALC_TABS.find((t) => t.id === active)!;

    return (
        <section className="py-16 md:py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
            {/* Decorative BG */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="container relative z-10 px-4 md:px-6">
                {/* Header */}
                <div className="text-center mb-12 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/50 px-3 py-1 text-sm font-medium text-blue-800 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-300"
                    >
                        <Calculator className="h-4 w-4" />
                        Financial Calculators
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                        Plan Your <span className="text-gradient">Finances</span> Smartly
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Choose a calculator, enter your values, and even select which variable you want to solve for.
                    </p>
                </div>

                {/* Tab Selector */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {CALC_TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActive(tab.id)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${active === tab.id
                                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg scale-105`
                                    : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-[1.02]"
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Calculator Card */}
                <Card className="glass-card max-w-5xl mx-auto border-t-4 shadow-xl" style={{ borderTopColor: active === "emi" ? "#3b82f6" : active === "sip" ? "#16a34a" : active === "fd" ? "#d97706" : active === "rd" ? "#9333ea" : "#e11d48" }}>
                    <CardContent className="p-6 md:p-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {active === "emi" && <EMISection />}
                                {active === "sip" && <SIPSection />}
                                {active === "fd" && <FDSection />}
                                {active === "rd" && <RDSection />}
                                {active === "lumpsum" && <LumpsumSection />}
                            </motion.div>
                        </AnimatePresence>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
