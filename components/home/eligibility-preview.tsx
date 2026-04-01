"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Shield, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function EligibilityPreview() {
    return (
        <section className="w-full py-24 bg-gradient-to-br from-sky-950 via-sky-900 to-sky-950 text-white relative overflow-hidden font-sans border-y border-white/5">
            {/* Dynamic Water-inspired Background pattern */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-48 -left-48 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]"></div>
                <div className="absolute -bottom-48 -right-48 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
            </div>

            <div className="container px-4 md:px-6 relative z-10 text-center mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-black text-sky-100 mb-8 backdrop-blur-xl shadow-2xl"
                >
                    <Sparkles className="h-4 w-4 text-accent" />
                    Instant Credit Assessment
                </motion.div>

                <h2 className="text-4xl font-black tracking-tight sm:text-7xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-300 to-accent">
                    The Smart Way to Borrow.
                </h2>

                <p className="text-sky-100/70 text-lg md:text-2xl max-w-3xl mx-auto mb-14 leading-relaxed font-medium">
                    Analyze your borrowing potential across <strong className="text-white">50+ lending partners</strong> in 60 seconds.
                    <span className="block mt-2 font-bold text-accent">Zero impact on your credit score.</span>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
                    {[
                        { icon: Clock, title: "Instant Check", desc: "Results in < 60 Sec", color: "text-accent" },
                        { icon: Shield, title: "Safe & Secure", desc: "256-bit Encrypted", color: "text-primary" },
                        { icon: CheckCircle, title: "Privacy Assured", desc: "100% Confidential", color: "text-emerald-400" }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-xl hover:bg-white/10 transition-all duration-300"
                        >
                            <div className="flex flex-col items-center gap-4">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 shadow-lg ring-1 ring-white/10">
                                    <item.icon className={cn("h-8 w-8 shadow-sm", item.color)} />
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-black tracking-tight mb-1">{item.title}</div>
                                    <div className="text-sm font-bold text-sky-200/50 uppercase tracking-widest">{item.desc}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <Button size="lg" className="h-16 px-12 text-xl rounded-full shadow-2xl shadow-primary/40 bg-primary hover:bg-sky-600 text-white font-black border border-white/20 transition-all hover:scale-105 active:scale-95">
                    Check My Eligibility Now
                </Button>
                <p className="mt-8 text-xs font-bold text-sky-200/40 uppercase tracking-[0.2em]">
                    Free for all users. No commitment required.
                </p>
            </div>
        </section>
    );
}
