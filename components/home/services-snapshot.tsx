"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wallet, CreditCard, ShieldCheck, TrendingUp, Zap, ChevronRight, Star, Quote, CheckCircle, ThumbsUp, Building2, UserCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
    {
        title: "Instant Loans",
        description: "Personal, Home & Business loans approved in minutes.",
        icon: Wallet,
        href: "/loans/personal-loan",
        features: ["Low Rates", "Quick Disbursal"],
        color: "bg-[#0284c7]",
        lightColor: "bg-[#0284c7]/15 text-[#0284c7]",
    },
    {
        title: "Premium Cards",
        description: "Lifestyle credit cards with zero joining fees & max rewards.",
        icon: CreditCard,
        href: "/cards/credit-cards",
        features: ["Lounge Access", "Cashback"],
        color: "bg-amber-400 text-slate-950",
        lightColor: "bg-amber-400/15 text-amber-300",
    },
    {
        title: "Insurance",
        description: "Comprehensive protection for your family, car & assets.",
        icon: ShieldCheck,
        href: "/insurance/health",
        features: ["Cashless Claims", "Tax Benefits"],
        color: "bg-[#0284c7]",
        lightColor: "bg-[#0284c7]/15 text-[#0284c7]",
    },
    {
        title: "Investments",
        description: "High-growth Mutual Funds & Stocks to build your wealth.",
        icon: TrendingUp,
        href: "/investments/stocks",
        features: ["Expert Advice", "Zero Brokerage"],
        color: "bg-amber-400 text-slate-950",
        lightColor: "bg-amber-400/15 text-amber-300",
    },
];

const customerReviews = [
    {
        name: "Akash Arun Jadhav",
        role: "Software Engineer, Pune",
        product: "Personal Loan (HDFC Bank)",
        amount: "₹3,37,240 Disbursed",
        rating: 5,
        date: "August 2026",
        avatar: "AJ",
        avatarBg: "bg-sky-600",
        review: "Got my personal loan disbursed within 48 hours without any hassle. The relationship manager Sarvesh Bhoite guided me through the digital KYC. Transparent charges and zero hidden fees!",
        verified: true,
        bank: "HDFC Bank"
    },
    {
        name: "Siddhi Bhoite",
        role: "Entrepreneur & Business Owner, Pune",
        product: "Car Loan (SBI Bank)",
        amount: "₹8,50,000 Disbursed",
        rating: 5,
        date: "August 2026",
        avatar: "SB",
        avatarBg: "bg-emerald-600",
        review: "Best financial consultancy in Pune. They compared live rates across 40+ banks and secured the lowest 8.65% interest rate for my car loan. Extremely professional service.",
        verified: true,
        bank: "State Bank of India"
    },
    {
        name: "Aishwarya Sulagadle",
        role: "Healthcare Professional, Pune",
        product: "Education Loan (ICICI Bank)",
        amount: "₹15,00,000 Sanctioned",
        rating: 5,
        date: "August 2026",
        avatar: "AS",
        avatarBg: "bg-indigo-600",
        review: "Seamless documentation process for my international higher education loan. Shree Finance took care of the sanction letter and bank login in record time. Highly recommended!",
        verified: true,
        bank: "ICICI Bank"
    },
    {
        name: "Atharva Patharkar",
        role: "Chartered Accountant, PCMC",
        product: "Business Loan & Premium Cards",
        amount: "₹25,00,000 Disbursed",
        rating: 5,
        date: "August 2026",
        avatar: "AP",
        avatarBg: "bg-amber-600",
        review: "As a financial consultant myself, I appreciate their fast turnaround and direct bank tie-ups. Working capital loan and lifetime free credit cards approved with zero friction.",
        verified: true,
        bank: "Kotak & Axis"
    }
];

export function ServicesSnapshot() {
    return (
        <section className="py-20 md:py-24 relative font-sans overflow-hidden bg-[#f8fafc] text-slate-900 border-t border-slate-200">
            <div className="container px-4 md:px-6 relative z-10 mx-auto space-y-20">
                {/* 1. Core Financial Offerings Section */}
                <div className="space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div className="space-y-3">
                            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-50 px-4 py-1.5 text-xs font-black text-sky-800 uppercase tracking-wider">
                                <Zap className="h-3.5 w-3.5 text-[#0284c7]" />
                                Complete Financial Portfolio
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
                                Our Core <span className="text-[#0284c7]">Financial Offerings</span>
                            </h2>
                            <p className="text-slate-600 text-sm md:text-base max-w-xl">
                                From instant personal loans to high-yield investment options, we provide end-to-end financial solutions.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 }}
                                >
                                    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between h-full group">
                                        <CardHeader className="space-y-4">
                                            <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-sky-50 text-[#0284c7] border border-sky-200 shadow-xs group-hover:bg-[#0284c7] group-hover:text-white transition-colors">
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-[#0284c7] transition-colors">
                                                {service.title}
                                            </CardTitle>
                                            <CardDescription className="text-slate-600 text-xs leading-relaxed font-normal">
                                                {service.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <div className="flex flex-wrap gap-1.5">
                                                {service.features.map((feature, i) => (
                                                    <span key={i} className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        </CardContent>
                                        <CardFooter className="pt-4 border-t border-slate-100">
                                            <Link href={service.href} className="w-full flex items-center justify-between text-xs font-bold text-[#0284c7] group-hover:translate-x-1 transition-transform">
                                                <span>Explore Options</span>
                                                <ChevronRight className="h-4 w-4" />
                                            </Link>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* 2. Customer Reviews & Verified Experience Section */}
                <div className="pt-8 border-t border-slate-200 space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div className="space-y-3">
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-4 py-1.5 text-xs font-black text-emerald-800 uppercase tracking-wider">
                                <ThumbsUp className="h-3.5 w-3.5 text-emerald-600" />
                                Real Borrower Testimonials
                            </div>
                            <h3 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
                                What Our <span className="text-[#0284c7]">Clients Say</span>
                            </h3>
                            <p className="text-slate-600 text-sm md:text-base max-w-xl">
                                Real experiences and feedback from satisfied loan and card applicants across Maharashtra.
                            </p>
                        </div>

                        {/* Overall Rating Pill */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-4">
                            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-amber-50 text-amber-500 font-black text-xl border border-amber-200">
                                4.9
                            </div>
                            <div>
                                <div className="flex items-center gap-1 text-amber-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-amber-400" />
                                    ))}
                                </div>
                                <p className="text-xs text-slate-500 font-bold mt-0.5">Based on 1,420+ Verified Loan Reviews</p>
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
                                    {/* Quote decoration */}
                                    <Quote className="h-6 w-6 text-sky-100 absolute top-5 right-5 group-hover:text-sky-200 transition-colors" />

                                    <div className="space-y-3">
                                        {/* Stars & Tag */}
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

                                        {/* Review text */}
                                        <p className="text-slate-700 text-xs leading-relaxed italic">
                                            &ldquo;{rev.review}&rdquo;
                                        </p>
                                    </div>

                                    {/* User details */}
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
        </section>
    );
}
