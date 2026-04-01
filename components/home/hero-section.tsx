"use client";

import { Button } from "@/components/ui/button";
import { HeroBannerCarousel } from "@/components/home/hero-banner-carousel";
import { TrendingUp, ShieldCheck, Star } from "lucide-react";
import { useState } from "react";
import { LeadFormModal } from "@/components/dialogs/lead-form-modal";
import { motion } from "framer-motion";

export function HeroSection() {
    const [modalConfig, setModalConfig] = useState<{ isOpen: boolean; type: "general" | "cibil" }>({
        isOpen: false,
        type: "general"
    });

    const openModal = (type: "general" | "cibil") => {
        setModalConfig({ isOpen: true, type });
    };

    const closeModal = () => {
        setModalConfig(prev => ({ ...prev, isOpen: false }));
    };

    return (
        <section className="relative w-full py-12 md:py-20 lg:py-28 overflow-hidden bg-slate-50 dark:bg-black font-sans">
            {/* Background Gradients & Effects - Ocean Theme */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[700px] h-[700px] bg-primary/20 rounded-full blur-[100px] animate-[pulse_6s_ease-in-out_infinite]"></div>
                <div className="absolute top-[40%] -right-[10%] w-[600px] h-[600px] bg-sky-400/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-0 left-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[120px] -translate-x-1/2"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay"></div>
            </div>

            <div className="relative z-10">
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:gap-8 items-center lg:container lg:mx-auto">

                    {/* Text Content */}
                    <div className="space-y-8 px-8 md:px-10 lg:px-0 pb-16 lg:pb-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary dark:border-primary/50 dark:bg-primary/20 dark:text-sky-200 backdrop-blur-md"
                        >
                            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse"></span>
                            Trusted by 10 Lakh+ Indians
                        </motion.div>

                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-7xl/none">
                            Your <span className="text-gradient">Financial Freedom</span> <br className="hidden lg:block" />
                            Starts Here.
                        </h1>

                        <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                            Access premium loans, elite credit cards, and secure investments.
                            Experience customized finance with instant approvals and <span className="text-foreground font-semibold">zero hidden fees</span>.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                size="lg"
                                className="h-14 px-8 text-lg rounded-xl shadow-primary/25 shadow-lg hover:shadow-primary/40 transition-all hover:-translate-y-1 bg-primary hover:bg-sky-600 text-white font-bold"
                                onClick={() => openModal("general")}
                            >
                                Apply for Loan
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-14 px-8 text-lg rounded-xl border-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                                onClick={() => openModal("cibil")}
                            >
                                Check CIBIL Score
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary/10 dark:bg-primary/30 text-primary flex items-center justify-center">
                                    <TrendingUp className="h-5 w-5" />
                                </div>
                                <div className="text-sm">
                                    <p className="font-bold">Lowest Rates</p>
                                    <p className="text-muted-foreground text-xs">Starting 8.35%</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary/10 dark:bg-primary/30 text-primary dark:text-blue-200 flex items-center justify-center">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <div className="text-sm">
                                    <p className="font-bold">Secure Process</p>
                                    <p className="text-muted-foreground text-xs">256-bit Encrypted</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-accent/10 dark:bg-accent/30 text-accent flex items-center justify-center">
                                    <Star className="h-5 w-5" />
                                </div>
                                <div className="text-sm">
                                    <p className="font-bold">4.9/5 Rating</p>
                                    <p className="text-muted-foreground text-xs">Customer Trust</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Banner Carousel (replaces old EMI Calculator) */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative w-full lg:pl-10"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/50 dark:bg-white/5 blur-3xl -z-10 rounded-full hidden lg:block"></div>
                        <HeroBannerCarousel />
                    </motion.div>
                </div>
            </div>

            {/* Modal Injection */}
            <LeadFormModal
                isOpen={modalConfig.isOpen}
                onClose={closeModal}
                type={modalConfig.type}
            />
        </section>
    );
}
