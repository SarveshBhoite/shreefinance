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
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <>
            <div className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-3 p-3 rounded-full bg-[#24272c]/95 backdrop-blur-2xl border border-slate-700 shadow-2xl">
                <div className="flex items-center gap-3 px-3">
                    <div className="h-9 w-9 rounded-full bg-[#00c985]/20 text-[#00c985] flex items-center justify-center font-black">
                        <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-xs font-extrabold text-white">Instant Loan Sanction</p>
                        <p className="text-[10px] text-[#00e699] font-bold">100% Digital & Paperless</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        className="bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black rounded-full px-5 h-10 text-xs tracking-wider uppercase shadow-lg border-0"
                        onClick={() => setModalConfig({ isOpen: true, type: "general" })}
                    >
                        <PhoneCall className="h-3.5 w-3.5 mr-1.5" />
                        Apply for Loan 🚀
                    </Button>
                    
                    <Button
                        size="sm"
                        className="border border-amber-400/40 bg-amber-400/15 text-amber-300 hover:bg-amber-400 hover:text-slate-950 font-black rounded-full px-4 h-10 text-xs transition-all"
                        onClick={() => setModalConfig({ isOpen: true, type: "cibil" })}
                    >
                        <Zap className="h-3.5 w-3.5 mr-1 fill-amber-300" />
                        Free CIBIL
                    </Button>

                    <button
                        onClick={() => setIsVisible(false)}
                        className="h-8 w-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors text-xs ml-1"
                        title="Close Floating Bar"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <LeadFormModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
                type={modalConfig.type}
            />
        </>
    );
}
