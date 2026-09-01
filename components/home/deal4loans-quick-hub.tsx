"use client";

import Link from "next/link";
import { BookOpen, Calculator, Percent, CreditCard, ChevronRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function Deal4LoansQuickHub() {
    return (
        <section className="py-16 bg-white text-slate-900 font-sans relative overflow-hidden border-t border-slate-200">
            <div className="container px-4 md:px-6 mx-auto relative z-10 space-y-12">
                <div className="text-center space-y-3 max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-50 px-3.5 py-1 text-xs font-black text-sky-800 uppercase tracking-wider">
                        <Sparkles className="h-3.5 w-3.5 text-[#0284c7]" />
                        Financial Resource Hub
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Finances News
                    </h2>
                    <p className="text-slate-600 text-sm md:text-base">
                        Get instant access to loan calculators, live bank rate charts, card offers, and financial guides.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Card 1: Read about Loans */}
                    <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-6 hover:border-sky-500/40 hover:shadow-md transition-all group flex flex-col justify-between space-y-4">
                        <div className="space-y-4">
                            <div className="h-12 w-12 rounded-xl bg-white border border-slate-200 text-sky-600 flex items-center justify-center shadow-xs">
                                <BookOpen className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Read About Loans</h3>
                            <ul className="space-y-2.5 text-xs font-semibold text-slate-600">
                                <li>
                                    <Link href="/loans/personal-loan" className="hover:text-[#0284c7] transition-colors flex items-center justify-between">
                                        Personal Loan Articles <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/loans/home-loan" className="hover:text-[#0284c7] transition-colors flex items-center justify-between">
                                        Home Loan Articles <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/loans/car-loan" className="hover:text-[#0284c7] transition-colors flex items-center justify-between">
                                        Car Loan Articles <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/loans/loan-against-property" className="hover:text-[#0284c7] transition-colors flex items-center justify-between">
                                        Loan Against Property Guides <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Card 2: Calculate your Loans */}
                    <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-6 hover:border-sky-500/40 hover:shadow-md transition-all group flex flex-col justify-between space-y-4">
                        <div className="space-y-4">
                            <div className="h-12 w-12 rounded-xl bg-white border border-slate-200 text-[#0284c7] flex items-center justify-center shadow-xs">
                                <Calculator className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Calculate Your Loans</h3>
                            <ul className="space-y-2.5 text-xs font-semibold text-slate-600">
                                <li>
                                    <Link href="/calculators" className="hover:text-[#0284c7] transition-colors flex items-center justify-between">
                                        EMI Calculator <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/loans/home-loan" className="hover:text-[#0284c7] transition-colors flex items-center justify-between">
                                        Home Loan Eligibility <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/calculators" className="hover:text-[#0284c7] transition-colors flex items-center justify-between">
                                        Balance Transfer Calculator <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/calculators" className="hover:text-[#0284c7] transition-colors flex items-center justify-between">
                                        Tax Savings Calculator <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Card 3: Know your Interest Rates */}
                    <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-6 hover:border-sky-500/40 hover:shadow-md transition-all group flex flex-col justify-between space-y-4">
                        <div className="space-y-4">
                            <div className="h-12 w-12 rounded-xl bg-white border border-slate-200 text-amber-600 flex items-center justify-center shadow-xs">
                                <Percent className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Live Interest Rates</h3>
                            <ul className="space-y-2.5 text-xs font-semibold text-slate-600">
                                <li>
                                    <Link href="/compare" className="hover:text-[#0284c7] transition-colors flex items-center justify-between">
                                        Home Loan (8.35%*) <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/compare" className="hover:text-[#0284c7] transition-colors flex items-center justify-between">
                                        Personal Loan (10.25%*) <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/compare" className="hover:text-[#0284c7] transition-colors flex items-center justify-between">
                                        Car Loan (8.75%*) <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/compare" className="hover:text-[#0284c7] transition-colors flex items-center justify-between">
                                        LAP Rates (9.25%*) <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Card 4: Credit/Debit Cards */}
                    <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-6 hover:border-sky-500/40 hover:shadow-md transition-all group flex flex-col justify-between space-y-4">
                        <div className="space-y-4">
                            <div className="h-12 w-12 rounded-xl bg-white border border-slate-200 text-indigo-600 flex items-center justify-center shadow-xs">
                                <CreditCard className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Credit Card Offers</h3>
                            <ul className="space-y-2.5 text-xs font-semibold text-slate-600">
                                <li>
                                    <Link href="/cards/credit-cards" className="hover:text-[#0284c7] transition-colors flex items-center justify-between">
                                        HDFC Credit Card Offers <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/cards/credit-cards" className="hover:text-[#0284c7] transition-colors flex items-center justify-between">
                                        SBI Credit Card Offers <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/cards/credit-cards" className="hover:text-[#0284c7] transition-colors flex items-center justify-between">
                                        ICICI Card Lifetime Free <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/cards/credit-cards" className="hover:text-[#0284c7] transition-colors flex items-center justify-between">
                                        Axis Magnus Rewards <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
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
