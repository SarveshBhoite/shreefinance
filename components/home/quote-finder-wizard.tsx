"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import {
    Sparkles,
    Briefcase,
    Home as HomeIcon,
    Building2,
    Car,
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    ShieldCheck,
    Check,
    Building,
    Home,
    MapPin,
    Phone,
    Mail
} from "lucide-react";
import { motion } from "framer-motion";
import { useEmailForm } from "@/hooks/use-email-form";

export function QuoteFinderWizard() {
    const { sendEmail, isSubmitting } = useEmailForm();

    // Wizard Step State: 1 = Category & Amount, 2 = Income, EMI & House Type, 3 = Company, Contact & Location
    const [step, setStep] = useState(1);
    const [showResults, setShowResults] = useState(false);

    // Form inputs
    const [loanCategory, setLoanCategory] = useState<"home" | "personal" | "lap" | "car">("home");
    const [loanAmount, setLoanAmount] = useState(2500000);
    const [employmentType, setEmploymentType] = useState<"Salaried" | "Self-Employed">("Salaried");
    const [monthlyIncome, setMonthlyIncome] = useState(65000);
    const [existingEMIs, setExistingEMIs] = useState(0);
    const [residenceType, setResidenceType] = useState<"Rented House" | "Own House">("Own House");
    const [companyName, setCompanyName] = useState("");

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");

    const [selectedBank, setSelectedBank] = useState<string | null>(null);

    const categories = [
        { id: "home", label: "Home Loan", icon: HomeIcon, rate: "8.35% p.a.", defaultAmount: 5000000 },
        { id: "personal", label: "Personal Loan", icon: Briefcase, rate: "10.25% p.a.", defaultAmount: 500000 },
        { id: "lap", label: "Loan vs Property", icon: Building2, rate: "9.25% p.a.", defaultAmount: 7500000 },
        { id: "car", label: "Car Loan", icon: Car, rate: "8.75% p.a.", defaultAmount: 800000 },
    ] as const;

    // Computed Values
    const maxFOIR = employmentType === "Salaried" ? 0.60 : 0.65;
    const netDisposableIncome = Math.max(0, (monthlyIncome * maxFOIR) - existingEMIs);

    const categoryConfig = {
        home: { rate: 8.35, years: 20 },
        personal: { rate: 10.25, years: 5 },
        lap: { rate: 9.25, years: 15 },
        car: { rate: 8.75, years: 5 },
    };

    const config = categoryConfig[loanCategory];
    const monthlyRate = config.rate / 12 / 100;
    const totalMonths = config.years * 12;

    const estimatedMaxLoan = Math.round(
        (netDisposableIncome * (Math.pow(1 + monthlyRate, totalMonths) - 1)) /
        (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))
    );

    const formatCurrency = (val: number) => {
        if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
        if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakhs`;
        return `₹${val.toLocaleString('en-IN')}`;
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendEmail({
            type: `Multi-Bank Quote Wizard (${loanCategory.toUpperCase()})`,
            name,
            mobile: phone,
            email,
            city,
            category: loanCategory,
            loanAmount: `₹${loanAmount.toLocaleString('en-IN')}`,
            monthlyIncome: `₹${monthlyIncome.toLocaleString('en-IN')}`,
            existingEMIs: `₹${existingEMIs.toLocaleString('en-IN')}`,
            residenceType,
            companyName,
            estimatedMaxLoan: formatCurrency(estimatedMaxLoan),
        });
        setShowResults(true);
    };

    const calculateEMI = (p: number, r: number, nYears: number = config.years) => {
        const mr = r / 12 / 100;
        const n = nYears * 12;
        return Math.round((p * mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1));
    };

    const bankQuotes = [
        { bank: "YES Bank & Shree Direct", rate: config.rate, fee: "0% Special Deal", isBestMatch: true, badge: "Lowest EMI Match" },
        { bank: "State Bank of India (SBI)", rate: (config.rate + 0.15).toFixed(2), fee: "0.35% + GST", isBestMatch: false, badge: "Government Security" },
        { bank: "HDFC Bank Direct", rate: (config.rate + 0.25).toFixed(2), fee: "₹3,500 Flat", isBestMatch: false, badge: "Fast 24h Sanction" },
        { bank: "ICICI Bank Express", rate: (config.rate + 0.35).toFixed(2), fee: "0.25% Processing", isBestMatch: false, badge: "Pre-Approved Pool" },
    ];

    return (
        <div className="w-full bg-white text-slate-900 rounded-[2.5rem] p-6 md:p-10 border border-slate-200 shadow-2xl relative font-sans overflow-hidden">
            {/* Ambient Background Gradient */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00c985]/10 rounded-full blur-[100px] pointer-events-none" />

            {!showResults ? (
                <div className="space-y-8">
                    {/* Header Stepper */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950 text-white text-xs font-black uppercase tracking-widest mb-3 shadow-sm border border-slate-800">
                                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                                Instant Multi-Bank Aggregator
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black text-white bg-slate-900 px-5 py-2.5 rounded-2xl w-fit shadow-md tracking-tight">
                                Get Free Your Loan Eligibility Check
                            </h2>
                            <p className="text-slate-600 text-xs md:text-sm font-medium mt-2">
                                Select loan type below to calculate instant eligibility, company sanction limit & lowest interest rates.
                            </p>
                        </div>

                        {/* Step indicator */}
                        <div className="flex items-center gap-2">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className={`h-3 rounded-full transition-all duration-300 ${
                                        step === i ? "w-10 bg-[#00c985]" : step > i ? "w-3 bg-emerald-500" : "w-3 bg-slate-200"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Step 1: Select 1 of 4 Cards */}
                    {step === 1 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                            <div className="space-y-4">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                    Select Loan Category (Click any card to continue)
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => {
                                                setLoanCategory(cat.id);
                                                setLoanAmount(cat.defaultAmount);
                                                setStep(2);
                                            }}
                                            className={`p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                                                loanCategory === cat.id
                                                    ? "border-[#00c985] bg-[#00c985]/10 shadow-lg ring-2 ring-[#00c985]"
                                                    : "border-slate-200 bg-slate-50 hover:border-[#00c985]/50 hover:shadow-md"
                                            }`}
                                        >
                                            <cat.icon className={`h-8 w-8 mb-3 transition-transform group-hover:scale-110 ${
                                                loanCategory === cat.id ? "text-[#00c985]" : "text-slate-500"
                                            }`} />
                                            <div>
                                                <p className="font-black text-slate-900 text-base">{cat.label}</p>
                                                <p className="text-[10px] font-black uppercase text-[#00c985] tracking-widest mt-1">{cat.rate}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Loan Amount Slider */}
                            <div className="space-y-4 bg-slate-50 p-6 rounded-3xl border border-slate-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-700">Required Loan Amount</span>
                                    <span className="text-2xl font-black text-[#00c985]">{formatCurrency(loanAmount)}</span>
                                </div>
                                <Slider
                                    value={[loanAmount]}
                                    min={100000}
                                    max={20000000}
                                    step={100000}
                                    onValueChange={(val) => setLoanAmount(val[0])}
                                    className="py-2"
                                />
                                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <span>₹1 Lakh</span>
                                    <span>₹2 Crore</span>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    onClick={() => setStep(2)}
                                    className="bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black h-14 px-8 rounded-2xl shadow-xl text-base uppercase tracking-wider"
                                >
                                    Next: Income & House Details <ArrowRight className="h-5 w-5 ml-2" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Salary/Income, Current EMI, Rented vs Own House */}
                    {step === 2 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Employment Type */}
                                <div className="space-y-3">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Employment Status
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {(["Salaried", "Self-Employed"] as const).map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => setEmploymentType(type)}
                                                className={`p-4 rounded-2xl border font-black text-sm transition-all ${
                                                    employmentType === type
                                                        ? "border-[#00c985] bg-[#00c985] text-slate-950 shadow-md"
                                                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-[#00c985]/50"
                                                }`}
                                            >
                                                {type === "Salaried" ? "💼 Salaried" : "🏢 Self-Employed"}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Rented or Own House Selection */}
                                <div className="space-y-3">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Residence Type (Rented or Own House)
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {(["Own House", "Rented House"] as const).map((res) => (
                                            <button
                                                key={res}
                                                type="button"
                                                onClick={() => setResidenceType(res)}
                                                className={`p-4 rounded-2xl border font-black text-sm transition-all flex items-center justify-center gap-2 ${
                                                    residenceType === res
                                                        ? "border-[#00c985] bg-slate-950 text-[#00e699] shadow-md"
                                                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-[#00c985]/50"
                                                }`}
                                            >
                                                <Home className="h-4 w-4 text-[#00c985]" />
                                                {res}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Monthly Salary / Income Slider */}
                            <div className="space-y-4 bg-slate-50 p-6 rounded-3xl border border-slate-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-700">Salary / Monthly Net In-Hand Income</span>
                                    <span className="text-2xl font-black text-[#00c985]">₹{monthlyIncome.toLocaleString('en-IN')}</span>
                                </div>
                                <Slider
                                    value={[monthlyIncome]}
                                    min={15000}
                                    max={500000}
                                    step={5000}
                                    onValueChange={(val) => setMonthlyIncome(val[0])}
                                    className="py-2"
                                />
                                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <span>₹15,000 / Mo</span>
                                    <span>₹5,000,000+ / Mo</span>
                                </div>
                            </div>

                            {/* Current Monthly EMI Slider */}
                            <div className="space-y-4 bg-slate-50 p-6 rounded-3xl border border-slate-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-700">Current Monthly EMI Paying Now</span>
                                    <span className="text-2xl font-black text-rose-500">₹{existingEMIs.toLocaleString('en-IN')}</span>
                                </div>
                                <Slider
                                    value={[existingEMIs]}
                                    min={0}
                                    max={150000}
                                    step={2500}
                                    onValueChange={(val) => setExistingEMIs(val[0])}
                                    className="py-2"
                                />
                                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <span>₹0 (No existing EMI)</span>
                                    <span>₹150,000 / Mo</span>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <Button
                                    variant="outline"
                                    onClick={() => setStep(1)}
                                    className="border-slate-300 text-slate-700 font-bold h-14 px-6 rounded-2xl"
                                >
                                    <ArrowLeft className="h-5 w-5 mr-2" /> Back
                                </Button>
                                <Button
                                    onClick={() => setStep(3)}
                                    className="bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black h-14 px-8 rounded-2xl shadow-xl text-base uppercase tracking-wider"
                                >
                                    Next: Company, Mail & Contact <ArrowRight className="h-5 w-5 ml-2" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Company Name, Mail ID, Mobile Number, Location */}
                    {step === 3 && (
                        <motion.form
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onSubmit={handleFormSubmit}
                            className="space-y-6"
                        >
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Company Name */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                                        <Building className="h-4 w-4 text-[#00c985]" /> Company / Organization Name
                                    </label>
                                    <Input
                                        placeholder="e.g. TCS, Infosys, Self-Owned Business"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        required
                                        className="h-14 bg-slate-50 border-slate-300 rounded-2xl font-bold px-5 text-slate-900"
                                    />
                                </div>

                                {/* Full Name */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">Applicant Full Name</label>
                                    <Input
                                        placeholder="Enter your full name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="h-14 bg-slate-50 border-slate-300 rounded-2xl font-bold px-5 text-slate-900"
                                    />
                                </div>

                                {/* Mobile Number */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                                        <Phone className="h-4 w-4 text-amber-500" /> Mobile Number (Instant OTP)
                                    </label>
                                    <Input
                                        placeholder="10-digit mobile number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                        className="h-14 bg-slate-50 border-slate-300 rounded-2xl font-bold px-5 text-slate-900"
                                    />
                                </div>

                                {/* Mail ID */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                                        <Mail className="h-4 w-4 text-sky-500" /> Mail ID (Email Address)
                                    </label>
                                    <Input
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="h-14 bg-slate-50 border-slate-300 rounded-2xl font-bold px-5 text-slate-900"
                                    />
                                </div>

                                {/* Add Your Location */}
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                                        <MapPin className="h-4 w-4 text-[#00c985]" /> Add Your Location (City / Pincode)
                                    </label>
                                    <Input
                                        placeholder="e.g. Pune, Mumbai, Bangalore, Delhi NCR"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        required
                                        className="h-14 bg-slate-50 border-slate-300 rounded-2xl font-bold px-5 text-slate-900"
                                    />
                                </div>
                            </div>

                            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-xs font-bold text-emerald-800">
                                <ShieldCheck className="h-5 w-5 shrink-0 text-[#00c985]" />
                                <span>Your details are 256-bit encrypted. Instant eligibility calculation for {companyName || "your company"}. Zero CIBIL impact.</span>
                            </div>

                            <div className="flex justify-between pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setStep(2)}
                                    className="border-slate-300 text-slate-700 font-bold h-14 px-6 rounded-2xl"
                                >
                                    <ArrowLeft className="h-5 w-5 mr-2" /> Back
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black h-16 px-10 rounded-2xl shadow-xl text-base uppercase tracking-wider"
                                >
                                    {isSubmitting ? "Calculating Bank Sanction..." : "Get Instant Multi-Bank Quotes 🚀"}
                                </Button>
                            </div>
                        </motion.form>
                    )}
                </div>
            ) : (
                /* Results View: Multi-Bank Calculated Quotes */
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-widest mb-2">
                                <CheckCircle2 className="h-3.5 w-3.5 text-[#00c985]" />
                                Eligibility Calculation Complete
                            </div>
                            <h2 className="text-3xl font-black text-slate-900">
                                Top Bank Offers for {name || "You"} ({residenceType})
                            </h2>
                            <p className="text-slate-500 text-sm mt-1">
                                Estimated Max Loan Eligibility for <strong className="text-slate-900">{companyName || "Your Company"}</strong>: <strong className="text-[#00c985] text-base">{formatCurrency(estimatedMaxLoan)}</strong>
                            </p>
                        </div>

                        <Button
                            variant="outline"
                            onClick={() => { setShowResults(false); setStep(1); }}
                            className="border-slate-300 font-bold rounded-2xl h-11"
                        >
                            Modify Search Parameters
                        </Button>
                    </div>

                    {/* Bank Offer Cards */}
                    <div className="space-y-4">
                        {bankQuotes.map((b) => {
                            const emi = calculateEMI(loanAmount, Number(b.rate));
                            return (
                                <Card
                                    key={b.bank}
                                    className={`transition-all duration-300 rounded-3xl p-6 border ${
                                        b.isBestMatch
                                            ? "border-[#00c985] bg-emerald-50/60 shadow-xl ring-2 ring-[#00c985]/30"
                                            : "border-slate-200 bg-slate-50"
                                    }`}
                                >
                                    <div className="grid md:grid-cols-12 gap-6 items-center">
                                        <div className="md:col-span-4 space-y-2">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-2xl bg-slate-900 text-white font-black flex items-center justify-center text-lg shadow-md">
                                                    {b.bank[0]}
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-black text-slate-900">{b.bank}</h3>
                                                    <span className="text-[10px] font-black uppercase text-[#00c985] tracking-wider">
                                                        {b.badge}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="md:col-span-5 grid grid-cols-3 gap-4 text-center">
                                            <div className="bg-white p-3 rounded-2xl border border-slate-200">
                                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Interest Rate</p>
                                                <p className="text-lg font-black text-[#00c985] mt-0.5">{b.rate}% p.a.</p>
                                            </div>
                                            <div className="bg-white p-3 rounded-2xl border border-slate-200">
                                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Estimated EMI</p>
                                                <p className="text-lg font-black text-slate-900 mt-0.5">₹{emi.toLocaleString('en-IN')}</p>
                                            </div>
                                            <div className="bg-white p-3 rounded-2xl border border-slate-200">
                                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Processing Fee</p>
                                                <p className="text-xs font-extrabold text-slate-600 mt-1">{b.fee}</p>
                                            </div>
                                        </div>

                                        <div className="md:col-span-3 text-right">
                                            {selectedBank === b.bank ? (
                                                <div className="bg-[#00c985] text-slate-950 font-black py-3 px-4 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2">
                                                    <Check className="h-4 w-4" /> Application Initiated!
                                                </div>
                                            ) : (
                                                <Button
                                                    onClick={() => setSelectedBank(b.bank)}
                                                    className={`w-full font-black rounded-2xl h-12 text-sm uppercase tracking-wider shadow-lg ${
                                                        b.isBestMatch
                                                            ? "bg-[#00c985] hover:bg-[#00b074] text-slate-950"
                                                            : "bg-slate-900 hover:bg-slate-800 text-white"
                                                    }`}
                                                >
                                                    Select & Apply Fast
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
