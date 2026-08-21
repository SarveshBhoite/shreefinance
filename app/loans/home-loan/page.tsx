"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EMICalculator } from "@/components/calculators/emi-calculator";
import { BalanceTransferCalculator } from "@/components/calculators/balance-transfer-calculator";
import { TaxBenefitCalculator } from "@/components/calculators/tax-benefit-calculator";
import { Deal4LoansDynamicForm } from "@/components/forms/deal4loans-dynamic-form";
import { CheckCircle2, Home, ShieldCheck, FileText, Key, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEmailForm } from "@/hooks/use-email-form";
import { DynamicHeroWrapper } from "@/components/dynamic-hero-wrapper";

export default function HomeLoanPage() {
    const { sendEmail, isSubmitting, isSuccess } = useEmailForm();
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        city: "",
        income: "",
    });

    const [activeTab, setActiveTab] = useState<"salaried" | "self-employed" | "nri">("salaried");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendEmail({
            type: "Home Loan Application",
            ...formData
        });
    };

    const scrollToForm = () => {
        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    const steps = [
        { icon: FileText, title: "Online Application", desc: "Submit basic details & income proof digitally" },
        { icon: ShieldCheck, title: "Digital Verification", desc: "Instant e-KYC & property valuation check" },
        { icon: CheckCircle2, title: "Sanction Letter", desc: "Instant pre-approved sanction letter generated" },
        { icon: Key, title: "Disbursal", desc: "Funds transferred to property seller within 24-48 hrs" },
    ];

    return (
        <div className="pb-20 bg-[#181a1d] text-white font-sans mx-auto">
            <DynamicHeroWrapper page="home-loan">
                {/* Hero Section */}
                <section className="relative pt-12 md:pt-20 pb-20 overflow-hidden bg-[#181a1d] text-white border-b border-slate-800">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00c985]/10 rounded-full blur-[120px] pointer-events-none" />

                    <div className="container px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center mx-auto relative z-10">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-black text-[#00e699] uppercase tracking-widest">
                                <Home className="h-4 w-4 text-[#00e699]" />
                                <span>Multi-Bank Home Loan Portal (2026)</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-white">
                                Low Interest <br />
                                <span className="text-[#00e699]">
                                    Home Loans
                                </span> starting 8.35%
                            </h1>

                            <p className="text-lg md:text-xl text-slate-300 max-w-lg leading-relaxed font-medium">
                                Compare Home Loans across <strong className="text-white">YES Bank, SBI, HDFC, ICICI</strong> & Shree Finance Direct. Get 100% paperless digital sanction in 24 hours.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="h-14 px-8 text-sm font-black rounded-full bg-[#00c985] hover:bg-[#00b074] text-slate-950 uppercase tracking-wider transition-all hover:scale-105" onClick={scrollToForm}>
                                    Get Multi-Bank Sanction
                                </Button>
                            </div>

                            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800">
                                <div>
                                    <p className="text-3xl font-black text-[#00e699]">8.35%</p>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Starting APR</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-white">30 Yrs</p>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Max Tenure</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-amber-400">90%</p>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">LTV Funding</p>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Hero Card Visual */}
                        <div className="relative hidden lg:block">
                            <Card className="bg-[#24272c] border border-slate-800 backdrop-blur-2xl rounded-[2.5rem] p-8 text-white shadow-2xl space-y-6">
                                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                                    <span className="text-xs font-black uppercase tracking-widest text-[#00e699]">YES Bank & Partner Network</span>
                                    <span className="text-xs font-bold text-slate-400">100% Digital Flow</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                                        <span className="text-sm font-bold text-slate-300">Sanction Time</span>
                                        <span className="text-lg font-black text-[#00e699]">24 Hours</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                                        <span className="text-sm font-bold text-slate-300">Processing Fee</span>
                                        <span className="text-lg font-black text-white">Zero Fee Offers</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                                        <span className="text-sm font-bold text-slate-300">PMAY Tax Subsidy</span>
                                        <span className="text-lg font-black text-amber-300">Up to ₹2.67 Lakhs</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>
            </DynamicHeroWrapper>

            {/* Instant Multi-Bank Deal4Loans Form Container */}
            <section className="py-12 container px-4 mx-auto scroll-mt-24" id="deal4loans-home-apply">
                <Deal4LoansDynamicForm initialLoanType="home" showCategorySwitcher={true} />
            </section>

            {/* Home Loan Balance Transfer Savings Calculator */}
            <section className="py-12 container px-4 mx-auto">
                <BalanceTransferCalculator />
            </section>

            {/* Home Loan Tax Benefit Calculator */}
            <section className="py-12 container px-4 mx-auto">
                <TaxBenefitCalculator />
            </section>

            {/* Digital Approval Roadmap Section */}
            <section className="py-16 bg-[#181a1d] text-white border-y border-slate-800">
                <div className="container px-4 mx-auto space-y-12">
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <h2 className="text-3xl md:text-5xl font-black text-white">
                            100% Digital Sanction Journey
                        </h2>
                        <p className="text-slate-400 font-medium">
                            Paperless approval workflow backed by YES Bank & Shree Finance digital engine.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6 relative">
                        {steps.map((step, i) => (
                            <div key={i} className="relative z-10 flex flex-col items-center text-center p-6 rounded-3xl bg-[#24272c] border border-slate-800 shadow-xl">
                                <div className="h-16 w-16 rounded-2xl bg-[#00c985]/15 border border-[#00c985]/30 flex items-center justify-center mb-4 text-[#00c985]">
                                    <step.icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-lg font-extrabold text-white mb-1">{step.title}</h3>
                                <p className="text-xs text-slate-400 font-medium">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Document Checklist & Eligibility Tabs */}
            <section className="container px-4 md:px-6 py-16 mx-auto grid lg:grid-cols-[1fr_400px] gap-12">
                <div className="space-y-12">
                    {/* EMI Calculator */}
                    <div className="bg-[#24272c] rounded-3xl p-8 border border-slate-800 shadow-xl text-white">
                        <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-white">
                            <Clock className="text-[#00e699]" />
                            <span>Standard Home Loan EMI Calculator</span>
                        </h3>
                        <EMICalculator defaultAmount={5000000} defaultRate={8.35} defaultTenure={20} />
                    </div>

                    {/* Document Checklist Tabs */}
                    <div className="bg-[#24272c] rounded-3xl p-8 border border-slate-800 shadow-xl text-white space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <h3 className="text-2xl font-black text-white">Required Document Checklist</h3>
                            <div className="flex gap-2 p-1 bg-slate-900 rounded-2xl border border-slate-800">
                                {(["salaried", "self-employed", "nri"] as const).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${
                                            activeTab === tab
                                                ? "bg-[#00c985] text-slate-950 shadow-md"
                                                : "text-slate-400 hover:text-white"
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            {activeTab === "salaried" && (
                                <ul className="grid md:grid-cols-2 gap-4 text-xs font-bold text-slate-300">
                                    <li className="flex items-center gap-2 p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
                                        <CheckCircle2 className="h-4 w-4 text-[#00e699] shrink-0" /> PAN Card & Aadhaar Card
                                    </li>
                                    <li className="flex items-center gap-2 p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
                                        <CheckCircle2 className="h-4 w-4 text-[#00e699] shrink-0" /> Last 3 Months Salary Slips
                                    </li>
                                    <li className="flex items-center gap-2 p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
                                        <CheckCircle2 className="h-4 w-4 text-[#00e699] shrink-0" /> Last 6 Months Bank Statement
                                    </li>
                                    <li className="flex items-center gap-2 p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
                                        <CheckCircle2 className="h-4 w-4 text-[#00e699] shrink-0" /> Form 16 / ITR for last 2 years
                                    </li>
                                </ul>
                            )}

                            {activeTab === "self-employed" && (
                                <ul className="grid md:grid-cols-2 gap-4 text-xs font-bold text-slate-300">
                                    <li className="flex items-center gap-2 p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
                                        <CheckCircle2 className="h-4 w-4 text-[#00e699] shrink-0" /> Business Registration Proof (GST/MSME)
                                    </li>
                                    <li className="flex items-center gap-2 p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
                                        <CheckCircle2 className="h-4 w-4 text-[#00e699] shrink-0" /> ITR & Computation for last 3 years
                                    </li>
                                    <li className="flex items-center gap-2 p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
                                        <CheckCircle2 className="h-4 w-4 text-[#00e699] shrink-0" /> 12 Months Current Account Statement
                                    </li>
                                    <li className="flex items-center gap-2 p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
                                        <CheckCircle2 className="h-4 w-4 text-[#00e699] shrink-0" /> Audited P&L Account & Balance Sheet
                                    </li>
                                </ul>
                            )}

                            {activeTab === "nri" && (
                                <ul className="grid md:grid-cols-2 gap-4 text-xs font-bold text-slate-300">
                                    <li className="flex items-center gap-2 p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
                                        <CheckCircle2 className="h-4 w-4 text-[#00e699] shrink-0" /> Passport Copy with Visa Stamp
                                    </li>
                                    <li className="flex items-center gap-2 p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
                                        <CheckCircle2 className="h-4 w-4 text-[#00e699] shrink-0" /> Employment Contract / Salary Certificate
                                    </li>
                                    <li className="flex items-center gap-2 p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
                                        <CheckCircle2 className="h-4 w-4 text-[#00e699] shrink-0" /> 6 Months Overseas Bank Statement
                                    </li>
                                    <li className="flex items-center gap-2 p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
                                        <CheckCircle2 className="h-4 w-4 text-[#00e699] shrink-0" /> NRE/NRO Account Details
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sticky Right Application Sidebar */}
                <aside className="relative">
                    <div id="lead-form" className="sticky top-28">
                        <Card className="bg-[#24272c] border border-slate-800 shadow-2xl rounded-[2.5rem] overflow-hidden text-white">
                            <CardHeader className="bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-400 text-slate-950 p-6 sm:p-8">
                                <span className="text-[10px] font-black uppercase tracking-widest bg-slate-950 text-white px-3 py-1 rounded-full w-fit">
                                    Shree Finance Direct Bank Facility
                                </span>
                                <CardTitle className="text-2xl font-black mt-2 text-slate-950">Home Loan Application</CardTitle>
                                <p className="text-slate-900 text-xs font-bold mt-1">Multi-bank pre-sanction • 8.35% p.a. onwards</p>
                            </CardHeader>
                            <CardContent className="p-6 sm:p-8 space-y-4">
                                {isSuccess ? (
                                    <div className="text-center py-8 space-y-3">
                                        <div className="h-16 w-16 bg-[#00c985] rounded-full flex items-center justify-center mx-auto text-slate-950 font-black">
                                            <CheckCircle2 className="h-8 w-8" />
                                        </div>
                                        <h4 className="text-xl font-black text-white">Application Received!</h4>
                                        <p className="text-xs text-slate-400">A Shree Finance Home Loan underwriting officer will reach out shortly.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-3.5">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase text-slate-400">Home Loan Purpose</label>
                                            <select
                                                className="w-full h-11 bg-slate-900 border border-slate-700 rounded-xl font-bold text-white px-3 text-xs focus:ring-2 focus:ring-[#00c985]"
                                                onChange={(e) => setFormData({ ...formData, city: formData.city })}
                                            >
                                                <option value="Ready Flat Purchase">🏠 Purchase of Ready-to-Move Flat / Villa</option>
                                                <option value="Under-Construction">🏗️ Under-Construction Flat / Society Project</option>
                                                <option value="Plot Construction">🏡 Plot Purchase + House Construction</option>
                                                <option value="Balance Transfer">🔄 Home Loan Balance Transfer + Top-Up</option>
                                                <option value="Home Renovation">🔨 Home Extension / Improvement</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-slate-400">Full Name</label>
                                            <Input
                                                placeholder="Enter full name"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-slate-400">Mobile Number</label>
                                            <Input
                                                placeholder="10-digit mobile"
                                                value={formData.mobile}
                                                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-[10px] font-black uppercase text-slate-400">City</label>
                                                <Input
                                                    placeholder="City"
                                                    value={formData.city}
                                                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black uppercase text-slate-400">Monthly Salary</label>
                                                <Input
                                                    placeholder="₹ Income"
                                                    value={formData.income}
                                                    onChange={e => setFormData({ ...formData, income: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <Button
                                            disabled={isSubmitting}
                                            className="w-full bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black h-13 rounded-full text-xs sm:text-sm uppercase tracking-wider shadow-xl mt-3 cursor-pointer"
                                        >
                                            {isSubmitting ? "Submitting..." : "Apply Direct Bank Facility 🚀"}
                                        </Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </aside>
            </section>
        </div>
    );
}
