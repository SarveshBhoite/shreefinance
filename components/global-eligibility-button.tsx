"use client";

import { useState } from "react";
import { Sparkles, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Deal4LoansApplicationModal, Deal4LoanType } from "@/components/dialogs/deal4loans-application-modal";
import { motion } from "framer-motion";

export function GlobalEligibilityButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [loanType, setLoanType] = useState<Deal4LoanType>("car");

    return (
        <>
            <div className="fixed bottom-24 right-6 z-50 flex items-center">
                {/* Check Eligibility Button (Compact Size) */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative group"
                >
                    {/* Glowing Aura Ring */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#0284c7] to-emerald-400 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition duration-300 animate-pulse pointer-events-none" />

                    <Button
                        onClick={() => {
                            setLoanType("car");
                            setIsOpen(true);
                        }}
                        className="relative bg-[#0284c7] hover:bg-[#0369a1] text-slate-950 font-black text-xs h-10 px-3.5 sm:px-4 rounded-full shadow-xl uppercase tracking-wider flex items-center gap-1.5 border border-sky-300/40 transition-transform active:scale-95 cursor-pointer"
                        title="Check Eligibility & Compare Offers"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950" />
                        </span>
                        <Sparkles className="h-3.5 w-3.5 text-slate-950 shrink-0" />
                        <span className="text-[11px] font-extrabold whitespace-nowrap">Check Eligibility</span>
                    </Button>
                </motion.div>
            </div>

            <Deal4LoansApplicationModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                initialLoanType={loanType}
            />
        </>
    );
}
