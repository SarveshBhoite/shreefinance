"use client";

import Link from "next/link";
import { BookOpen, Calculator, Percent, CreditCard, ChevronRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function Deal4LoansQuickHub() {
    return (
        <section className="py-16 bg-[#181a1d] text-white font-sans relative overflow-hidden border-y border-slate-800">
            <div className="container px-4 md:px-6 mx-auto relative z-10 space-y-12">
                <div className="text-center space-y-3 max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-black text-[#00e699] uppercase tracking-widest">
                        <Sparkles className="h-3.5 w-3.5" />
                        Deal4Loans Financial Portal
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                        Explore Rates, Tools & Guides
                    </h2>
                    <p className="text-slate-300 text-sm md:text-base">
                        Get instant access to loan calculators, live bank rate charts, card offers, and financial guides.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Card 1: Read about Loans */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-primary/50 transition-all group flex flex-col justify-between space-y-4">
                        <div className="space-y-4">
                            <div className="h-12 w-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                                <BookOpen className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-extrabold text-white">Read About Loans</h3>
                            <ul className="space-y-2.5 text-xs font-bold text-slate-300">
                                <li>
                                    <Link href="/loans/personal-loan" className="hover:text-primary transition-colors flex items-center justify-between">
                                        Personal Loan Articles <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/loans/home-loan" className="hover:text-primary transition-colors flex items-center justify-between">
                                        Home Loan Articles <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/loans/car-loan" className="hover:text-primary transition-colors flex items-center justify-between">
                                        Car Loan Articles <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/loans/loan-against-property" className="hover:text-primary transition-colors flex items-center justify-between">
                                        Loan Against Property Guides <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Card 2: Calculate your Loans */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-emerald-500/50 transition-all group flex flex-col justify-between space-y-4">
                        <div className="space-y-4">
                            <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                                <Calculator className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-extrabold text-white">Calculate Your Loans</h3>
                            <ul className="space-y-2.5 text-xs font-bold text-slate-300">
                                <li>
                                    <Link href="/calculators" className="hover:text-emerald-400 transition-colors flex items-center justify-between">
                                        EMI Calculator <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/loans/home-loan" className="hover:text-emerald-400 transition-colors flex items-center justify-between">
                                        Home Loan Eligibility Calculator <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/calculators" className="hover:text-emerald-400 transition-colors flex items-center justify-between">
                                        HL Balance Transfer Calculator <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/calculators" className="hover:text-emerald-400 transition-colors flex items-center justify-between">
                                        Tax Savings Calculator <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Card 3: Know your Interest Rates */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-amber-400/50 transition-all group flex flex-col justify-between space-y-4">
                        <div className="space-y-4">
                            <div className="h-12 w-12 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center">
                                <Percent className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-extrabold text-white">Live Interest Rates</h3>
                            <ul className="space-y-2.5 text-xs font-bold text-slate-300">
                                <li>
                                    <Link href="/compare" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                                        Home Loan Rates (8.35%*) <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/compare" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                                        Personal Loan Rates (10.25%*) <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/compare" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                                        Car Loan Rates (8.75%*) <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/compare" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                                        Loan Against Property Rates (9.25%*) <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Card 4: Credit/Debit Cards */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-purple-400/50 transition-all group flex flex-col justify-between space-y-4">
                        <div className="space-y-4">
                            <div className="h-12 w-12 rounded-2xl bg-purple-400/20 text-purple-400 flex items-center justify-center">
                                <CreditCard className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-extrabold text-white">Credit Card Offers</h3>
                            <ul className="space-y-2.5 text-xs font-bold text-slate-300">
                                <li>
                                    <Link href="/cards/credit-cards" className="hover:text-purple-400 transition-colors flex items-center justify-between">
                                        HDFC Credit Card Offers <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/cards/credit-cards" className="hover:text-purple-400 transition-colors flex items-center justify-between">
                                        SBI Credit Card Offers <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/cards/credit-cards" className="hover:text-purple-400 transition-colors flex items-center justify-between">
                                        Standard Chartered Offers <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/cards/business-cards" className="hover:text-purple-400 transition-colors flex items-center justify-between">
                                        Business Cards Perks <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
