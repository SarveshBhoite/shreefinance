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
import { DynamicHeroWrapper } from "@/components/dynamic-hero-wrapper";

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
        <div className="pb-20 bg-slate-50 dark:bg-black selection:bg-primary/30 font-sans mx-auto">
            <DynamicHeroWrapper page="personal-loan">
                {/* Unique Hero Section - Ocean Speed Theme */}
                <section className="relative pt-40 pb-20 overflow-hidden bg-gradient-to-b from-sky-950 to-sky-900 text-white border-b border-primary/20">
                    {/* Dynamic Background - Ocean Effect */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-[pulse_8s_ease-in-out_infinite]"></div>

                    <div className="container px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 mx-auto">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-bold text-sky-200">
                                <Zap className="h-4 w-4 text-accent" />
                                <span>Approvals in 5 Minutes</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                                Need Funds? <br />
                                <span className="text-gradient">Consider it Done.</span>
                            </h1>

                            <p className="text-xl text-sky-100/80 max-w-lg leading-relaxed">
                                Experience the speed of digital lending. No paperwork, no collateral, just instant funds directly to your bank account.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/20 bg-primary hover:bg-sky-600 text-white font-bold border border-white/10 transition-all hover:-translate-y-1" onClick={scrollToForm}>
                                    Get Instant Cash
                                </Button>
                            </div>
                        </div>

                        {/* Visual Hero Element - Rocket/Wallet */}
                        <div className="relative hidden lg:flex justify-center items-center h-[500px]">
                            <div className="relative w-80 h-80 bg-gradient-to-br from-primary via-sky-800 to-sky-900 rounded-[3rem] rotate-12 flex items-center justify-center shadow-2xl shadow-sky-950/50 border border-white/10 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent"></div>
                                <Rocket className="text-white h-40 w-40 drop-shadow-lg scale-110" />
                                {/* Floating Elements */}
                                <div className="absolute -top-6 -right-6 h-20 w-20 bg-white dark:bg-sky-900 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce delay-100 border border-sky-100 dark:border-sky-800">
                                    <IndianRupee className="h-10 w-10 text-primary" />
                                </div>
                                <div className="absolute -bottom-6 -left-6 h-20 w-20 bg-white dark:bg-sky-900 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce delay-300 border border-sky-100 dark:border-sky-800">
                                    <Timer className="h-10 w-10 text-accent" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </DynamicHeroWrapper>

            {/* Fast Track Process - Unique Grid */}
            <section className="py-20 -mt-10 relative z-20">
                <div className="container px-4 mx-auto">
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        {[
                            { title: "Apply Online", desc: "Fill simple form", icon: FileText, color: "text-primary" },
                            { title: "Instant Approval", desc: "AI-driven check", icon: Zap, color: "text-accent" },
                            { title: "Cash in Bank", desc: "Within 24 hours", icon: Wallet, color: "text-primary" }
                        ].map((item, i) => (
                            <Card key={i} className="bg-white/80 dark:bg-sky-950/80 border-sky-100 dark:border-sky-900 shadow-xl hover:-translate-y-2 transition-all duration-300 backdrop-blur-md ring-1 ring-primary/5">
                                <CardContent className="p-8 flex flex-col items-center">
                                    <div className={cn("h-16 w-16 rounded-full bg-primary/5 dark:bg-primary/20 flex items-center justify-center mb-4", item.color)}>
                                        <item.icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{item.title}</h3>
                                    <p className="text-slate-500 dark:text-slate-400">{item.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content Layout with Sticky Sidebar */}
            <div className="container px-4 md:px-6 py-12 grid lg:grid-cols-[1fr_400px] gap-12 mx-auto">
                {/* Left Column: Content */}
                <div className="space-y-16">
                    {/* Features Grid */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="p-6 rounded-2xl bg-sky-50 dark:bg-sky-900/10 border border-sky-100 dark:border-sky-800">
                            <h3 className="text-xl font-bold text-primary mb-2">Zero Collateral</h3>
                            <p className="text-slate-600 dark:text-slate-400">100% unsecured loan. No need to pledge any assets or find a guarantor.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-sky-50/50 dark:bg-sky-900/5 border border-sky-100/50 dark:border-sky-800/50">
                            <h3 className="text-xl font-bold text-accent mb-2">Flexible Tenure</h3>
                            <p className="text-slate-600 dark:text-slate-400">Choose repayment period from 12 months to 60 months as per your convenience.</p>
                        </div>
                    </div>

                    {/* Calculator Section */}
                    <div className="p-1 rounded-3xl bg-gradient-to-r from-sky-200 to-sky-100 dark:from-sky-900/40 dark:to-sky-800/20 border border-sky-200 dark:border-sky-900 shadow-sm">
                        <div className="bg-white dark:bg-sky-950 rounded-[22px] p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary"><Percent className="h-6 w-6" /></div>
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
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-full bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center text-primary">
                                    <CheckCircle2 className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold">Eligibility Criteria</h3>
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
                                <div className="h-10 w-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold">Documents Required</h3>
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
                        <Card className="glass-card bg-white/80 dark:bg-sky-950/80 border-sky-100 dark:border-sky-900 shadow-2xl overflow-hidden ring-1 ring-primary/10">
                            <CardHeader className="bg-gradient-to-r from-primary to-sky-600 text-white p-6">
                                <CardTitle className="text-lg">Check Eligibility</CardTitle>
                                <p className="text-sky-100 text-sm">No credit score impact</p>
                            </CardHeader>
                            <CardContent className="p-6">
                                {isSuccess ? (
                                    <div className="text-center py-8">
                                        <div className="h-12 w-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
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
                                                className="bg-sky-50 dark:bg-sky-900/10 border-sky-100"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Mobile</label>
                                            <Input
                                                placeholder="10 digit number"
                                                className="bg-sky-50 dark:bg-sky-900/10 border-sky-100"
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
                                                    className="bg-sky-50 dark:bg-sky-900/10 border-sky-100"
                                                    value={formData.city}
                                                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Income</label>
                                                <Input
                                                    placeholder="Monthly"
                                                    className="bg-sky-50 dark:bg-sky-900/10 border-sky-100"
                                                    value={formData.income}
                                                    onChange={e => setFormData({ ...formData, income: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <Button className="w-full bg-primary hover:bg-sky-600 text-white font-bold h-12 text-base shadow-lg shadow-primary/20 mt-2 border border-white/10 transition-all">Get Instant Quote</Button>
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
