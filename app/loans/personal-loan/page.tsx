"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EMICalculator } from "@/components/calculators/emi-calculator";
import { CheckCircle2, User, IndianRupee, Percent, ShieldCheck, Zap, FileText, Rocket, Wallet, Timer, CreditCard, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEmailForm } from "@/hooks/use-email-form";
import { cn } from "@/lib/utils";
import { ContentSection } from "@/components/ui/content-section";
import { SimpleAccordion } from "@/components/ui/simple-accordion";

export default function PersonalLoanPage() {
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
            type: "Personal Loan Application",
            ...formData
        });
    };

    const scrollToForm = () => {
        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="pb-20 bg-slate-50 dark:bg-black selection:bg-purple-500/30 font-sans">
            {/* Unique Hero Section - Instant Speed Theme */}
            <section className="relative pt-40 pb-20 overflow-hidden bg-slate-900 text-white">
                {/* Dynamic Background */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>

                <div className="container px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-1.5 text-sm font-bold text-purple-300">
                            <Zap className="h-4 w-4 fill-purple-300" />
                            <span>Approvals in 5 Minutes</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                            Need Funds? <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Consider it Done.</span>
                        </h1>

                        <p className="text-xl text-slate-300 max-w-lg leading-relaxed">
                            Experience the speed of digital lending. No paperwork, no collateral, just instant funds directly to your bank account.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-purple-500/30 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold" onClick={scrollToForm}>
                                Get Instant Cash
                            </Button>
                        </div>
                    </div>

                    {/* Visual Hero Element - Rocket/Wallet */}
                    <div className="relative hidden lg:flex justify-center items-center h-[500px]">
                        <div className="relative w-80 h-80 bg-gradient-to-br from-purple-500 to-pink-600 rounded-[3rem] rotate-12 flex items-center justify-center shadow-2xl shadow-purple-900/50">
                            <Rocket className="text-white h-40 w-40 drop-shadow-lg" />
                            {/* Floating Elements */}
                            <div className="absolute -top-6 -right-6 h-20 w-20 bg-white rounded-2xl flex items-center justify-center shadow-lg animate-bounce delay-100">
                                <IndianRupee className="h-10 w-10 text-green-600" />
                            </div>
                            <div className="absolute -bottom-6 -left-6 h-20 w-20 bg-white rounded-2xl flex items-center justify-center shadow-lg animate-bounce delay-300">
                                <Timer className="h-10 w-10 text-orange-600" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fast Track Process - Unique Grid */}
            <section className="py-20 -mt-10 relative z-20">
                <div className="container px-4">
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: "Apply Online", desc: "Fill simple form", icon: FileText, color: "text-blue-500" },
                            { title: "Instant Approval", desc: "AI-driven check", icon: Zap, color: "text-yellow-500" },
                            { title: "Cash in Bank", desc: "Within 24 hours", icon: Wallet, color: "text-green-500" }
                        ].map((item, i) => (
                            <Card key={i} className="bg-white dark:bg-slate-800 border-none shadow-xl hover:-translate-y-2 transition-transform duration-300">
                                <CardContent className="p-8 flex flex-col items-center text-center">
                                    <div className={`h-16 w-16 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center mb-4 ${item.color}`}>
                                        <item.icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{item.title}</h3>
                                    <p className="text-slate-500">{item.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content Layout with Sticky Sidebar */}
            <div className="container px-4 md:px-6 py-12 grid lg:grid-cols-[1fr_400px] gap-12">
                {/* Left Column: Content */}
                <div className="space-y-16">
                    {/* Features Grid */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="p-6 rounded-2xl bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800">
                            <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-2">Zero Collateral</h3>
                            <p className="text-slate-600 dark:text-slate-400">100% unsecured loan. No need to pledge any assets or find a guarantor.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-pink-50 dark:bg-pink-900/10 border border-pink-100 dark:border-pink-800">
                            <h3 className="text-xl font-bold text-pink-800 dark:text-pink-300 mb-2">Flexible Tenure</h3>
                            <p className="text-slate-600 dark:text-slate-400">Choose repayment period from 12 months to 60 months as per your convenience.</p>
                        </div>
                    </div>

                    {/* Calculator Section */}
                    <div className="p-1 rounded-3xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-slate-800 dark:to-slate-900 border border-purple-200 dark:border-purple-900 shadow-sm">
                        <div className="bg-white dark:bg-slate-950 rounded-[22px] p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><Percent className="h-6 w-6" /></div>
                                <h3 className="text-xl font-bold">Calculate Your EMI</h3>
                            </div>
                            <EMICalculator defaultAmount={500000} defaultRate={10.5} defaultTenure={5} />
                        </div>
                    </div>

                    <ContentSection
                        title="Why Choose a Personal Loan?"
                        description="Life is unpredictable, and so are financial needs. Whether it's a medical emergency, a dream wedding, higher education, or home renovation, our Personal Loan is designed to be your reliable financial partner. With interest rates starting as low as 10.50% p.a., you can borrow up to ₹40 Lakhs without any collateral. Our digital-first approach ensures that the entire process—from application to disbursal—is seamless, transparent, and paperless."
                        imageSrc="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80"
                        imageAlt="Happy couple with shopping bags"
                    />

                    {/* Accordions */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <CheckCircle2 className="text-purple-600" /> Eligibility Criteria
                            </h3>
                            <SimpleAccordion
                                items={[
                                    { title: "Employment Type", content: "Salaried employees of MNCs, Public/Private limited companies." },
                                    { title: "Income", content: "Minimum net monthly income of ₹25,000." },
                                    { title: "Work Experience", content: "Minimum 1 year total experience & 6 months in current organization." },
                                ]}
                            />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <FileText className="text-pink-600" /> Documents Required
                            </h3>
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
                        <Card className="glass-card bg-white/80 dark:bg-slate-900/80 border-purple-100 dark:border-purple-900 shadow-2xl overflow-hidden ring-1 ring-purple-500/10">
                            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
                                <CardTitle className="text-lg">Check Eligibility</CardTitle>
                                <p className="text-purple-100 text-sm">No credit score impact</p>
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
                                        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold h-12 text-base shadow-lg shadow-purple-500/20 mt-2">Get Instant Quote</Button>
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
