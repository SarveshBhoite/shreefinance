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
        <div className="pb-20 bg-slate-50 dark:bg-black selection:bg-primary/30 font-sans mx-auto">
            <DynamicHeroWrapper page="business-loan">
                {/* Unique Hero Section - Empire Builder Ocean Theme */}
                <section className="relative pt-40 pb-20 overflow-hidden bg-gradient-to-b from-sky-950 to-sky-900 text-white border-b border-primary/20">
                    {/* City skyline background - Ocean Style */}
                    <div className="absolute bottom-0 left-0 right-0 h-64 bg-[url('https://www.transparenttextures.com/patterns/city-lights.png')] opacity-10 z-0"></div>
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-[pulse_6s_ease-in-out_infinite]"></div>

                    <div className="container px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 mx-auto">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/20 px-4 py-1.5 text-sm font-bold text-sky-200">
                                <Building2 className="h-4 w-4 text-accent" />
                                <span>Fuel Your Business Growth</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-white">
                                Build Your <br />
                                <span className="text-gradient">Empire.</span>
                            </h1>

                            <p className="text-xl text-sky-100/80 max-w-lg leading-relaxed">
                                Capital solutions for every stage of your business. Unsecured loans up to ₹50 Lakhs with flexible repayment options.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/40 bg-primary hover:bg-sky-600 text-white font-bold border border-white/10 transition-all hover:-translate-y-1" onClick={scrollToForm}>
                                    Check Eligibility
                                </Button>
                            </div>

                            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-sky-800">
                                <div>
                                    <p className="text-3xl font-bold text-white">₹50L</p>
                                    <p className="text-xs text-sky-400 uppercase tracking-wider">Max Amount</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-white">48hr</p>
                                    <p className="text-xs text-sky-400 uppercase tracking-wider">Disbursal</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-white">0</p>
                                    <p className="text-xs text-sky-400 uppercase tracking-wider">Collateral</p>
                                </div>
                            </div>
                        </div>

                        {/* Visual Hero Element - Skyscraper/Growth */}
                        <div className="relative hidden lg:block h-[500px]">
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* Abstract Building Blocks */}
                                <div className="relative w-64 h-96">
                                    <div className="absolute bottom-0 left-0 w-20 h-40 bg-sky-900 rounded-t-lg opacity-80 animate-pulse"></div>
                                    <div className="absolute bottom-0 left-24 w-20 h-64 bg-sky-700 rounded-t-lg opacity-90 animate-pulse delay-100"></div>
                                    <div className="absolute bottom-0 right-0 w-20 h-80 bg-primary rounded-t-lg shadow-[0_0_30px_rgba(14,165,233,0.5)] animate-pulse delay-200"></div>

                                    {/* Floating Growth Graph */}
                                    <div className="absolute top-10 -right-16 bg-sky-950/90 backdrop-blur-md p-4 rounded-xl border border-sky-800 shadow-xl w-64 animate-bounce delay-700">
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-xs text-sky-400 font-bold uppercase tracking-tighter">Revenue Growth</p>
                                            <TrendingUp className="h-4 w-4 text-accent" />
                                        </div>
                                        <div className="h-2 w-full bg-sky-900 rounded-full overflow-hidden">
                                            <div className="h-full w-[80%] bg-accent rounded-full shadow-[0_0_10px_rgba(255,215,0,0.4)]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </DynamicHeroWrapper>

            {/* Business Solutions Strip */}
            <div className="border-y border-sky-100 dark:border-sky-900 bg-white/80 dark:bg-sky-950/80 backdrop-blur-md py-10 shadow-sm relative z-20">
                <div className="container px-4 mx-auto grid md:grid-cols-4 gap-8 text-center divide-x divide-sky-100 dark:divide-sky-900">
                    <div className="group transition-all hover:-translate-y-1">
                        <Briefcase className="h-8 w-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                        <p className="font-bold text-slate-900 dark:text-white">Working Capital</p>
                    </div>
                    <div className="group transition-all hover:-translate-y-1">
                        <Globe className="h-8 w-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                        <p className="font-bold text-slate-900 dark:text-white">Business Expansion</p>
                    </div>
                    <div className="group transition-all hover:-translate-y-1">
                        <Zap className="h-8 w-8 mx-auto mb-3 text-accent group-hover:scale-110 transition-transform" />
                        <p className="font-bold text-slate-900 dark:text-white">Equipment Finance</p>
                    </div>
                    <div className="group transition-all hover:-translate-y-1">
                        <ShieldCheck className="h-8 w-8 mx-auto mb-3 text-emerald-500 group-hover:scale-110 transition-transform" />
                        <p className="font-bold text-slate-900 dark:text-white">Debt Consolidation</p>
                    </div>
                </div>
            </div>

            {/* Main Content Layout with Sticky Sidebar */}
            <div className="container px-4 md:px-6 py-12 grid lg:grid-cols-[1fr_400px] gap-12 mx-auto">
                {/* Left Column: Content */}
                <div className="space-y-16">
                    <ContentSection
                        title="Expand Without Limits"
                        description="Every business needs timely capital to grow. Whether you are looking to expand your operations, purchase new machinery, stock up on inventory, or manage daily cash flows, our Business Loans are designed to be quick and hassle-free. We understand that in business, time is money. That is why we offer unsecured Business Loans up to ₹50 Lakhs with approval in as little as 48 hours. Focus on building your empire while we take care of the funding."
                        imageSrc="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                        imageAlt="Modern Skyscraper"
                    >
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-900/10 border border-sky-100 dark:border-sky-800 transition-all hover:bg-sky-100 dark:hover:bg-sky-900/40 group">
                                <h4 className="font-bold text-primary text-lg group-hover:scale-110 transition-transform">Collateral Free</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">No Asset Pledge</p>
                            </div>
                            <div className="p-4 rounded-xl bg-sky-50/50 dark:bg-sky-900/5 border border-sky-100/50 dark:border-sky-800/50 transition-all hover:bg-sky-100 dark:hover:bg-sky-900/40 group">
                                <h4 className="font-bold text-accent text-lg group-hover:scale-110 transition-transform">Quick Access</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Disbursal in 48 Hrs</p>
                            </div>
                        </div>
                    </ContentSection>

                    {/* Calculator Section */}
                    <div className="p-1 rounded-3xl bg-gradient-to-r from-sky-100 to-sky-200 dark:from-sky-900/40 dark:to-sky-800/20 shadow-sm border border-sky-200 dark:border-sky-900">
                        <div className="bg-white dark:bg-sky-950 rounded-[22px] p-6 shadow-inner">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary"><BarChart3 className="h-6 w-6" /></div>
                                <h3 className="text-xl font-bold">Calculate Business Loan EMI</h3>
                            </div>
                            <EMICalculator defaultAmount={2000000} defaultRate={12.0} defaultTenure={3} />
                        </div>
                    </div>

                    {/* Accordions */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-full bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center text-primary">
                                    <CheckCircle2 className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold">Eligibility Criteria</h3>
                            </div>
                            <SimpleAccordion
                                items={[
                                    { title: "Business Vintage", content: "Minimum 3 years of business continuity." },
                                    { title: "Turnover", content: "Minimum annual turnover of ₹40 Lakhs." },
                                    { title: "Profitability", content: "Business should be profit-making for the last 2 years." },
                                ]}
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold">Documents Required</h3>
                            </div>
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
                    <div id="lead-form" className="sticky top-32">
                        <Card className="glass-card bg-white/90 dark:bg-slate-900/90 border-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden rounded-[2.5rem] ring-1 ring-primary/5">
                            <CardHeader className="bg-gradient-to-r from-primary to-sky-700 text-white p-8 pb-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                                        <Briefcase className="h-6 w-6 text-white" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-accent text-slate-900 px-3 py-1 rounded-full shadow-lg">Growth Capital</span>
                                </div>
                                <CardTitle className="text-2xl font-black tracking-tight leading-none mb-2">Funding Inquiry</CardTitle>
                                <p className="text-sky-100/70 text-xs font-bold uppercase tracking-widest tracking-tighter">Grow your business today</p>
                            </CardHeader>
                            <CardContent className="p-8 -mt-6 bg-white dark:bg-slate-950 rounded-t-[2.5rem] relative z-10 shadow-2xl">
                                {isSuccess ? (
                                    <div className="text-center py-10">
                                        <div className="h-20 w-20 bg-primary rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/30">
                                            <CheckCircle2 className="h-10 w-10 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Request Received</h3>
                                        <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-widest leading-loose">A Relationship Manager will call you.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Promoter Name</label>
                                            <Input
                                                placeholder="Proprietor/Director Name"
                                                className="h-14 bg-slate-50 dark:bg-sky-950/20 border-slate-100 dark:border-primary/10 rounded-2xl font-bold px-6 focus:ring-primary shadow-sm"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Mobile Access</label>
                                            <Input
                                                placeholder="10-digit number"
                                                className="h-14 bg-slate-50 dark:bg-sky-950/20 border-slate-100 dark:border-primary/10 rounded-2xl font-bold px-6 focus:ring-primary shadow-sm"
                                                value={formData.mobile}
                                                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Business Name</label>
                                            <Input
                                                placeholder="Registered Name"
                                                className="h-14 bg-slate-50 dark:bg-sky-950/20 border-slate-100 dark:border-primary/10 rounded-2xl font-bold px-6 focus:ring-primary shadow-sm"
                                                value={formData.companyName}
                                                onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Annual Turnover</label>
                                            <Input
                                                placeholder="e.g. ₹50 Lakhs"
                                                className="h-14 bg-slate-50 dark:bg-sky-950/20 border-slate-100 dark:border-primary/10 rounded-2xl font-bold px-6 focus:ring-primary shadow-sm"
                                                value={formData.turnover}
                                                onChange={e => setFormData({ ...formData, turnover: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <Button className="w-full bg-primary hover:bg-sky-600 text-white font-black h-16 text-lg rounded-2xl shadow-2xl shadow-primary/20 mt-4 transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-widest border border-white/10">Get Expert Support</Button>
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
