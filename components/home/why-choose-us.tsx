"use client";

import { Zap, Percent, Clock, Lock, Sparkles, UserCheck, ArrowUpRight, Star, Quote, CheckCircle, ThumbsUp } from "lucide-react";
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

const customerReviews = [
    {
        name: "Akash Arun Jadhav",
        role: "Software Engineer, Pune",
        product: "Personal Loan",
        amount: "₹3,37,240 Disbursed",
        rating: 5,
        avatar: "AJ",
        avatarBg: "bg-sky-600",
        review: "Got my personal loan disbursed within 48 hours without any hassle. The relationship manager Sarvesh Bhoite guided me through the digital KYC. Transparent charges and zero hidden fees!",
        bank: "HDFC Bank"
    },
    {
        name: "Siddhi Bhoite",
        role: "Entrepreneur & Business Owner, Pune",
        product: "Car Loan",
        amount: "₹8,50,000 Disbursed",
        rating: 5,
        avatar: "SB",
        avatarBg: "bg-emerald-600",
        review: "Best financial consultancy in Pune. They compared live rates across 40+ banks and secured the lowest 8.65% interest rate for my car loan. Extremely professional service.",
        bank: "State Bank of India"
    },
    {
        name: "Aishwarya Sulagadle",
        role: "Healthcare Professional, Pune",
        product: "Education Loan",
        amount: "₹15,00,000 Sanctioned",
        rating: 5,
        avatar: "AS",
        avatarBg: "bg-indigo-600",
        review: "Seamless documentation process for my international higher education loan. Shree Finance took care of the sanction letter and bank login in record time. Highly recommended!",
        bank: "ICICI Bank"
    },
    {
        name: "Atharva Patharkar",
        role: "Chartered Accountant, PCMC",
        product: "Business Loan & Cards",
        amount: "₹25,00,000 Disbursed",
        rating: 5,
        avatar: "AP",
        avatarBg: "bg-amber-600",
        review: "As a financial consultant myself, I appreciate their fast turnaround and direct bank tie-ups. Working capital loan and lifetime free credit cards approved with zero friction.",
        bank: "Kotak & Axis"
    }
];

export function WhyChooseUs() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="py-20 md:py-24 relative font-sans overflow-hidden bg-[#f8fafc] text-slate-900 border-t border-slate-200">
            <div className="container relative z-10 px-4 md:px-6 mx-auto space-y-20">
                {/* 1. Header & Features Grid */}
                <div className="space-y-16">
                    <div className="text-center max-w-3xl mx-auto space-y-3">
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
                    <div className="rounded-2xl bg-white border border-slate-200 shadow-md p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
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

                {/* 2. Customer Reviews & Verified Experience Section */}
                <div className="pt-12 border-t border-slate-200 space-y-16">
                    {/* Top Key Metrics Banner (2100 Approval, 99% Satisfaction, 90+ Partners, 70+ Awards) */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-b border-slate-200/80">
                        {/* Stat 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.05 }}
                            className="flex flex-col items-center text-center space-y-2 group"
                        >
                            <div className="h-14 w-14 rounded-2xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-[#0284c7] group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 text-[#0284c7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                                    <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
                                    <circle cx="18" cy="14" r="1" />
                                </svg>
                            </div>
                            <span className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">2100</span>
                            <span className="text-xs font-semibold text-slate-500 max-w-[150px]">Successful Loan Approval</span>
                        </motion.div>

                        {/* Stat 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-col items-center text-center space-y-2 group"
                        >
                            <div className="h-14 w-14 rounded-2xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-[#0284c7] group-hover:scale-110 transition-transform">
                                <ThumbsUp className="w-8 h-8 text-[#0284c7]" />
                            </div>
                            <span className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">99%</span>
                            <span className="text-xs font-semibold text-slate-500 max-w-[150px]">Customer Satisfaction</span>
                        </motion.div>

                        {/* Stat 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="flex flex-col items-center text-center space-y-2 group"
                        >
                            <div className="h-14 w-14 rounded-2xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-[#0284c7] group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 text-[#0284c7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <span className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">90+</span>
                            <span className="text-xs font-semibold text-slate-500 max-w-[150px]">Office National Partners</span>
                        </motion.div>

                        {/* Stat 4 */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col items-center text-center space-y-2 group"
                        >
                            <div className="h-14 w-14 rounded-2xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-[#0284c7] group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 text-[#0284c7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="8" r="6" />
                                    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                                </svg>
                            </div>
                            <span className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">70+</span>
                            <span className="text-xs font-semibold text-slate-500 max-w-[150px]">Award Certificate</span>
                        </motion.div>
                    </div>

                    <div className="text-center max-w-3xl mx-auto space-y-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-50 px-4 py-1.5 text-xs font-black text-sky-800 uppercase tracking-wider mx-auto">
                            <ThumbsUp className="h-3.5 w-3.5 text-[#0284c7]" />
                            Real Customer Testimonials
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
                            Verified Client <span className="text-[#0284c7]">Experiences</span>
                        </h3>
                        <p className="text-slate-600 text-base md:text-lg leading-relaxed font-normal max-w-2xl mx-auto">
                            Real experiences and verified reviews from borrowers across Pune & Maharashtra who secured funding through Shree Finance.
                        </p>

                        {/* Overall Rating Pill - Centered */}
                        <div className="inline-flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-left mt-2">
                            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-amber-50 text-amber-500 font-black text-xl border border-amber-200 shrink-0">
                                4.9
                            </div>
                            <div>
                                <div className="flex items-center gap-1 text-amber-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-amber-400" />
                                    ))}
                                </div>
                                <p className="text-xs text-slate-500 font-bold mt-0.5">Based on 1,420+ Verified Reviews</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {customerReviews.map((rev, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                            >
                                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between h-full space-y-4 relative group">
                                    <Quote className="h-6 w-6 text-sky-100 absolute top-5 right-5 group-hover:text-sky-200 transition-colors" />

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-0.5 text-amber-400">
                                                {[...Array(rev.rating)].map((_, i) => (
                                                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                                                ))}
                                            </div>
                                            <span className="text-[10px] font-black text-[#0284c7] bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full">
                                                {rev.amount}
                                            </span>
                                        </div>

                                        <p className="text-slate-700 text-xs leading-relaxed italic">
                                            &ldquo;{rev.review}&rdquo;
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                                        <div className={`h-10 w-10 rounded-full ${rev.avatarBg} text-white font-black text-xs flex items-center justify-center shadow-xs shrink-0`}>
                                            {rev.avatar}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-1">
                                                <p className="text-xs font-black text-slate-900 truncate">{rev.name}</p>
                                                <CheckCircle className="h-3.5 w-3.5 text-[#0284c7] shrink-0" />
                                            </div>
                                            <p className="text-[10px] text-slate-500 truncate">{rev.role}</p>
                                            <p className="text-[10px] text-slate-400 font-semibold">{rev.product} • {rev.bank}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
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
