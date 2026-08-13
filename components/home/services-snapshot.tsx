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
        color: "bg-[#00c985]",
        lightColor: "bg-[#00c985]/15 text-[#00c985]",
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
        color: "bg-[#00c985]",
        lightColor: "bg-[#00c985]/15 text-[#00c985]",
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
        <section className="py-20 md:py-24 relative font-sans overflow-hidden bg-[#181a1d] text-white border-t border-slate-800">
            {/* Background Ambient Glow */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00c985]/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="container px-4 md:px-6 relative z-10 mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-black text-[#00e699] uppercase tracking-widest">
                            <Zap className="h-3.5 w-3.5 fill-[#00e699]" />
                            Comprehensive Suite
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                            All-in-One <span className="text-[#00e699]">Financial Ecosystem</span>
                        </h2>
                        <p className="text-slate-300 text-base max-w-xl font-medium">
                            Choose from loans, credit cards, insurance policies, and wealth investments tailored for your lifestyle.
                        </p>
                    </div>

                    <Link href="/loans/personal-loan">
                        <button className="bg-[#00c985] hover:bg-[#00b074] text-slate-950 px-6 py-3 rounded-full font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
                            View All Products <ChevronRight className="h-4 w-4" />
                        </button>
                    </Link>
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
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="bg-[#24272c] border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between h-full group p-6 rounded-3xl">
                                    <CardHeader className="p-0 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center border border-white/10 ${service.lightColor}`}>
                                                <Icon className="h-6 w-6" />
                                            </div>
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl font-black text-white group-hover:text-[#00e699] transition-colors">
                                                {service.title}
                                            </CardTitle>
                                            <CardDescription className="text-xs text-slate-400 mt-2 leading-relaxed font-medium">
                                                {service.description}
                                            </CardDescription>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="p-0 my-6">
                                        <div className="flex flex-wrap gap-2">
                                            {service.features.map((feat, i) => (
                                                <span key={i} className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                                                    {feat}
                                                </span>
                                            ))}
                                        </div>
                                    </CardContent>

                                    <CardFooter className="p-0 pt-4 border-t border-slate-800">
                                        <Link href={service.href} className="w-full">
                                            <button className="w-full py-2.5 rounded-full border border-white/30 text-white hover:bg-white hover:text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all">
                                                Explore Offers <ChevronRight className="h-3.5 w-3.5" />
                                            </button>
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
