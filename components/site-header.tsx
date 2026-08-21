"use client";

import Link from "next/link";
import Image from "next/image";
import { MainNav } from "@/components/main-nav";
import { Button } from "@/components/ui/button";
import { Menu, Phone, Zap, ChevronDown, X, Search, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { megaMenuData } from "@/config/navigation";
import { useState } from "react";
import { LeadFormModal } from "@/components/dialogs/lead-form-modal";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function SiteHeader() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCibilModalOpen, setIsCibilModalOpen] = useState(false);
    const [isGeneralModalOpen, setIsGeneralModalOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    const toggleCategory = (category: string) => {
        setExpandedCategory(expandedCategory === category ? null : category);
    };

    return (
        <>
            {/* Contact Us Phone Reveal Modal */}
            {isContactModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[#1a1d21] text-white border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl space-y-5 text-center relative">
                        <button
                            onClick={() => setIsContactModalOpen(false)}
                            className="absolute top-4 right-4 h-8 w-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        <div className="h-14 w-14 rounded-2xl bg-emerald-500/20 text-[#00c985] flex items-center justify-center mx-auto border border-emerald-500/40">
                            <Phone className="h-7 w-7" />
                        </div>

                        <div className="space-y-1">
                            <h3 className="text-lg font-black text-white">Shree Finance Helpline</h3>
                            <p className="text-xs text-slate-400">Available Monday to Saturday (9 AM - 8 PM)</p>
                        </div>

                        <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Direct Calling Number</span>
                            <p className="text-2xl font-black text-[#00e699] tracking-wider">+91 77099 36965</p>
                        </div>

                        <div className="flex gap-2.5 pt-1">
                            <a
                                href="tel:+917709936965"
                                className="flex-1 bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black h-11 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg cursor-pointer"
                            >
                                <Phone className="h-4 w-4" /> Call Now
                            </a>
                            <button
                                onClick={() => setIsContactModalOpen(false)}
                                className="px-5 bg-slate-800 hover:bg-slate-700 text-white font-bold h-11 rounded-xl text-xs uppercase cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Top Micro-Bar (Urban Money Style) */}
            <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white text-[11px] font-extrabold py-2 px-4 border-b border-sky-800/40 hidden md:block">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-widest text-[9px]">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live 2026 Rates
                        </span>
                        <span className="text-slate-300">Home Loans Starting <strong>8.35% p.a.</strong> | Instant Pre-Approval Across 40+ Partner Banks</span>
                    </div>
                    <div className="flex items-center gap-6 text-slate-300">
                        <Link href="/partner" className="hover:text-sky-300 transition-colors flex items-center gap-1">
                            <Sparkles className="h-3 w-3 text-amber-400" /> Become a Partner (DSA)
                        </Link>
                        <Link href="/track-status" className="hover:text-sky-300 transition-colors flex items-center gap-1">
                            <Search className="h-3 w-3 text-sky-400" /> Track Loan Status
                        </Link>
                    </div>
                </div>
            </div>

            <header className="sticky top-0 z-50 w-full bg-white text-slate-900 backdrop-blur-2xl border-b border-slate-200 shadow-md">
                <div className="w-full relative">
                    <div className="container mx-auto flex h-20 md:h-24 items-center justify-between px-4 md:px-6 relative gap-4">
                        {/* Logo Section (Far Left) */}
                        <div className="flex items-center shrink-0">
                            <Link href="/" className="flex items-center group transition-transform hover:scale-105">
                                <Image
                                    src="/shreelogobg.png"
                                    alt="ShreeFinance Logo"
                                    width={400}
                                    height={120}
                                    className="h-14 md:h-18 max-h-18 w-auto object-contain py-1"
                                    priority
                                />
                            </Link>
                        </div>

                        {/* Desktop Navigation (Middle) */}
                        <div className="hidden lg:flex items-center justify-center flex-1">
                            <MainNav />
                        </div>

                        {/* Right Action Buttons (Far Right) */}
                        <div className="flex items-center gap-2.5 shrink-0">
                            {/* Theme Toggle Button */}
                            <ThemeToggle />

                            <button
                                onClick={() => setIsContactModalOpen(true)}
                                className="hidden xl:flex items-center gap-1.5 text-xs font-black text-slate-800 hover:text-[#00c985] transition-all p-2 rounded-xl hover:bg-slate-100 whitespace-nowrap cursor-pointer"
                                title="Click to view Contact Number"
                            >
                                <div className="p-1.5 rounded-full bg-[#00c985]/15 text-[#00c985]">
                                    <Phone className="h-3.5 w-3.5" />
                                </div>
                                <span>Contact</span>
                            </button>

                            <Button
                                className="hidden md:inline-flex bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-full px-4 h-10 text-xs tracking-wider uppercase transition-all shadow-md active:scale-95 border-0 whitespace-nowrap cursor-pointer"
                                onClick={() => setIsCibilModalOpen(true)}
                            >
                                <Zap className="h-3.5 w-3.5 mr-1 fill-slate-950" />
                                Free CIBIL
                            </Button>

                            <Button
                                className="hidden sm:inline-flex bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black rounded-full px-5 h-10 text-xs tracking-wider uppercase transition-all shadow-md active:scale-95 whitespace-nowrap cursor-pointer"
                                onClick={() => setIsGeneralModalOpen(true)}
                            >
                                Apply Now <ArrowRight className="h-3.5 w-3.5 ml-1" />
                            </Button>

                            {/* Mobile Hamburger Toggle */}
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="lg:hidden text-slate-900 hover:bg-slate-100 rounded-full h-10 w-10 transition-colors cursor-pointer" 
                                onClick={() => {
                                    setIsMobileMenuOpen(!isMobileMenuOpen);
                                    if (!isMobileMenuOpen) setExpandedCategory(null);
                                }}
                            >
                                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Drawer Navigation */}
                    {isMobileMenuOpen && (
                        <div className="lg:hidden border-t border-slate-200/80 bg-white p-6 space-y-6 max-h-[calc(100vh-80px)] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300">
                            <nav className="space-y-3">
                                <Link
                                    href="/"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-between w-full p-4 rounded-2xl bg-slate-100 font-black text-slate-900 text-base"
                                >
                                    <span>Home</span>
                                </Link>
                                {Object.entries(megaMenuData).map(([key, category]) => (
                                    <div key={key} className="space-y-2">
                                        <button
                                            onClick={() => toggleCategory(key)}
                                            className="flex items-center justify-between w-full p-4 rounded-2xl bg-slate-50 font-extrabold text-slate-900 text-base"
                                        >
                                            <span>{category.title}</span>
                                            <ChevronDown className={cn(
                                                "h-5 w-5 transition-transform duration-300",
                                                expandedCategory === key ? "rotate-180" : ""
                                            )} />
                                        </button>
                                        
                                        {expandedCategory === key && (
                                            <div className="grid grid-cols-1 gap-2 pl-4 animate-in slide-in-from-top-2 duration-200">
                                                {category.items.map((item) => (
                                                    <Link
                                                        key={item.href}
                                                        href={item.href}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors group"
                                                    >
                                                        <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                                            <item.icon className="h-4 w-4" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</p>
                                                            {item.rate && <p className="text-[10px] text-primary font-black uppercase tracking-widest">{item.rate}</p>}
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                <div className="pt-2 space-y-2">
                                    <button
                                        onClick={() => {
                                            setIsContactModalOpen(true);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="flex items-center justify-between w-full p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 font-black text-emerald-600 dark:text-emerald-400 text-sm cursor-pointer"
                                    >
                                        <span className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 text-emerald-500" />
                                            Contact
                                        </span>
                                    </button>
                                    <Link
                                        href="/track-status"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center justify-between p-4 rounded-2xl bg-sky-50 dark:bg-sky-950 font-black text-primary text-sm"
                                    >
                                        <span className="flex items-center gap-2">
                                            <Search className="h-4 w-4" />
                                            Track Application Status
                                        </span>
                                    </Link>
                                    <Link
                                        href="/partner"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center justify-between p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 font-black text-slate-800 dark:text-slate-200 text-sm"
                                    >
                                        <span className="flex items-center gap-2">
                                            <Sparkles className="h-4 w-4 text-amber-500" />
                                            Become a Partner (DSA)
                                        </span>
                                    </Link>
                                </div>
                            </nav>
                            
                            <div className="pt-4 space-y-3">
                                <Button 
                                    className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-2xl h-14 text-base shadow-xl transition-all active:scale-95 uppercase tracking-wider" 
                                    onClick={() => { setIsCibilModalOpen(true); setIsMobileMenuOpen(false); }}
                                >
                                    <Zap className="h-5 w-5 mr-2 fill-slate-950" />
                                    Free CIBIL Score Check
                                </Button>
                                <Button 
                                    className="w-full bg-primary hover:bg-sky-600 text-white font-black rounded-2xl h-14 text-base shadow-xl shadow-primary/20 transition-all active:scale-95 uppercase tracking-wider" 
                                    onClick={() => { setIsGeneralModalOpen(true); setIsMobileMenuOpen(false); }}
                                >
                                    Apply Now <ArrowRight className="h-5 w-5 ml-2" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <LeadFormModal
                isOpen={isCibilModalOpen}
                onClose={() => setIsCibilModalOpen(false)}
                type="cibil"
            />
            <LeadFormModal
                isOpen={isGeneralModalOpen}
                onClose={() => setIsGeneralModalOpen(false)}
                type="general"
            />
        </>
    );
}
