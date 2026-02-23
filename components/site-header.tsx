"use client";

import Link from "next/link";
import { MainNav } from "@/components/main-nav";
import { Button } from "@/components/ui/button";
import { Menu, User, Phone, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { LeadFormModal } from "@/components/dialogs/lead-form-modal";

export function SiteHeader() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCibilModalOpen, setIsCibilModalOpen] = useState(false);

    return (
        <>
            <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl rounded-full border border-white/20 dark:border-white/10 bg-white/90 dark:bg-slate-900/95 backdrop-blur-md shadow-2xl shadow-black/10 transition-all duration-300">
                <div className="absolute inset-0 rounded-full bg-slate-50/50 dark:bg-slate-900/50 pointer-events-none" />
                <div className="flex h-16 items-center justify-between px-6 relative">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="h-9 w-9 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform rotate-3 group-hover:rotate-0">
                                <ShieldCheck className="text-white h-5 w-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white leading-none font-heading">
                                    ShreeFinance
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:block">
                        <MainNav />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer group">
                            <div className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
                                <Phone className="h-3.5 w-3.5" />
                            </div>
                            <span className="hidden xl:inline">Support</span>
                        </div>
                        <Button
                            className="hidden md:inline-flex bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold border-0 shadow-lg shadow-slate-900/20 rounded-full px-5 h-10 text-xs tracking-wide uppercase"
                            onClick={() => setIsCibilModalOpen(true)}
                        >
                            Check CIBIL
                        </Button>
                        <Button variant="ghost" size="icon" className="lg:hidden text-slate-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu (Simplified) */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden mt-2 mx-auto w-[95%] rounded-3xl border border-white/20 dark:border-white/10 p-4 space-y-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl animate-accordion-down shadow-2xl">
                        <nav className="flex flex-col gap-4 text-slate-600 dark:text-slate-300">
                            <Link href="/loans/personal-loan" className="text-sm font-medium hover:text-blue-600 px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setIsMobileMenuOpen(false)}>Loans</Link>
                            <Link href="/cards/credit-cards" className="text-sm font-medium hover:text-blue-600 px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setIsMobileMenuOpen(false)}>Cards</Link>
                            <Link href="/insurance/health" className="text-sm font-medium hover:text-blue-600 px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setIsMobileMenuOpen(false)}>Insurance</Link>
                            <Link href="/investments/mutual-funds" className="text-sm font-medium hover:text-blue-600 px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setIsMobileMenuOpen(false)}>Investments</Link>
                        </nav>
                        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                            <Button className="w-full bg-slate-900 text-white font-bold rounded-xl h-12" onClick={() => { setIsCibilModalOpen(true); setIsMobileMenuOpen(false); }}>Check CIBIL Score</Button>
                        </div>
                    </div>
                )}
            </header>

            <LeadFormModal
                isOpen={isCibilModalOpen}
                onClose={() => setIsCibilModalOpen(false)}
                type="cibil"
            />
        </>
    );
}
