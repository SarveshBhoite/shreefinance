"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Heart, Activity, Stethoscope, ShieldCheck, Zap, FileText, Users, Building2, Umbrella } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEmailForm } from "@/hooks/use-email-form";
import { cn } from "@/lib/utils";
import { ContentSection } from "@/components/ui/content-section";
import { SimpleAccordion } from "@/components/ui/simple-accordion";
import { DynamicHeroWrapper } from "@/components/dynamic-hero-wrapper";

export default function HealthInsurancePage() {
    const { sendEmail, isSubmitting, isSuccess, error, resetForm } = useEmailForm();
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        members: "",
        city: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendEmail({
            type: "Health Insurance Inquiry",
            ...formData
        });
    };

    const scrollToForm = () => {
        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="pb-20 bg-slate-50 dark:bg-black selection:bg-primary/30 font-sans mx-auto">
            <DynamicHeroWrapper page="health-insurance">
                {/* Unique Hero Section - Family Pulse Ocean Theme */}
                <section className="relative pt-40 pb-20 overflow-hidden bg-gradient-to-b from-sky-950 to-sky-900 border-b border-primary/20 text-white">
                    {/* Heartbeat Background Line - Ocean Style */}
                    <div className="absolute top-1/2 left-0 right-0 h-[200px] -translate-y-1/2 pointer-events-none opacity-10">
                        <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="w-full h-full stroke-primary/30 fill-none stroke-2">
                            <path d="M0,100 L200,100 L220,150 L250,50 L280,150 L300,100 L1000,100" vectorEffect="non-scaling-stroke" />
                        </svg>
                    </div>

                    <div className="container px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 mx-auto">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-bold text-sky-200 backdrop-blur-sm">
                                <Activity className="h-4 w-4 animate-[pulse_2s_ease-in-out_infinite] text-accent" />
                                <span>Comprehensive Family Protection</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                                Health is Wealth. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-sky-400 to-accent">Protect it.</span>
                            </h1>

                            <p className="text-xl text-sky-100/80 max-w-lg leading-relaxed">
                                Uncompromised healthcare for your loved ones. Cashless treatment at top hospitals, zero paperwork claims, and lifetime renewability.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/20 bg-primary hover:bg-sky-600 text-white font-bold border border-white/10 transition-all hover:scale-105" onClick={scrollToForm}>
                                    Secure Your Family
                                </Button>
                            </div>

                            <div className="flex items-center gap-8 text-sm font-semibold text-sky-200/80">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="text-emerald-400 h-5 w-5" />
                                    <span>No Medical Today*</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="text-emerald-400 h-5 w-5" />
                                    <span>Tax Saver (80D)</span>
                                </div>
                            </div>
                        </div>

                        {/* Visual Hero Element - Family Shield */}
                        <div className="relative hidden lg:flex justify-center items-center h-[500px]">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                                {/* Shield Container - Ocean Blue & Gold */}
                                <div className="relative w-72 h-80 bg-gradient-to-br from-primary to-sky-700 rounded-[50px] rounded-br-[100px] flex items-center justify-center shadow-2xl shadow-primary/20 border-4 border-white dark:border-sky-900">
                                    <div className="text-center text-white">
                                        <ShieldCheck className="h-32 w-32 mx-auto mb-2 opacity-90 text-accent" />
                                        <p className="font-bold text-lg opacity-90">Total Cover</p>
                                        <p className="text-3xl font-extrabold">₹1 Cr</p>
                                    </div>
                                    {/* Floating Badges */}
                                    <div className="absolute -left-12 top-10 bg-white/90 dark:bg-sky-950/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-primary/20 flex items-center gap-3">
                                        <div className="bg-rose-100 p-2 rounded-full"><Heart className="h-5 w-5 text-rose-500 fill-rose-500" /></div>
                                        <div className="text-left">
                                            <p className="text-xs text-slate-500 font-bold uppercase">Family</p>
                                            <p className="text-sm font-bold text-slate-800 dark:text-white">Protected</p>
                                        </div>
                                    </div>
                                    <div className="absolute -right-8 bottom-20 bg-white/90 dark:bg-sky-950/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-primary/20 flex items-center gap-3">
                                        <div className="bg-sky-100 p-2 rounded-full"><Building2 className="h-5 w-5 text-primary" /></div>
                                        <div className="text-left">
                                            <p className="text-xs text-slate-500 font-bold uppercase">Hospitals</p>
                                            <p className="text-sm font-bold text-slate-800 dark:text-white">10,000+</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </DynamicHeroWrapper>

            {/* Protection Stats Strip */}
            <div className="bg-sky-950 text-white py-12 border-y border-sky-900">
                <div className="container px-4 mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-sky-900">
                        <div className="p-4">
                            <p className="text-4xl font-bold mb-1 text-primary">98%</p>
                            <p className="text-sky-300/60 text-sm uppercase tracking-wider font-bold">Claim Settlement</p>
                        </div>
                        <div className="p-4">
                            <p className="text-4xl font-bold mb-1 text-accent">20min</p>
                            <p className="text-sky-300/60 text-sm uppercase tracking-wider font-bold">Cashless Approval</p>
                        </div>
                        <div className="p-4">
                            <p className="text-4xl font-bold mb-1 text-primary">2X</p>
                            <p className="text-sky-300/60 text-sm uppercase tracking-wider font-bold">Auto Restoration</p>
                        </div>
                        <div className="p-4">
                            <p className="text-4xl font-bold mb-1 text-accent">Tax</p>
                            <p className="text-sky-300/60 text-sm uppercase tracking-wider font-bold">Benefits 80D</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Layout with Sticky Sidebar */}
            <div className="container px-4 md:px-6 py-20 grid lg:grid-cols-[1fr_400px] gap-12 mx-auto">
                {/* Left Column: Content */}
                <div className="space-y-16">
                    <ContentSection
                        title="More Than Just Insurance"
                        description="Our Health Insurance plans go beyond just paying hospital bills. We prioritize your holistic well-being with preventive health check-ups, tele-consultations, and wellness rewards. In times of need, our dedicated claim support team stands by you like family, ensuring that money is the last thing you worry about during a medical emergency. Choose a plan that grows with your family's needs."
                        imageSrc="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                        imageAlt="Doctor consulting patient"
                    >
                        <div className="grid gap-4 mt-6">
                            {[
                                { icon: Umbrella, title: "No Claim Bonus", desc: "Increase your cover by 50% for every claim-free year." },
                                { icon: Users, title: "Maternity Cover", desc: "Joyful parenthood with expenses covered from day 1 (in select plans)." }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900 group transition-all hover:bg-sky-100">
                                    <div className="p-2 bg-white dark:bg-sky-900 text-primary shadow-sm rounded-lg group-hover:scale-110 transition-transform"><item.icon className="h-6 w-6" /></div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{item.title}</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ContentSection>

                    {/* Accordions */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <CheckCircle2 className="text-primary" /> Plan Features
                            </h3>
                            <SimpleAccordion
                                items={[
                                    { title: "In-patient Hospitalization", content: "Room rent, doctor fees, nursing, and medicines covered with no sub-limits on most plans." },
                                    { title: "Pre & Post Hospitalization", content: "Coverage for medical expenses incurred 60 days before and 180 days after hospital admission." },
                                    { title: "Daycare Procedures", content: "Coverage for 500+ advanced procedures that require less than 24 hours of hospitalization (e.g., Cataract, Chemotherapy)." },
                                    { title: "Bonus Covers", content: "Cumulative No Claim Bonus (NCB) up to 100% of Sum Insured and Annual Health Check-ups." },
                                ]}
                            />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <ShieldCheck className="text-accent" /> Why Choose Us
                            </h3>
                            <SimpleAccordion
                                items={[
                                    { title: "Lifetime Renewability", content: "We offer lifetime renewability for all our health insurance plans, ensuring you stay covered in your golden years." },
                                    { title: "Quick Claim Settlement", content: "Our in-house claim settlement team ensures that 95% of cashless claims are approved within 2 hours." },
                                    { title: "Restoration Benefit", content: "If you exhaust your sum insured during a policy year, we automatically restore it by 100% for unrelated illnesses." },
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
                                <CardTitle className="text-lg">Get Health Quote</CardTitle>
                                <p className="text-sky-100 text-sm">Protect your family today</p>
                            </CardHeader>
                            <CardContent className="p-6">
                                {isSuccess ? (
                                    <div className="text-center py-8">
                                        <div className="h-12 w-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
                                            <CheckCircle2 className="h-6 w-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Request Received</h3>
                                        <p className="text-slate-600 dark:text-slate-300 mt-2">Health expert contacting shortly.</p>
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
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Members</label>
                                                <Input
                                                    placeholder="e.g. 2 Adults 1 Child"
                                                    className="bg-sky-50 dark:bg-sky-900/10 border-sky-100"
                                                    value={formData.members}
                                                    onChange={e => setFormData({ ...formData, members: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <Button className="w-full bg-primary hover:bg-sky-600 text-white font-bold h-12 text-base shadow-lg shadow-primary/20 mt-2 border border-white/10 transition-all">View Plans</Button>
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
