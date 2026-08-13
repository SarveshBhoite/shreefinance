"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadFormModal } from "@/components/dialogs/lead-form-modal";
import { motion } from "framer-motion";

export function GlobalEligibilityButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="fixed bottom-24 right-6 z-50 flex items-center">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative group"
                >
                    {/* Glowing Aura Ring */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#00c985] to-emerald-400 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse pointer-events-none" />

                    <Button
                        onClick={() => setIsOpen(true)}
                        className="relative bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black text-xs md:text-sm px-5 py-3 md:px-6 md:py-3.5 rounded-full shadow-2xl uppercase tracking-wider flex items-center gap-2 border border-emerald-300/40 transition-transform active:scale-95 cursor-pointer"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-950" />
                        </span>
                        <Sparkles className="h-4 w-4 text-slate-950" />
                        <span>Check Your Eligibility</span>
                    </Button>
                </motion.div>
            </div>

            <LeadFormModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                type="general"
            />
        </>
    );
}
