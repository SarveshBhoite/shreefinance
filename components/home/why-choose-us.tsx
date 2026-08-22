"use client";

import { Zap, Percent, Clock, Lock, Sparkles, UserCheck, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LeadFormModal } from "@/components/dialogs/lead-form-modal";

const features = [
    {
        icon: Zap,
        title: "15-Minute Instant Approval",
        description: "Powered by AI-based automated underwriting. Sanction letters delivered directly to your email in minutes.",
        badge: "Fastest in Industry",
        color: "text-[#0284c7] bg-[#0284c7]/15 border-[#0284c7]/30",
    },
    {
        icon: Percent,
        title: "Lowest Interest Guarantee",
        description: "Exclusive partnership pricing with 50+ leading national banks and NBFCs to get you the lowest APR.",
        badge: "Rates from 8.35%",
        color: "text-amber-400 bg-amber-400/15 border-amber-400/30",
    },
    {
        icon: Clock,
        title: "Zero Hidden Charges",
        description: "100% transparent terms with zero processing fee options and no surprise pre-closure penalties.",
        badge: "100% Transparent",
        color: "text-[#0284c7] bg-[#0284c7]/15 border-[#0284c7]/30",
    },
    {
        icon: Lock,
        title: "256-Bit Bank-Grade Security",
        description: "Your financial privacy and documents are protected with high-level encryption standards.",
        badge: "ISO Certified",
        color: "text-amber-400 bg-amber-400/15 border-amber-400/30",
    },
];

export function WhyChooseUs() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="py-20 md:py-24 relative font-sans overflow-hidden bg-[#f8fafc] text-slate-900 border-t border-slate-200">
            <div className="container relative z-10 px-4 md:px-6 mx-auto">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-50 px-4 py-1.5 text-xs font-black text-sky-800 tracking-wider uppercase"
                    >
                        <Sparkles className="h-3.5 w-3.5 text-[#0284c7]" />
                        The Shree Finance Advantage
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
                        Why Millions <span className="text-[#0284c7]">Trust Our Platform</span>
                    </h2>

                    <p className="text-slate-600 text-base md:text-lg leading-relaxed font-normal">
                        We streamline complex financial procedures into a seamless, digital-first experience tailored for your individual needs.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                className="group relative rounded-2xl p-7 bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between"
                            >
                                <div className="space-y-5">
                                    <div className="flex items-center justify-between">
                                        <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-sky-50 text-[#0284c7] border border-sky-200 shadow-xs">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 tracking-wider">
                                            {item.badge}
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0284c7] transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-600 text-xs leading-relaxed font-normal">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0284c7] group-hover:translate-x-1 transition-transform">
                                    <span>Learn Details</span>
                                    <ArrowUpRight className="h-4 w-4" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Trust Banner Callout */}
                <div className="mt-16 rounded-2xl bg-white border border-slate-200 shadow-md p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-5">
                        <div className="h-14 w-14 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center shrink-0 text-[#0284c7]">
                            <UserCheck className="h-7 w-7" />
                        </div>
                        <div>
                            <h4 className="text-2xl font-extrabold tracking-tight text-slate-900">Need Expert Financial Guidance?</h4>
                            <p className="text-slate-600 text-sm font-normal mt-1">Our certified loan advisors help you pick the best loan offer with maximum tax benefits.</p>
                        </div>
                    </div>
                    <Button
                        size="lg"
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold rounded-xl px-8 h-12 text-xs uppercase tracking-wider shrink-0 shadow-sm transition-all hover:shadow cursor-pointer"
                    >
                        Talk to Financial Advisor
                    </Button>
                </div>
            </div>

            <LeadFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type="general"
            />
        </section>
    );
}
