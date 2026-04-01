"use client";

import Link from "next/link";
import Image from "next/image";
import { MainNav } from "@/components/main-nav";
import { Button } from "@/components/ui/button";
import { Menu, User, Phone, Zap } from "lucide-react";
import { useState } from "react";
import { LeadFormModal } from "@/components/dialogs/lead-form-modal";
import { cn } from "@/lib/utils";

export function SiteHeader() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCibilModalOpen, setIsCibilModalOpen] = useState(false);

    return (
        <>
            <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl rounded-full border border-primary/20 bg-white/95 dark:bg-black/90 backdrop-blur-3xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-all duration-500 hover:shadow-primary/10 ring-1 ring-primary/5">
                <div className="flex h-16 md:h-20 items-center justify-between px-8 relative">
                    {/* Logo Section */}
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center group transition-transform hover:scale-105">
                            <Image
                                src="/shreelogobg.png"
                                alt="ShreeFinance Logo"
                                width={300}
                                height={80}
                                className="h-14 md:h-16 w-auto object-contain"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:block">
                        <MainNav />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary transition-all cursor-pointer group">
                            <div className="p-2 rounded-full bg-primary/10 dark:bg-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <Phone className="h-4 w-4" />
                            </div>
                            <span className="hidden xl:inline tracking-tight">Expert Support</span>
                        </div>
                        
                        <Button
                            className="hidden md:inline-flex bg-primary hover:bg-sky-600 text-white font-black border-b-4 border-sky-700 active:border-b-0 active:translate-y-1 shadow-xl shadow-primary/20 rounded-full px-8 h-12 text-sm tracking-widest uppercase transition-all"
                            onClick={() => setIsCibilModalOpen(true)}
                        >
                            <Zap className="h-4 w-4 mr-2 fill-white" />
                            CIBIL Score
                        </Button>

                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="lg:hidden text-slate-900 dark:text-white hover:bg-primary/10 rounded-full h-11 w-11 transition-colors" 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden mt-3 mx-auto w-[98%] rounded-[2.5rem] border border-primary/20 p-6 space-y-6 bg-white/95 dark:bg-black/95 backdrop-blur-3xl animate-accordion-down shadow-2xl ring-1 ring-primary/10">
                        <nav className="flex flex-col gap-2">
                            {[
                                { name: "Loans", href: "/loans/personal-loan" },
                                { name: "Cards", href: "/cards/credit-cards" },
                                { name: "Insurance", href: "/insurance/health" },
                                { name: "Investments", href: "/investments/stocks" },
                            ].map((item) => (
                                <Link 
                                    key={item.href}
                                    href={item.href} 
                                    className="text-lg font-black text-slate-900 dark:text-white hover:text-primary px-6 py-4 rounded-2xl hover:bg-primary/5 transition-all" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                        <div className="pt-6 border-t border-primary/10">
                            <Button 
                                className="w-full bg-primary hover:bg-sky-600 text-white font-black rounded-2xl h-14 text-lg shadow-xl shadow-primary/20" 
                                onClick={() => { setIsCibilModalOpen(true); setIsMobileMenuOpen(false); }}
                            >
                                Free CIBIL Check
                            </Button>
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
