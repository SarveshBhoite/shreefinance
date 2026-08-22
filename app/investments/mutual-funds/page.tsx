"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SIPCalculator } from "@/components/calculators/sip-calculator";
import { CheckCircle2, TrendingUp, BarChart3, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEmailForm } from "@/hooks/use-email-form";
import { ContentSection } from "@/components/ui/content-section";
import { SimpleAccordion } from "@/components/ui/simple-accordion";
import { DynamicHeroWrapper } from "@/components/dynamic-hero-wrapper";

export default function MutualFundsPage() {
    const { sendEmail, isSubmitting, isSuccess } = useEmailForm();
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        investmentAmount: "",
        city: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendEmail({
            type: "Mutual Fund Inquiry",
            ...formData
        });
    };

    const scrollToForm = () => {
        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="pb-20 bg-white text-white font-sans mx-auto">
            <DynamicHeroWrapper page="mutual-funds">
                {/* Hero Section */}
                <section className="relative pt-12 md:pt-20 pb-20 overflow-hidden bg-white text-white border-b border-slate-200">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0284c7]/10 rounded-full blur-[120px] pointer-events-none" />

                    <div className="container px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 mx-auto">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-50 px-4 py-1.5 text-xs font-black text-[#0284c7] uppercase tracking-widest">
                                <TrendingUp className="h-4 w-4 text-[#0284c7]" />
                                <span>High Returns (SIP Starting ₹500)</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-slate-900">
                                Smart Wealth Creation <br />
                                <span className="text-[#0284c7]">Mutual Funds</span>
                            </h1>

                            <p className="text-xl text-slate-600 max-w-lg leading-relaxed font-medium">
                                Invest in top-rated mutual funds with zero commission. Start monthly SIPs from ₹500 or lump sum investments with expert guidance.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="h-14 px-8 text-sm font-black rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-sm uppercase tracking-wider transition-all hover:scale-105" onClick={scrollToForm}>
                                    Start SIP Investment
                                </Button>
                            </div>

                            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200">
                                <div>
                                    <p className="text-3xl font-black text-[#0284c7]">₹500</p>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Min SIP Amount</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-white">0%</p>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Direct Commission</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-amber-400">15%+ p.a.</p>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Historical Returns</p>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Hero Visual */}
                        <div className="relative hidden lg:flex justify-center items-center h-[450px]">
                            <Card className="bg-white border border-slate-200 rounded-[2.5rem] p-8 text-white shadow-2xl space-y-6 w-full max-w-md">
                                <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                                    <div className="h-12 w-12 rounded-2xl bg-[#0284c7]/15 border border-[#0284c7]/30 flex items-center justify-center text-[#0284c7]">
                                        <TrendingUp className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-white">Equity & Debt SIP Funds</h3>
                                        <p className="text-xs text-slate-500 font-medium">Direct Growth Mutual Funds</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center bg-white p-3.5 rounded-2xl border border-slate-200 text-xs">
                                        <span className="text-slate-500 font-bold">SIP Starting</span>
                                        <span className="font-black text-[#0284c7] text-sm">₹500 / Month</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white p-3.5 rounded-2xl border border-slate-200 text-xs">
                                        <span className="text-slate-500 font-bold">Tax Savings (ELSS)</span>
                                        <span className="font-black text-white text-sm">Up to ₹46,800 Tax Saved</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white p-3.5 rounded-2xl border border-slate-200 text-xs">
                                        <span className="text-slate-500 font-bold">Fund Partners</span>
                                        <span className="font-black text-amber-300 text-sm">SBI, HDFC, ICICI, Nippon</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>
            </DynamicHeroWrapper>

            {/* Main Content Layout */}
            <div className="container px-8 md:px-10 py-16 grid lg:grid-cols-[1fr_400px] gap-12 mx-auto">
                <div className="space-y-12">
                    {/* SIP Calculator */}
                    <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md text-white">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-[#0284c7]/15 border border-[#0284c7]/30 rounded-xl text-[#0284c7]">
                                <BarChart3 className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900">SIP Investment Calculator</h3>
                        </div>
                        <SIPCalculator />
                    </div>

                    <ContentSection
                        title="Build Long-Term Wealth With Systematized Investing"
                        description="Mutual funds allow you to pool your capital with top professional fund managers targeting high-growth equities, government bonds, and hybrid portfolios. Start a recurring SIP or lump sum investment with 0% extra fees."
                        imageSrc="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                        imageAlt="Financial Investment Growth Graph"
                    />

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-full bg-[#0284c7]/15 border border-[#0284c7]/30 flex items-center justify-center text-[#0284c7]">
                                    <CheckCircle2 className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900">Key Benefits</h3>
                            </div>
                            <SimpleAccordion
                                items={[
                                    { title: "Rupee Cost Averaging", content: "SIP automatically buys more units when market drops, averaging your overall acquisition cost." },
                                    { title: "High Liquidity", content: "Withdraw funds anytime with zero lock-in for non-ELSS funds." },
                                    { title: "Section 80C Tax Saving", content: "Save up to ₹46,800 annually by investing in ELSS Tax Saver Funds." },
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
                                    { title: "e-KYC Verification", content: "PAN Card, Aadhaar Card, Passport photo." },
                                    { title: "Bank Mandate", content: "Cancelled cheque or bank statement for auto-debit SIP." },
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
                                <span className="text-[10px] font-black uppercase tracking-widest bg-[#f8fafc] text-white px-3 py-1 rounded-full w-fit">0% Commission Direct Funds</span>
                                <CardTitle className="text-2xl font-black text-slate-950 mt-2">Start SIP Investment</CardTitle>
                                <p className="text-slate-900 text-xs font-bold">Paperless 2-minute setup</p>
                            </CardHeader>
                            <CardContent className="p-8 space-y-4">
                                {isSuccess ? (
                                    <div className="text-center py-8 space-y-3">
                                        <div className="h-16 w-16 bg-[#0284c7] text-white rounded-full flex items-center justify-center mx-auto font-black">
                                            <CheckCircle2 className="h-8 w-8" />
                                        </div>
                                        <h4 className="text-xl font-black text-slate-900">Inquiry Received!</h4>
                                        <p className="text-xs text-slate-500">Our wealth advisor will contact you shortly.</p>
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
                                            <label className="text-[10px] font-black uppercase text-slate-500">Monthly SIP Amount</label>
                                            <Input
                                                placeholder="₹ Amount (e.g. 1,000)"
                                                value={formData.investmentAmount}
                                                onChange={e => setFormData({ ...formData, investmentAmount: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <Button className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-sm font-black h-14 text-sm rounded-full uppercase tracking-wider shadow-sm hover:shadow-md mt-4">
                                            Start My SIP Portfolio
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
