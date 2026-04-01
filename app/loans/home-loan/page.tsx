"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EMICalculator } from "@/components/calculators/emi-calculator";
import { CheckCircle2, Home, IndianRupee, Percent, ShieldCheck, Zap, FileText, Key, Map, Calendar, DollarSign, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEmailForm } from "@/hooks/use-email-form";
import { cn } from "@/lib/utils";
import { ContentSection } from "@/components/ui/content-section";
import { SimpleAccordion } from "@/components/ui/simple-accordion";
import { DynamicHeroWrapper } from "@/components/dynamic-hero-wrapper";

export default function HomeLoanPage() {
    const { sendEmail, isSubmitting, isSuccess, error, resetForm } = useEmailForm();
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        city: "",
        income: "",
    });

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
        { icon: FileText, title: "Application", desc: "Submit basic details online" },
        { icon: ShieldCheck, title: "Verification", desc: "Document & property check" },
        { icon: CheckCircle2, title: "Sanction", desc: "Loan approval letter" },
        { icon: Key, title: "Disbursal", desc: "Funds transferred to seller" },
    ];

    return (
        <div className="pb-20 bg-slate-50 dark:bg-black selection:bg-primary/30 font-sans mx-auto">
            <DynamicHeroWrapper page="home-loan">
                {/* Unique Hero Section - Dream Home Ocean Theme */}
                <section className="relative pt-40 pb-32 overflow-hidden bg-white dark:bg-sky-950 border-b border-sky-100 dark:border-sky-900">
                    {/* Abstract Background Shapes - Ocean Style */}
                    <div className="absolute top-0 right-0 w-[60%] h-full bg-sky-50 dark:bg-sky-900/20 rounded-bl-[100px] -z-10"></div>
                    <div className="absolute bottom-10 left-10 w-32 h-32 bg-accent/10 dark:bg-accent/20 rounded-full blur-3xl opacity-50"></div>

                    <div className="container px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center mx-auto">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-bold text-primary dark:bg-primary/20 dark:border-primary/50 dark:text-sky-200">
                                <Home className="h-4 w-4 text-accent" />
                                <span>Unlock Your Dream Home</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white">
                                The Key to <br />
                                <span className="text-gradient">Happiness.</span>
                            </h1>

                            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">
                                Stop renting, start owning. With interest rates starting at just <strong>8.40% p.a.</strong>, your dream home is closer than you think.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-xl shadow-primary/20 bg-primary hover:bg-sky-600 text-white font-bold transition-all hover:-translate-y-1" onClick={scrollToForm}>
                                    Apply for Home Loan
                                </Button>
                            </div>

                            {/* Stats Row */}
                            <div className="flex gap-8 pt-4 border-t border-sky-100 dark:border-sky-800">
                                <div>
                                    <p className="text-3xl font-bold text-slate-900 dark:text-white">30Y</p>
                                    <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Max Tenure</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-slate-900 dark:text-white">90%</p>
                                    <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Funding</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-slate-900 dark:text-white">0%</p>
                                    <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Hidden Charges</p>
                                </div>
                            </div>
                        </div>

                        {/* Visual Hero Element */}
                        <div className="relative hidden lg:block h-[500px]">
                            <div className="absolute inset-0 bg-gradient-to-tr from-sky-100 to-white dark:from-sky-900 dark:to-sky-950 rounded-[40px] rotate-3 shadow-2xl overflow-hidden border border-sky-200 dark:border-sky-800">
                                {/* Mock House Visual */}
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[70%] bg-primary rounded-t-[40px] shadow-inner flex items-center justify-center">
                                    <Key className="text-white/20 h-48 w-48" />
                                </div>
                                <div className="absolute top-10 right-10 p-4 bg-white dark:bg-sky-900 rounded-2xl shadow-lg border border-sky-100 dark:border-sky-800 animate-bounce">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                                            <CheckCircle2 className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Status</p>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">Approved</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </DynamicHeroWrapper>

            {/* Timeline Process Section (Unique to Home Loan) */}
            <section className="py-20 bg-sky-50 dark:bg-sky-950/20">
                <div className="container px-4 mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Steps to Ownership</h2>
                        <p className="text-slate-500 dark:text-slate-400">A simplified journey from application to getting your house keys.</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-primary/20 dark:bg-primary/40 z-0"></div>

                        {steps.map((step, i) => (
                            <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                                <div className="h-24 w-24 rounded-full bg-white dark:bg-sky-900 border-4 border-sky-100 dark:border-sky-800 shadow-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300">
                                    <step.icon className="h-10 w-10 text-primary" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content Layout with Sticky Sidebar */}
            <div className="container px-4 md:px-6 py-20 grid lg:grid-cols-[1fr_400px] gap-12 mx-auto">
                {/* Left Column: Content */}
                <div className="space-y-16">
                    {/* Calculator Section - Integrated Style */}
                    <div className="bg-white dark:bg-sky-950 rounded-3xl p-8 border border-sky-100 dark:border-sky-900 shadow-lg">
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <Clock className="text-accent" />
                            <span>Plan Your Tenure</span>
                        </h3>
                        <EMICalculator defaultAmount={5000000} defaultRate={8.5} defaultTenure={20} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="bg-primary text-white border-0 shadow-lg overflow-hidden group">
                            <CardContent className="p-8 relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                                <Percent className="h-12 w-12 text-sky-200 mb-6" />
                                <h3 className="text-2xl font-bold mb-2 text-white">PMAY Subsidy</h3>
                                <p className="text-sky-100 mb-6">First-time homebuyers can save up to ₹2.67 Lakhs on interest under the CLSS scheme.</p>
                                <Button variant="secondary" className="w-full font-bold text-primary bg-white hover:bg-sky-50 border-none">Check PMAY Eligibility</Button>
                            </CardContent>
                        </Card>
                        <Card className="bg-sky-50 dark:bg-sky-900/10 border border-sky-100 dark:border-sky-800 shadow-sm overflow-hidden group">
                            <CardContent className="p-8 relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                                <Map className="h-12 w-12 text-primary mb-6" />
                                <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Balance Transfer</h3>
                                <p className="text-slate-500 dark:text-slate-400 mb-6">Already have a loan? Transfer it to us for lower rates and top-up benefits.</p>
                                <Button variant="outline" className="w-full font-bold border-primary text-primary hover:bg-primary/5">Transfer Loan</Button>
                            </CardContent>
                        </Card>
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
                                    { title: "Salaried Individuals", content: "Age: 21-60 years. Minimum Income: ₹25,000/month. Work Experience: 2 years min." },
                                    { title: "Self-Employed", content: "Age: 23-70 years. Business Vintage: 3 years. ITR required for last 2 years." },
                                    { title: "CIBIL Score", content: "Minimum 700+ score preferred for best rates. Lower scores may have higher interest rates." },
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
                                    { title: "Identity & Address Proof", content: "Aadhaar Card, PAN Card, Voter ID, Passport, Utility Bills." },
                                    { title: "Income Proof", content: "Last 3 months payslips, 6 months bank statement, Form 16, ITR for last 2 years." },
                                    { title: "Property Documents", content: "Sale Deed, Allotment Letter, Property Map, Possession Certificate." },
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
                                        <Home className="h-6 w-6 text-white" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-accent text-slate-900 px-3 py-1 rounded-full shadow-lg">Best Rates</span>
                                </div>
                                <CardTitle className="text-2xl font-black tracking-tight leading-none mb-2">Check My Offers</CardTitle>
                                <p className="text-sky-100/70 text-xs font-bold uppercase tracking-widest tracking-tighter">Offers from 40+ Top Banks</p>
                            </CardHeader>
                            <CardContent className="p-8 -mt-6 bg-white dark:bg-slate-950 rounded-t-[2.5rem] relative z-10 shadow-2xl">
                                {isSuccess ? (
                                    <div className="text-center py-10">
                                        <div className="h-20 w-20 bg-primary rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/30">
                                            <CheckCircle2 className="h-10 w-10 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Request Received</h3>
                                        <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-widest leading-loose">A Home Loan expert will call shortly.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Full Name</label>
                                            <Input
                                                placeholder="Enter Name"
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
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">City</label>
                                                <Input
                                                    placeholder="Pune"
                                                    className="h-14 bg-slate-50 dark:bg-sky-950/20 border-slate-100 dark:border-primary/10 rounded-2xl font-bold px-6 focus:ring-primary shadow-sm"
                                                    value={formData.city}
                                                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Monthly</label>
                                                <Input
                                                    placeholder="₹45,000"
                                                    className="h-14 bg-slate-50 dark:bg-sky-950/20 border-slate-100 dark:border-primary/10 rounded-2xl font-bold px-6 focus:ring-primary shadow-sm"
                                                    value={formData.income}
                                                    onChange={e => setFormData({ ...formData, income: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <Button className="w-full bg-primary hover:bg-sky-600 text-white font-black h-16 text-lg rounded-2xl shadow-2xl shadow-primary/20 mt-4 transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-widest border border-white/10">Check My Offers</Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>

                        {/* Trust Micro-widgets */}
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div className="flex flex-col items-center p-3 bg-emerald-50 dark:bg-emerald-900/10 rounded-lg text-center border border-emerald-100 dark:border-emerald-800">
                                <ShieldCheck className="h-6 w-6 text-emerald-600 mb-1" />
                                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400">Encrypted Data</span>
                            </div>
                            <div className="flex flex-col items-center p-3 bg-sky-50 dark:bg-sky-900/10 rounded-lg text-center border border-sky-100 dark:border-sky-800">
                                <Zap className="h-6 w-6 text-primary mb-1" />
                                <span className="text-xs font-bold text-sky-800 dark:text-sky-400">Fast Approval</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
