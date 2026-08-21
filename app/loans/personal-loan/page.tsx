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
        <div className="pb-20 bg-[#181a1d] text-white font-sans mx-auto">
            <DynamicHeroWrapper page="personal-loan">
                {/* Unique Hero Section */}
                <section className="relative pt-12 md:pt-20 pb-20 overflow-hidden bg-[#181a1d] text-white border-b border-slate-800">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00c985]/10 rounded-full blur-[120px] pointer-events-none" />

                    <div className="container px-4 md:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10 mx-auto">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-black text-[#00e699] uppercase tracking-widest">
                                <Zap className="h-4 w-4 text-[#00e699]" />
                                <span>Approvals in 5 Minutes</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight text-white">
                                Need Funds? <br />
                                <span className="text-[#00e699]">Consider it Done.</span>
                            </h1>

                            <p className="text-xl text-slate-300 max-w-lg leading-relaxed font-medium">
                                Experience the speed of digital lending. No paperwork, no collateral, just instant funds directly to your bank account.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="h-14 px-8 text-sm font-black rounded-full bg-[#00c985] hover:bg-[#00b074] text-slate-950 uppercase tracking-wider transition-all hover:scale-105" onClick={scrollToForm}>
                                    Get Instant Cash
                                </Button>
                            </div>
                        </div>

                        {/* Visual Hero Element - Rocket */}
                        <div className="relative hidden lg:flex justify-center items-center h-[500px]">
                            <div className="relative w-80 h-80 bg-[#24272c] border border-slate-800 rounded-[3rem] rotate-6 flex items-center justify-center shadow-2xl overflow-hidden">
                                <Rocket className="text-[#00e699] h-40 w-40 drop-shadow-lg scale-110" />
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
            <section className="py-16 relative z-20">
                <div className="container px-4 mx-auto">
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        {[
                            { title: "Apply Online", desc: "Fill simple form", icon: FileText, color: "text-[#00c985]" },
                            { title: "Instant Approval", desc: "AI-driven check", icon: Zap, color: "text-amber-400" },
                            { title: "Cash in Bank", desc: "Within 24 hours", icon: Wallet, color: "text-[#00e699]" }
                        ].map((item, i) => (
                            <Card key={i} className="bg-[#24272c] border border-slate-800 shadow-xl hover:-translate-y-1.5 transition-all duration-300 rounded-3xl p-6 text-white">
                                <CardContent className="p-4 flex flex-col items-center">
                                    <div className={cn("h-16 w-16 rounded-full bg-[#00c985]/15 border border-[#00c985]/30 flex items-center justify-center mb-4", item.color)}>
                                        <item.icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-xl font-black mb-2 text-white">{item.title}</h3>
                                    <p className="text-slate-400 font-medium text-xs">{item.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content Layout with Sticky Sidebar */}
            <div className="container px-8 md:px-10 py-12 grid lg:grid-cols-[1fr_400px] gap-12 mx-auto">
                {/* Left Column: Content */}
                <div className="space-y-12">
                    {/* Features Grid */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="p-6 rounded-3xl bg-[#24272c] border border-slate-800">
                            <h3 className="text-xl font-black text-[#00e699] mb-2">Zero Collateral</h3>
                            <p className="text-slate-400 text-xs font-medium leading-relaxed">100% unsecured loan. No need to pledge any assets or find a guarantor.</p>
                        </div>
                        <div className="p-6 rounded-3xl bg-[#24272c] border border-slate-800">
                            <h3 className="text-xl font-black text-amber-300 mb-2">Flexible Tenure</h3>
                            <p className="text-slate-400 text-xs font-medium leading-relaxed">Choose repayment period from 12 months to 60 months as per your convenience.</p>
                        </div>
                    </div>

                    {/* Calculator Section */}
                    <div className="p-8 rounded-3xl bg-[#24272c] border border-slate-800 shadow-xl text-white">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-[#00c985]/15 border border-[#00c985]/30 rounded-xl text-[#00c985]">
                                <Percent className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-black text-white">Calculate Your EMI</h3>
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
                                <div className="h-10 w-10 rounded-full bg-[#00c985]/15 border border-[#00c985]/30 flex items-center justify-center text-[#00c985]">
                                    <CheckCircle2 className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-black text-white">Eligibility Criteria</h3>
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
                                <div className="h-10 w-10 rounded-full bg-[#00c985]/15 border border-[#00c985]/30 flex items-center justify-center text-[#00c985]">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-black text-white">Documents Required</h3>
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
                        <Card className="bg-[#24272c] border border-slate-800 shadow-2xl rounded-[2.5rem] overflow-hidden text-white">
                            <CardHeader className="bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-400 text-slate-950 p-6 sm:p-8">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="p-2.5 bg-slate-950 rounded-2xl text-white">
                                        <Wallet className="h-5 w-5" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest bg-slate-950 text-white px-3 py-1 rounded-full">
                                        40+ Banks Network
                                    </span>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 block">
                                    Shree Finance Direct Bank Facility
                                </span>
                                <CardTitle className="text-2xl font-black text-slate-950 mt-1">Personal Loan Application</CardTitle>
                                <p className="text-slate-900 text-xs font-bold mt-1">Instant sanction • 10.25% p.a. onwards</p>
                            </CardHeader>
                            <CardContent className="p-6 sm:p-8 space-y-4">
                                {isSuccess ? (
                                    <div className="text-center py-10">
                                        <div className="h-16 w-16 bg-[#00c985] text-slate-950 rounded-full flex items-center justify-center mx-auto mb-4 font-black">
                                            <CheckCircle2 className="h-8 w-8" />
                                        </div>
                                        <h3 className="text-2xl font-black text-white mb-2">Application Received</h3>
                                        <p className="text-slate-400 font-bold text-xs">Direct bank underwriting team will contact you shortly.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-3.5">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase text-slate-400">Loan Purpose</label>
                                            <select
                                                className="w-full h-11 bg-slate-900 border border-slate-700 rounded-xl font-bold text-white px-3 text-xs focus:ring-2 focus:ring-[#00c985]"
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
                                            <label className="text-[10px] font-black uppercase text-slate-400">Full Name</label>
                                            <Input
                                                placeholder="Enter Name"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase text-slate-400">Mobile Number</label>
                                            <Input
                                                placeholder="10-digit number"
                                                value={formData.mobile}
                                                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase text-slate-400">City</label>
                                                <Input
                                                    placeholder="Pune"
                                                    value={formData.city}
                                                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase text-slate-400">Monthly Salary</label>
                                                <Input
                                                    placeholder="₹25,000"
                                                    value={formData.income}
                                                    onChange={e => setFormData({ ...formData, income: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <Button className="w-full bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black h-13 text-xs sm:text-sm rounded-full uppercase tracking-wider shadow-xl mt-3 cursor-pointer">
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
