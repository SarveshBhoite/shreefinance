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
            <div className="fixed bottom-20 right-6 z-50 flex items-center">
                {/* Check Eligibility Button (Compact Size stacked cleanly above AI Bot) */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative group"
                >
                    <Button
                        onClick={() => {
                            setLoanType("car");
                            setIsOpen(true);
                        }}
                        className="relative bg-[#0b1329] hover:bg-[#1e293b] text-white font-black text-xs h-9 px-3.5 rounded-full shadow-xl uppercase tracking-wider flex items-center gap-1.5 border border-sky-500/40 transition-transform active:scale-95 cursor-pointer"
                        title="Check Eligibility & Compare Offers"
                    >
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38bdf8] opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#38bdf8]" />
                        </span>
                        <Sparkles className="h-3 w-3 text-[#38bdf8] shrink-0" />
                        <span className="text-[10px] font-black tracking-wider whitespace-nowrap">Check Eligibility</span>
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
