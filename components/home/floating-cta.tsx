"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Zap, PhoneCall, ShieldCheck, X } from "lucide-react";
import { LeadFormModal } from "@/components/dialogs/lead-form-modal";

export function FloatingCTA() {
    const [modalConfig, setModalConfig] = useState<{ isOpen: boolean; type: "general" | "cibil" }>({
        isOpen: false,
        type: "general",
    });
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <>
            <div className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-2">
                {!isExpanded ? (
                    /* Initial Single Compact Dark Navy Button on Left Side */
                    <button
                        onClick={() => setIsExpanded(true)}
                        className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0b1329] hover:bg-[#1e293b] text-white border border-slate-700/80 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                        title="Click to view Instant Loan Sanction & CIBIL options"
                    >
                        <div className="h-6 w-6 rounded-full bg-sky-500/20 text-[#38bdf8] flex items-center justify-center font-black">
                            <ShieldCheck className="h-3.5 w-3.5" />
                        </div>
                        <div className="text-left">
                            <p className="text-[11px] font-extrabold text-white leading-tight flex items-center gap-1.5">
                                <span>Instant Loan Sanction</span>
                                <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
                            </p>
                            <p className="text-[9px] text-[#38bdf8] font-bold">100% Digital & Paperless</p>
                        </div>
                    </button>
                ) : (
                    /* Expanded View: Shows Apply and CIBIL buttons in Dark Navy Theme */
                    <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#0b1329] text-white border border-sky-500/40 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-2 px-2">
                            <div className="h-6 w-6 rounded-full bg-sky-500/20 text-[#38bdf8] flex items-center justify-center font-black">
                                <ShieldCheck className="h-3.5 w-3.5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-extrabold text-white leading-tight">Instant Loan Sanction</p>
                                <p className="text-[8px] text-[#38bdf8] font-bold">Select Option:</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <Button
                                size="sm"
                                className="bg-[#0284c7] hover:bg-[#0369a1] text-white font-black rounded-full px-3 h-7 text-[10px] uppercase tracking-wider shadow-md border-0 cursor-pointer"
                                onClick={() => setModalConfig({ isOpen: true, type: "general" })}
                            >
                                <PhoneCall className="h-2.5 w-2.5 mr-1" />
                                Apply
                            </Button>
                            
                            <Button
                                size="sm"
                                className="border border-sky-500/40 bg-sky-500/15 text-[#38bdf8] hover:bg-[#0284c7] hover:text-white font-black rounded-full px-2.5 h-7 text-[10px] transition-all cursor-pointer"
                                onClick={() => setModalConfig({ isOpen: true, type: "cibil" })}
                            >
                                <Zap className="h-2.5 w-2.5 mr-1 fill-current" />
                                CIBIL
                            </Button>

                            <button
                                onClick={() => setIsExpanded(false)}
                                className="h-6 w-6 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors text-xs cursor-pointer"
                                title="Collapse"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <LeadFormModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
                type={modalConfig.type}
            />
        </>
    );
}
