"use client";

import { useState } from "react";
import {
    Percent,
    Car,
    CreditCard,
    ChevronRight,
    Sparkles,
    Zap,
    Building2,
    ShieldCheck,
    Coins,
    ArrowRight,
    TrendingUp,
    CheckCircle2
} from "lucide-react";
import { LeadFormModal } from "@/components/dialogs/lead-form-modal";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HeroSection() {
    const [modalConfig, setModalConfig] = useState<{ isOpen: boolean; type: "general" | "cibil" }>({
        isOpen: false,
        type: "general"
    });
    const [selectedAmount, setSelectedAmount] = useState(2500000);

    const openModal = (type: "general" | "cibil") => {
        setModalConfig({ isOpen: true, type });
    };

    const closeModal = () => {
        setModalConfig(prev => ({ ...prev, isOpen: false }));
    };

    const loanProducts = [
        {
            id: "home-loan",
            badge: "8.35% p.a.",
            title: "Home Loan",
            desc: "Zero processing fee deals from 40+ banks",
            icon: Building2,
            type: "general" as const,
        },
        {
            id: "personal-loan",
            badge: "10.25% p.a.",
            title: "Personal Loan",
            desc: "Instant disbursal up to ₹50 Lakhs",
            icon: Coins,
            type: "general" as const,
        },
        {
            id: "business-loan",
            badge: "9.25% p.a.",
            title: "Loan vs Property",
            desc: "High-value capital with low monthly EMI",
            icon: Percent,
            type: "general" as const,
        },
        {
            id: "car-loan",
            badge: "8.75% p.a.",
            title: "Car Loan",
            desc: "Drive away with 100% on-road funding",
            icon: Car,
            type: "general" as const,
        }
    ];

    const formatCurrency = (val: number) => {
        if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
        if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakhs`;
        return `₹${val.toLocaleString('en-IN')}`;
    };

    return (
        <section className="relative w-full bg-[#181a1d] text-white font-sans overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 border-b border-slate-800">
            {/* Background Ambient Radial Lights */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00c985]/15 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
            
            {/* Geometric Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="container px-4 md:px-6 lg:px-8 mx-auto relative z-10 space-y-12">
                {/* 1. Main Hero Grid */}
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left Column: Unique Brand Hero */}
                    <div className="lg:col-span-6 space-y-8">
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-black text-[#00e699] uppercase tracking-widest backdrop-blur-xl"
                            >
                                <Sparkles className="h-3.5 w-3.5 text-[#00e699]" />
                                <span>Shree Finance Digital Hub 2026</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-white"
                            >
                                Smart Digital Loans. <br />
                                <span className="text-[#00e699]">40+ Partner Banks.</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                                className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed font-medium"
                            >
                                Compare live interest rates, check instant loan sanction eligibility, and get paperless disbursal from India's premier banking partners.
                            </motion.p>
                        </div>

                        {/* Feature Badges Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                            <div className="p-4 rounded-2xl bg-[#24272c] border border-slate-800 flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-[#00c985]/15 text-[#00c985] flex items-center justify-center shrink-0">
                                    <Zap className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-white">30-Min Approval</p>
                                    <p className="text-[10px] text-slate-400 font-bold">100% Digital KYC</p>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-[#24272c] border border-slate-800 flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-[#00c985]/15 text-[#00c985] flex items-center justify-center shrink-0">
                                    <TrendingUp className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-white">Lowest Rates</p>
                                    <p className="text-[10px] text-slate-400 font-bold">Starting 8.35% p.a.</p>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-[#24272c] border border-slate-800 flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-[#00c985]/15 text-[#00c985] flex items-center justify-center shrink-0">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-white">Zero CIBIL Impact</p>
                                    <p className="text-[10px] text-slate-400 font-bold">Free Monthly Check</p>
                                </div>
                            </div>
                        </div>

                        {/* Action CTA Buttons */}
                        <div className="flex flex-wrap gap-4 pt-2">
                            <Button
                                size="lg"
                                onClick={() => openModal("general")}
                                className="h-14 px-8 text-sm font-black rounded-full bg-[#00c985] hover:bg-[#00b074] text-slate-950 uppercase tracking-wider transition-all hover:scale-105 shadow-xl"
                            >
                                Get Instant Loan Sanction <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => openModal("cibil")}
                                className="h-14 px-7 text-sm font-black rounded-full border-amber-400/50 bg-amber-400/10 text-amber-300 hover:bg-amber-400 hover:text-slate-950 uppercase tracking-wider transition-all"
                            >
                                <Zap className="h-4 w-4 mr-1.5 fill-amber-300" /> Free CIBIL Check
                            </Button>
                        </div>
                    </div>

                    {/* Right Column: Interactive Digital Sanction Preview Card */}
                    <div className="lg:col-span-6">
                        <div className="bg-[#24272c] border border-slate-800 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
                            {/* Card Decorative Ambient Light */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00c985]/10 rounded-full blur-3xl pointer-events-none" />

                            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-2xl bg-[#00c985]/15 border border-[#00c985]/30 flex items-center justify-center text-[#00c985] font-black">
                                        <Building2 className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-white text-base">Instant Sanction Preview</h3>
                                        <p className="text-xs text-slate-400 font-medium">Select your desired loan amount</p>
                                    </div>
                                </div>
                                <span className="text-xs font-black uppercase text-[#00e699] px-3 py-1 rounded-full bg-[#00c985]/15 border border-[#00c985]/30">
                                    Live Rates
                                </span>
                            </div>

                            {/* Loan Amount Quick Selector */}
                            <div className="space-y-3 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Required Loan Capital</span>
                                    <span className="text-2xl font-black text-[#00e699]">{formatCurrency(selectedAmount)}</span>
                                </div>
                                <div className="flex gap-2 pt-2">
                                    {[500000, 2500000, 5000000, 10000000].map((amt) => (
                                        <button
                                            key={amt}
                                            type="button"
                                            onClick={() => setSelectedAmount(amt)}
                                            className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
                                                selectedAmount === amt
                                                    ? "bg-[#00c985] text-slate-950 shadow-md"
                                                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                            }`}
                                        >
                                            {amt >= 10000000 ? "1 Cr" : amt >= 100000 ? `${amt / 100000}L` : `${amt}`}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Estimated Multi-Bank Rates Box */}
                            <div className="space-y-2.5">
                                <p className="text-xs font-black uppercase tracking-wider text-slate-400">Lowest Available EMI Partner Quotes</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                                        <div>
                                            <p className="text-xs font-extrabold text-white">Shree Direct</p>
                                            <p className="text-[10px] text-slate-400">Nil Processing Fee</p>
                                        </div>
                                        <span className="text-sm font-black text-[#00e699]">8.35%</span>
                                    </div>
                                    <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                                        <div>
                                            <p className="text-xs font-extrabold text-white">YES Bank</p>
                                            <p className="text-[10px] text-slate-400">Digital Sanction</p>
                                        </div>
                                        <span className="text-sm font-black text-[#00e699]">8.40%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card Submit Button */}
                            <Button
                                className="w-full bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black h-14 rounded-2xl uppercase tracking-wider text-sm shadow-xl"
                                onClick={() => openModal("general")}
                            >
                                Apply For Pre-Approved Offer <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* 2. Bottom Row: 4 Loan Product Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                    {loanProducts.map((prod) => (
                        <div
                            key={prod.id}
                            className="bg-[#24272c] hover:bg-[#2a2e34] border border-slate-800 hover:border-[#00c985]/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 shadow-xl group cursor-pointer"
                            onClick={() => openModal(prod.type)}
                        >
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <div className="h-10 w-10 rounded-xl bg-[#00c985]/15 border border-[#00c985]/30 flex items-center justify-center text-[#00c985]">
                                        <prod.icon className="h-5 w-5" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase text-[#00e699] px-2.5 py-0.5 rounded-full bg-[#00c985]/15 border border-[#00c985]/30">
                                        {prod.badge}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-lg font-black text-white group-hover:text-[#00e699] transition-colors">
                                        {prod.title}
                                    </h3>
                                    <p className="text-xs text-slate-400 mt-1 font-medium leading-relaxed">
                                        {prod.desc}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-4 flex items-center text-xs font-black text-[#00e699] group-hover:translate-x-1 transition-transform">
                                Apply Online <ChevronRight className="h-4 w-4 ml-1" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lead Modal */}
            <LeadFormModal
                isOpen={modalConfig.isOpen}
                onClose={closeModal}
                type={modalConfig.type}
            />
        </section>
    );
}
