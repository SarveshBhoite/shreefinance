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
        color: "text-[#00c985] bg-[#00c985]/15 border-[#00c985]/30",
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
        color: "text-[#00c985] bg-[#00c985]/15 border-[#00c985]/30",
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
        <section className="py-20 md:py-24 relative font-sans overflow-hidden bg-[#181a1d] text-white border-t border-slate-800">
            {/* Background Ambient Glow */}
            <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#00c985]/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-400/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="container relative z-10 px-4 md:px-6 mx-auto">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 text-xs font-black text-amber-300 tracking-widest uppercase shadow-sm"
                    >
                        <Sparkles className="h-3.5 w-3.5 fill-amber-300" />
                        The ShreeFinance Edge
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                        Why Millions <span className="text-[#00e699]">Trust ShreeFinance</span>
                    </h2>

                    <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium">
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
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative rounded-3xl p-7 bg-[#24272c] border border-slate-800 hover:border-slate-700 shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
                            >
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center border ${item.color} shadow-inner`}>
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full bg-slate-800 text-slate-300 tracking-wider">
                                            {item.badge}
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-xl font-extrabold text-white group-hover:text-[#00e699] transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-400 text-xs leading-relaxed font-medium">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-[#00e699] group-hover:translate-x-1 transition-transform">
                                    <span>Learn Details</span>
                                    <ArrowUpRight className="h-4 w-4" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Trust Banner Callout */}
                <div className="mt-16 rounded-3xl bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-400 p-0.5 shadow-2xl">
                    <div className="rounded-[22px] bg-[#181a1d] p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-6">
                            <div className="h-16 w-16 rounded-2xl bg-[#00c985]/15 border border-[#00c985]/30 flex items-center justify-center shrink-0 text-[#00c985]">
                                <UserCheck className="h-8 w-8" />
                            </div>
                            <div>
                                <h4 className="text-2xl font-black tracking-tight text-white">Need Expert Financial Advice?</h4>
                                <p className="text-slate-400 text-sm font-medium mt-1">Our certified loan advisors help you pick the best loan offer with maximum tax benefits.</p>
                            </div>
                        </div>
                        <Button
                            size="lg"
                            onClick={() => setIsModalOpen(true)}
                            className="bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black rounded-full px-8 h-14 text-sm uppercase tracking-wider shrink-0 shadow-xl transition-transform hover:scale-105 active:scale-95"
                        >
                            Talk to Financial Advisor
                        </Button>
                    </div>
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
