"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Wallet, CreditCard, ShieldCheck, TrendingUp, Zap, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const services = [
    {
        title: "Instant Loans",
        description: "Personal, Home & Business loans approved in minutes.",
        icon: Wallet,
        href: "/loans/personal-loan",
        features: ["Low Rates", "Quick Disbursal"],
        color: "bg-primary",
        lightColor: "bg-primary/10 text-primary",
    },
    {
        title: "Premium Cards",
        description: "Lifestyle credit cards with zero joining fees & max rewards.",
        icon: CreditCard,
        href: "/cards/credit-cards",
        features: ["Lounge Access", "Cashback"],
        color: "bg-accent",
        lightColor: "bg-accent/10 text-accent",
    },
    {
        title: "Insurance",
        description: "Comprehensive protection for your family, car & assets.",
        icon: ShieldCheck,
        href: "/insurance/health",
        features: ["Cashless Claims", "Tax Benefits"],
        color: "bg-primary",
        lightColor: "bg-primary/10 text-primary",
    },
    {
        title: "Investments",
        description: "High-growth Mutual Funds & Stocks to build your wealth.",
        icon: TrendingUp,
        href: "/investments/stocks",
        features: ["Expert Advice", "Zero Brokerage"],
        color: "bg-accent",
        lightColor: "bg-accent/10 text-accent",
    },
];

export function ServicesSnapshot() {
    return (
        <section className="py-20 md:py-28 relative font-sans overflow-hidden bg-white dark:bg-black">
            {/* Water-inspired background elements */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-400/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="container px-4 md:px-6 relative z-10 mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-bold text-primary dark:border-primary/50 dark:bg-primary/20 dark:text-sky-200"
                        >
                            <Zap className="h-4 w-4 text-accent" />
                            Elite Financial Suite
                        </motion.div>
                        <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl">
                            Holistic <span className="text-gradient">Financial Solutions</span>
                        </h2>
                        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
                            Everything you need to manage, grow, and protect your money—all in one place.
                        </p>
                    </div>
                    <Link href="/loans/personal-loan">
                        <Button variant="ghost" className="hidden md:inline-flex group text-primary font-bold hover:bg-primary/10 h-12 px-6 rounded-xl border border-primary/10">
                            View All Services <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mx-auto">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Card className="group glass-card border-none hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-3 relative overflow-hidden h-full flex flex-col ring-1 ring-primary/5 bg-white/80 dark:bg-sky-950/20 backdrop-blur-xl">
                                {/* Water-inspired Hover Gradient Overlay */}
                                <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500", service.color)}></div>
                                
                                {/* Decorative Corner Accent */}
                                <div className={cn("absolute top-0 right-0 w-16 h-16 opacity-10 transition-all duration-500 group-hover:w-24 group-hover:h-24 rounded-bl-full", service.color)}></div>

                                <CardHeader className="pb-4 relative z-10">
                                    <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-primary/20", service.lightColor)}>
                                        <service.icon className="h-8 w-8" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">{service.title}</CardTitle>
                                    <CardDescription className="line-clamp-2 mt-3 leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                                        {service.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pb-6 flex-grow relative z-10">
                                    <div className="space-y-4">
                                        {service.features.map((feat, i) => (
                                            <div key={i} className="flex items-center text-sm font-bold text-slate-600 dark:text-slate-400">
                                                <div className={cn("h-2 w-2 rounded-full mr-3 shadow-sm", service.color)}></div>
                                                {feat}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-2 pb-6 relative z-10 mt-auto">
                                    <Link href={service.href} className="w-full">
                                        <Button variant="ghost" className="w-full justify-between group/btn hover:bg-primary hover:text-white border border-primary/10 font-bold h-12 px-6 rounded-xl transition-all">
                                            Check Offers
                                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link href="/loans/personal-loan">
                        <Button variant="outline" className="w-full h-12 rounded-xl font-bold border-primary/20 text-primary">View All Services</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
