"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEmailForm } from "@/hooks/use-email-form";
import { 
    CheckCircle2, 
    ShieldCheck, 
    Sparkles, 
    ChevronRight, 
    Car, 
    Home as HomeIcon, 
    Coins, 
    Building2, 
    Briefcase,
    Zap,
    Percent,
    ArrowRight
} from "lucide-react";
import { LoanSlideData, LOAN_SLIDER_ITEMS } from "@/components/home/hero-loan-carousel";

interface UrbanMoneyLoanModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialLoan?: LoanSlideData | null;
}

export function UrbanMoneyLoanModal({ isOpen, onClose, initialLoan }: UrbanMoneyLoanModalProps) {
    const { sendEmail, isSubmitting, isSuccess, error, resetForm } = useEmailForm();

    const [selectedLoanId, setSelectedLoanId] = useState<string>("vehicle-loan");
    const [loanAmount, setLoanAmount] = useState<number>(1500000);
    const [employmentType, setEmploymentType] = useState<"salaried" | "self-employed">("salaried");
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        city: "Mumbai",
        monthlyIncome: "₹75,000"
    });

    useEffect(() => {
        if (initialLoan) {
            setSelectedLoanId(initialLoan.id);
            setLoanAmount(initialLoan.defaultAmount);
        }
    }, [initialLoan]);

    const activeLoan = LOAN_SLIDER_ITEMS.find((l) => l.id === selectedLoanId) || LOAN_SLIDER_ITEMS[0];

    // Calculate approximate monthly EMI for user feedback
    const calculateEMI = (principal: number, annualRate: number, years: number) => {
        const r = annualRate / 12 / 100;
        const n = years * 12;
        const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        return Math.round(emi);
    };

    const interestRateNum = parseFloat(activeLoan.rate) || 8.75;
    const estimatedEMI = calculateEMI(loanAmount, interestRateNum, parseInt(activeLoan.tenure) || 5);

    const formatCurrency = (val: number) => {
        if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
        if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakhs`;
        return `₹${val.toLocaleString('en-IN')}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await sendEmail({
            title: `Urban Money Flow: ${activeLoan.category} Sanction Request`,
            loanType: activeLoan.category,
            requiredAmount: formatCurrency(loanAmount),
            employmentType,
            interestRate: activeLoan.rate,
            ...formData
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
            title={`Instant ${activeLoan.category} Sanction Check`}
            className="max-w-xl bg-[#1e2126] text-white border-slate-800"
        >
            {isSuccess ? (
                <div className="text-center py-8 space-y-5">
                    <div className="h-20 w-20 bg-[#00c985]/20 text-[#00c985] rounded-full flex items-center justify-center mx-auto border-2 border-[#00c985]/40 animate-in zoom-in">
                        <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-black text-white">
                            Sanction Pre-Approval In Progress!
                        </h3>
                        <p className="text-slate-300 text-sm max-w-md mx-auto">
                            Thank you, <strong className="text-white">{formData.name || "Customer"}</strong>. Your application for <strong className="text-[#00e699]">{activeLoan.category}</strong> of <strong className="text-[#00e699]">{formatCurrency(loanAmount)}</strong> has been fast-tracked.
                        </p>
                    </div>

                    <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 text-left space-y-2 text-xs">
                        <div className="flex justify-between text-slate-400">
                            <span>Selected Bank Option:</span>
                            <span className="text-white font-bold">Shree Direct & Premier Partners</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                            <span>Starting Interest Rate:</span>
                            <span className="text-[#00e699] font-black">{activeLoan.rate} p.a.</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                            <span>Estimated Monthly EMI:</span>
                            <span className="text-white font-bold">₹{estimatedEMI.toLocaleString('en-IN')}/mo</span>
                        </div>
                    </div>

                    <p className="text-xs text-slate-400">
                        Our dedicated loan officer will call you within 30 minutes with the sanctioned sanction letter.
                    </p>

                    <Button 
                        onClick={handleClose} 
                        className="w-full bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black h-12 rounded-xl"
                    >
                        Done
                    </Button>
                </div>
            ) : (
                <div className="space-y-5">
                    {/* Loan Category Selector Switcher */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                        {LOAN_SLIDER_ITEMS.map((l) => (
                            <button
                                key={l.id}
                                type="button"
                                onClick={() => {
                                    setSelectedLoanId(l.id);
                                    setLoanAmount(l.defaultAmount);
                                }}
                                className={`px-3 py-1.5 rounded-full text-xs font-black whitespace-nowrap transition-all ${
                                    selectedLoanId === l.id
                                        ? "bg-[#ffcd00] text-slate-950 shadow-md"
                                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                }`}
                            >
                                {l.category}
                            </button>
                        ))}
                    </div>

                    {/* Urban Money Rate Header Highlight */}
                    <div className="rounded-2xl p-4 bg-gradient-to-r from-slate-900 to-[#181a1d] border border-slate-800 flex items-center justify-between">
                        <div className="space-y-0.5">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                                Live Lowest Market Rate
                            </span>
                            <p className="text-xl font-black text-[#00e699] flex items-center gap-1">
                                <span>{activeLoan.rate}</span>
                                <span className="text-xs text-slate-400 font-bold">p.a. onwards</span>
                            </p>
                        </div>
                        <div className="text-right space-y-0.5">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                                Est. Monthly EMI
                            </span>
                            <p className="text-lg font-black text-amber-300">
                                ₹{estimatedEMI.toLocaleString('en-IN')}<span className="text-xs text-slate-400 font-bold">/mo</span>
                            </p>
                        </div>
                    </div>

                    {/* Loan Amount Selector with Fast Amount Chips */}
                    <div className="space-y-2 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                        <div className="flex justify-between items-center text-xs">
                            <span className="font-extrabold text-slate-400 uppercase">Desired Loan Amount</span>
                            <span className="text-base font-black text-[#00e699]">{formatCurrency(loanAmount)}</span>
                        </div>

                        <div className="grid grid-cols-4 gap-2 pt-1">
                            {[500000, 1500000, 3500000, 7500000].map((amt) => (
                                <button
                                    key={amt}
                                    type="button"
                                    onClick={() => setLoanAmount(amt)}
                                    className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                                        loanAmount === amt
                                            ? "bg-[#ffcd00] text-slate-950"
                                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                    }`}
                                >
                                    {amt >= 10000000 ? "1 Cr" : `${amt / 100000} Lakhs`}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Form Details */}
                    <form onSubmit={handleSubmit} className="space-y-3.5">
                        {/* Employment Status Switch */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-400">Employment Type</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    type="button"
                                    onClick={() => setEmploymentType("salaried")}
                                    className={`py-2 rounded-xl text-xs font-black transition-all ${
                                        employmentType === "salaried"
                                            ? "bg-[#00c985] text-slate-950 shadow-md"
                                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                    }`}
                                >
                                    Salaried Professional
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEmploymentType("self-employed")}
                                    className={`py-2 rounded-xl text-xs font-black transition-all ${
                                        employmentType === "self-employed"
                                            ? "bg-[#00c985] text-slate-950 shadow-md"
                                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                    }`}
                                >
                                    Self-Employed / Business
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-400">Full Name</label>
                                <Input
                                    required
                                    placeholder="e.g. Rahul Sharma"
                                    className="bg-slate-900 border-slate-700 text-white h-11 text-xs"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-400">Mobile Number</label>
                                <Input
                                    required
                                    type="tel"
                                    placeholder="98765 XXXXX"
                                    pattern="[0-9]{10}"
                                    className="bg-slate-900 border-slate-700 text-white h-11 text-xs"
                                    value={formData.mobile}
                                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-400">Email Address</label>
                                <Input
                                    required
                                    type="email"
                                    placeholder="rahul@example.com"
                                    className="bg-slate-900 border-slate-700 text-white h-11 text-xs"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-400">City / Location</label>
                                <Input
                                    required
                                    placeholder="e.g. Mumbai, Pune, Delhi"
                                    className="bg-slate-900 border-slate-700 text-white h-11 text-xs"
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#ffcd00] hover:bg-[#eab308] text-slate-950 font-black h-13 rounded-2xl uppercase tracking-wider text-sm shadow-xl flex items-center justify-center gap-2 mt-2 cursor-pointer"
                        >
                            {isSubmitting ? "Fast-Tracking Your Sanction..." : (
                                <>
                                    <span>Get Pre-Approved {activeLoan.category}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </Button>

                        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                            <ShieldCheck className="h-3.5 w-3.5 text-[#00e699]" />
                            <span>100% Safe & Confidential • No impact on CIBIL score</span>
                        </div>
                    </form>

                    {error && (
                        <p className="text-xs text-rose-400 text-center bg-rose-950/40 p-2 rounded-xl border border-rose-800">
                            {error}
                        </p>
                    )}
                </div>
            )}
        </Modal>
    );
}
