"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Shield, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { LeadFormModal } from "@/components/dialogs/lead-form-modal";

export function EligibilityPreview() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section className="w-full py-20 bg-[#181a1d] text-white relative overflow-hidden font-sans border-t border-slate-800">
                {/* Background Ambient Glow */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-48 -left-48 w-[600px] h-[600px] bg-[#00c985]/10 rounded-full blur-[120px]"></div>
                    <div className="absolute -bottom-48 -right-48 w-[500px] h-[500px] bg-amber-400/5 rounded-full blur-[100px]"></div>
                </div>

                <div className="container px-4 md:px-6 relative z-10 text-center mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-6 py-2 text-xs font-black text-[#00e699] uppercase tracking-widest mb-8 backdrop-blur-xl shadow-2xl"
                    >
                        <Sparkles className="h-4 w-4 text-[#00e699]" />
                        Instant Credit Assessment
                    </motion.div>

                    <h2 className="text-4xl font-black tracking-tight sm:text-6xl mb-6 text-white">
                        The Smart Way to <span className="text-[#00e699]">Borrow.</span>
                    </h2>

                    <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
                        Analyze your borrowing potential across <strong className="text-white">50+ lending partners</strong> in 60 seconds.
                        <span className="block mt-2 font-black text-[#00e699]">Zero impact on your credit score.</span>
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
                        {[
                            { icon: Clock, title: "Instant Check", desc: "Results in < 60 Sec", color: "text-amber-400" },
                            { icon: Shield, title: "Safe & Secure", desc: "256-bit Encrypted", color: "text-[#00c985]" },
                            { icon: CheckCircle, title: "Privacy Assured", desc: "100% Confidential", color: "text-[#00e699]" }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-8 rounded-3xl bg-[#24272c] border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300"
                            >
                                <div className="flex flex-col items-center gap-4">
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 shadow-lg">
                                        <item.icon className={cn("h-8 w-8 shadow-sm", item.color)} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-extrabold text-white">{item.title}</h3>
                                        <p className="text-slate-400 font-bold text-xs mt-1 uppercase tracking-wider">{item.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <Button
                        size="lg"
                        onClick={() => setIsModalOpen(true)}
                        className="h-16 px-10 text-sm font-black rounded-full shadow-2xl bg-[#00c985] hover:bg-[#00b074] text-slate-950 uppercase tracking-widest transition-transform hover:scale-105 active:scale-95"
                    >
                        Check Eligibility Now
                    </Button>
                </div>
            </section>

            <LeadFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type="general"
            />
        </>
    );
}
