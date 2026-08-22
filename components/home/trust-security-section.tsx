"use client";

import { ShieldCheck, Lock, Clock, CheckCircle2, Award, FileCheck, ArrowRight, Zap, Headphones } from "lucide-react";
import { motion } from "framer-motion";

const trustBadges = [
    {
        icon: Lock,
        title: "Bank-Level 256-Bit Encryption",
        desc: "All financial records and KYC documents are protected with AES 256-bit military-grade encryption and ISO-certified infrastructure.",
        tag: "100% Encrypted"
    },
    {
        icon: ShieldCheck,
        title: "No Hidden Fees & Transparent",
        desc: "Zero hidden charges, upfront processing fee breakdown, and complete clarity on EMI schedules across 40+ national partner banks.",
        tag: "Zero Surprises"
    },
    {
        icon: Clock,
        title: "Instant Approval Decision",
        desc: "Automated underwriting algorithm provides instant in-principle sanction decisions with digital verification within 2 minutes.",
        tag: "2-Min Decision"
    },
    {
        icon: Award,
        title: "RBI-Regulated Partner Network",
        desc: "Direct lending integrations strictly with RBI-registered commercial banks and Tier-1 NBFCs guaranteeing compliant loan products.",
        tag: "Regulated Lending"
    }
];

export function TrustSecuritySection() {
    return (
        <section className="py-16 md:py-20 bg-white border-y border-slate-200 font-sans relative overflow-hidden">
            {/* Subtle Grid Accent */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a05_1px,transparent_1px),linear-gradient(to_bottom,#0f172a05_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

            <div className="container px-4 md:px-6 mx-auto relative z-10 space-y-12">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-50 px-3.5 py-1 text-xs font-black text-sky-800 tracking-wider uppercase">
                        <ShieldCheck className="h-3.5 w-3.5 text-[#0284c7]" />
                        Bank-Grade Trust & Compliance
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Built on Trust, Backed by Security
                    </h2>
                    <p className="text-slate-600 text-sm md:text-base font-normal leading-relaxed">
                        We adhere to strict banking regulations and state-of-the-art security standards to ensure your loan journey is seamless, private, and 100% transparent.
                    </p>
                </div>

                {/* 4 Crisp Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trustBadges.map((badge, idx) => {
                        const Icon = badge.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08 }}
                                className="p-6 rounded-2xl bg-[#f8fafc] border border-slate-200/90 shadow-sm hover:shadow-md hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between group"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="h-12 w-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#0284c7] shadow-xs group-hover:bg-[#0284c7] group-hover:text-white transition-colors">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-sky-100 text-sky-800 tracking-wider">
                                            {badge.tag}
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0284c7] transition-colors leading-snug">
                                            {badge.title}
                                        </h3>
                                        <p className="text-xs text-slate-600 leading-relaxed">
                                            {badge.desc}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4 mt-4 border-t border-slate-200/80 flex items-center gap-1.5 text-[11px] font-bold text-[#0284c7]">
                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                    <span>Verified Compliance</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Trust Guarantee Strip */}
                <div className="rounded-2xl bg-[#f8fafc] border border-slate-200 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4 text-left">
                        <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center text-[#0284c7] shrink-0">
                            <Zap className="h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="text-base font-extrabold text-slate-900">Zero CIBIL Impact Rate Exploration</h4>
                            <p className="text-xs text-slate-600 mt-0.5">Checking your personalized rates across our 40+ lending partners creates a soft enquiry with no score penalties.</p>
                        </div>
                    </div>

                    <a
                        href="/apply"
                        className="inline-flex items-center gap-2 px-6 h-11 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all whitespace-nowrap cursor-pointer hover:shadow"
                    >
                        <span>Check My Rate</span>
                        <ArrowRight className="h-4 w-4" />
                    </a>
                </div>
            </div>
        </section>
    );
}
