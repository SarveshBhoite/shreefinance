"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EMICalculator } from "@/components/calculators/emi-calculator";
import { Building2, CheckCircle2, FileText, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEmailForm } from "@/hooks/use-email-form";
import { SimpleAccordion } from "@/components/ui/simple-accordion";
import { DynamicHeroWrapper } from "@/components/dynamic-hero-wrapper";
import { ContentSection } from "@/components/ui/content-section";
import { Deal4LoansDynamicForm } from "@/components/forms/deal4loans-dynamic-form";

export default function LoanAgainstPropertyPage() {
    const { sendEmail, isSubmitting, isSuccess } = useEmailForm();
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        city: "",
        propertyValue: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendEmail({
            type: "Loan Against Property Application",
            ...formData
        });
    };

    const scrollToForm = () => {
        document.getElementById('deal4loans-lap-apply')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="pb-20 bg-white text-white font-sans mx-auto">
            <DynamicHeroWrapper page="loan-against-property">
                {/* Hero Section */}
                <section className="relative pt-12 md:pt-20 pb-20 overflow-hidden bg-white text-white border-b border-slate-200">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0284c7]/10 rounded-full blur-[120px] pointer-events-none" />

                    <div className="container px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 mx-auto">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-50 px-4 py-1.5 text-xs font-black text-[#0284c7] uppercase tracking-widest">
                                <Building2 className="h-4 w-4 text-[#0284c7]" />
                                <span>High-Value Mortgage Financing (9.25% p.a.)</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-slate-900">
                                Loan Against <br />
                                <span className="text-[#0284c7]">Property (LAP)</span>
                            </h1>

                            <p className="text-xl text-slate-600 max-w-lg leading-relaxed font-medium">
                                High-value loan against residential, commercial, or industrial property up to ₹10 Crore with tenures up to 20 years.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="h-14 px-8 text-sm font-black rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-sm uppercase tracking-wider transition-all hover:scale-105" onClick={scrollToForm}>
                                    Apply For LAP Offer
                                </Button>
                            </div>

                            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200">
                                <div>
                                    <p className="text-3xl font-black text-[#0284c7]">9.25%</p>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Starting APR</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-white">20 Yrs</p>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Max Tenure</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-amber-400">₹10 Cr</p>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Max Limit</p>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Hero Visual */}
                        <div className="relative hidden lg:flex justify-center items-center h-[450px]">
                            <Card className="bg-white border border-slate-200 rounded-[2.5rem] p-8 text-white shadow-2xl space-y-6 w-full max-w-md">
                                <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                                    <div className="h-12 w-12 rounded-2xl bg-[#0284c7]/15 border border-[#0284c7]/30 flex items-center justify-center text-[#0284c7]">
                                        <Building2 className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-white">Residential & Commercial LAP</h3>
                                        <p className="text-xs text-slate-500 font-medium">Up to 75% Property LTV</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center bg-white p-3.5 rounded-2xl border border-slate-200 text-xs">
                                        <span className="text-slate-500 font-bold">Interest Rate</span>
                                        <span className="font-black text-[#0284c7] text-sm">Starting 9.25% p.a.</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white p-3.5 rounded-2xl border border-slate-200 text-xs">
                                        <span className="text-slate-500 font-bold">Max Loan Amount</span>
                                        <span className="font-black text-white text-sm">Up to ₹10 Crore</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white p-3.5 rounded-2xl border border-slate-200 text-xs">
                                        <span className="text-slate-500 font-bold">Doorstep Service</span>
                                        <span className="font-black text-amber-300 text-sm">Free Property Valuation</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>
            </DynamicHeroWrapper>

            {/* Instant Deal4Loans LAP Application Form */}
            <section className="py-12 container px-4 mx-auto scroll-mt-24" id="deal4loans-lap-apply">
                <Deal4LoansDynamicForm initialLoanType="lap" showCategorySwitcher={true} />
            </section>

            {/* Main Content Layout */}
            <div className="container px-8 md:px-10 py-16 grid lg:grid-cols-[1fr_400px] gap-12 mx-auto">
                <div className="space-y-12">
                    {/* EMI Calculator */}
                    <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md text-white">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-[#0284c7]/15 border border-[#0284c7]/30 rounded-xl text-[#0284c7]">
                                <Clock className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900">Calculate LAP EMI</h3>
                        </div>
                        <EMICalculator defaultAmount={10000000} defaultRate={9.25} defaultTenure={15} />
                    </div>

                    <ContentSection
                        title="Unlock the Value of Your Property"
                        description="Leverage your fully constructed residential, commercial, or industrial property to fulfill big business expansions, medical needs, or debt consolidation. Get up to 75% property market value with low EMI interest rates starting at 9.25% p.a."
                        imageSrc="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1173&q=80"
                        imageAlt="Luxury Estate & Property"
                    />

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-full bg-[#0284c7]/15 border border-[#0284c7]/30 flex items-center justify-center text-[#0284c7]">
                                    <CheckCircle2 className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900">Eligibility Criteria</h3>
                            </div>
                            <SimpleAccordion
                                items={[
                                    { title: "Property Ownership", content: "Self-owned clear title residential, commercial, or industrial property." },
                                    { title: "Age Limit", content: "25 to 65 years for primary property owner & co-applicants." },
                                    { title: "Income Proof", content: "Regular monthly income through salary or business profits." },
                                ]}
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-full bg-[#0284c7]/15 border border-[#0284c7]/30 flex items-center justify-center text-[#0284c7]">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900">Documents Required</h3>
                            </div>
                            <SimpleAccordion
                                items={[
                                    { title: "Property Documents", content: "Title deed, Sale deed, Approved plan copy, Tax receipts." },
                                    { title: "KYC Documents", content: "Aadhaar, PAN Card, Current address proof." },
                                    { title: "Income Proof", content: "Last 3 years ITR & 12 months bank statements." },
                                ]}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Form Sidebar */}
                <aside className="relative">
                    <div id="lead-form" className="sticky top-28">
                        <Card className="bg-white border border-slate-200 shadow-2xl rounded-[2.5rem] overflow-hidden text-white">
                            <CardHeader className="bg-gradient-to-r from-sky-700 via-sky-600 to-sky-800 text-slate-950 p-8">
                                <span className="text-[10px] font-black uppercase tracking-widest bg-[#f8fafc] text-white px-3 py-1 rounded-full w-fit">Lowest Rate Guarantee</span>
                                <CardTitle className="text-2xl font-black text-slate-950 mt-2">Apply for LAP Offer</CardTitle>
                                <p className="text-slate-900 text-xs font-bold">Fast sanction in 72 hours</p>
                            </CardHeader>
                            <CardContent className="p-8 space-y-4">
                                {isSuccess ? (
                                    <div className="text-center py-8 space-y-3">
                                        <div className="h-16 w-16 bg-[#0284c7] text-white rounded-full flex items-center justify-center mx-auto font-black">
                                            <CheckCircle2 className="h-8 w-8" />
                                        </div>
                                        <h4 className="text-xl font-black text-slate-900">Application Received!</h4>
                                        <p className="text-xs text-slate-500">Our mortgage specialist will reach out shortly.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-slate-500">Full Name</label>
                                            <Input
                                                placeholder="Enter full name"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-slate-500">Mobile Number</label>
                                            <Input
                                                placeholder="10-digit mobile"
                                                value={formData.mobile}
                                                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-slate-500">City</label>
                                            <Input
                                                placeholder="City"
                                                value={formData.city}
                                                onChange={e => setFormData({ ...formData, city: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-slate-500">Approx Property Value</label>
                                            <Input
                                                placeholder="₹ Market Value"
                                                value={formData.propertyValue}
                                                onChange={e => setFormData({ ...formData, propertyValue: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <Button className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-sm font-black h-14 text-sm rounded-full uppercase tracking-wider shadow-sm hover:shadow-md mt-4">
                                            Get Free Valuation Call
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
