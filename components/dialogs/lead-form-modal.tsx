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
            className="max-w-md bg-[#1e2126] text-white border-slate-800 p-0 overflow-hidden"
        >
            {/* Header */}
            <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-[#00c985] text-slate-950 flex items-center justify-center font-black shrink-0">
                    <Building2 className="h-5 w-5" />
                </div>
                <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#00e699] flex items-center gap-1">
                        <Sparkles className="h-2.5 w-2.5" /> 40+ Member Bank Partners
                    </span>
                    <h3 className="text-sm font-black text-white uppercase tracking-tight">
                        Shree Finance Direct Bank Facility Application
                    </h3>
                </div>
            </div>

            <div className="p-6">
            {isSuccess ? (
                <div className="text-center py-6 space-y-4">
                    <div className="h-16 w-16 bg-[#00c985]/20 text-[#00c985] rounded-full flex items-center justify-center mx-auto border border-[#00c985]/40 animate-in zoom-in spin-in-12">
                        <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white">
                            {isCibil ? "Report Generated!" : "Bank Facility Application Received!"}
                        </h3>
                        <p className="text-slate-300 text-xs mt-2">
                            {isCibil
                                ? "We have sent your detailed credit report to your email."
                                : "Our expert bank underwriting officer will call you within 15 minutes with pre-approved sanctions."}
                        </p>
                    </div>
                    <Button onClick={handleClose} className="w-full mt-4 bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black" size="lg">
                        Done
                    </Button>
                </div>
            ) : (
                <div className="space-y-5">
                    {/* Visual Header */}
                    <div className={cn(
                        "rounded-xl p-3.5 flex items-center gap-3 border",
                        isCibil ? "bg-amber-500/10 border-amber-500/30 text-amber-300" : "bg-[#00c985]/10 border-[#00c985]/30 text-[#00e699]"
                    )}>
                        <div className={cn(
                            "h-9 w-9 rounded-full flex items-center justify-center shrink-0",
                            isCibil ? "bg-amber-500/20 text-amber-400" : "bg-[#00c985]/20 text-[#00c985]"
                        )}>
                            {isCibil ? <PieChart className="h-4 w-4" /> : <CreditCard className="h-4 w-4" />}
                        </div>
                        <div>
                            <p className="font-black text-xs text-white">
                                {isCibil ? "Free Credit Health & Bureau Report" : "Instant Multi-Bank Sanction Check"}
                            </p>
                            <p className="text-[11px] text-slate-400 font-medium">
                                {isCibil ? "Zero impact on credit score • RBI compliant" : "Compare live lowest offers from 40+ top banks"}
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3.5">
                        {/* Loan Category Selection if not CIBIL */}
                        {!isCibil && (
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Select Loan Facility</label>
                                <select
                                    className="w-full h-11 rounded-xl border border-slate-700 bg-slate-900 text-white px-3 font-bold text-xs focus:ring-2 focus:ring-[#00c985]"
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

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Full Name</label>
                            <Input
                                required
                                placeholder="As per Identity Proof"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Mobile Number</label>
                            <Input
                                required
                                type="tel"
                                placeholder="10-digit mobile number"
                                pattern="[0-9]{10}"
                                maxLength={10}
                                value={formData.mobile}
                                onChange={e => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Mail ID (Email Address)</label>
                            <Input
                                required
                                type="email"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">City / Location</label>
                            <Input
                                required
                                placeholder="e.g. Pune, Mumbai, Bangalore"
                                value={formData.city}
                                onChange={e => setFormData({ ...formData, city: e.target.value })}
                            />
                        </div>

                        {isCibil && (
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">PAN Card Number</label>
                                <Input
                                    required
                                    placeholder="ABCDE1234F"
                                    maxLength={10}
                                    className="uppercase tracking-widest font-mono"
                                    value={formData.pan}
                                    onChange={e => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
                                />
                            </div>
                        )}

                        {error && (
                            <p className="text-xs text-rose-500 font-semibold bg-rose-50 dark:bg-rose-950/50 p-2.5 rounded-lg border border-rose-200 dark:border-rose-900">
                                {error}
                            </p>
                        )}

                        <div className="pt-2">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className={cn(
                                    "w-full h-12 text-base font-bold shadow-lg transition-all cursor-pointer",
                                    isCibil
                                        ? "bg-amber-500 hover:bg-amber-600 text-slate-950"
                                        : "bg-[#00c985] hover:bg-[#00b074] text-slate-950"
                                )}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                                        <span>Processing Request...</span>
                                    </div>
                                ) : (
                                    <span>{isCibil ? "Get Free CIBIL Report 🚀" : "Get Free Eligibility Check 🚀"}</span>
                                )}
                            </Button>
                        </div>
                    </form>

                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2 border-t border-slate-200 dark:border-slate-800">
                        <ShieldCheck className="h-4 w-4 text-[#00c985]" />
                        <span>256-bit SSL Encrypted • 100% Data Protection</span>
                    </div>
                </div>
            )}
            </div>
        </Modal>
    );
}
