"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wallet, CreditCard, ShieldCheck, TrendingUp, Zap, ChevronRight } from "lucide-react";
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

export function ServicesSnapshot() {
    return (
        <section className="py-20 md:py-24 relative font-sans overflow-hidden bg-[#f8fafc] text-slate-900 border-t border-slate-200">
            <div className="container px-4 md:px-6 relative z-10 mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
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
        </section>
    );
}
