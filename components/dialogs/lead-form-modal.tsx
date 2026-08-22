"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEmailForm } from "@/hooks/use-email-form";
import { CheckCircle2, PieChart, CreditCard, ShieldCheck, Building2, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type LeadType = "general" | "cibil";

interface LeadFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: LeadType;
}

export function LeadFormModal({ isOpen, onClose, type }: LeadFormModalProps) {
    const { sendEmail, isSubmitting, isSuccess, error, resetForm } = useEmailForm();
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        city: "",
        loanType: "Personal Loan",
        loanPurpose: "General Financial Need / Urgent Disbursal",
        pan: "",
    });

    const isCibil = type === "cibil";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await sendEmail({
            title: isCibil ? "Free CIBIL Score Request" : "Direct Bank Facility: Loan Application",
            applicationHeader: "Shree Finance Direct Bank Facility Application",
            ...formData,
        });
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title=""
            className="max-w-md bg-white text-slate-900 border-slate-200 p-0 overflow-hidden shadow-2xl rounded-3xl"
        >
            {/* Header */}
            <div className="bg-gradient-to-r from-sky-700 via-sky-600 to-sky-800 p-4 text-white flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-white text-[#0284c7] flex items-center justify-center font-black shrink-0 shadow-sm">
                    <Building2 className="h-5 w-5" />
                </div>
                <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-sky-100 flex items-center gap-1">
                        <Sparkles className="h-2.5 w-2.5" /> 40+ Member Bank Partners
                    </span>
                    <h3 className="text-sm font-black text-white uppercase tracking-tight">
                        Shree Finance Direct Bank Facility Application
                    </h3>
                </div>
            </div>

            <div className="p-6 bg-white">
            {isSuccess ? (
                <div className="text-center py-6 space-y-4">
                    <div className="h-16 w-16 bg-sky-50 text-[#0284c7] rounded-full flex items-center justify-center mx-auto border border-sky-300 animate-in zoom-in spin-in-12">
                        <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-slate-900">
                            {isCibil ? "Report Generated!" : "Bank Facility Application Received!"}
                        </h3>
                        <p className="text-slate-600 text-xs mt-2">
                            {isCibil
                                ? "We have sent your detailed credit report to your email."
                                : "Our expert bank underwriting officer will call you within 15 minutes with pre-approved sanctions."}
                        </p>
                    </div>
                    <Button onClick={handleClose} className="w-full mt-4 bg-[#0284c7] hover:bg-[#0369a1] text-white font-black" size="lg">
                        Done
                    </Button>
                </div>
            ) : (
                <div className="space-y-5">
                    {/* Visual Header */}
                    <div className={cn(
                        "rounded-2xl p-3.5 flex items-center gap-3 border",
                        isCibil ? "bg-sky-50 border-sky-200 text-[#0284c7]" : "bg-sky-50 border-sky-200 text-[#0284c7]"
                    )}>
                        <div className={cn(
                            "h-9 w-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs",
                            isCibil ? "bg-white text-[#0284c7]" : "bg-white text-[#0284c7]"
                        )}>
                            {isCibil ? <PieChart className="h-4 w-4" /> : <CreditCard className="h-4 w-4" />}
                        </div>
                        <div>
                            <p className="font-black text-xs text-slate-900">
                                {isCibil ? "Free Credit Health & Bureau Report" : "Instant Multi-Bank Sanction Check"}
                            </p>
                            <p className="text-[11px] text-slate-500 font-medium">
                                {isCibil ? "Zero impact on credit score • RBI compliant" : "Compare live lowest offers from 40+ top banks"}
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3.5">
                        {/* Loan Category Selection if not CIBIL */}
                        {!isCibil && (
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-wider text-slate-600">Select Loan Facility</label>
                                <select
                                    className="w-full h-11 rounded-xl border border-slate-300 bg-white text-slate-900 px-3 font-bold text-xs focus:ring-2 focus:ring-[#0284c7]"
                                    value={formData.loanType}
                                    onChange={(e) => setFormData({ ...formData, loanType: e.target.value })}
                                >
                                    <option value="Personal Loan">💼 Personal Loan (Instant Funds from 10.25% p.a.)</option>
                                    <option value="Home Loan">🏠 Home Loan (Housing Finance from 8.35% p.a.)</option>
                                    <option value="Car Loan">🚗 Car Loan (100% On-Road Funding from 8.75% p.a.)</option>
                                    <option value="Business Loan">🏢 Business Loan (Working Capital from 13.99% p.a.)</option>
                                    <option value="Loan Against Property">🏬 Loan Against Property (LAP from 9.25% p.a.)</option>
                                </select>
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Full Name</label>
                            <Input
                                required
                                placeholder="As per Identity Proof"
                                className="bg-white border-slate-300 text-slate-900 focus:ring-2 focus:ring-[#0284c7]"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Mobile Number</label>
                            <Input
                                required
                                type="tel"
                                placeholder="10-digit mobile number"
                                pattern="[0-9]{10}"
                                maxLength={10}
                                className="bg-white border-slate-300 text-slate-900 focus:ring-2 focus:ring-[#0284c7]"
                                value={formData.mobile}
                                onChange={e => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Mail ID (Email Address)</label>
                            <Input
                                required
                                type="email"
                                placeholder="name@example.com"
                                className="bg-white border-slate-300 text-slate-900 focus:ring-2 focus:ring-[#0284c7]"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">City / Location</label>
                            <Input
                                required
                                placeholder="e.g. Pune, Mumbai, Bangalore"
                                className="bg-white border-slate-300 text-slate-900 focus:ring-2 focus:ring-[#0284c7]"
                                value={formData.city}
                                onChange={e => setFormData({ ...formData, city: e.target.value })}
                            />
                        </div>

                        {isCibil && (
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">PAN Card Number</label>
                                <Input
                                    required
                                    placeholder="ABCDE1234F"
                                    maxLength={10}
                                    className="uppercase tracking-widest font-mono bg-white border-slate-300 text-slate-900 focus:ring-2 focus:ring-[#0284c7]"
                                    value={formData.pan}
                                    onChange={e => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
                                />
                            </div>
                        )}

                        {error && (
                            <p className="text-xs text-rose-600 font-semibold bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                                {error}
                            </p>
                        )}

                        <div className="pt-2">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-12 text-sm font-black shadow-md transition-all cursor-pointer bg-[#0284c7] hover:bg-[#0369a1] text-white uppercase tracking-wider rounded-xl"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Processing Request...</span>
                                    </div>
                                ) : (
                                    <span>{isCibil ? "Get Free CIBIL Report 🚀" : "Get Free Eligibility Check 🚀"}</span>
                                )}
                            </Button>
                        </div>
                    </form>

                    <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-200">
                        <ShieldCheck className="h-4 w-4 text-[#0284c7]" />
                        <span>256-bit SSL Encrypted • 100% Data Protection</span>
                    </div>
                </div>
            )}
            </div>
        </Modal>
    );
}
