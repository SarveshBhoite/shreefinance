"use client";

import { useState } from "react";
import Link from "next/link";
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
    CheckCircle2,
    Users
} from "lucide-react";
import { LeadFormModal } from "@/components/dialogs/lead-form-modal";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import { HeroLoanCarousel, LoanSlideData, LOAN_SLIDER_ITEMS } from "@/components/home/hero-loan-carousel";
import { Deal4LoansApplicationModal, Deal4LoanType } from "@/components/dialogs/deal4loans-application-modal";

export function HeroSection() {
    const [modalConfig, setModalConfig] = useState<{ isOpen: boolean; type: "general" | "cibil" }>({
        isOpen: false,
        type: "general"
    });
    const [selectedLoanType, setSelectedLoanType] = useState<Deal4LoanType>("personal");
    const [isDeal4LoanModalOpen, setIsDeal4LoanModalOpen] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState(2500000);

    const openModal = (type: "general" | "cibil") => {
        setModalConfig({ isOpen: true, type });
    };

    const closeModal = () => {
        setModalConfig(prev => ({ ...prev, isOpen: false }));
    };

    const handleSelectLoan = (loan: LoanSlideData) => {
        let type: Deal4LoanType = "personal";
        if (loan.id.includes("home")) type = "home";
        else if (loan.id.includes("vehicle") || loan.id.includes("car")) type = "car";
        else if (loan.id.includes("property")) type = "lap";
        else if (loan.id.includes("business")) type = "business";
        else type = "personal";

        setSelectedLoanType(type);
        setIsDeal4LoanModalOpen(true);
    };

    const handleOpenLoanType = (type: Deal4LoanType) => {
        setSelectedLoanType(type);
        setIsDeal4LoanModalOpen(true);
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
        <section className="relative w-full bg-[#f8fafc] text-slate-900 font-sans overflow-hidden pt-8 pb-14 md:pt-14 md:pb-20 border-b border-slate-200">
            {/* Background Ambient Radial Lights */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0284c7]/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
            
            {/* Geometric Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c70a_1px,transparent_1px),linear-gradient(to_bottom,#0284c70a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="container px-4 md:px-6 lg:px-8 mx-auto relative z-10 space-y-12">
                {/* 1. Main Hero Grid */}
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left Column: Unique Brand Hero */}
                    <div className="lg:col-span-6 space-y-6">
                        <div className="space-y-3">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-50 px-3.5 py-1 text-[11px] font-black text-[#0284c7] uppercase tracking-widest backdrop-blur-xl"
                            >
                                <Sparkles className="h-3 w-3 text-[#0284c7]" />
                                <span>Shree Finance Digital Hub 2026</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-slate-900"
                            >
                                Smart Digital Loans<br />
                                <span className="text-[#0284c7]">40+ Partner Banks.</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                                className="text-slate-600 text-sm sm:text-base max-w-lg leading-relaxed font-medium"
                            >
                                Compare live interest rates, check instant loan sanction eligibility, and get paperless disbursal from India's premier banking partners.
                            </motion.p>
                        </div>

                        {/* Feature Badges Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-2.5">
                                <div className="h-8 w-8 rounded-lg bg-sky-50 text-[#0284c7] border border-sky-200 flex items-center justify-center shrink-0">
                                    <Zap className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-black text-slate-900">30-Min Approval</p>
                                    <p className="text-[9px] text-slate-500 font-bold">100% Digital KYC</p>
                                </div>
                            </div>

                            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-2.5">
                                <div className="h-8 w-8 rounded-lg bg-sky-50 text-[#0284c7] border border-sky-200 flex items-center justify-center shrink-0">
                                    <TrendingUp className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-black text-slate-900">Lowest Rates</p>
                                    <p className="text-[9px] text-slate-500 font-bold">Starting 8.35% p.a.</p>
                                </div>
                            </div>
                        </div>

                        {/* Action CTA Buttons */}
                        <div className="flex flex-wrap items-center gap-3 pt-1">
                            <Button
                                size="lg"
                                onClick={() => openModal("general")}
                                className="h-12 px-6 text-xs sm:text-sm font-black rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white uppercase tracking-wider transition-all hover:scale-105 shadow-md cursor-pointer"
                            >
                                Get Instant Loan Sanction <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => openModal("cibil")}
                                className="h-12 px-6 text-xs sm:text-sm font-black rounded-full border-sky-300 bg-sky-50 text-[#0284c7] hover:bg-sky-100 uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                            >
                                <Zap className="h-3.5 w-3.5 mr-1.5 fill-[#0284c7] text-[#0284c7]" /> Free CIBIL Check
                            </Button>

                            <Link href="/become-a-partner">
                                <Button
                                    size="lg"
                                    className="h-12 px-6 text-xs sm:text-sm font-black rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white uppercase tracking-wider transition-all hover:scale-105 shadow-md cursor-pointer flex items-center gap-1.5"
                                >
                                    <Users className="h-4 w-4" />
                                    <span>Become a Partner</span>
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Hero Loan Card Carousel (Urban Money Style) */}
                    <div className="lg:col-span-6 lg:-translate-y-8 xl:-translate-y-12 flex flex-col justify-center transition-transform">
                        <HeroLoanCarousel onSelectLoan={handleSelectLoan} />
                    </div>
                </div>

                {/* 2. Bottom Row: 4 Loan Product Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                    {loanProducts.map((prod) => (
                        <div
                            key={prod.id}
                            className="relative overflow-hidden bg-white hover:bg-sky-50/50 border border-slate-200 hover:border-[#0284c7] rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md group cursor-pointer"
                            onClick={() => {
                                if (prod.id.includes("home")) handleOpenLoanType("home");
                                else if (prod.id.includes("car")) handleOpenLoanType("car");
                                else if (prod.id.includes("business") || prod.id.includes("property")) handleOpenLoanType("lap");
                                else handleOpenLoanType("personal");
                            }}
                        >
                            {/* Subtle Ambient Glow on Hover */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-sky-400/10 rounded-full blur-xl pointer-events-none group-hover:bg-sky-400/20 transition-all" />

                            <div className="space-y-3 relative z-10">
                                <div className="flex justify-between items-center">
                                    <div className="h-10 w-10 rounded-xl bg-sky-50 border border-sky-200 text-[#0284c7] flex items-center justify-center group-hover:bg-[#0284c7] group-hover:text-white transition-all">
                                        <prod.icon className="h-5 w-5" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase text-sky-800 px-2.5 py-0.5 rounded-full bg-sky-100 border border-sky-300 shadow-xs">
                                        {prod.badge}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-lg font-black text-slate-900 group-hover:text-[#0284c7] transition-colors">
                                        {prod.title}
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                                        {prod.desc}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-4 flex items-center text-xs font-black text-[#0284c7] group-hover:translate-x-1 transition-transform relative z-10">
                                Apply Direct Bank Facility <ChevronRight className="h-4 w-4 ml-1" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Deal4Loans Direct Bank Facility Interactive Flow Modal */}
            <Deal4LoansApplicationModal
                isOpen={isDeal4LoanModalOpen}
                onClose={() => setIsDeal4LoanModalOpen(false)}
                initialLoanType={selectedLoanType}
            />

            {/* General / CIBIL Modal */}
            <LeadFormModal
                isOpen={modalConfig.isOpen}
                onClose={closeModal}
                type={modalConfig.type}
            />
        </section>
    );
}
