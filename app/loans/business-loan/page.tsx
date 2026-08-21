"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EMICalculator } from "@/components/calculators/emi-calculator";
import { CheckCircle2, Building2, TrendingUp, BarChart3, FileText, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEmailForm } from "@/hooks/use-email-form";
import { cn } from "@/lib/utils";
import { ContentSection } from "@/components/ui/content-section";
import { SimpleAccordion } from "@/components/ui/simple-accordion";
import { DynamicHeroWrapper } from "@/components/dynamic-hero-wrapper";
import { Deal4LoansDynamicForm } from "@/components/forms/deal4loans-dynamic-form";

export default function BusinessLoanPage() {
    const { sendEmail, isSubmitting, isSuccess } = useEmailForm();
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        companyName: "",
        turnover: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendEmail({
            type: "Business Loan Application",
            ...formData
        });
    };

    const scrollToForm = () => {
        document.getElementById('deal4loans-business-apply')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="pb-20 bg-[#181a1d] text-white font-sans mx-auto">
            <DynamicHeroWrapper page="business-loan">
                {/* Hero Section */}
                <section className="relative pt-12 md:pt-20 pb-20 overflow-hidden bg-[#181a1d] text-white border-b border-slate-800">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00c985]/10 rounded-full blur-[120px] pointer-events-none" />

                    <div className="container px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 mx-auto">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-black text-[#00e699] uppercase tracking-widest">
                                <Building2 className="h-4 w-4 text-[#00e699]" />
                                <span>Fuel Your Business Growth</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight text-white">
                                Build Your <br />
                                <span className="text-[#00e699]">Empire.</span>
                            </h1>

                            <p className="text-xl text-slate-300 max-w-lg leading-relaxed font-medium">
                                Capital solutions for every stage of your business. Unsecured loans up to ₹75 Lakhs with flexible repayment options.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="h-14 px-8 text-sm font-black rounded-full bg-[#00c985] hover:bg-[#00b074] text-slate-950 uppercase tracking-wider transition-all hover:scale-105" onClick={scrollToForm}>
                                    Apply For Business Capital
                                </Button>
                            </div>
                        </div>

                        {/* Visual Hero Element */}
                        <div className="relative hidden lg:flex justify-center items-center h-[450px]">
                            <Card className="bg-[#24272c] border border-slate-800 rounded-[2.5rem] p-8 text-white shadow-2xl space-y-6 w-full max-w-md">
                                <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                                    <div className="h-12 w-12 rounded-2xl bg-[#00c985]/15 border border-[#00c985]/30 flex items-center justify-center text-[#00c985]">
                                        <TrendingUp className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-white">Unsecured MSME Funding</h3>
                                        <p className="text-xs text-slate-400 font-medium">No Asset Collateral Needed</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800 text-xs">
                                        <span className="text-slate-400 font-bold">Max Loan Amount</span>
                                        <span className="font-black text-[#00e699] text-sm">Up to ₹75 Lakhs</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800 text-xs">
                                        <span className="text-slate-400 font-bold">Interest Rate</span>
                                        <span className="font-black text-white text-sm">Starting 13.99% p.a.</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800 text-xs">
                                        <span className="text-slate-400 font-bold">Tenure Options</span>
                                        <span className="font-black text-amber-300 text-sm">12 to 84 Months</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>
            </DynamicHeroWrapper>

            {/* Instant Business Loan Deal4Loans Form */}
            <section className="py-12 container px-4 mx-auto scroll-mt-24" id="deal4loans-business-apply">
                <Deal4LoansDynamicForm initialLoanType="business" showCategorySwitcher={true} />
            </section>

            {/* Unique Grid Section */}
            <section className="py-16 relative z-20">
                <div className="container px-4 mx-auto">
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        {[
                            { title: "Working Capital", desc: "For daily business operations", icon: BarChart3, color: "text-[#00c985]" },
                            { title: "Equipment Finance", desc: "Upgrade machinery & tech", icon: Building2, color: "text-amber-400" },
                            { title: "Business Expansion", desc: "Open new branch locations", icon: Briefcase, color: "text-[#00e699]" }
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

            {/* Main Content Layout */}
            <div className="container px-8 md:px-10 py-12 grid lg:grid-cols-[1fr_400px] gap-12 mx-auto">
                <div className="space-y-12">
                    {/* Calculator Section */}
                    <div className="p-8 rounded-3xl bg-[#24272c] border border-slate-800 shadow-xl text-white">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-[#00c985]/15 border border-[#00c985]/30 rounded-xl text-[#00c985]">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-black text-white">Calculate Business Loan EMI</h3>
                        </div>
                        <EMICalculator defaultAmount={2000000} defaultRate={14.5} defaultTenure={3} />
                    </div>

                    <ContentSection
                        title="Grow Your Enterprise Without Capital Constraints"
                        description="Our tailored business loan solutions empower entrepreneurs, MSMEs, and growing enterprises with fast collateral-free capital. Whether you need working capital, funds for inventory purchase, or capital for business expansion, we connect you with 40+ top partner banks offering competitive interest rates and zero hassle."
                        imageSrc="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                        imageAlt="Modern Business Office Building"
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
                                    { title: "Business Vintage", content: "Minimum 2 years of operational history with GST registration." },
                                    { title: "Annual Turnover", content: "Minimum annual turnover of ₹20 Lakhs." },
                                    { title: "Credit Score", content: "CIBIL score of 700 or above for business promoter." },
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
                                    { title: "KYC Documents", content: "Pan Card of Business & Promoter, Aadhaar, Business Address Proof." },
                                    { title: "Financial Proof", content: "ITR for last 2 years with Computation & Audited Financials." },
                                    { title: "Bank Statements", content: "Last 12 months primary current bank account statement." },
                                ]}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column: Form Sidebar */}
                <aside className="relative">
                    <div id="lead-form" className="sticky top-28">
                        <Card className="bg-[#24272c] border border-slate-800 shadow-2xl rounded-[2.5rem] overflow-hidden text-white">
                            <CardHeader className="bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-400 text-slate-950 p-8">
                                <span className="text-[10px] font-black uppercase tracking-widest bg-slate-950 text-white px-3 py-1 rounded-full w-fit">MSME Special Rate</span>
                                <CardTitle className="text-2xl font-black text-slate-950 mt-2">Apply for Business Loan</CardTitle>
                                <p className="text-slate-900 text-xs font-bold">Fast sanction in 48 hours</p>
                            </CardHeader>
                            <CardContent className="p-8 space-y-4">
                                {isSuccess ? (
                                    <div className="text-center py-8 space-y-3">
                                        <div className="h-16 w-16 bg-[#00c985] text-slate-950 rounded-full flex items-center justify-center mx-auto font-black">
                                            <CheckCircle2 className="h-8 w-8" />
                                        </div>
                                        <h4 className="text-xl font-black text-white">Application Submitted!</h4>
                                        <p className="text-xs text-slate-400">Our MSME loan expert will contact you shortly.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-slate-400">Promoter Name</label>
                                            <Input
                                                placeholder="Full Name"
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
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-slate-400">Company Name</label>
                                            <Input
                                                placeholder="Business / Enterprise Name"
                                                value={formData.companyName}
                                                onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-slate-400">Annual Turnover</label>
                                            <Input
                                                placeholder="₹ Annual Turnover"
                                                value={formData.turnover}
                                                onChange={e => setFormData({ ...formData, turnover: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <Button className="w-full bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black h-14 text-sm rounded-full uppercase tracking-wider shadow-xl mt-4">
                                            Apply For Business Loan
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
