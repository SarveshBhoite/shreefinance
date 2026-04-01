"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Heart, Activity, ShieldCheck, Zap, Users, Building2, Umbrella } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEmailForm } from "@/hooks/use-email-form";
import { ContentSection } from "@/components/ui/content-section";
import { SimpleAccordion } from "@/components/ui/simple-accordion";
import { DynamicHeroWrapper } from "@/components/dynamic-hero-wrapper";

export default function HealthInsurancePage() {
    const { sendEmail, isSuccess } = useEmailForm();
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
                        </div>

                        <div className="relative hidden lg:flex justify-center items-center h-[500px]">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                                <div className="relative w-72 h-80 bg-gradient-to-br from-primary to-sky-700 rounded-[50px] rounded-br-[100px] flex items-center justify-center shadow-2xl shadow-primary/20 border-4 border-white dark:border-sky-900">
                                    <div className="text-center text-white">
                                        <ShieldCheck className="h-32 w-32 mx-auto mb-2 opacity-90 text-accent" />
                                        <p className="font-bold text-lg opacity-90">Total Cover</p>
                                        <p className="text-3xl font-extrabold">₹1 Cr</p>
                                    </div>
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

            <div className="container px-4 md:px-6 py-20 grid lg:grid-cols-[1fr_400px] gap-12 mx-auto">
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

                <aside className="relative">
                    <div id="lead-form" className="sticky top-32">
                        <Card className="glass-card bg-white/90 dark:bg-slate-900/90 border-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden rounded-[2.5rem] ring-1 ring-primary/5">
                            <CardHeader className="bg-gradient-to-r from-primary to-sky-700 text-white p-8 pb-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                                        <Activity className="h-6 w-6 text-white" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-accent text-slate-900 px-3 py-1 rounded-full shadow-lg">Cashless Care</span>
                                </div>
                                <CardTitle className="text-2xl font-black tracking-tight leading-none mb-2">Get Quote</CardTitle>
                                <p className="text-sky-100/70 text-xs font-bold uppercase tracking-widest">Protect your family today</p>
                            </CardHeader>
                            <CardContent className="p-8 -mt-6 bg-white dark:bg-slate-950 rounded-t-[2.5rem] relative z-10 shadow-2xl">
                                {isSuccess ? (
                                    <div className="text-center py-10">
                                        <div className="h-20 w-20 bg-primary rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/30">
                                            <CheckCircle2 className="h-10 w-10 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Request Received</h3>
                                        <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-widest leading-loose">A health expert will contact you shortly.</p>
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
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Members</label>
                                                <Input
                                                    placeholder="2A + 1C"
                                                    className="h-14 bg-slate-50 dark:bg-sky-950/20 border-slate-100 dark:border-primary/10 rounded-2xl font-bold px-6 focus:ring-primary shadow-sm"
                                                    value={formData.members}
                                                    onChange={e => setFormData({ ...formData, members: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <Button className="w-full bg-primary hover:bg-sky-600 text-white font-black h-16 text-lg rounded-2xl shadow-2xl shadow-primary/20 mt-4 transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-widest border border-white/10">View Plans</Button>
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
