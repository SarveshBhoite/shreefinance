"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EMICalculator } from "@/components/calculators/emi-calculator";
import { CheckCircle2, Building2, TrendingUp, BarChart3, ShieldCheck, Zap, FileText, Briefcase, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEmailForm } from "@/hooks/use-email-form";
import { cn } from "@/lib/utils";
import { ContentSection } from "@/components/ui/content-section";
import { SimpleAccordion } from "@/components/ui/simple-accordion";
import { DynamicHeroWrapper } from "@/components/dynamic-hero-wrapper";

export default function BusinessLoanPage() {
    const { sendEmail, isSubmitting, isSuccess, error, resetForm } = useEmailForm();
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
        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="pb-20 bg-slate-50 dark:bg-black selection:bg-blue-500/30 font-sans">
            <DynamicHeroWrapper page="business-loan">
                {/* Unique Hero Section - Empire Builder Theme */}
                <section className="relative pt-40 pb-20 overflow-hidden bg-slate-900 text-white">
                    {/* City skyline background */}
                    <div className="absolute bottom-0 left-0 right-0 h-64 bg-[url('https://www.transparenttextures.com/patterns/city-lights.png')] opacity-20 z-0"></div>
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>

                    <div className="container px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-900/20 px-4 py-1.5 text-sm font-bold text-blue-400">
                                <Building2 className="h-4 w-4" />
                                <span>Fuel Your Business Growth</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                                Build Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Empire.</span>
                            </h1>

                            <p className="text-xl text-slate-300 max-w-lg leading-relaxed">
                                Capital solutions for every stage of your business. Unsecured loans up to ₹50 Lakhs with flexible repayment options.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-blue-900/40 bg-blue-600 hover:bg-blue-700 text-white font-bold" onClick={scrollToForm}>
                                    Check Eligibility
                                </Button>
                            </div>

                            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-slate-800">
                                <div>
                                    <p className="text-3xl font-bold text-white">₹50L</p>
                                    <p className="text-xs text-slate-400 uppercase tracking-wider">Max Amount</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-white">48hr</p>
                                    <p className="text-xs text-slate-400 uppercase tracking-wider">Disbursal</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-white">0</p>
                                    <p className="text-xs text-slate-400 uppercase tracking-wider">Collateral</p>
                                </div>
                            </div>
                        </div>

                        {/* Visual Hero Element - Skyscraper/Growth */}
                        <div className="relative hidden lg:block h-[500px]">
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* Abstract Building Blocks */}
                                <div className="relative w-64 h-96">
                                    <div className="absolute bottom-0 left-0 w-20 h-40 bg-blue-900 rounded-t-lg opacity-80 animate-pulse"></div>
                                    <div className="absolute bottom-0 left-24 w-20 h-64 bg-blue-700 rounded-t-lg opacity-90 animate-pulse delay-100"></div>
                                    <div className="absolute bottom-0 right-0 w-20 h-80 bg-blue-500 rounded-t-lg shadow-[0_0_30px_rgba(59,130,246,0.5)] animate-pulse delay-200"></div>

                                    {/* Floating Growth Graph */}
                                    <div className="absolute top-10 -right-16 bg-slate-800/90 backdrop-blur-md p-4 rounded-xl border border-slate-700 shadow-xl w-64 animate-bounce delay-700">
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-xs text-slate-400 font-bold uppercase">Revenue Growth</p>
                                            <TrendingUp className="h-4 w-4 text-green-500" />
                                        </div>
                                        <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                                            <div className="h-full w-[80%] bg-green-500 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </DynamicHeroWrapper>

            {/* Business Solutions Strip */}
            <div className="border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-10">
                <div className="container px-4 grid md:grid-cols-4 gap-8 text-center divide-x divide-slate-100 dark:divide-slate-800">
                    <div className="group">
                        <Briefcase className="h-8 w-8 mx-auto mb-3 text-blue-600 group-hover:scale-110 transition-transform" />
                        <p className="font-bold text-slate-900 dark:text-white">Working Capital</p>
                    </div>
                    <div className="group">
                        <Globe className="h-8 w-8 mx-auto mb-3 text-indigo-600 group-hover:scale-110 transition-transform" />
                        <p className="font-bold text-slate-900 dark:text-white">Business Expansion</p>
                    </div>
                    <div className="group">
                        <Zap className="h-8 w-8 mx-auto mb-3 text-amber-500 group-hover:scale-110 transition-transform" />
                        <p className="font-bold text-slate-900 dark:text-white">Equipment Finance</p>
                    </div>
                    <div className="group">
                        <ShieldCheck className="h-8 w-8 mx-auto mb-3 text-green-600 group-hover:scale-110 transition-transform" />
                        <p className="font-bold text-slate-900 dark:text-white">Debt Consolidation</p>
                    </div>
                </div>
            </div>

            {/* Main Content Layout with Sticky Sidebar */}
            <div className="container px-4 md:px-6 py-12 grid lg:grid-cols-[1fr_400px] gap-12">
                {/* Left Column: Content */}
                <div className="space-y-16">
                    <ContentSection
                        title="Expand Without Limits"
                        description="Every business needs timely capital to grow. Whether you are looking to expand your operations, purchase new machinery, stock up on inventory, or manage daily cash flows, our Business Loans are designed to be quick and hassle-free. We understand that in business, time is money. That is why we offer unsecured Business Loans up to ₹50 Lakhs with approval in as little as 48 hours. Focus on building your empire while we take care of the funding."
                        imageSrc="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                        imageAlt="Modern Skyscraper"
                    >
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                                <h4 className="font-bold text-blue-700 dark:text-blue-300 text-lg">Collateral Free</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">No Asset Pledge</p>
                            </div>
                            <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
                                <h4 className="font-bold text-indigo-700 dark:text-indigo-300 text-lg">Quick Access</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Disbursal in 48 Hrs</p>
                            </div>
                        </div>
                    </ContentSection>

                    {/* Calculator Section */}
                    <div className="p-1 rounded-3xl bg-gradient-to-r from-blue-200 to-indigo-200 dark:from-slate-800 dark:to-slate-900 shadow-sm border border-blue-100 dark:border-blue-900">
                        <div className="bg-white dark:bg-slate-950 rounded-[22px] p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><BarChart3 className="h-6 w-6" /></div>
                                <h3 className="text-xl font-bold">Calculate Business Loan EMI</h3>
                            </div>
                            <EMICalculator defaultAmount={2000000} defaultRate={12.0} defaultTenure={3} />
                        </div>
                    </div>

                    {/* Accordions */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <CheckCircle2 className="text-blue-600" /> Eligibility Criteria
                            </h3>
                            <SimpleAccordion
                                items={[
                                    { title: "Business Vintage", content: "Minimum 3 years of business continuity." },
                                    { title: "Turnover", content: "Minimum annual turnover of ₹40 Lakhs." },
                                    { title: "Profitability", content: "Business should be profit-making for the last 2 years." },
                                ]}
                            />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <FileText className="text-indigo-600" /> Documents Required
                            </h3>
                            <SimpleAccordion
                                items={[
                                    { title: "Registration Proof", content: "GST Registration, Trade License, Partnership Deed/MOA." },
                                    { title: "Financials", content: "Audited Financials (CA Certified) for last 2 years." },
                                    { title: "Bank Statements", content: "Last 12 months current account statement." },
                                ]}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column: Sticky Form */}
                <aside className="relative">
                    <div id="lead-form" className="sticky top-24">
                        <Card className="glass-card bg-white/80 dark:bg-slate-900/80 border-blue-100 dark:border-blue-900 shadow-2xl overflow-hidden ring-1 ring-blue-500/10">
                            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                                <CardTitle className="text-lg">Business Funding Inquiry</CardTitle>
                                <p className="text-blue-100 text-sm">Grow your business today</p>
                            </CardHeader>
                            <CardContent className="p-6">
                                {isSuccess ? (
                                    <div className="text-center py-8">
                                        <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle2 className="h-6 w-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Request Received</h3>
                                        <p className="text-slate-600 dark:text-slate-300 mt-2">RM will contact you.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Name</label>
                                            <Input
                                                placeholder="Proprietor/Director Name"
                                                className="bg-slate-50 border-slate-200"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Mobile</label>
                                            <Input
                                                placeholder="10 digit number"
                                                className="bg-slate-50 border-slate-200"
                                                value={formData.mobile}
                                                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Company Name</label>
                                            <Input
                                                placeholder="Registered Business Name"
                                                className="bg-slate-50 border-slate-200"
                                                value={formData.companyName}
                                                onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Annual Turnover</label>
                                            <Input
                                                placeholder="e.g. 50 Lakhs"
                                                className="bg-slate-50 border-slate-200"
                                                value={formData.turnover}
                                                onChange={e => setFormData({ ...formData, turnover: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 text-base shadow-lg shadow-blue-500/20 mt-2">Check Eligibility</Button>
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
