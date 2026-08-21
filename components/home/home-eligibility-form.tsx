"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEmailForm } from "@/hooks/use-email-form";
import { CheckCircle2, ShieldCheck, Sparkles, Building2, ArrowRight, Zap, Check, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface HomeEligibilityFormProps {
    className?: string;
    defaultLoanType?: string;
}

export function HomeEligibilityForm({ className = "", defaultLoanType = "Personal Loan" }: HomeEligibilityFormProps) {
    const { sendEmail, isSubmitting, isSuccess, error, resetForm } = useEmailForm();

    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        city: "",
        loanType: defaultLoanType,
        loanPurpose: "Immediate Financial Requirement / Best Bank Sanction",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await sendEmail({
            title: `Direct Bank Facility Eligibility: ${formData.loanType}`,
            applicationHeader: "Shree Finance Instant Eligibility Request",
            ...formData,
        });
    };

    return (
        <div className={`w-full max-w-4xl mx-auto bg-white dark:bg-[#181a1d] text-slate-900 dark:text-white rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-10 font-sans relative overflow-hidden transition-colors duration-300 ${className}`}>
            {/* Ambient Background Accents */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00c985]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-[90px] pointer-events-none" />

            {/* Header */}
            <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/15 text-[#00a86b] dark:text-[#00e699] text-xs font-black uppercase tracking-wider mb-2 border border-emerald-200 dark:border-emerald-500/30">
                            <Sparkles className="h-3.5 w-3.5" /> Direct Bank Facility Pre-Approval
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                            Check Your Loan Eligibility & Live Bank Offers
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                            Fill your basic details below. We instantly check 40+ partner banks and email your pre-approved eligibility with the direct application link!
                        </p>
                    </div>
                </div>
            </div>

            {/* Form Content / Success View */}
            <div className="relative z-10">
                {isSuccess ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 space-y-6 text-center shadow-lg"
                    >
                        <div className="h-16 w-16 bg-[#00c985]/20 text-[#00c985] rounded-full flex items-center justify-center mx-auto border border-[#00c985]/40 animate-in zoom-in">
                            <CheckCircle2 className="h-9 w-9" />
                        </div>

                        <div className="space-y-2">
                            <span className="text-xs font-black uppercase text-amber-400 bg-amber-400/10 px-3.5 py-1 rounded-full border border-amber-400/20">
                                Pre-Approval Email Dispatched
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-black text-white">
                                Congratulations, {formData.name || "Applicant"}!
                            </h3>
                            <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
                                We have verified your preliminary profile and sent your <strong>Eligibility Confirmation & Direct Application Link</strong> to <strong className="text-[#00e699]">{formData.email}</strong>.
                            </p>
                        </div>

                        {/* Summary Box */}
                        <div className="max-w-md mx-auto p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-left space-y-2 text-xs text-slate-300">
                            <div className="flex justify-between">
                                <span className="text-slate-400">Applicant:</span>
                                <span className="text-white font-bold">{formData.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Selected Facility:</span>
                                <span className="text-[#00e699] font-bold">{formData.loanType}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Contact Number:</span>
                                <span className="text-white font-bold">+91 {formData.mobile}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">City / Location:</span>
                                <span className="text-white font-bold">{formData.city}</span>
                            </div>
                        </div>

                        {/* CTA: Open Full Application Form */}
                        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                            <Link
                                href="/apply"
                                className="inline-flex items-center justify-center gap-2 bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black text-xs uppercase px-8 h-12 rounded-xl shadow-lg transition-transform active:scale-95"
                            >
                                <span>Complete Full Application Now</span>
                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={resetForm}
                                className="border-slate-700 text-slate-300 hover:text-white font-bold text-xs uppercase h-12 px-6 rounded-xl"
                            >
                                Check Another Loan
                            </Button>
                        </div>

                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center gap-2 text-xs text-[#00e699] font-semibold">
                            <ShieldCheck className="h-4 w-4 shrink-0" />
                            <span>Our senior loan officer will also call you shortly to assist with document collection.</span>
                        </div>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Loan Category Dropdown */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                Select Loan Facility <span className="text-rose-500">*</span>
                            </label>
                            <select
                                value={formData.loanType}
                                onChange={(e) => setFormData({ ...formData, loanType: e.target.value })}
                                required
                                className="w-full h-12 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#121417] text-slate-900 dark:text-white px-4 font-bold text-xs focus:ring-2 focus:ring-[#00c985] focus:outline-none focus:border-emerald-500"
                            >
                                <option value="Personal Loan">💼 Personal Loan (Instant Disbursal from 10.25% p.a.)</option>
                                <option value="Home Loan">🏠 Home Loan (Housing Finance from 8.35% p.a.)</option>
                                <option value="Car Loan">🚗 Car Loan (100% On-Road Funding from 8.75% p.a.)</option>
                                <option value="Business Loan">🏢 Business Loan (Working Capital from 13.99% p.a.)</option>
                                <option value="Loan Against Property">🏬 Loan Against Property (LAP from 9.25% p.a.)</option>
                                <option value="Education Loan">🎓 Higher Education Loan (from 9.50% p.a.)</option>
                            </select>
                        </div>

                        {/* 4 Core Input Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                    Full Name <span className="text-rose-500">*</span>
                                </label>
                                <Input
                                    required
                                    placeholder="Enter your name as per Aadhaar / PAN"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="bg-slate-50 dark:bg-[#121417] border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white h-12 rounded-xl text-xs font-medium focus:bg-white dark:focus:bg-[#15171a] focus:border-emerald-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                    Mobile Number <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-3 text-xs font-bold text-slate-500 dark:text-slate-400">+91</span>
                                    <Input
                                        required
                                        type="tel"
                                        maxLength={10}
                                        placeholder="10-digit number"
                                        value={formData.mobile}
                                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, "") })}
                                        className="pl-12 bg-slate-50 dark:bg-[#121417] border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white h-12 rounded-xl text-xs font-medium focus:bg-white dark:focus:bg-[#15171a] focus:border-emerald-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                    Email Address (For Instant Pre-Approval Link) <span className="text-rose-500">*</span>
                                </label>
                                <Input
                                    required
                                    type="email"
                                    placeholder="yourname@gmail.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="bg-slate-50 dark:bg-[#121417] border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white h-12 rounded-xl text-xs font-medium focus:bg-white dark:focus:bg-[#15171a] focus:border-emerald-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                    City / Location <span className="text-rose-500">*</span>
                                </label>
                                <Input
                                    required
                                    placeholder="e.g. Pune, Mumbai, Delhi, Bengaluru"
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    className="bg-slate-50 dark:bg-[#121417] border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white h-12 rounded-xl text-xs font-medium focus:bg-white dark:focus:bg-[#15171a] focus:border-emerald-500"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-rose-950/60 border border-rose-800 text-rose-300 rounded-xl text-xs font-bold text-center">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="pt-2">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-14 text-sm sm:text-base font-black bg-[#00c985] hover:bg-[#00b074] text-slate-950 uppercase tracking-wider rounded-2xl shadow-xl transition-all cursor-pointer hover:scale-[1.01]"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="h-5 w-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                                        <span>Checking Eligibility Across 40+ Banks...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        <Sparkles className="h-5 w-5 fill-slate-950" />
                                        <span>Check Eligibility & Get Loan Link 🚀</span>
                                    </div>
                                )}
                            </Button>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                            <div className="flex items-center gap-1.5">
                                <ShieldCheck className="h-4 w-4 text-[#00c985]" />
                                <span>100% Confidential • Zero Credit Score Impact</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Zap className="h-4 w-4 text-amber-400" />
                                <span>Instant Email Delivery with Application Link</span>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
