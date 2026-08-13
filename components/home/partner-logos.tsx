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
        <section className="py-20 bg-[#141618] text-white border-t border-slate-800 relative font-sans overflow-hidden">
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
                />
                <path
                    d="M-200 500C140 300 340 700 800 500"
                    stroke="#00c985"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                />
            </svg>

            <div className="container mx-auto px-6 md:px-10 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    {/* Left Column: Heading & Description */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-black text-[#00e699] uppercase tracking-widest">
                            <Building2 className="h-3.5 w-3.5" />
                            <span>Institutional Banking Network</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
                            Our <span className="text-[#00e699]">Banking</span> Partners
                        </h2>

                        <p className="text-base text-slate-300 leading-relaxed font-medium max-w-lg">
                            Explore our network of top financial institutions and gain valuable insights to support your confident loan and financing choices.
                        </p>

                        <div className="pt-2">
                            <Button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black px-8 h-14 rounded-full text-sm uppercase tracking-wider transition-all shadow-xl hover:scale-105 flex items-center gap-2"
                            >
                                View All Banks <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Right Column: Grid of White Partner Cards */}
                    <div className="lg:col-span-7">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-2 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md">
                            {banks.map((bank, index) => (
                                <div
                                    key={`${bank.name}-${index}`}
                                    className="bg-white rounded-2xl p-3.5 text-center shadow-md border border-slate-200 hover:border-[#00c985] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center min-h-[72px] cursor-pointer group"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    {bank.logo ? (
                                        <div className="relative w-full h-10 flex items-center justify-center p-1">
                                            <Image
                                                src={bank.logo}
                                                alt={bank.name}
                                                width={140}
                                                height={50}
                                                className="max-h-9 w-auto object-contain transition-transform group-hover:scale-105"
                                            />
                                        </div>
                                    ) : (
                                        <span className="font-extrabold text-slate-950 text-xs md:text-sm tracking-tight leading-snug group-hover:text-[#00c985] transition-colors">
                                            {bank.name}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
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
