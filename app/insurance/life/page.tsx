"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Heart, Umbrella, Shield, ShieldCheck, Zap, FileText, Sun, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEmailForm } from "@/hooks/use-email-form";
import { cn } from "@/lib/utils";
import { ContentSection } from "@/components/ui/content-section";
import { SimpleAccordion } from "@/components/ui/simple-accordion";
import { motion } from "framer-motion";
import { DynamicHeroWrapper } from "@/components/dynamic-hero-wrapper";

export default function LifeInsurancePage() {
    const { sendEmail, isSubmitting, isSuccess, error, resetForm } = useEmailForm();
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        age: "",
        coverage: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendEmail({
            type: "Life Insurance Inquiry",
            ...formData
        });
    };

    const scrollToForm = () => {
        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="pb-20 bg-slate-50 dark:bg-black selection:bg-amber-500/30 font-sans">
            <DynamicHeroWrapper page="life-insurance">
                {/* Unique Hero Section - Legacy Protection Theme */}
                <section className="relative pt-32 pb-32 overflow-hidden bg-white dark:bg-slate-950">
                    {/* Warm Sunset Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"></div>

                    {/* Sun Glow */}
                    <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-amber-400/20 rounded-full blur-[100px] mix-blend-screen animate-pulse"></div>

                    <div className="container relative z-10 px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-amber-600/30 bg-amber-600/10 px-4 py-1.5 text-sm font-bold text-amber-700 dark:text-amber-400">
                                <Sun className="h-4 w-4 fill-amber-600/20" />
                                <span>Build Your Legacy</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
                                A Promise That <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Lasts Forever.</span>
                            </h1>

                            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">
                                Ensure your family's dreams are protected, no matter what. Comprehensive life coverage starting at just ₹490/month.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-amber-900/20 bg-amber-600 hover:bg-amber-700 text-white font-bold" onClick={scrollToForm}>
                                    Check Premium
                                </Button>
                            </div>

                            <div className="flex items-center gap-6 pt-4 border-t border-amber-200 dark:border-slate-700">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-slate-900 dark:text-white">99.3%</p>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider">Claims Paid</p>
                                </div>
                                <div className="w-px h-10 bg-amber-200 dark:bg-slate-700"></div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-slate-900 dark:text-white">85 Yrs</p>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider">Max Age</p>
                                </div>
                                <div className="w-px h-10 bg-amber-200 dark:bg-slate-700"></div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-slate-900 dark:text-white">Tax</p>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider">Benefits*</p>
                                </div>
                            </div>
                        </div>

                        {/* Visual Hero Element - Silhouette/Family */}
                        <div className="relative hidden lg:block h-[500px]">
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* Abstract Family Circle */}
                                <div className="relative w-96 h-96">
                                    <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
                                    <div className="absolute inset-10 border border-amber-500/30 rounded-full animate-[spin_20s_linear_infinite]"></div>

                                    {/* Central Heart Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Heart className="h-40 w-40 text-rose-500 drop-shadow-[0_0_20px_rgba(244,63,94,0.4)] animate-pulse" fill="currentColor" />
                                    </div>

                                    {/* Floating Shield */}
                                    <motion.div
                                        className="absolute -top-4 right-10 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-100 dark:border-slate-700"
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                    >
                                        <div className="p-2 bg-green-100 rounded-lg"><ShieldCheck className="h-6 w-6 text-green-600" /></div>
                                        <div>
                                            <p className="text-xs text-slate-400 font-bold uppercase">Family</p>
                                            <p className="text-lg font-bold text-slate-900 dark:text-white">Protected</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </DynamicHeroWrapper>

            {/* Protection Strip */}
            <div className="bg-amber-100 dark:bg-slate-900 text-amber-900 dark:text-amber-100 py-6 border-y border-amber-200 dark:border-slate-800">
                <div className="container px-4 text-center">
                    <div className="flex justify-center gap-8 md:gap-16 items-center flex-wrap">
                        <span className="flex items-center gap-2 font-bold"><Users className="h-5 w-5" /> 24x7 Support</span>
                        <span className="flex items-center gap-2 font-bold"><FileText className="h-5 w-5" /> 1-Day Claim</span>
                        <span className="flex items-center gap-2 font-bold"><Zap className="h-5 w-5" /> Instant Cover</span>
                    </div>
                </div>
            </div>

            {/* Main Content Layout with Sticky Sidebar */}
            <div className="container px-4 md:px-6 py-12 grid lg:grid-cols-[1fr_400px] gap-12">
                {/* Left Column: Content */}
                <div className="space-y-16">
                    <ContentSection
                        title="Ensure Their Dreams Never Stop"
                        description="Life is unpredictable, but your family's future shouldn't be. Our comprehensive life insurance solutions—ranging from pure Term Plans to Savings and Unit Linked Insurance Plans (ULIPs)—ensure your loved ones maintain their lifestyle even when you are not around. A Term Plan offers high life cover at a nominal cost, acting as a financial shield against liabilities like home loans. Savings plans help you build a corpus for life goals like child education or retirement, while offering life cover. With our high claim settlement ratio and hassle-free process, we deliver on our promise when it matters the most."
                        imageSrc="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80"
                        imageAlt="Happy family outdoors"
                    >
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800">
                                <h4 className="font-bold text-amber-700 dark:text-amber-300 text-lg">1 Crore</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Cover @ ₹490/mo*</p>
                            </div>
                            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800">
                                <h4 className="font-bold text-rose-700 dark:text-rose-300 text-lg">Claim %</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">99.3% Settlement Ratio</p>
                            </div>
                        </div>
                    </ContentSection>

                    {/* Accordions */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <Shield className="text-amber-600" /> Types of Life Insurance
                            </h3>
                            <SimpleAccordion
                                items={[
                                    { title: "Term Insurance", content: "Pure risk cover. High sum assured at very low premiums. No maturity benefit, but highest financial security." },
                                    { title: "ULIP (Unit Linked)", content: "Dual benefit of investment and insurance. Part of premium is invested in market funds for wealth creation." },
                                    { title: "Endowment/Savings", content: "Guaranteed returns + Life Cover. Safe investment avenue for long-term goals like education or marriage." },
                                    { title: "Retirement Plans", content: "Build a retirement corpus to receive regular monthly pension after you stop working." },
                                ]}
                            />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <ShieldCheck className="text-orange-600" /> Additional Riders
                            </h3>
                            <SimpleAccordion
                                items={[
                                    { title: "Accidental Death Benefit", content: "Additional sum assured is paid to nominee in case of death due to accident." },
                                    { title: "Critical Illness Rider", content: "Lump sum payout on diagnosis of specified critical illnesses like Cancer, Heart Attack, etc." },
                                    { title: "Waiver of Premium", content: "Future premiums are waived off if policyholder suffers permanent disability." },
                                ]}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column: Sticky Form */}
                <aside className="relative">
                    <div id="lead-form" className="sticky top-24">
                        <Card className="glass-card bg-white/80 dark:bg-slate-900/80 border-amber-100 dark:border-amber-900 shadow-2xl overflow-hidden ring-1 ring-amber-500/10">
                            <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6">
                                <CardTitle className="text-lg">Get Premium Quote</CardTitle>
                                <p className="text-amber-100 text-sm">Find the right cover</p>
                            </CardHeader>
                            <CardContent className="p-6">
                                {isSuccess ? (
                                    <div className="text-center py-8">
                                        <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle2 className="h-6 w-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Request Received</h3>
                                        <p className="text-slate-600 dark:text-slate-300 mt-2">Advisor contacting shortly.</p>
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
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Your Age</label>
                                                <Input
                                                    placeholder="Years"
                                                    className="bg-slate-50 border-slate-200"
                                                    value={formData.age}
                                                    onChange={e => setFormData({ ...formData, age: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Cover Amount</label>
                                                <Input
                                                    placeholder="e.g. 1 Cr"
                                                    className="bg-slate-50 border-slate-200"
                                                    value={formData.coverage}
                                                    onChange={e => setFormData({ ...formData, coverage: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold h-12 text-base shadow-lg shadow-amber-500/20 mt-2">Check Premium</Button>
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
