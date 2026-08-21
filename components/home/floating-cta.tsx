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
                    /* Initial Single Compact Button */
                    <button
                        onClick={() => setIsExpanded(true)}
                        className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#1e2126]/95 hover:bg-[#252a32] backdrop-blur-2xl border border-slate-700/80 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                        title="Click to view Instant Loan Sanction & CIBIL options"
                    >
                        <div className="h-7 w-7 rounded-full bg-[#00c985]/20 text-[#00c985] flex items-center justify-center font-black">
                            <ShieldCheck className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                            <p className="text-xs font-extrabold text-white leading-tight flex items-center gap-1.5">
                                <span>Instant Loan Sanction</span>
                                <span className="h-2 w-2 rounded-full bg-[#00c985] animate-pulse" />
                            </p>
                            <p className="text-[10px] text-[#00e699] font-bold">100% Digital & Paperless</p>
                        </div>
                    </button>
                ) : (
                    /* Expanded View: Shows Apply and CIBIL buttons */
                    <div className="flex items-center gap-2 p-2 rounded-full bg-[#1e2126]/98 backdrop-blur-2xl border border-emerald-500/40 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-2 px-2.5">
                            <div className="h-7 w-7 rounded-full bg-[#00c985]/20 text-[#00c985] flex items-center justify-center font-black">
                                <ShieldCheck className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-[11px] font-extrabold text-white leading-tight">Instant Loan Sanction</p>
                                <p className="text-[9px] text-[#00e699] font-bold">Select Option:</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <Button
                                size="sm"
                                className="bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black rounded-full px-3.5 h-8 text-[11px] uppercase tracking-wider shadow-md border-0 cursor-pointer"
                                onClick={() => setModalConfig({ isOpen: true, type: "general" })}
                            >
                                <PhoneCall className="h-3 w-3 mr-1" />
                                Apply 🚀
                            </Button>
                            
                            <Button
                                size="sm"
                                className="border border-amber-400/40 bg-amber-400/15 text-amber-300 hover:bg-amber-400 hover:text-slate-950 font-black rounded-full px-3 h-8 text-[11px] transition-all cursor-pointer"
                                onClick={() => setModalConfig({ isOpen: true, type: "cibil" })}
                            >
                                <Zap className="h-3 w-3 mr-1 fill-amber-300" />
                                Free CIBIL
                            </Button>

                            <button
                                onClick={() => setIsExpanded(false)}
                                className="h-7 w-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors text-xs ml-0.5 cursor-pointer"
                                title="Collapse"
                            >
                                <X className="h-3.5 w-3.5" />
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
