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
        <div className="pb-20 bg-slate-50 dark:bg-black selection:bg-primary/30 font-sans mx-auto">
            <DynamicHeroWrapper page="life-insurance">
                {/* Unique Hero Section - Legacy Protection Ocean Theme */}
                <section className="relative pt-32 pb-32 overflow-hidden bg-gradient-to-b from-sky-950 to-sky-900 border-b border-primary/20 text-white">
                    {/* Dark Metallic Background - Ocean Style */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-950 via-sky-900 to-black opacity-90"></div>

                    {/* Accent Glow */}
                    <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] mix-blend-screen animate-[pulse_6s_ease-in-out_infinite]"></div>

                    <div className="container relative z-10 px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center mx-auto">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-bold text-sky-200 backdrop-blur-sm">
                                <Sun className="h-4 w-4 fill-primary/20 text-accent" />
                                <span>Build Your Legacy</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-white">
                                A Promise That <br />
                                <span className="text-gradient">Lasts Forever.</span>
                            </h1>

                            <p className="text-xl text-sky-100/70 max-w-lg leading-relaxed">
                                Ensure your family's dreams are protected, no matter what. Comprehensive life coverage starting at just ₹490/month.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/20 bg-primary hover:bg-sky-600 text-white font-bold border border-white/10 transition-all hover:scale-105" onClick={scrollToForm}>
                                    Check Premium
                                </Button>
                            </div>

                            <div className="flex items-center gap-6 pt-4 border-t border-primary/20">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-white">99.3%</p>
                                    <p className="text-xs text-sky-400 uppercase tracking-wider font-bold">Claims Paid</p>
                                </div>
                                <div className="w-px h-10 bg-primary/20"></div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-white">85 Yrs</p>
                                    <p className="text-xs text-sky-400 uppercase tracking-wider font-bold">Max Age</p>
                                </div>
                                <div className="w-px h-10 bg-primary/20"></div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-white">Tax</p>
                                    <p className="text-xs text-sky-400 uppercase tracking-wider font-bold">Benefits*</p>
                                </div>
                            </div>
                        </div>

                        {/* Visual Hero Element - Silhouette/Family Shield */}
                        <div className="relative hidden lg:block h-[500px]">
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* Abstract Family Circle - Ocean Style */}
                                <div className="relative w-96 h-96">
                                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                                    <div className="absolute inset-10 border-2 border-primary/30 rounded-full animate-[spin_20s_linear_infinite]"></div>
                                    <div className="absolute inset-20 border border-accent/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

                                    {/* Central Heart Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Heart className="h-40 w-40 text-primary drop-shadow-[0_0_20px_rgba(56,189,248,0.4)] animate-pulse" fill="currentColor" />
                                    </div>

                                    {/* Floating Shield Badges */}
                                    <motion.div
                                        className="absolute -top-4 right-10 bg-white/90 dark:bg-sky-950/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-primary/20"
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                    >
                                        <div className="p-2 bg-sky-100 rounded-lg"><ShieldCheck className="h-6 w-6 text-primary" /></div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-bold uppercase">Family</p>
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
            <div className="bg-sky-50 dark:bg-sky-950/40 text-slate-800 dark:text-blue-100 py-8 border-y border-primary/20 backdrop-blur-sm">
                <div className="container px-4 text-center mx-auto">
                    <div className="flex justify-center gap-8 md:gap-16 items-center flex-wrap">
                        <span className="flex items-center gap-2 font-bold"><Users className="h-5 w-5 text-primary" /> 24x7 Support</span>
                        <span className="flex items-center gap-2 font-bold"><FileText className="h-5 w-5 text-primary" /> 1-Day Claim</span>
                        <span className="flex items-center gap-2 font-bold"><Zap className="h-5 w-5 text-accent" /> Instant Cover</span>
                    </div>
                </div>
            </div>

            {/* Main Content Layout with Sticky Sidebar */}
            <div className="container px-4 md:px-6 py-12 grid lg:grid-cols-[1fr_400px] gap-12 mx-auto">
                {/* Left Column: Content */}
                <div className="space-y-16">
                    <ContentSection
                        title="Ensure Their Dreams Never Stop"
                        description="Life is unpredictable, but your family's future shouldn't be. Our comprehensive life insurance solutions—ranging from pure Term Plans to Savings and Unit Linked Insurance Plans (ULIPs)—ensure your loved ones maintain their lifestyle even when you are not around. A Term Plan offers high life cover at a nominal cost, acting as a financial shield against liabilities like home loans. Savings plans help you build a corpus for life goals like child education or retirement, while offering life cover. With our high claim settlement ratio and hassle-free process, we deliver on our promise when it matters the most."
                        imageSrc="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80"
                        imageAlt="Happy family outdoors"
                    >
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800">
                                <h4 className="font-bold text-primary dark:text-sky-300 text-lg">1 Crore</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Cover @ ₹490/mo*</p>
                            </div>
                            <div className="p-4 rounded-xl bg-accent/10 dark:bg-accent/20 border border-accent/20">
                                <h4 className="font-bold text-accent text-lg">Claim %</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">99.3% Settlement Ratio</p>
                            </div>
                        </div>
                    </ContentSection>

                    {/* Accordions */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <Shield className="text-primary" /> Types of Life Insurance
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
                                <ShieldCheck className="text-accent" /> Additional Riders
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
                        <Card className="glass-card bg-white/80 dark:bg-sky-950/80 border-sky-100 dark:border-sky-900 shadow-2xl overflow-hidden ring-1 ring-primary/10">
                            <CardHeader className="bg-gradient-to-r from-primary to-sky-600 text-white p-6">
                                <CardTitle className="text-lg">Get Premium Quote</CardTitle>
                                <p className="text-sky-100 text-sm">Find the right cover</p>
                            </CardHeader>
                            <CardContent className="p-6">
                                {isSuccess ? (
                                    <div className="text-center py-8">
                                        <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 tracking-tighter">
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
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Your Age</label>
                                                <Input
                                                    placeholder="Years"
                                                    className="bg-sky-50 dark:bg-sky-900/10 border-sky-100"
                                                    value={formData.age}
                                                    onChange={e => setFormData({ ...formData, age: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Cover Amount</label>
                                                <Input
                                                    placeholder="e.g. 1 Cr"
                                                    className="bg-sky-50 dark:bg-sky-900/10 border-sky-100"
                                                    value={formData.coverage}
                                                    onChange={e => setFormData({ ...formData, coverage: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <Button className="w-full bg-primary hover:bg-sky-600 text-white font-bold h-12 text-base shadow-lg shadow-primary/20 mt-2 border border-white/10 transition-all">Check Premium</Button>
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
