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
        <div className="pb-20 bg-slate-50 dark:bg-black selection:bg-blue-500/30 font-sans">
            {/* Unique Hero Section - Dream Home Theme */}
            <section className="relative pt-40 pb-32 overflow-hidden bg-white dark:bg-slate-950">
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 right-0 w-[60%] h-full bg-blue-50 dark:bg-blue-950/20 rounded-bl-[100px] -z-10"></div>
                <div className="absolute bottom-10 left-10 w-32 h-32 bg-orange-100 dark:bg-orange-900/20 rounded-full blur-3xl"></div>

                <div className="container px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-bold text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300">
                            <Home className="h-4 w-4" />
                            <span>Unlock Your Deam Home</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white">
                            The Key to <br />
                            <span className="text-blue-600">Happiness.</span>
                        </h1>

                        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">
                            Stop renting, start owning. With interest rates starting at just <strong>8.40% p.a.</strong>, your dream home is closer than you think.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all hover:-translate-y-1" onClick={scrollToForm}>
                                Apply for Home Loan
                            </Button>
                        </div>

                        {/* Stats Row */}
                        <div className="flex gap-8 pt-4 border-t border-slate-200 dark:border-slate-800">
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
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 dark:from-slate-800 dark:to-slate-900 rounded-[40px] rotate-3 shadow-2xl overflow-hidden">
                            {/* Mock House Visual */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[70%] bg-blue-600 rounded-t-[40px] shadow-inner flex items-center justify-center">
                                <Key className="text-white/20 h-48 w-48" />
                            </div>
                            <div className="absolute top-10 right-10 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-lg animate-bounce">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        <CheckCircle2 className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-bold uppercase">Status</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">Approved</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Process Section (Unique to Home Loan) */}
            <section className="py-20 bg-slate-50 dark:bg-slate-900">
                <div className="container px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Steps to Ownership</h2>
                        <p className="text-slate-500">A simplified journey from application to getting your house keys.</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-blue-200 dark:bg-blue-900 z-0"></div>

                        {steps.map((step, i) => (
                            <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                                <div className="h-24 w-24 rounded-full bg-white dark:bg-slate-800 border-4 border-blue-50 dark:border-blue-900 shadow-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <step.icon className="h-10 w-10 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                                <p className="text-sm text-slate-500">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content Layout with Sticky Sidebar */}
            <div className="container px-4 md:px-6 py-20 grid lg:grid-cols-[1fr_400px] gap-12">
                {/* Left Column: Content */}
                <div className="space-y-16">
                    {/* Calculator Section - Integrated Style */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-lg">
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <Clock className="text-orange-500" />
                            <span>Plan Your Tenure</span>
                        </h3>
                        <EMICalculator defaultAmount={5000000} defaultRate={8.5} defaultTenure={20} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="bg-blue-600 text-white border-0 shadow-lg">
                            <CardContent className="p-8">
                                <Percent className="h-12 w-12 text-blue-200 mb-6" />
                                <h3 className="text-2xl font-bold mb-2">PMAY Subsidy</h3>
                                <p className="text-blue-100 mb-6">First-time homebuyers can save up to ₹2.67 Lakhs on interest under the CLSS scheme.</p>
                                <Button variant="secondary" className="w-full font-bold text-blue-700">Check PMAY Eligibility</Button>
                            </CardContent>
                        </Card>
                        <Card className="bg-slate-100 dark:bg-slate-800 border-0 shadow-inner">
                            <CardContent className="p-8">
                                <Map className="h-12 w-12 text-slate-400 mb-6" />
                                <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Balance Transfer</h3>
                                <p className="text-slate-500 dark:text-slate-400 mb-6">Already have a loan? Transfer it to us for lower rates and top-up benefits.</p>
                                <Button variant="outline" className="w-full font-bold">Transfer Loan</Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Accordions */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <CheckCircle2 className="text-blue-600" /> Eligibility Criteria
                            </h3>
                            <SimpleAccordion
                                items={[
                                    { title: "Salaried Individuals", content: "Age: 21-60 years. Minimum Income: ₹25,000/month. Work Experience: 2 years min." },
                                    { title: "Self-Employed", content: "Age: 23-70 years. Business Vintage: 3 years. ITR required for last 2 years." },
                                    { title: "CIBIL Score", content: "Minimum 700+ score preferred for best rates. Lower scores may have higher interest rates." },
                                ]}
                            />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <FileText className="text-orange-600" /> Documents Required
                            </h3>
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
                        <Card className="glass-card bg-white/80 dark:bg-slate-900/80 border-blue-100 dark:border-blue-900 shadow-2xl overflow-hidden ring-1 ring-blue-500/10">
                            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                                <CardTitle className="text-lg">Get Immediate Call Back</CardTitle>
                                <p className="text-blue-100 text-sm">Best offers from 40+ Banks</p>
                            </CardHeader>
                            <CardContent className="p-6">
                                {isSuccess ? (
                                    <div className="text-center py-8">
                                        <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle2 className="h-6 w-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Request Received</h3>
                                        <p className="text-slate-600 dark:text-slate-300 mt-2">We will contact you shortly.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Name</label>
                                            <Input
                                                placeholder="Full Name"
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
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">City</label>
                                                <Input
                                                    placeholder="City"
                                                    className="bg-slate-50 border-slate-200"
                                                    value={formData.city}
                                                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Income</label>
                                                <Input
                                                    placeholder="Monthly"
                                                    className="bg-slate-50 border-slate-200"
                                                    value={formData.income}
                                                    onChange={e => setFormData({ ...formData, income: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 text-base shadow-lg shadow-blue-500/20 mt-2">Check My Offers</Button>
                                        <p className="text-xs text-center text-slate-500 mt-4">By clicking, you agree to our Terms & Privacy Policy.</p>
                                    </form>
                                )}
                            </CardContent>
                        </Card>

                        {/* Trust Micro-widgets */}
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div className="flex flex-col items-center p-3 bg-green-50 rounded-lg text-center border border-green-100">
                                <ShieldCheck className="h-6 w-6 text-green-600 mb-1" />
                                <span className="text-xs font-bold text-green-800">Encrypted Data</span>
                            </div>
                            <div className="flex flex-col items-center p-3 bg-amber-50 rounded-lg text-center border border-amber-100">
                                <Zap className="h-6 w-6 text-amber-600 mb-1" />
                                <span className="text-xs font-bold text-amber-800">Fast Approval</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
