"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EMICalculator } from "@/components/calculators/emi-calculator";
import { CheckCircle2, Percent, Zap, FileText, Rocket, Wallet, Timer } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEmailForm } from "@/hooks/use-email-form";
import { cn } from "@/lib/utils";
import { ContentSection } from "@/components/ui/content-section";
import { SimpleAccordion } from "@/components/ui/simple-accordion";
import { DynamicHeroWrapper } from "@/components/dynamic-hero-wrapper";
import { Deal4LoansDynamicForm } from "@/components/forms/deal4loans-dynamic-form";

export default function PersonalLoanPage() {
    const { sendEmail, isSubmitting, isSuccess } = useEmailForm();
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        city: "",
        income: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendEmail({
            type: "Personal Loan Application",
            ...formData
        });
    };

    const scrollToForm = () => {
        document.getElementById('deal4loans-apply-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="pb-20 bg-white dark:bg-[#f8fafc] text-slate-900 dark:text-white font-sans mx-auto transition-colors duration-300">
            <DynamicHeroWrapper page="personal-loan">
                {/* Unique Hero Section */}
                <section className="relative pt-12 md:pt-20 pb-20 overflow-hidden bg-[#f8fafc] dark:bg-[#f8fafc] text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-200">
                    <div className="container px-4 md:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10 mx-auto">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-50 dark:bg-sky-500/15 px-3.5 py-1 text-xs font-black text-sky-800 dark:text-[#0284c7] uppercase tracking-wider">
                                <Zap className="h-4 w-4 text-[#0284c7]" />
                                <span>Approvals in 5 Minutes</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
                                Need Instant Funds? <br />
                                <span className="text-[#0284c7]">Consider it Done.</span>
                            </h1>

                            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-600 max-w-lg leading-relaxed font-normal">
                                Experience the speed of digital lending. No paperwork, no collateral, just instant funds directly to your bank account across 40+ partner banks.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="h-12 px-8 text-xs sm:text-sm font-bold rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white uppercase tracking-wider transition-all shadow-sm cursor-pointer" onClick={scrollToForm}>
                                    Get Instant Cash
                                </Button>
                            </div>
                        </div>

                        {/* Visual Hero Element - Rocket */}
                        <div className="relative hidden lg:flex justify-center items-center h-[400px]">
                            <div className="relative w-72 h-72 bg-white dark:bg-white border border-slate-200 dark:border-slate-200 rounded-3xl rotate-3 flex items-center justify-center shadow-md overflow-hidden">
                                <Rocket className="text-[#0284c7] h-32 w-32 drop-shadow-sm" />
                            </div>
                        </div>
                    </div>
                </section>
            </DynamicHeroWrapper>

            {/* DEAL4LOANS UNIFIED FORM APPLICATION SECTION */}
            <section id="deal4loans-apply-section" className="py-12 container px-4 mx-auto scroll-mt-24">
                <Deal4LoansDynamicForm initialLoanType="personal" showCategorySwitcher={true} />
            </section>

            {/* Fast Track Process - Unique Grid */}
            <section className="py-14 relative z-20 bg-[#f8fafc] dark:bg-[#f8fafc] border-y border-slate-200 dark:border-slate-200">
                <div className="container px-4 mx-auto">
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        {[
                            { title: "Apply Online", desc: "Fill simple 2-min form", icon: FileText, color: "text-[#0284c7]" },
                            { title: "Instant Decision", desc: "Automated underwriting check", icon: Zap, color: "text-[#0284c7]" },
                            { title: "Cash in Bank", desc: "Direct disbursal within 24 hours", icon: Wallet, color: "text-[#0284c7]" }
                        ].map((item, i) => (
                            <Card key={i} className="bg-white dark:bg-white border border-slate-200 dark:border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl p-6 text-slate-900 dark:text-white">
                                <CardContent className="p-4 flex flex-col items-center">
                                    <div className="h-14 w-14 rounded-2xl bg-sky-50 dark:bg-sky-500/15 border border-sky-200 dark:border-sky-500/30 flex items-center justify-center mb-4 text-[#0284c7]">
                                        <item.icon className="h-7 w-7" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-1 text-slate-900 dark:text-white">{item.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-500 font-normal text-xs">{item.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content Layout with Sticky Sidebar */}
            <div className="container px-6 md:px-8 py-12 grid lg:grid-cols-[1fr_400px] gap-12 mx-auto">
                {/* Left Column: Content */}
                <div className="space-y-12">
                    {/* Features Grid */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="p-6 rounded-2xl bg-[#f8fafc] dark:bg-white border border-slate-200 dark:border-slate-200">
                            <h3 className="text-lg font-bold text-[#0284c7] mb-2">Zero Collateral</h3>
                            <p className="text-slate-600 dark:text-slate-500 text-xs font-normal leading-relaxed">100% unsecured loan. No need to pledge any assets or find a guarantor.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-[#f8fafc] dark:bg-white border border-slate-200 dark:border-slate-200">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Flexible Tenure</h3>
                            <p className="text-slate-600 dark:text-slate-500 text-xs font-normal leading-relaxed">Choose repayment period from 12 months to 60 months as per your convenience.</p>
                        </div>
                    </div>

                    {/* Calculator Section */}
                    <div className="p-6 sm:p-8 rounded-2xl bg-[#f8fafc] dark:bg-white border border-slate-200 dark:border-slate-200 shadow-sm text-slate-900 dark:text-white">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-sky-50 dark:bg-sky-500/20 border border-sky-200 dark:border-sky-500/30 rounded-xl text-[#0284c7]">
                                <Percent className="h-5 w-5" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Calculate Your Monthly EMI</h3>
                        </div>
                        <EMICalculator defaultAmount={500000} defaultRate={10.5} defaultTenure={5} />
                    </div>

                    <ContentSection
                        title="Why Choose a Personal Loan?"
                        description="Life is unpredictable, and so are financial needs. Whether it's a medical emergency, a dream wedding, higher education, or home renovation, our Personal Loan is designed to be your reliable financial partner. With interest rates starting as low as 10.50% p.a., you can borrow up to ₹40 Lakhs without any collateral. Our digital-first approach ensures that the entire process—from application to disbursal—is seamless, transparent, and paperless."
                        imageSrc="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80"
                        imageAlt="Happy couple with shopping bags"
                    />

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-9 w-9 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-[#0284c7]">
                                    <CheckCircle2 className="h-5 w-5" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Eligibility Criteria</h3>
                            </div>
                            <SimpleAccordion
                                items={[
                                    { title: "Employment Type", content: "Salaried employees of MNCs, Public/Private limited companies." },
                                    { title: "Income", content: "Minimum net monthly income of ₹25,000." },
                                    { title: "Work Experience", content: "Minimum 1 year total experience & 6 months in current organization." },
                                ]}
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-9 w-9 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-[#0284c7]">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Documents Required</h3>
                            </div>
                            <SimpleAccordion
                                items={[
                                    { title: "KYC Documents", content: "Aadhaar, PAN, Current Address Proof." },
                                    { title: "Income Proof", content: "Last 3 months salary slips." },
                                    { title: "Bank Statements", content: "Last 3-6 months salary account statement." },
                                ]}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column: Sticky Form */}
                <aside className="relative">
                    <div id="lead-form" className="sticky top-28">
                        <Card className="bg-white dark:bg-white border border-slate-200 dark:border-slate-200 shadow-sm rounded-2xl overflow-hidden text-slate-900 dark:text-white">
                            <CardHeader className="bg-[#f8fafc] border-b border-slate-200 text-slate-900 p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="p-2 bg-sky-50 text-[#0284c7] rounded-xl">
                                        <Wallet className="h-5 w-5" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-wider bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full">
                                        40+ Banks Network
                                    </span>
                                </div>
                                <CardTitle className="text-xl font-bold text-slate-900">Personal Loan Application</CardTitle>
                                <p className="text-slate-600 text-xs font-normal mt-0.5">Instant in-principle sanction • 10.25% p.a. onwards</p>
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
                                            <label className="text-[11px] font-bold uppercase text-slate-600">Loan Purpose</label>
                                            <select
                                                className="w-full h-10 bg-white border border-slate-200 rounded-xl font-medium text-slate-900 px-3 text-xs focus:ring-2 focus:ring-[#0284c7]"
                                                onChange={(e) => setFormData({ ...formData, city: formData.city })}
                                            >
                                                <option value="Marriage / Wedding Expenses">💍 Marriage / Wedding Expenses</option>
                                                <option value="Medical Emergency">🏥 Medical Emergency</option>
                                                <option value="Debt Consolidation">💳 Debt Consolidation / Credit Card Payoff</option>
                                                <option value="Home Renovation">🔨 Home Renovation & Interiors</option>
                                                <option value="Higher Education">🎓 Higher Education / Studies</option>
                                                <option value="Travel / Holiday">✈️ Travel & International Holiday</option>
                                                <option value="General Personal Need">💼 General Personal Requirement</option>
                                            </select>
                                        </div>
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
                                                    placeholder="Pune"
                                                    value={formData.city}
                                                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                                                    required
                                                    className="h-10 text-xs"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[11px] font-bold uppercase text-slate-600">Monthly Salary</label>
                                                <Input
                                                    placeholder="₹25,000"
                                                    value={formData.income}
                                                    onChange={e => setFormData({ ...formData, income: e.target.value })}
                                                    required
                                                    className="h-10 text-xs"
                                                />
                                            </div>
                                        </div>
                                        <Button className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold h-11 text-xs rounded-xl uppercase tracking-wider shadow-sm mt-3 cursor-pointer">
                                            Apply Direct Bank Facility 🚀
                                        </Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </aside>
            </div>
        </div>
    );
}
