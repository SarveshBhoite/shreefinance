"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, Building2 } from "lucide-react";
import { useState } from "react";
import { LeadFormModal } from "@/components/dialogs/lead-form-modal";
import Image from "next/image";

const banks = [
    { name: "HDFC Bank", logo: "/bank logo/hd6833h547-hdfc-bank-logo-hdfc-bank-logo-and-symbol-meaning-history-png.png" },
    { name: "SBI", logo: "/bank logo/pngegg.png" },
    { name: "ICICI Bank", logo: "/bank logo/627cc5351b2e263b45696a89.png" },
    { name: "Axis Bank", logo: "/bank logo/axis-bank-logo-02.png" },
    { name: "Kotak", logo: "/bank logo/KOTAKBANK.NS.png" },
    { name: "Bajaj Finserv", logo: "/bank logo/clipart2057950.png" },
    { name: "Bank of Baroda" },
    { name: "PNB" },
    { name: "TATA Capital" },
    { name: "prefr" },
    { name: "Union Bank of India", logo: "/bank logo/union-bank-of-india-logo-01.png" },
    { name: "IDFC First Bank" },
    { name: "Indusind Bank" },
    { name: "DCB Bank" },
    { name: "YES Bank" },
    { name: "CITI" },
    { name: "LIC HFL" },
    { name: "DHFL" },
    { name: "UGRO" },
    { name: "Canera Bank", logo: "/bank logo/Canara-Bank-Logo.png" },
    { name: "RBL Bank" },
    { name: "Bank of India", logo: "/bank logo/Bank_of_India_logo_PNG1.png" },
    { name: "Saraswat Bank", logo: "/bank logo/sarawast-bank-logo-01.png" },
];

export function PartnerLogos() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="py-16 md:py-20 bg-white dark:bg-[#141618] text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800 relative font-sans overflow-hidden transition-colors duration-300">
            {/* Background Abstract Glowing Lines & Ambient Effect */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#00c985]/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />

            {/* Decorative Vector Lines */}
            <svg
                className="absolute left-0 top-0 h-full w-1/2 opacity-20 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 800 800"
                fill="none"
            >
                <path
                    d="M-200 400C100 200 300 600 800 400"
                    stroke="#00c985"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                />
                <path
                    d="M-200 450C120 250 320 650 800 450"
                    stroke="#00e699"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                />
                <path
                    d="M-200 500C140 300 340 700 800 500"
                    stroke="#00c985"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                />
            </svg>

            <div className="container relative z-10 mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 px-3.5 py-1 text-[11px] font-black text-emerald-700 dark:text-[#00e699] uppercase tracking-widest">
                            <Building2 className="h-3.5 w-3.5 text-emerald-600 dark:text-[#00e699]" />
                            <span>Direct Institutional Partners</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                            Associated with <span className="text-[#00a86b] dark:text-[#00e699]">40+ Leading Banks</span> & NBFCs
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl font-medium">
                            We work directly with India's most trusted nationalized, private, and global financial institutions to bring you pre-negotiated interest rates and zero processing fee discounts.
                        </p>
                    </div>

                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black text-xs uppercase tracking-wider px-6 h-11 rounded-full shadow-lg transition-transform active:scale-95 flex items-center gap-2 shrink-0 cursor-pointer"
                    >
                        <span>Check Bank Tie-Up Offers</span>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                {/* Bank Tiles Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {banks.map((bank, index) => (
                        <div
                            key={index}
                            onClick={() => setIsModalOpen(true)}
                            className="bg-slate-50 dark:bg-[#1e2126] hover:bg-emerald-50/60 dark:hover:bg-[#252a32] border border-slate-200 dark:border-slate-800 hover:border-[#00c985] rounded-xl p-4 flex flex-col items-center justify-center min-h-[90px] text-center transition-all duration-200 shadow-sm hover:shadow-md group cursor-pointer"
                        >
                            {bank.logo ? (
                                <div className="relative w-full h-10 mb-1 flex items-center justify-center">
                                    <Image
                                        src={bank.logo}
                                        alt={bank.name}
                                        fill
                                        className="object-contain filter dark:brightness-110 group-hover:scale-105 transition-transform"
                                    />
                                </div>
                            ) : (
                                <span className="font-extrabold text-xs text-slate-800 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-[#00e699] tracking-wide">
                                    {bank.name}
                                </span>
                            )}
                            {bank.logo && (
                                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold group-hover:text-slate-700 dark:group-hover:text-white mt-1 truncate max-w-full">
                                    {bank.name}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <LeadFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type="general"
            />
        </section>
    );
}
