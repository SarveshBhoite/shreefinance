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
        <div className="pb-20 bg-white text-white font-sans mx-auto">
            <DynamicHeroWrapper page="home-loan">
                {/* Hero Section */}
                <section className="relative pt-12 md:pt-20 pb-20 overflow-hidden bg-white text-white border-b border-slate-200">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0284c7]/10 rounded-full blur-[120px] pointer-events-none" />

                    <div className="container px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center mx-auto relative z-10">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-50 px-4 py-1.5 text-xs font-black text-[#0284c7] uppercase tracking-widest">
                                <Home className="h-4 w-4 text-[#0284c7]" />
                                <span>Multi-Bank Home Loan Portal (2026)</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-white">
                                Low Interest <br />
                                <span className="text-[#0284c7]">
                                    Home Loans
                                </span> starting 8.35%
                            </h1>

                            <p className="text-lg md:text-xl text-slate-600 max-w-lg leading-relaxed font-medium">
                                Compare Home Loans across <strong className="text-white">YES Bank, SBI, HDFC, ICICI</strong> & Shree Finance Direct. Get 100% paperless digital sanction in 24 hours.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="h-14 px-8 text-sm font-black rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-sm uppercase tracking-wider transition-all hover:scale-105" onClick={scrollToForm}>
                                    Get Multi-Bank Sanction
                                </Button>
                            </div>

                            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200">
                                <div>
                                    <p className="text-3xl font-black text-[#0284c7]">8.35%</p>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Starting APR</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-white">30 Yrs</p>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Max Tenure</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-amber-400">90%</p>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">LTV Funding</p>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Hero Card Visual */}
                        <div className="relative hidden lg:block">
                            <Card className="bg-white border border-slate-200 backdrop-blur-2xl rounded-[2.5rem] p-8 text-white shadow-2xl space-y-6">
                                <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                                    <span className="text-xs font-black uppercase tracking-widest text-[#0284c7]">YES Bank & Partner Network</span>
                                    <span className="text-xs font-bold text-slate-500">100% Digital Flow</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200">
                                        <span className="text-sm font-bold text-slate-600">Sanction Time</span>
                                        <span className="text-lg font-black text-[#0284c7]">24 Hours</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200">
                                        <span className="text-sm font-bold text-slate-600">Processing Fee</span>
                                        <span className="text-lg font-bold text-slate-900">Zero Fee Offers</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200">
                                        <span className="text-sm font-bold text-slate-600">PMAY Tax Subsidy</span>
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

            {/* 4-Step Journey */}
            <section className="py-14 bg-[#f8fafc] dark:bg-[#f8fafc] border-y border-slate-200 dark:border-slate-200">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((step, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-white border border-slate-200 dark:border-slate-200 shadow-sm text-center">
                                <div className="h-14 w-14 rounded-2xl bg-sky-50 dark:bg-sky-500/15 border border-sky-200 dark:border-sky-500/30 flex items-center justify-center mx-auto mb-4 text-[#0284c7]">
                                    <step.icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">{step.title}</h3>
                                <p className="text-xs text-slate-600 dark:text-slate-500 font-normal">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Document Checklist & Eligibility Tabs */}
            <section className="container px-4 md:px-6 py-16 mx-auto grid lg:grid-cols-[1fr_400px] gap-12">
                <div className="space-y-12">
                    {/* EMI Calculator */}
                    <div className="bg-[#f8fafc] dark:bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-200 shadow-sm text-slate-900 dark:text-white">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                            <Clock className="text-[#0284c7]" />
                            <span>Standard Home Loan EMI Calculator</span>
                        </h3>
                        <EMICalculator defaultAmount={5000000} defaultRate={8.35} defaultTenure={20} />
                    </div>

                    {/* Document Checklist Tabs */}
                    <div className="bg-[#f8fafc] dark:bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-200 shadow-sm text-slate-900 dark:text-white space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Required Document Checklist</h3>
                            <div className="flex gap-1.5 p-1 bg-white dark:bg-white rounded-xl border border-slate-200 dark:border-slate-200 shadow-xs">
                                {(["salaried", "self-employed", "nri"] as const).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                                            activeTab === tab
                                                ? "bg-[#0284c7] text-white shadow-xs"
                                                : "text-slate-600 dark:text-slate-500 hover:text-slate-900"
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            {activeTab === "salaried" && (
                                <ul className="grid md:grid-cols-2 gap-4 text-xs font-semibold text-slate-700 dark:text-slate-600">
                                    <li className="flex items-center gap-2 p-3 bg-white dark:bg-white border border-slate-200 dark:border-slate-200 rounded-xl">
                                        <CheckCircle2 className="h-4 w-4 text-[#0284c7] shrink-0" /> PAN Card & Aadhaar Card
                                    </li>
                                    <li className="flex items-center gap-2 p-3 bg-white dark:bg-white border border-slate-200 dark:border-slate-200 rounded-xl">
                                        <CheckCircle2 className="h-4 w-4 text-[#0284c7] shrink-0" /> Last 3 Months Salary Slips
                                    </li>
                                    <li className="flex items-center gap-2 p-3 bg-white dark:bg-white border border-slate-200 dark:border-slate-200 rounded-xl">
                                        <CheckCircle2 className="h-4 w-4 text-[#0284c7] shrink-0" /> Last 6 Months Bank Statement
                                    </li>
                                    <li className="flex items-center gap-2 p-3 bg-white dark:bg-white border border-slate-200 dark:border-slate-200 rounded-xl">
                                        <CheckCircle2 className="h-4 w-4 text-[#0284c7] shrink-0" /> Form 16 / ITR for last 2 years
                                    </li>
                                </ul>
                            )}

                            {activeTab === "self-employed" && (
                                <ul className="grid md:grid-cols-2 gap-4 text-xs font-semibold text-slate-700 dark:text-slate-600">
                                    <li className="flex items-center gap-2 p-3 bg-white dark:bg-white border border-slate-200 dark:border-slate-200 rounded-xl">
                                        <CheckCircle2 className="h-4 w-4 text-[#0284c7] shrink-0" /> Business Registration Proof (GST/MSME)
                                    </li>
                                    <li className="flex items-center gap-2 p-3 bg-white dark:bg-white border border-slate-200 dark:border-slate-200 rounded-xl">
                                        <CheckCircle2 className="h-4 w-4 text-[#0284c7] shrink-0" /> ITR & Computation for last 3 years
                                    </li>
                                    <li className="flex items-center gap-2 p-3 bg-white dark:bg-white border border-slate-200 dark:border-slate-200 rounded-xl">
                                        <CheckCircle2 className="h-4 w-4 text-[#0284c7] shrink-0" /> 12 Months Current Account Statement
                                    </li>
                                    <li className="flex items-center gap-2 p-3 bg-white dark:bg-white border border-slate-200 dark:border-slate-200 rounded-xl">
                                        <CheckCircle2 className="h-4 w-4 text-[#0284c7] shrink-0" /> Audited P&L Account & Balance Sheet
                                    </li>
                                </ul>
                            )}

                            {activeTab === "nri" && (
                                <ul className="grid md:grid-cols-2 gap-4 text-xs font-semibold text-slate-700 dark:text-slate-600">
                                    <li className="flex items-center gap-2 p-3 bg-white dark:bg-white border border-slate-200 dark:border-slate-200 rounded-xl">
                                        <CheckCircle2 className="h-4 w-4 text-[#0284c7] shrink-0" /> Passport Copy with Visa Stamp
                                    </li>
                                    <li className="flex items-center gap-2 p-3 bg-white dark:bg-white border border-slate-200 dark:border-slate-200 rounded-xl">
                                        <CheckCircle2 className="h-4 w-4 text-[#0284c7] shrink-0" /> Employment Contract / Salary Certificate
                                    </li>
                                    <li className="flex items-center gap-2 p-3 bg-white dark:bg-white border border-slate-200 dark:border-slate-200 rounded-xl">
                                        <CheckCircle2 className="h-4 w-4 text-[#0284c7] shrink-0" /> 6 Months Overseas Bank Statement
                                    </li>
                                    <li className="flex items-center gap-2 p-3 bg-white dark:bg-white border border-slate-200 dark:border-slate-200 rounded-xl">
                                        <CheckCircle2 className="h-4 w-4 text-[#0284c7] shrink-0" /> NRE/NRO Account Details
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sticky Right Application Sidebar */}
                <aside className="relative">
                    <div id="lead-form" className="sticky top-28">
                        <Card className="bg-white dark:bg-white border border-slate-200 dark:border-slate-200 shadow-sm rounded-2xl overflow-hidden text-slate-900 dark:text-white">
                            <CardHeader className="bg-[#f8fafc] border-b border-slate-200 text-slate-900 p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="p-2 bg-sky-50 text-[#0284c7] rounded-xl">
                                        <Home className="h-5 w-5" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-wider bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full">
                                        40+ Banks Network
                                    </span>
                                </div>
                                <CardTitle className="text-xl font-bold text-slate-900">Home Loan Application</CardTitle>
                                <p className="text-slate-600 text-xs font-normal mt-0.5">Instant paperless sanction • 8.35% p.a. onwards</p>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                {isSuccess ? (
                                    <div className="text-center py-8">
                                        <div className="h-14 w-14 bg-sky-100 text-[#0284c7] rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                                            <CheckCircle2 className="h-7 w-7" />
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-1">Application Received</h3>
                                        <p className="text-slate-600 text-xs">Direct bank underwriting team will contact you shortly.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-3.5">
                                        <div className="space-y-1">
                                            <label className="text-[11px] font-bold uppercase text-slate-600">Full Name</label>
                                            <Input
                                                placeholder="Enter Name"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                required
                                                className="h-10 text-xs"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[11px] font-bold uppercase text-slate-600">Mobile Number</label>
                                            <Input
                                                placeholder="10-digit mobile"
                                                value={formData.mobile}
                                                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                                required
                                                className="h-10 text-xs"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1">
                                                <label className="text-[11px] font-bold uppercase text-slate-600">City</label>
                                                <Input
                                                    placeholder="City"
                                                    value={formData.city}
                                                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                                                    required
                                                    className="h-10 text-xs"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[11px] font-bold uppercase text-slate-600">Monthly Income</label>
                                                <Input
                                                    placeholder="₹50,000"
                                                    value={formData.income}
                                                    onChange={e => setFormData({ ...formData, income: e.target.value })}
                                                    required
                                                    className="h-10 text-xs"
                                                />
                                            </div>
                                        </div>
                                        <Button className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold h-11 text-xs rounded-xl uppercase tracking-wider shadow-sm mt-3 cursor-pointer">
                                            Get Home Loan Sanction 🚀
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
