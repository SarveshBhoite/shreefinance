"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEmailForm } from "@/hooks/use-email-form";
import {
    Building2,
    CheckCircle2,
    ShieldCheck,
    Coins,
    Car,
    Home as HomeIcon,
    Briefcase,
    Building,
    GraduationCap,
    BadgeIndianRupee,
    Percent,
    ArrowRight,
    ArrowLeft,
    FileText,
    Sparkles,
    Target,
    Zap,
    Award
} from "lucide-react";

export type Deal4LoanType = "personal" | "home" | "car" | "business" | "lap" | "education";

export interface Deal4LoanConfig {
    id: Deal4LoanType;
    category: string;
    title: string;
    icon: any;
    rate: string;
    rateNum: number;
    defaultAmount: number;
    tenureYears: number;
    purposes: string[];
    amountPresets: number[];
}

export const DEAL4LOANS_CONFIG: Record<Deal4LoanType, Deal4LoanConfig> = {
    personal: {
        id: "personal",
        category: "Personal Loan",
        title: "Instant Personal Loan",
        icon: Coins,
        rate: "10.25%",
        rateNum: 10.25,
        defaultAmount: 500000,
        tenureYears: 5,
        purposes: [
            "Marriage / Family Wedding Expenses",
            "Medical Emergency / Hospitalization",
            "Debt Consolidation & Credit Card Payoff",
            "Home Renovation & Interior Upgrades",
            "Higher Education / Skill Certification",
            "Travel / Holiday Expenses",
            "General Personal Financing"
        ],
        amountPresets: [200000, 500000, 1000000, 2000000]
    },
    home: {
        id: "home",
        category: "Home Loan",
        title: "Home Loan / Housing Finance",
        icon: HomeIcon,
        rate: "8.35%",
        rateNum: 8.35,
        defaultAmount: 4500000,
        tenureYears: 20,
        purposes: [
            "Purchase of Ready-to-Move Flat / Villa",
            "Under-Construction Residential Property",
            "Plot Purchase + House Construction",
            "Home Loan Balance Transfer + Top-Up",
            "Home Improvement / Extension"
        ],
        amountPresets: [2500000, 4500000, 7500000, 15000000]
    },
    car: {
        id: "car",
        category: "Car Loan",
        title: "Auto / Car Loan (100% On-Road)",
        icon: Car,
        rate: "8.75%",
        rateNum: 8.75,
        defaultAmount: 800000,
        tenureYears: 5,
        purposes: [
            "New Passenger Car / SUV Purchase",
            "Certified Used / Pre-Owned Car Purchase",
            "Commercial Vehicle / Taxi Purchase",
            "Electric Vehicle (EV) Special Funding"
        ],
        amountPresets: [400000, 800000, 1500000, 2500000]
    },
    business: {
        id: "business",
        category: "Business Loan",
        title: "Unsecured Business Loan",
        icon: Briefcase,
        rate: "13.99%",
        rateNum: 13.99,
        defaultAmount: 2000000,
        tenureYears: 5,
        purposes: [
            "Working Capital Requirement",
            "Machinery / Equipment Purchase",
            "Business Expansion & New Store Setup",
            "Inventory / Raw Material Stocking",
            "Vendor & Supplier Payments"
        ],
        amountPresets: [500000, 1500000, 2500000, 5000000]
    },
    lap: {
        id: "lap",
        category: "Loan Against Property",
        title: "Loan Against Property (LAP)",
        icon: Building,
        rate: "9.25%",
        rateNum: 9.25,
        defaultAmount: 6000000,
        tenureYears: 15,
        purposes: [
            "Commercial Business Expansion",
            "Long-Term Capital Infusion",
            "High-Value Debt Consolidation",
            "Property Acquisition / Asset Building"
        ],
        amountPresets: [2500000, 5000000, 10000000, 25000000]
    },
    education: {
        id: "education",
        category: "Education Loan",
        title: "Higher Education Loan",
        icon: GraduationCap,
        rate: "9.50%",
        rateNum: 9.50,
        defaultAmount: 1500000,
        tenureYears: 10,
        purposes: [
            "Study in Abroad (USA, UK, Canada, Europe)",
            "Premier Indian Universities (IIT/IIM/NIT)",
            "Medical / Engineering Professional Courses",
            "Executive MBA & Tech Certifications"
        ],
        amountPresets: [500000, 1500000, 3000000, 5000000]
    }
};

interface Deal4LoansApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialLoanType?: Deal4LoanType;
}

export function Deal4LoansApplicationModal({
    isOpen,
    onClose,
    initialLoanType = "personal"
}: Deal4LoansApplicationModalProps) {
    const { sendEmail, isSubmitting, isSuccess, error, resetForm } = useEmailForm();

    const [selectedType, setSelectedType] = useState<Deal4LoanType>(initialLoanType);
    const [step, setStep] = useState<1 | 2>(1);

    const activeConfig = DEAL4LOANS_CONFIG[selectedType] || DEAL4LOANS_CONFIG.personal;

    const [loanAmount, setLoanAmount] = useState<number>(activeConfig.defaultAmount);
    const [tenureYears, setTenureYears] = useState<number>(activeConfig.tenureYears);
    const [loanPurpose, setLoanPurpose] = useState<string>(activeConfig.purposes[0]);
    const [employmentType, setEmploymentType] = useState<"Salaried" | "Self-Employed">("Salaried");

    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        city: "Mumbai",
        monthlyIncome: "₹65,000",
        companyName: "",
        existingEMI: "0",
    });

    useEffect(() => {
        if (initialLoanType && DEAL4LOANS_CONFIG[initialLoanType]) {
            setSelectedType(initialLoanType);
            const cfg = DEAL4LOANS_CONFIG[initialLoanType];
            setLoanAmount(cfg.defaultAmount);
            setTenureYears(cfg.tenureYears);
            setLoanPurpose(cfg.purposes[0]);
        }
    }, [initialLoanType, isOpen]);

    const handleTypeChange = (type: Deal4LoanType) => {
        setSelectedType(type);
        const cfg = DEAL4LOANS_CONFIG[type];
        setLoanAmount(cfg.defaultAmount);
        setTenureYears(cfg.tenureYears);
        setLoanPurpose(cfg.purposes[0]);
    };

    // Calculate approximate monthly EMI
    const calculateEMI = (p: number, rAnnual: number, years: number) => {
        const r = rAnnual / 12 / 100;
        const n = years * 12;
        if (r === 0 || n <= 0) return Math.round(p / n);
        const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        return Math.round(emi);
    };

    const calculatedEMI = calculateEMI(loanAmount, activeConfig.rateNum, tenureYears);

    const formatCurrency = (val: number) => {
        if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
        if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakhs`;
        return `₹${val.toLocaleString('en-IN')}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await sendEmail({
            title: `Direct Bank Facility: ${activeConfig.category} Application`,
            applicationHeader: "Shree Finance Direct Bank Facility Application",
            loanCategory: activeConfig.category,
            loanPurpose: loanPurpose,
            requiredLoanAmount: formatCurrency(loanAmount),
            repaymentTenure: `${tenureYears} Years (${tenureYears * 12} Months)`,
            benchmarkRate: `${activeConfig.rate} p.a.`,
            estimatedEMI: `₹${calculatedEMI.toLocaleString('en-IN')}/mo`,
            employmentType: employmentType,
            applicantName: formData.name,
            mobileNumber: formData.mobile,
            emailAddress: formData.email,
            residenceCity: formData.city,
            monthlySalaryOrIncome: formData.monthlyIncome,
            companyOrBusiness: formData.companyName || "Individual / Self-Employed",
            existingOngoingEMI: formData.existingEMI,
        });
    };

    const handleClose = () => {
        resetForm();
        setStep(1);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title=""
            className="max-w-2xl bg-[#1a1c20] text-white border-slate-800 p-0 overflow-hidden"
        >
            {/* 1. Official Header Bar */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-5 border-b border-slate-800 relative">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#00c985] text-slate-950 flex items-center justify-center font-black shrink-0 shadow-md">
                        <Building2 className="h-6 w-6" />
                    </div>
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#00e699] flex items-center gap-1.5">
                            <Sparkles className="h-3 w-3" /> Official Partner Network • 40+ Banks
                        </span>
                        <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
                            Shree Finance Direct Bank Facility Application
                        </h2>
                    </div>
                </div>
            </div>

            <div className="p-5 sm:p-7 max-h-[80vh] overflow-y-auto">
                {isSuccess ? (
                    <div className="text-center py-6 space-y-5">
                        <div className="h-20 w-20 bg-[#00c985]/20 text-[#00c985] rounded-full flex items-center justify-center mx-auto border-2 border-[#00c985]/40 animate-in zoom-in">
                            <CheckCircle2 className="h-10 w-10" />
                        </div>
                        <div className="space-y-2">
                            <span className="text-xs font-black uppercase text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                                Application ID: #SHREE-BANK-2026-{Math.floor(1000 + Math.random() * 9000)}
                            </span>
                            <h3 className="text-2xl font-black text-white pt-1">
                                Bank Facility Pre-Sanction Registered!
                            </h3>
                            <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto font-medium">
                                Thank you, <strong className="text-white">{formData.name || "Applicant"}</strong>. Your application for <strong className="text-[#00e699]">{activeConfig.category}</strong> of <strong className="text-[#00e699]">{formatCurrency(loanAmount)}</strong> is directly assigned to our Bank Underwriting Team.
                            </p>
                        </div>

                        {/* Summary Acknowledgement Box */}
                        <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-left space-y-2.5 text-xs">
                            <div className="flex justify-between text-slate-400">
                                <span>Selected Loan Facility:</span>
                                <span className="text-white font-black">{activeConfig.category}</span>
                            </div>
                            <div className="flex justify-between text-slate-400">
                                <span>Facility End-Use Purpose:</span>
                                <span className="text-slate-200 font-bold">{loanPurpose}</span>
                            </div>
                            <div className="flex justify-between text-slate-400">
                                <span>Applicable Benchmark Rate:</span>
                                <span className="text-[#00e699] font-black">{activeConfig.rate} p.a.</span>
                            </div>
                            <div className="flex justify-between text-slate-400">
                                <span>Estimated Monthly EMI:</span>
                                <span className="text-amber-300 font-black">₹{calculatedEMI.toLocaleString('en-IN')}/mo</span>
                            </div>
                            <div className="flex justify-between text-slate-400">
                                <span>Processing Fee Scheme:</span>
                                <span className="text-[#00e699] font-bold">0% Direct Bank Portal Concession</span>
                            </div>
                        </div>

                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-[#00e699]">
                            <ShieldCheck className="h-4 w-4 shrink-0" />
                            <span>A dedicated Senior Loan Underwriter will contact you within 15-30 minutes.</span>
                        </div>

                        <Button
                            onClick={handleClose}
                            className="w-full bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black h-12 rounded-xl text-xs uppercase tracking-wider cursor-pointer"
                        >
                            Done / Download Acknowledgement
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* 2. Loan Category Quick Switcher Tabs (Deal4Loans Style) */}
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center text-[11px] font-bold text-slate-400 uppercase">
                                <span>Select Loan Facility</span>
                                <span className="text-[#00e699] font-black">{activeConfig.rate} p.a. starting</span>
                            </div>
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 p-1 bg-slate-900/90 rounded-2xl border border-slate-800">
                                {(Object.keys(DEAL4LOANS_CONFIG) as Deal4LoanType[]).map((key) => {
                                    const cfg = DEAL4LOANS_CONFIG[key];
                                    const Icon = cfg.icon;
                                    const isSelected = selectedType === key;
                                    return (
                                        <button
                                            key={key}
                                            type="button"
                                            onClick={() => handleTypeChange(key)}
                                            className={`p-2 rounded-xl text-xs font-black transition-all flex flex-col items-center gap-1 cursor-pointer ${
                                                isSelected
                                                    ? "bg-[#00c985] text-slate-950 shadow-md scale-102"
                                                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                            }`}
                                        >
                                            <Icon className="h-4 w-4 shrink-0" />
                                            <span className="text-[10px] leading-tight text-center">{cfg.category.replace(" Loan", "")}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 3. Live Benchmark Indicator */}
                        <div className="rounded-2xl p-4 bg-gradient-to-r from-slate-900 to-[#1e2228] border border-slate-800 flex items-center justify-between">
                            <div className="space-y-0.5">
                                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                                    Direct Rate Benchmark
                                </span>
                                <p className="text-xl font-black text-[#00e699]">
                                    {activeConfig.rate} <span className="text-xs text-slate-400 font-bold">p.a. onwards</span>
                                </p>
                            </div>
                            <div className="text-right space-y-0.5">
                                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                                    Calculated Monthly EMI
                                </span>
                                <p className="text-xl font-black text-amber-300">
                                    ₹{calculatedEMI.toLocaleString('en-IN')}<span className="text-xs text-slate-400 font-bold">/mo</span>
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* SECTION 1: LOAN PARAMETERS & PURPOSE */}
                            <div className="space-y-3.5 bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                                {/* Purpose Selector */}
                                <div className="space-y-1">
                                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                        <Target className="h-3.5 w-3.5 text-[#00c985]" /> Loan Purpose / Specific End-Use
                                    </label>
                                    <select
                                        value={loanPurpose}
                                        onChange={(e) => setLoanPurpose(e.target.value)}
                                        className="w-full h-11 bg-slate-950 border border-slate-700 rounded-xl font-bold text-white px-3 text-xs focus:ring-2 focus:ring-[#00c985]"
                                    >
                                        {activeConfig.purposes.map((p, idx) => (
                                            <option key={idx} value={p}>
                                                • {p}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Loan Amount with Quick Chips */}
                                <div className="space-y-1.5">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="font-bold text-slate-400 uppercase">Required Loan Amount</span>
                                        <span className="text-sm font-black text-[#00e699]">{formatCurrency(loanAmount)}</span>
                                    </div>
                                    <Input
                                        type="number"
                                        value={loanAmount}
                                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                                        className="bg-slate-950 border-slate-700 text-white font-bold h-11 text-xs"
                                        min={50000}
                                        step={10000}
                                        required
                                    />
                                    <div className="grid grid-cols-4 gap-1.5 pt-1">
                                        {activeConfig.amountPresets.map((amt) => (
                                            <button
                                                key={amt}
                                                type="button"
                                                onClick={() => setLoanAmount(amt)}
                                                className={`py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                                                    loanAmount === amt
                                                        ? "bg-[#ffcd00] text-slate-950"
                                                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                                }`}
                                            >
                                                {amt >= 10000000 ? `${(amt / 10000000).toFixed(1)} Cr` : `${amt / 100000} Lakhs`}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Repayment Tenure Picker */}
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="font-bold text-slate-400 uppercase">Repayment Tenure</span>
                                        <span className="text-xs font-black text-white">{tenureYears} Years ({tenureYears * 12} Months)</span>
                                    </div>
                                    <select
                                        value={tenureYears}
                                        onChange={(e) => setTenureYears(Number(e.target.value))}
                                        className="w-full h-11 bg-slate-950 border border-slate-700 rounded-xl font-bold text-white px-3 text-xs focus:ring-2 focus:ring-[#00c985]"
                                    >
                                        <option value={1}>1 Year (12 Months)</option>
                                        <option value={2}>2 Years (24 Months)</option>
                                        <option value={3}>3 Years (36 Months)</option>
                                        <option value={5}>5 Years (60 Months)</option>
                                        <option value={7}>7 Years (84 Months)</option>
                                        <option value={10}>10 Years (120 Months)</option>
                                        <option value={15}>15 Years (180 Months)</option>
                                        <option value={20}>20 Years (240 Months)</option>
                                        <option value={25}>25 Years (300 Months)</option>
                                        <option value={30}>30 Years (360 Months)</option>
                                    </select>
                                </div>
                            </div>

                            {/* SECTION 2: APPLICANT DEMOGRAPHICS & INCOME */}
                            <div className="space-y-3.5 bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                                {/* Employment Switch */}
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase">Employment Status</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setEmploymentType("Salaried")}
                                            className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                                                employmentType === "Salaried"
                                                    ? "bg-[#00c985] text-slate-950 shadow-md"
                                                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                            }`}
                                        >
                                            Salaried Professional
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setEmploymentType("Self-Employed")}
                                            className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                                                employmentType === "Self-Employed"
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
                                        <label className="text-[11px] font-bold text-slate-400 uppercase">Applicant Full Name</label>
                                        <Input
                                            required
                                            placeholder="e.g. Rahul Sharma"
                                            className="bg-slate-950 border-slate-700 text-white h-11 text-xs"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[11px] font-bold text-slate-400 uppercase">Mobile Number</label>
                                        <Input
                                            required
                                            type="tel"
                                            placeholder="10-digit mobile number"
                                            pattern="[0-9]{10}"
                                            maxLength={10}
                                            className="bg-slate-950 border-slate-700 text-white h-11 text-xs"
                                            value={formData.mobile}
                                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-bold text-slate-400 uppercase">Email Address</label>
                                        <Input
                                            required
                                            type="email"
                                            placeholder="rahul@example.com"
                                            className="bg-slate-950 border-slate-700 text-white h-11 text-xs"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[11px] font-bold text-slate-400 uppercase">City / Location</label>
                                        <Input
                                            required
                                            placeholder="e.g. Pune, Mumbai, Delhi"
                                            className="bg-slate-950 border-slate-700 text-white h-11 text-xs"
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-bold text-slate-400 uppercase">Net Monthly Income / Salary</label>
                                        <Input
                                            required
                                            placeholder="₹50,000"
                                            className="bg-slate-950 border-slate-700 text-white h-11 text-xs"
                                            value={formData.monthlyIncome}
                                            onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[11px] font-bold text-slate-400 uppercase">Company / Business Name</label>
                                        <Input
                                            placeholder="e.g. TCS, Infosys, Self Business"
                                            className="bg-slate-950 border-slate-700 text-white h-11 text-xs"
                                            value={formData.companyName}
                                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#ffcd00] hover:bg-[#eab308] text-slate-950 font-black h-13 rounded-2xl uppercase tracking-wider text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 mt-3 cursor-pointer"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                                        <span>Forwarding to Direct Bank Underwriting...</span>
                                    </div>
                                ) : (
                                    <>
                                        <span>Submit Direct Bank Application 🚀</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </Button>

                            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                                <ShieldCheck className="h-4 w-4 text-[#00c985]" />
                                <span>256-bit SSL Encrypted • Zero Impact on CIBIL Score • RBI Compliant</span>
                            </div>

                            {error && (
                                <p className="text-xs text-rose-400 text-center bg-rose-950/40 p-2.5 rounded-xl border border-rose-800">
                                    {error}
                                </p>
                            )}
                        </form>
                    </div>
                )}
            </div>
        </Modal>
    );
}
