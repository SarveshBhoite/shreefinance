"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Sparkles, Shield, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const stateRates: Record<string, { male: number; female: number; regFee: number }> = {
    "Maharashtra": { male: 6.0, female: 5.0, regFee: 1.0 },
    "Delhi": { male: 6.0, female: 4.0, regFee: 1.0 },
    "Karnataka": { male: 5.0, female: 5.0, regFee: 1.0 },
    "Tamil Nadu": { male: 7.0, female: 7.0, regFee: 1.0 },
    "Gujarat": { male: 4.9, female: 4.9, regFee: 1.0 },
    "Telangana": { male: 6.0, female: 6.0, regFee: 0.5 },
};

export function StampDutyCalculator() {
    const [propertyValue, setPropertyValue] = useState<number>(7500000); // 75 Lakhs
    const [state, setState] = useState<string>("Maharashtra");
    const [gender, setGender] = useState<"male" | "female">("female");

    const stateInfo = stateRates[state] || stateRates["Maharashtra"];
    const stampRate = gender === "female" ? stateInfo.female : stateInfo.male;
    
    const stampDutyAmount = Math.round(propertyValue * (stampRate / 100));
    const registrationFee = Math.min(30000, Math.round(propertyValue * (stateInfo.regFee / 100))); // Max 30k in many states
    const totalGovernmentFee = stampDutyAmount + registrationFee;

    const formatCurrency = (val: number) => `₹${val.toLocaleString('en-IN')}`;

    return (
        <div className="bg-white dark:bg-sky-950/40 rounded-[2.5rem] p-6 md:p-10 border border-sky-100 dark:border-sky-900 shadow-xl space-y-8 font-sans">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 dark:border-sky-900/60 pb-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary dark:bg-primary/20 text-xs font-black uppercase tracking-widest mb-2">
                        <Building2 className="h-3.5 w-3.5" />
                        State Govt Tax Calculator
                    </div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                        Stamp Duty & Property Registration Fee
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                        Calculate exact state government charges for property registration across major Indian states.
                    </p>
                </div>

                {/* State Selector */}
                <div className="flex items-center gap-2">
                    <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="h-11 px-4 rounded-xl bg-slate-100 dark:bg-sky-900/80 border border-slate-200 dark:border-sky-800 font-bold text-xs text-slate-900 dark:text-white focus:ring-primary"
                    >
                        {Object.keys(stateRates).map(st => (
                            <option key={st} value={st}>{st}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-center">
                {/* Sliders & Buyer Gender Selection */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm font-bold">
                            <span className="text-slate-700 dark:text-slate-300">Agreed Property Value</span>
                            <span className="text-xl font-black text-primary">₹{(propertyValue / 100000).toFixed(1)} Lakhs</span>
                        </div>
                        <Slider
                            value={[propertyValue]}
                            min={1000000}
                            max={50000000}
                            step={500000}
                            onValueChange={(val) => setPropertyValue(val[0])}
                            className="py-2"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                            Primary Buyer Gender (Concession Check)
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setGender("female")}
                                className={`p-4 rounded-2xl border font-bold text-xs uppercase tracking-wider transition-all ${
                                    gender === "female"
                                        ? "border-primary bg-primary text-white shadow-lg"
                                        : "border-slate-200 dark:border-sky-800 bg-slate-50 dark:bg-sky-900/20 text-slate-700 dark:text-slate-300"
                                }`}
                            >
                                👩 Female Buyer ({stateInfo.female}% Stamp Rate)
                            </button>
                            <button
                                type="button"
                                onClick={() => setGender("male")}
                                className={`p-4 rounded-2xl border font-bold text-xs uppercase tracking-wider transition-all ${
                                    gender === "male"
                                        ? "border-primary bg-primary text-white shadow-lg"
                                        : "border-slate-200 dark:border-sky-800 bg-slate-50 dark:bg-sky-900/20 text-slate-700 dark:text-slate-300"
                                }`}
                            >
                                👨 Male Buyer ({stateInfo.male}% Stamp Rate)
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="bg-sky-50 dark:bg-sky-900/20 p-4 rounded-2xl border border-sky-100 dark:border-sky-800">
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-wider">Stamp Duty ({stampRate}%)</p>
                            <p className="text-lg font-black text-slate-900 dark:text-white mt-1">{formatCurrency(stampDutyAmount)}</p>
                        </div>
                        <div className="bg-sky-50 dark:bg-sky-900/20 p-4 rounded-2xl border border-sky-100 dark:border-sky-800">
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-wider">Registration Fee</p>
                            <p className="text-lg font-black text-slate-900 dark:text-white mt-1">{formatCurrency(registrationFee)}</p>
                        </div>
                    </div>
                </div>

                {/* Total Charges Display Card */}
                <div className="lg:col-span-5">
                    <Card className="bg-gradient-to-br from-sky-950 via-slate-900 to-sky-950 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden border border-sky-800/60">
                        <CardContent className="p-0 space-y-6 relative z-10 text-center">
                            <p className="text-xs font-black uppercase tracking-widest text-sky-300">
                                Total Govt Property Registration Fee
                            </p>
                            <motion.div
                                key={totalGovernmentFee}
                                initial={{ scale: 0.9, opacity: 0.8 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-4xl font-black text-sky-400 tracking-tight"
                            >
                                {formatCurrency(totalGovernmentFee)}
                            </motion.div>
                            <p className="text-xs text-slate-300 font-bold uppercase tracking-wider">
                                For {state} State Govt
                            </p>

                            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-left space-y-2 text-xs text-slate-300">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-sky-400 shrink-0" />
                                    <span>Female buyers save up to 1% stamp duty in {state}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-sky-400 shrink-0" />
                                    <span>Registration fee capped at statutory max limits</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
