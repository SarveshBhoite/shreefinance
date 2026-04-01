"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EMICalculator } from "@/components/calculators/emi-calculator";
import { CheckCircle2, Car, Gauge, MapPin, ShieldCheck, Zap, FileText, Navigation, Fuel } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEmailForm } from "@/hooks/use-email-form";
import { cn } from "@/lib/utils";
import { ContentSection } from "@/components/ui/content-section";
import { SimpleAccordion } from "@/components/ui/simple-accordion";
import { DynamicHeroWrapper } from "@/components/dynamic-hero-wrapper";

export default function CarLoanPage() {
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
            type: "Car Loan Application",
            ...formData
        });
    };

    const scrollToForm = () => {
        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="pb-20 bg-slate-50 dark:bg-black selection:bg-primary/30 font-sans mx-auto">
            <DynamicHeroWrapper page="car-loan">
                {/* Unique Hero Section - Open Road Theme */}
                <section className="relative pt-12 md:pt-20 pb-20 overflow-hidden bg-gradient-to-b from-sky-950 to-sky-900 text-white border-b border-primary/20">
                    {/* Road marking background effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px]"></div>
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-[pulse_6s_ease-in-out_infinite]"></div>

                    <div className="container px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 mx-auto">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-bold text-sky-200">
                                <Car className="h-4 w-4 text-accent" />
                                <span>Drive Home Your Dream Car</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                                The Road is <br />
                                <span className="text-gradient">Calling.</span>
                            </h1>

                            <p className="text-xl text-sky-100/80 max-w-lg leading-relaxed">
                                Get up to 100% On-Road funding with interest rates starting at 8.75% p.a. Fast-track approval for new and used cars.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/20 bg-primary hover:bg-sky-600 text-white font-bold border border-white/10 transition-all hover:-translate-y-1" onClick={scrollToForm}>
                                    Check On-Road Price
                                </Button>
                            </div>

                            <div className="flex items-center gap-6 pt-4">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-white">100%</p>
                                    <p className="text-xs text-sky-300 uppercase tracking-wider">Funding</p>
                                </div>
                                <div className="w-px h-10 bg-white/10"></div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-white">7 Yrs</p>
                                    <p className="text-xs text-sky-300 uppercase tracking-wider">Tenure</p>
                                </div>
                                <div className="w-px h-10 bg-white/10"></div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-white">4 Hrs</p>
                                    <p className="text-xs text-sky-300 uppercase tracking-wider">Approval</p>
                                </div>
                            </div>
                        </div>

                        {/* Visual Hero Element - Speedometer/Car */}
                        <div className="relative hidden lg:block h-[500px]">
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* Speedometer Gauge Visual */}
                                <div className="relative w-96 h-96 rounded-full border-8 border-sky-800 bg-sky-950 shadow-2xl flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"></div>
                                    <div className="absolute inset-2 rounded-full border-4 border-white/5 border-t-primary border-r-primary border-b-transparent border-l-transparent rotate-[-45deg]"></div>
                                    <div className="text-center z-10">
                                        <Gauge className="h-20 w-20 text-accent mx-auto mb-2 animate-bounce" />
                                        <p className="text-4xl font-bold text-white">Fast</p>
                                        <p className="text-sm text-sky-300">Processing</p>
                                    </div>
                                    {/* Needle */}
                                    <div className="absolute top-1/2 left-1/2 w-32 h-1 bg-accent origin-left -translate-y-1/2 rotate-45 rounded-full shadow-[0_0_20px_rgba(255,215,0,0.6)]"></div>
                                </div>

                                {/* Floating Elements */}
                                <div className="absolute top-10 right-0 bg-sky-900/80 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl flex items-center gap-3 animate-bounce delay-700">
                                    <div className="p-2 bg-primary/20 rounded-lg"><Fuel className="h-5 w-5 text-accent" /></div>
                                    <div>
                                        <p className="text-xs text-sky-300 font-bold uppercase tracking-tighter">Fuel Your</p>
                                        <p className="text-sm font-bold text-white">Dreams</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </DynamicHeroWrapper>

            {/* Car Stats Strip */}
            <div className="bg-gradient-to-r from-primary to-sky-600 text-white py-10 relative overflow-hidden border-y border-white/10 shadow-lg">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <div className="container px-4 relative z-10 flex flex-wrap justify-between gap-8 items-center mx-auto">
                    <p className="text-lg font-bold flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-accent" /> New Cars</p>
                    <p className="text-lg font-bold flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-accent" /> Used Cars</p>
                    <p className="text-lg font-bold flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-accent" /> Loan Against Car</p>
                    <p className="text-lg font-bold flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-accent" /> Balance Transfer</p>
                </div>
            </div>

            {/* Main Content Layout with Sticky Sidebar */}
            <div className="container px-4 md:px-6 py-12 grid lg:grid-cols-[1fr_400px] gap-12 mx-auto">
                {/* Left Column: Content */}
                <div className="space-y-16">
                    {/* Calculator Section */}
                    <div className="p-1 rounded-3xl bg-gradient-to-r from-sky-100 to-white dark:from-sky-900/40 dark:to-sky-800/20 border border-sky-200 dark:border-sky-900 shadow-sm">
                        <div className="bg-white dark:bg-sky-950 rounded-[22px] p-6 shadow-inner">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary"><Car className="h-6 w-6" /></div>
                                <h3 className="text-xl font-bold">Calculate Car Loan EMI</h3>
                            </div>
                            <EMICalculator defaultAmount={800000} defaultRate={9.0} defaultTenure={5} />
                        </div>
                    </div>

                    <ContentSection
                        title="Zoom Away in Your New Car"
                        description="Drive the car you've always wanted. Our Car Loans offer up to 100% on-road funding, meaning you can drive out of the showroom without stressing about the down payment. We finance new cars, pre-owned cars, and even offer loans against your existing car. With minimal documentation and speedy processing, we ensure that nothing stands between you and the open road. Enjoy flexible repayment tenures up to 7 years and competitive interest rates."
                        imageSrc="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1283&q=80"
                        imageAlt="Luxury car on road"
                    >
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800 transition-all hover:bg-sky-100 dark:hover:bg-sky-900/40 group">
                                <h4 className="font-bold text-primary text-lg group-hover:scale-110 transition-transform">100%</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">On-Road Funding</p>
                            </div>
                            <div className="p-4 rounded-xl bg-sky-50/50 dark:bg-sky-900/10 border border-sky-100/50 dark:border-sky-800/50 transition-all hover:bg-sky-100 dark:hover:bg-sky-900/40 group">
                                <h4 className="font-bold text-accent text-lg group-hover:scale-110 transition-transform">Used Car</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Loans Available</p>
                            </div>
                        </div>
                    </ContentSection>

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
                                    { title: "Age Criteria", content: "Salaried: 21-60 years. Self-Employed: 21-65 years." },
                                    { title: "Income", content: "Minimum annual income of ₹2.5 Lakhs." },
                                    { title: "Employment", content: "Minimum 1 year of continuous employment or business stability." },
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
                                    { title: "KYC Documents", content: "Aadhaar Card, PAN Card, Driving License/Voter ID." },
                                    { title: "Income Proof", content: "Latest 3 months salary slips, Form 16, or ITR for last 2 years." },
                                    { title: "Bank Proof", content: "Latest 6 months bank statement." },
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
                                        <Car className="h-6 w-6 text-white" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-accent text-slate-900 px-3 py-1 rounded-full shadow-lg">100% Funding</span>
                                </div>
                                <CardTitle className="text-2xl font-black tracking-tight leading-none mb-2">Get Quote</CardTitle>
                                <p className="text-sky-100/70 text-xs font-bold uppercase tracking-widest tracking-tighter">Best rates for new & used cars</p>
                            </CardHeader>
                            <CardContent className="p-8 -mt-6 bg-white dark:bg-slate-950 rounded-t-[2.5rem] relative z-10 shadow-2xl">
                                {isSuccess ? (
                                    <div className="text-center py-10">
                                        <div className="h-20 w-20 bg-primary rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/30">
                                            <CheckCircle2 className="h-10 w-10 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Request Received</h3>
                                        <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-widest leading-loose">We will contact you shortly.</p>
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
                                                    placeholder="₹35,000"
                                                    className="h-14 bg-slate-50 dark:bg-sky-950/20 border-slate-100 dark:border-primary/10 rounded-2xl font-bold px-6 focus:ring-primary shadow-sm"
                                                    value={formData.income}
                                                    onChange={e => setFormData({ ...formData, income: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <Button className="w-full bg-primary hover:bg-sky-600 text-white font-black h-16 text-lg rounded-2xl shadow-2xl shadow-primary/20 mt-4 transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-widest border border-white/10">Check Eligibility</Button>
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
