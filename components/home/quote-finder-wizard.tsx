"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Building2,
    CheckCircle2,
    ShieldCheck,
    MapPin,
    Phone,
    Mail,
    User,
    KeyRound,
    RefreshCw,
    Building,
    ArrowLeft,
    Check,
    FileText,
    Award,
    Target
} from "lucide-react";
import { motion } from "framer-motion";
import { useEmailForm } from "@/hooks/use-email-form";

export function QuoteFinderWizard() {
    const { sendEmail, isSubmitting } = useEmailForm();

    // Flow Step: 1 = Basic Contact & Loan Choice, 2 = Official Bank Details Form, 3 = Official Receipt
    const [step, setStep] = useState<1 | 2 | 3>(1);

    // Form 1 inputs (Applicant Demographics & Loan Choice)
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [loanCategory, setLoanCategory] = useState<"home" | "personal" | "business" | "lap" | "car">("home");

    // Form 1 error state
    const [formError, setFormError] = useState("");

    // Form 2 inputs (Formal Bank Financial Details)
    const [loanAmount, setLoanAmount] = useState(2500000);
    const [tenureYears, setTenureYears] = useState(20);
    const [annualSalary, setAnnualSalary] = useState(780000);
    const [currentEMI, setCurrentEMI] = useState(0);
    const [companyName, setCompanyName] = useState("");
    const [employmentType, setEmploymentType] = useState<"Salaried" | "Self-Employed">("Salaried");
    const [loanPurpose, setLoanPurpose] = useState("Purchase of Ready-to-Move Flat / House");

    const categories = [
        { id: "home", label: "Home Loan", rate: 8.35, defaultYears: 20 },
        { id: "personal", label: "Personal Loan", rate: 10.25, defaultYears: 5 },
        { id: "business", label: "Business Loan", rate: 11.50, defaultYears: 7 },
        { id: "lap", label: "Loan Against Property", rate: 9.25, defaultYears: 15 },
        { id: "car", label: "Car Loan", rate: 8.75, defaultYears: 5 },
    ] as const;

    const purposeOptionsMap: Record<string, string[]> = {
        home: [
            "Purchase of Ready-to-Move Flat / House",
            "Under-Construction Property Purchase",
            "Plot Purchase + House Construction",
            "Home Renovation / Improvement",
            "Home Loan Balance Transfer + Top-Up"
        ],
        personal: [
            "Marriage / Family Function Expenses",
            "Medical Emergency / Healthcare",
            "Debt Consolidation / Credit Card Payoff",
            "Higher Education / Overseas Studies",
            "Home Interior / Appliance Purchase",
            "Travel & International Vacation",
            "General Personal End-Use"
        ],
        business: [
            "Working Capital Requirement",
            "Machinery / Equipment Purchase",
            "Business Expansion / New Branch",
            "Inventory / Raw Material Stocking",
            "Business Debt Refinancing"
        ],
        lap: [
            "Business Capital Infusion",
            "Commercial Property Acquisition",
            "Debt Consolidation",
            "Higher Education / Personal Use"
        ],
        car: [
            "New Passenger Vehicle Purchase",
            "Pre-Owned / Used Car Purchase",
            "Commercial Fleet Vehicle Purchase"
        ]
    };

    const selectedCategory = categories.find(c => c.id === loanCategory) || categories[0];
    const availablePurposes = purposeOptionsMap[loanCategory] || purposeOptionsMap.home;

    // Formal Interest rate & EMI calculation
    const monthlyIncome = Math.round(annualSalary / 12);
    const maxFOIR = employmentType === "Salaried" ? 0.60 : 0.65;
    const netDisposableIncome = Math.max(0, (monthlyIncome * maxFOIR) - currentEMI);

    const monthlyRate = selectedCategory.rate / 12 / 100;
    const totalMonths = tenureYears * 12;

    const estimatedMaxLoan = Math.round(
        (netDisposableIncome * (Math.pow(1 + monthlyRate, totalMonths) - 1)) /
        (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))
    );

    const calculatedEMI = Math.round(
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
    );

    const formatCurrency = (val: number) => {
        if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
        if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakhs`;
        return `₹${val.toLocaleString('en-IN')}`;
    };

    // Form 1 Submit -> Proceed to Formal Bank Details Form (Step 2)
    const handleForm1Submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !phone || phone.length < 10 || !email || !city) {
            setFormError("Please complete all basic applicant details (Name, Phone, Email, City).");
            return;
        }

        setFormError("");
        setTenureYears(selectedCategory.defaultYears);
        setLoanPurpose(availablePurposes[0]);
        setStep(2); // Directly open Step 2 (Bank Application Form)!
    };

    // Form 2 Submit -> Submit Formal Bank Application via Brevo SMTP
    const handleForm2Submit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            type: `Formal Bank Application (${selectedCategory.label})`,
            applicantName: name,
            phone: phone,
            email: email,
            city: city,
            loanCategory: selectedCategory.label,
            loanPurpose: loanPurpose,
            requiredLoanAmount: formatCurrency(loanAmount),
            tenure: `${tenureYears} Years`,
            employmentType: employmentType,
            annualSalary: `₹${annualSalary.toLocaleString('en-IN')}`,
            monthlyIncome: `₹${monthlyIncome.toLocaleString('en-IN')}`,
            currentMonthlyEMI: `₹${currentEMI.toLocaleString('en-IN')}`,
            companyName: companyName || "Self-Employed / Individual",
            applicableInterestRate: `${selectedCategory.rate}% p.a.`,
            calculatedEMI: `₹${calculatedEMI.toLocaleString('en-IN')}/mo`,
            estimatedMaxLoanSanction: formatCurrency(estimatedMaxLoan),
            applicationStatus: "Submitted (Direct)",
        };

        // Submit via Brevo SMTP form hook
        await sendEmail(payload);

        setStep(3); // Open Official Receipt Document!
    };

    const handleReset = () => {
        setName("");
        setPhone("");
        setEmail("");
        setCity("");
        setFormError("");
        setLoanAmount(2500000);
        setAnnualSalary(780000);
        setCurrentEMI(0);
        setCompanyName("");
        setStep(1);
    };

    return (
        <div className="w-full bg-slate-50 text-slate-900 rounded-3xl border border-slate-300 shadow-xl p-6 md:p-10 font-sans relative overflow-hidden">
            {/* Top Bank Watermark / Header Bar */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 shadow-md">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#0284c7] text-slate-950 flex items-center justify-center font-black">
                        <Building2 className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-lg md:text-xl font-black tracking-tight text-white uppercase flex items-center gap-2">
                            Shree Finance Direct Bank Facility Application
                        </h2>
                        <p className="text-slate-400 text-xs font-semibold">
                            Official Partner Network Form • 40+ Member Banks • RBI Compliant
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                    <Award className="h-4 w-4 text-amber-400" />
                    <span>Step {step} of 2</span>
                </div>
            </div>

            {/* STEP 1: Applicant Demographics & Facility Selection */}
            {step === 1 && (
                <motion.form
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleForm1Submit}
                    className="space-y-8"
                >
                    {/* SECTION A: LOAN FACILITY SELECTOR */}
                    <div className="space-y-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="border-b border-slate-200 pb-2 mb-4 flex justify-between items-center">
                            <h3 className="text-sm font-black uppercase text-slate-700 tracking-wider flex items-center gap-2">
                                <FileText className="h-4 w-4 text-[#0284c7]" /> Section 1: Loan Facility Selection
                            </h3>
                            <span className="text-xs font-bold text-[#0284c7] bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
                                Benchmark Interest Rates Included
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => {
                                        setLoanCategory(cat.id);
                                        setTenureYears(cat.defaultYears);
                                    }}
                                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                                        loanCategory === cat.id
                                            ? "border-[#0284c7] bg-sky-50/80 ring-2 ring-[#0284c7] font-black"
                                            : "border-slate-300 bg-slate-50 hover:bg-slate-100"
                                    }`}
                                >
                                    <span className="text-xs font-bold text-slate-800">{cat.label}</span>
                                    <span className="text-xs font-black text-[#0284c7] mt-2 block">{cat.rate}% p.a.</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* SECTION B: APPLICANT PERSONAL & CONTACT DETAILS */}
                    <div className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="border-b border-slate-200 pb-2 mb-2">
                            <h3 className="text-sm font-black uppercase text-slate-700 tracking-wider flex items-center gap-2">
                                <User className="h-4 w-4 text-sky-600" /> Section 2: Applicant Personal & Verification Details
                            </h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                            {/* Full Name */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase text-slate-600">Applicant Full Name (As per Identity Proof)</label>
                                <Input
                                    placeholder="e.g. Rahul Sharma"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="h-12 bg-slate-50 border-slate-300 rounded-xl font-bold text-slate-900"
                                />
                            </div>

                            {/* Email Address */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase text-slate-600">Mail ID / Email Address (Official Communication)</label>
                                <Input
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-12 bg-slate-50 border-slate-300 rounded-xl font-bold text-slate-900"
                                />
                            </div>

                            {/* Mobile Number */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase text-slate-600">Mobile Number (10-Digit Contact)</label>
                                <Input
                                    placeholder="10-digit mobile number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                    required
                                    maxLength={10}
                                    className="h-12 bg-slate-50 border-slate-300 rounded-xl font-bold text-slate-900"
                                />
                            </div>

                            {/* City / Location */}
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-xs font-bold uppercase text-slate-600">City / Current Location</label>
                                <Input
                                    placeholder="e.g. Pune, Mumbai, Bangalore"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                    className="h-12 bg-slate-50 border-slate-300 rounded-xl font-bold text-slate-900"
                                />
                            </div>
                        </div>
                    </div>

                    {formError && (
                        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-bold text-center">
                            {formError}
                        </div>
                    )}

                    {/* Submit / Proceed Button */}
                    <div className="flex justify-end pt-2">
                        <Button
                            type="submit"
                            className="w-full sm:w-auto bg-[#0284c7] hover:bg-[#0369a1] text-slate-950 font-black h-14 px-10 rounded-xl shadow-lg text-sm uppercase tracking-wider cursor-pointer"
                        >
                            Apply for Loan →
                        </Button>
                    </div>
                </motion.form>
            )}

            {/* STEP 2: Formal Bank Financial & Loan Application Form */}
            {step === 2 && (
                <motion.form
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleForm2Submit}
                    className="space-y-8"
                >
                    {/* SECTION C: LOAN AMOUNT & FINANCIAL DETAILS */}
                    <div className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="border-b border-slate-200 pb-2 mb-2 flex justify-between items-center">
                            <h3 className="text-sm font-black uppercase text-slate-700 tracking-wider flex items-center gap-2">
                                <Building className="h-4 w-4 text-[#0284c7]" /> Section 3: Financial & Income Parameters
                            </h3>
                            <span className="text-xs font-bold text-slate-500">Applicant: {name} ({city})</span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                            {/* Loan Purpose / End-Use */}
                            <div className="space-y-1.5 md:col-span-2 bg-sky-50/50 p-4 rounded-xl border border-sky-200">
                                <label className="text-xs font-black uppercase text-emerald-900 flex items-center gap-1.5">
                                    <Target className="h-4 w-4 text-[#0284c7]" /> Loan Purpose / Specific End-Use of Funds
                                </label>
                                <select
                                    value={loanPurpose}
                                    onChange={(e) => setLoanPurpose(e.target.value)}
                                    className="w-full h-12 bg-white border border-sky-300 rounded-xl font-bold text-slate-900 px-3 text-sm focus:ring-2 focus:ring-[#0284c7]"
                                >
                                    {availablePurposes.map((purpose, idx) => (
                                        <option key={idx} value={purpose}>
                                            • {purpose}
                                        </option>
                                    ))}
                                </select>
                                <span className="text-[11px] font-medium text-sky-800 block">
                                    Selecting precise loan end-use speeds up bank underwriting & interest concession approval.
                                </span>
                            </div>

                            {/* Loan Amount Requested */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase text-slate-600">Loan Amount Requested (₹)</label>
                                <Input
                                    type="number"
                                    placeholder="e.g. 2500000"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                                    required
                                    min={50000}
                                    step={10000}
                                    className="h-12 bg-slate-50 border-slate-300 rounded-xl font-bold text-slate-900"
                                />
                                <span className="text-[11px] font-bold text-slate-500 block">Amount in words: <strong>{formatCurrency(loanAmount)}</strong></span>
                            </div>

                            {/* Tenure Selection */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase text-slate-600">Preferred Repayment Tenure</label>
                                <select
                                    value={tenureYears}
                                    onChange={(e) => setTenureYears(Number(e.target.value))}
                                    className="w-full h-12 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 px-3 text-sm focus:ring-2 focus:ring-[#0284c7]"
                                >
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

                            {/* Employment Status */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase text-slate-600">Employment Category</label>
                                <select
                                    value={employmentType}
                                    onChange={(e) => setEmploymentType(e.target.value as any)}
                                    className="w-full h-12 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 px-3 text-sm focus:ring-2 focus:ring-[#0284c7]"
                                >
                                    <option value="Salaried">Salaried (Private Ltd / MNC / Govt)</option>
                                    <option value="Self-Employed">Self-Employed (Business Owner / Professional)</option>
                                </select>
                            </div>

                            {/* Company Name */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase text-slate-600">Employer / Organization Name</label>
                                <Input
                                    placeholder="e.g. TCS, Infosys, Wipro, Self Business"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    required
                                    className="h-12 bg-slate-50 border-slate-300 rounded-xl font-bold text-slate-900"
                                />
                            </div>

                            {/* Gross Annual Salary */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase text-slate-600">Gross Annual Income / Salary CTC (₹)</label>
                                <Input
                                    type="number"
                                    placeholder="e.g. 780000"
                                    value={annualSalary || ""}
                                    onChange={(e) => setAnnualSalary(Number(e.target.value))}
                                    required
                                    min={100000}
                                    className="h-12 bg-slate-50 border-slate-300 rounded-xl font-bold text-slate-900"
                                />
                                <span className="text-[11px] font-bold text-sky-700 block">Monthly equivalent: <strong>₹{monthlyIncome.toLocaleString('en-IN')}/mo</strong></span>
                            </div>

                            {/* Existing EMI Obligations */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase text-slate-600">Current Monthly Ongoing EMI Obligations (₹)</label>
                                <Input
                                    type="number"
                                    placeholder="e.g. 0"
                                    value={currentEMI}
                                    onChange={(e) => setCurrentEMI(Number(e.target.value))}
                                    required
                                    min={0}
                                    className="h-12 bg-slate-50 border-slate-300 rounded-xl font-bold text-slate-900"
                                />
                                <span className="text-[11px] font-medium text-slate-500 block">Enter 0 if no active loans.</span>
                            </div>
                        </div>
                    </div>

                    {/* SECTION D: FORMAL BANK INTEREST RATE & EMI SCHEDULE TABLE */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                        <div className="border-b border-slate-200 pb-2 flex justify-between items-center">
                            <h3 className="text-sm font-black uppercase text-slate-800 tracking-wider flex items-center gap-2">
                                <Award className="h-4 w-4 text-[#0284c7]" /> Section 4: Formal Bank Interest Rate & Sanction Schedule
                            </h3>
                            <span className="text-xs font-black text-sky-800 bg-sky-100 px-3 py-1 rounded-md border border-sky-300">
                                Pre-Sanction Estimate
                            </span>
                        </div>

                        {/* Formal Bank Summary Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                    <tr className="bg-slate-100 text-slate-700 font-black border-b border-slate-300">
                                        <th className="p-3">Facility Type</th>
                                        <th className="p-3">Applicable Rate</th>
                                        <th className="p-3">Tenure</th>
                                        <th className="p-3">Calculated Monthly EMI</th>
                                        <th className="p-3">Max Eligible Limit</th>
                                        <th className="p-3">Processing Fee</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 font-bold text-slate-900">
                                    <tr className="bg-white hover:bg-slate-50">
                                        <td className="p-3 font-black text-slate-900">{selectedCategory.label}</td>
                                        <td className="p-3 text-[#0284c7] font-black">{selectedCategory.rate}% p.a.</td>
                                        <td className="p-3">{tenureYears} Years ({totalMonths} Mo)</td>
                                        <td className="p-3 font-black text-slate-900">₹{calculatedEMI.toLocaleString('en-IN')}/mo</td>
                                        <td className="p-3 text-amber-600 font-black">{formatCurrency(estimatedMaxLoan)}</td>
                                        <td className="p-3 text-slate-600">0% Special Banking Scheme</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl flex items-center gap-3 text-xs font-bold text-emerald-900">
                        <ShieldCheck className="h-5 w-5 shrink-0 text-[#0284c7]" />
                        <span>Data is 256-bit SSL encrypted & processed under strict RBI privacy norms.</span>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setStep(1)}
                            className="w-full sm:w-auto border-slate-300 text-slate-700 font-bold h-12 px-6 rounded-xl text-xs"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Contact Details
                        </Button>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:w-auto bg-[#0284c7] hover:bg-[#0369a1] text-slate-950 font-black h-14 px-8 rounded-xl shadow-lg text-sm uppercase tracking-wider cursor-pointer"
                        >
                            {isSubmitting ? "Submitting Application..." : "Submit Formal Bank Application 📄"}
                        </Button>
                    </div>
                </motion.form>
            )}

            {/* STEP 3: Official Bank Application Receipt Document */}
            {step === 3 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-6 space-y-6 max-w-2xl mx-auto"
                >
                    <div className="bg-white border border-slate-300 rounded-2xl p-6 md:p-8 shadow-lg space-y-6 font-sans">
                        {/* Header Document Seal */}
                        <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Shree Finance Bank Network</h3>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">Loan Facility Application Acknowledgement</p>
                            </div>
                            <div className="text-right">
                                <span className="text-xs font-black text-sky-800 bg-sky-100 px-3 py-1 rounded-md border border-sky-300 block">
                                    REF #SHREE-BANK-2026-{Math.floor(1000 + Math.random() * 9000)}
                                </span>
                                <span className="text-[10px] text-slate-400 font-semibold block mt-1">Status: Registered</span>
                            </div>
                        </div>

                        {/* Summary Details Table */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">A. Applicant & Loan Summary</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-800">
                                <div>
                                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Applicant Name</span>
                                    <span className="text-slate-900 font-black">{name}</span>
                                </div>
                                <div>
                                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Mobile Number</span>
                                    <span>{phone}</span>
                                </div>
                                <div>
                                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">City</span>
                                    <span>{city}</span>
                                </div>
                                <div>
                                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Facility Category</span>
                                    <span className="text-[#0284c7] font-black">{selectedCategory.label}</span>
                                </div>
                                <div className="col-span-2">
                                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Loan Purpose / End-Use</span>
                                    <span className="text-slate-900 font-extrabold">{loanPurpose}</span>
                                </div>
                                <div>
                                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Requested Amount</span>
                                    <span className="text-slate-900 font-black">{formatCurrency(loanAmount)}</span>
                                </div>
                                <div>
                                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Repayment Tenure</span>
                                    <span>{tenureYears} Years</span>
                                </div>
                            </div>
                        </div>

                        {/* Income & Calculation Breakdown */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">B. Bank Assessment Breakdown</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-800">
                                <div>
                                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Employer Name</span>
                                    <span>{companyName || "N/A"}</span>
                                </div>
                                <div>
                                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Annual CTC</span>
                                    <span>₹{annualSalary.toLocaleString('en-IN')}/yr</span>
                                </div>
                                <div>
                                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Benchmark Interest</span>
                                    <span className="text-[#0284c7] font-black">{selectedCategory.rate}% p.a.</span>
                                </div>
                                <div>
                                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Calculated Monthly EMI</span>
                                    <span className="text-slate-900 font-black">₹{calculatedEMI.toLocaleString('en-IN')}/mo</span>
                                </div>
                                <div className="col-span-2">
                                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Max Sanction Potential</span>
                                    <span className="text-amber-700 font-black">{formatCurrency(estimatedMaxLoan)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl flex items-center gap-2 text-xs font-bold text-emerald-900">
                            <Check className="h-4 w-4 text-[#0284c7] shrink-0" />
                            <span>Application forwarded to Bank Underwriting Pool. Advisor call scheduled within 15 minutes.</span>
                        </div>

                        <div className="pt-2 text-center">
                            <Button
                                onClick={handleReset}
                                variant="outline"
                                className="border-slate-300 text-slate-700 font-bold rounded-xl h-11 px-6 text-xs"
                            >
                                Submit New Bank Application
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
