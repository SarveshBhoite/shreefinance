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
    { id: "emi", label: "EMI", icon: <Home className="h-4 w-4" />, color: "from-primary to-sky-800" },
    { id: "sip", label: "SIP", icon: <TrendingUp className="h-4 w-4" />, color: "from-sky-500 to-primary" },
    { id: "fd", label: "FD", icon: <Landmark className="h-4 w-4" />, color: "from-accent to-sky-700" },
    { id: "rd", label: "RD", icon: <Wallet className="h-4 w-4" />, color: "from-primary to-accent" },
    { id: "lumpsum", label: "Lumpsum", icon: <PiggyBank className="h-4 w-4" />, color: "from-sky-600 to-primary" },
];

const COLORS = ["hsl(199 89% 48%)", "hsl(45 93% 47%)"]; // Primary (Ocean Blue) and Accent (Gold)

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
                                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold"
                                }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-4">
                    {/* Loan Amount */}
                    {solveFor !== "principal" && (
                        <SliderField 
                            label="Loan Amount" 
                            prefix="₹" 
                            value={amount} 
                            onChange={setAmount} 
                            min={10000} 
                            max={10000000} 
                            step={10000} 
                            presets={[
                                { label: "₹2L", value: 200000 },
                                { label: "₹5L", value: 500000 },
                                { label: "₹10L", value: 1000000 },
                                { label: "₹25L", value: 2500000 },
                                { label: "₹50L", value: 5000000 },
                            ]}
                        />
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
                <div className="rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900 p-6 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="h-28 w-28 relative flex items-center justify-center">
                        {isMounted && (
                            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                                <PieChart>
                                    <Pie data={chartData} cx="50%" cy="50%" innerRadius={35} outerRadius={52} paddingAngle={5} dataKey="value">
                                        {chartData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground font-medium">
                            {solveFor === "emi" ? "Monthly EMI" : solveFor === "principal" ? "Loan Amount" : solveFor === "rate" ? "Interest Rate" : "Tenure"}
                        </p>
                        <p className="text-3xl font-extrabold text-primary">
                            {solveFor === "emi" ? fmt(result.emi)
                                : solveFor === "principal" ? fmt(result.principal)
                                    : solveFor === "rate" ? `${result.solvedRate ?? rate}%`
                                        : `${result.tenureYears ?? tenure} Years`}
                        </p>
                    </div>

                    <div className="w-full text-xs space-y-2 pt-2 border-t border-sky-100 dark:border-sky-900">
                        <div className="flex justify-between"><span>Principal</span><span className="font-bold">{fmt(result.principal)}</span></div>
                        <div className="flex justify-between"><span>Total Interest</span><span className="font-bold text-primary">+ {fmt(Math.max(0, result.totalInterest))}</span></div>
                        <div className="flex justify-between bg-white/50 dark:bg-white/5 p-2 rounded-lg">
                            <span className="font-bold">Total Payable</span><span className="font-extrabold text-primary">{fmt(result.totalPayment)}</span>
                        </div>
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
                                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold"
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

                <div className="rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900 p-6 space-y-3">
                    <div className="text-center space-y-1 pb-3 border-b border-sky-100 dark:border-sky-900">
                        <p className="text-sm text-muted-foreground font-medium">
                            {solveFor === "futureValue" ? "Total Value" : solveFor === "monthly" ? "Monthly SIP Needed" : "Time Required"}
                        </p>
                        <p className="text-3xl font-extrabold text-primary">
                            {solveFor === "futureValue" ? fmt(result.total)
                                : solveFor === "monthly" ? fmt(result.solvedMonthly ?? 0)
                                    : `${result.solvedYears ?? 0} Years`}
                        </p>
                    </div>
                    <div className="flex justify-between"><span className="text-sm text-slate-500 font-medium">Invested</span><span className="font-bold">{fmt(result.invested)}</span></div>
                    <div className="flex justify-between"><span className="text-sm text-slate-500 font-medium">Returns</span><span className="font-bold text-accent">+{fmt(Math.max(0, result.returns))}</span></div>
                    <div className="flex justify-between bg-primary/10 dark:bg-primary/20 p-3 rounded-xl border border-primary/20">
                        <span className="font-bold">Total</span><span className="font-extrabold text-primary">{fmt(result.total)}</span>
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
            <div className="rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900 p-6 space-y-3">
                <div className="text-center space-y-1 pb-3 border-b border-sky-100 dark:border-sky-900">
                    <p className="text-sm text-muted-foreground font-medium">Maturity Amount</p>
                    <p className="text-3xl font-extrabold text-primary">{fmt(result.maturity)}</p>
                </div>
                <div className="flex justify-between"><span className="text-sm text-slate-500 font-medium">Deposit</span><span className="font-bold">{fmt(result.principal)}</span></div>
                <div className="flex justify-between"><span className="text-sm text-slate-500 font-medium">Interest Earned</span><span className="font-bold text-accent">+{fmt(result.interest)}</span></div>
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
            <div className="rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900 p-6 space-y-3">
                <div className="text-center space-y-1 pb-3 border-b border-sky-100 dark:border-sky-900">
                    <p className="text-sm text-muted-foreground font-medium">Maturity Amount</p>
                    <p className="text-3xl font-extrabold text-primary">{fmt(result.maturity)}</p>
                </div>
                <div className="flex justify-between"><span className="text-sm text-slate-500 font-medium">Total Deposited</span><span className="font-bold">{fmt(result.invested)}</span></div>
                <div className="flex justify-between"><span className="text-sm text-slate-500 font-medium">Interest Earned</span><span className="font-bold text-accent">+{fmt(result.interest)}</span></div>
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
            <div className="rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900 p-6 space-y-3">
                <div className="text-center space-y-1 pb-3 border-b border-sky-100 dark:border-sky-900">
                    <p className="text-sm text-muted-foreground font-medium">Total Value</p>
                    <p className="text-3xl font-extrabold text-primary">{fmt(result.maturity)}</p>
                </div>
                <div className="flex justify-between"><span className="text-sm text-slate-500 font-medium">Invested</span><span className="font-bold">{fmt(result.principal)}</span></div>
                <div className="flex justify-between"><span className="text-sm text-slate-500 font-medium">Returns</span><span className="font-bold text-accent">+{fmt(result.returns)}</span></div>
            </div>
        </div>
    );
}

/* ─── Shared Slider Field ─── */
function SliderField({
    label, prefix, value, onChange, min, max, step, presets,
}: {
    label: string; prefix?: string; value: number; onChange: (v: number) => void; min: number; max: number; step: number; presets?: { label: string; value: number }[];
}) {
    return (
        <div className="space-y-3 p-4 rounded-2xl bg-slate-50/80 dark:bg-sky-950/30 border border-slate-200/60 dark:border-sky-900/40">
            <div className="flex justify-between items-center">
                <label className="text-sm font-extrabold text-slate-800 dark:text-slate-200">{label}</label>
                <div className="relative">
                    {prefix && (
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-black text-sm">{prefix}</span>
                    )}
                    <Input
                        type="number"
                        value={value}
                        onChange={(e) => onChange(Number(e.target.value))}
                        className={`${prefix ? "w-36 pl-7" : "w-24"} h-9 text-right font-black text-primary bg-white dark:bg-slate-900 border-sky-200 dark:border-sky-800 rounded-xl shadow-sm focus-visible:ring-primary`}
                    />
                </div>
            </div>
            
            {presets && presets.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                    {presets.map((preset, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => onChange(preset.value)}
                            className={`px-2.5 py-1 text-[11px] font-black rounded-lg transition-all ${
                                value === preset.value
                                    ? "bg-primary text-white shadow-sm scale-105"
                                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-sky-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                            }`}
                        >
                            {preset.label}
                        </button>
                    ))}
                </div>
            )}

            <Slider
                value={[value]}
                onValueChange={(vals) => onChange(vals[0])}
                min={min}
                max={max}
                step={step}
                className="py-2 cursor-pointer"
            />
        </div>
    );
}

/* ─── Main Universal Calculator ─── */
export function UniversalCalculator() {
    const [active, setActive] = useState<CalcType>("emi");
    return (
        <section className="py-16 md:py-24 bg-[#f8fafc] relative overflow-hidden font-sans border-t border-slate-200">
            <div className="container relative z-10 px-4 md:px-6 mx-auto">
                {/* Header */}
                <div className="text-center mb-12 space-y-3">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-50 px-3.5 py-1 text-xs font-black text-sky-800 tracking-wider uppercase"
                    >
                        <Calculator className="h-3.5 w-3.5 text-[#0284c7]" />
                        Interactive Loan & Wealth Calculator
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                        Calculate EMI & <span className="text-[#0284c7]">Repayment Schedule</span>
                    </h2>
                    <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        Slide to adjust your loan amount and tenure to instantly preview estimated monthly payments and total interest breakdown.
                    </p>
                </div>

                {/* Tab Selector */}
                <div className="flex flex-wrap justify-center gap-2.5 mb-10">
                    {CALC_TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActive(tab.id)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${active === tab.id
                                    ? "bg-[#0284c7] text-white shadow-sm"
                                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100/70"
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Calculator Card */}
                <Card className="max-w-5xl mx-auto bg-white border border-slate-200 shadow-sm rounded-3xl relative overflow-hidden">
                    <CardContent className="p-6 md:p-10 relative z-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
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
