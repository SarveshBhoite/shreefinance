"use client";

import Link from "next/link";
import Image from "next/image";
import { MainNav } from "@/components/main-nav";
import { Button } from "@/components/ui/button";
import { Menu, User, Phone, Zap, ChevronDown, ChevronRight, X } from "lucide-react";
import { megaMenuData } from "@/config/navigation";
import { useState } from "react";
import { LeadFormModal } from "@/components/dialogs/lead-form-modal";
import { cn } from "@/lib/utils";

export function SiteHeader() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCibilModalOpen, setIsCibilModalOpen] = useState(false);
    const [isGeneralModalOpen, setIsGeneralModalOpen] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    const toggleCategory = (category: string) => {
        setExpandedCategory(expandedCategory === category ? null : category);
    };

    return (
        <>
            <header className={cn(
                "fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-500",
                isMobileMenuOpen ? "rounded-[2rem]" : "rounded-full"
            )}>
                <div className={cn(
                    "relative w-full border border-primary/20 bg-white/95 dark:bg-black/90 backdrop-blur-3xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-all duration-500 ring-1 ring-primary/5",
                    isMobileMenuOpen ? "rounded-[2rem]" : "rounded-full"
                )}>
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
                        <div 
                            className="hidden md:flex items-center gap-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary transition-all cursor-pointer group"
                            onClick={() => setIsGeneralModalOpen(true)}
                        >
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

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden border-t border-primary/10 p-6 space-y-6 max-h-[70vh] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300">
                        <nav className="space-y-4">
                            {Object.entries(megaMenuData).map(([key, category]) => (
                                <div key={key} className="space-y-2">
                                    <button
                                        onClick={() => toggleCategory(key)}
                                        className="flex items-center justify-between w-full p-4 rounded-2xl bg-slate-50 dark:bg-white/5 font-black text-slate-900 dark:text-white"
                                    >
                                        <span className="text-lg">{category.title}</span>
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
                        </nav>
                        
                        <div className="pt-4 space-y-4">
                            <Button 
                                className="w-full bg-primary hover:bg-sky-600 text-white font-black rounded-2xl h-14 text-lg shadow-xl shadow-primary/20 transition-all active:scale-95" 
                                onClick={() => { setIsCibilModalOpen(true); setIsMobileMenuOpen(false); }}
                            >
                                <Zap className="h-5 w-5 mr-2 fill-white" />
                                Free CIBIL Check
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
