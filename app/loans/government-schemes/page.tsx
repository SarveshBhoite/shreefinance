"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, Landmark, ArrowRight, ShieldCheck, FileText, BadgeIndianRupee, Building2, Users, Sprout } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEmailForm } from "@/hooks/use-email-form";
import { ContentSection } from "@/components/ui/content-section";
import { DynamicHeroWrapper } from "@/components/dynamic-hero-wrapper";
import { cn } from "@/lib/utils";

export default function GovernmentSchemesPage() {
    const { sendEmail, isSubmitting, isSuccess, error, resetForm } = useEmailForm();
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        schemeName: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendEmail({
            type: "General Govt Scheme Inquiry",
            ...formData
        });
    };

    const scrollToForm = () => {
        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    const featuredSchemes = [
        {
            title: "PMAY (Housing)",
            description: "Pradhan Mantri Awas Yojana. Get interest subsidy up to ₹2.67 Lakhs on your home loan under CLSS.",
            link: "/loans/pmay",
            icon: Building2,
            color: "text-primary",
            bg: "bg-sky-100 dark:bg-sky-900/30",
            borderColor: "border-sky-200 dark:border-sky-800"
        },
        {
            title: "Mudra Loan",
            description: "Micro Units Development & Refinance Agency. Collateral-free loans up to ₹10 Lakhs for small businesses.",
            link: "/loans/mudra-loan",
            icon: BadgeIndianRupee,
            color: "text-accent",
            bg: "bg-sky-100 dark:bg-sky-900/30",
            borderColor: "border-sky-200 dark:border-sky-800"
        }
    ];

    const otherSchemes = [
        {
            title: "Stand-Up India",
            description: "Loans from ₹10 Lakh to ₹1 Crore for at least one SC/ST borrower and one woman borrower per bank branch.",
            link: "#",
            icon: Users,
            color: "text-primary"
        },
        {
            title: "PMEGP",
            description: "Prime Minister's Employment Generation Programme. Subsidy up to 35% of project cost.",
            link: "#",
            icon: FileText,
            color: "text-primary"
        },
        {
            title: "Sukanya Samriddhi",
            description: "Small deposit scheme for the girl child. High interest rate and tax benefits under 80C.",
            link: "#",
            icon: ShieldCheck,
            color: "text-accent"
        },
        {
            title: "Kisan Credit Card",
            description: "Timely credit to farmers for their cultivation and other needs.",
            link: "#",
            icon: Sprout,
            color: "text-primary"
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black font-sans pb-20 selection:bg-primary/30 mx-auto">
            <DynamicHeroWrapper page="government-schemes">
                {/* Premium Hero Section - Ocean Theme */}
                <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-b from-sky-950 to-sky-900 border-b border-primary/20 text-white">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                    {/* Decorative blobs */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] mix-blend-screen animate-[pulse_6s_ease-in-out_infinite]"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] mix-blend-screen opacity-50"></div>

                    <div className="container px-4 relative z-10 text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-bold text-sky-100 mb-6 backdrop-blur-md">
                            <Landmark className="h-4 w-4 text-accent" />
                            <span>Nation Building Initiatives</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary via-sky-300 to-accent">
                            Government Schemes <br />
                            <span className="text-white">Made Simple.</span>
                        </h1>

                        <p className="text-xl text-sky-100/80 max-w-2xl mx-auto mb-8 leading-relaxed">
                            Unlock the benefits of various financial initiatives by the Government of India. We help you identify, understand, and apply for the schemes you are eligible for.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-primary hover:bg-sky-600 text-white font-bold shadow-lg shadow-primary/20 border border-white/10 transition-all hover:scale-105" onClick={scrollToForm}>
                                Check Eligibility
                            </Button>
                        </div>
                    </div>
                </section>
            </DynamicHeroWrapper>

            {/* Featured Schemes - Large Cards */}
            <div className="container px-4 -mt-16 relative z-20 mx-auto">
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {featuredSchemes.map((scheme, i) => (
                        <Link key={i} href={scheme.link} className="group cursor-pointer">
                            <Card className={`h-full border-2 border-primary/10 shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-sky-950/40 backdrop-blur-sm ring-1 ring-primary/5`}>
                                <CardContent className="p-8">
                                    <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-6 bg-primary/5 text-primary border border-primary/10 transition-transform group-hover:scale-110`}>
                                        <scheme.icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                        {scheme.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">
                                        {scheme.description}
                                    </p>
                                    <span className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-primary group-hover:underline underline-offset-4">
                                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                                    </span>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Other Initiatives Grid */}
            <div className="container px-4 py-24 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">Other Key Initiatives</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">Diverse programs designed to empower every sector of society.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {otherSchemes.map((scheme, i) => (
                        <div key={i} className="bg-white/80 dark:bg-sky-950/80 p-6 rounded-3xl border border-sky-100 dark:border-sky-900 shadow-sm hover:shadow-md transition-all duration-300 ring-1 ring-primary/5">
                            <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-4 bg-primary/5 dark:bg-primary/20 text-primary`}>
                                <scheme.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{scheme.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">{scheme.description}</p>
                            <Link href={scheme.link} className={cn("text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all", scheme.color)}>
                                Learn More <ArrowRight className="h-3 w-3" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* General Inquiry Form - Glassmorphism */}
            <div id="lead-form" className="container px-4 pb-20 mx-auto">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-950 via-sky-900 to-sky-950 text-white p-8 md:p-16 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center border border-primary/20 shadow-2xl">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[80px]"></div>

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Guidance?</h2>
                        <p className="text-sky-100/80 text-lg mb-8 leading-relaxed">
                            Government schemes can be complex. If you are unsure about your eligibility or the right scheme for you, leave your details. Our experts will guide you for free.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Expert eligibility check",
                                "Documentation assistance",
                                "Application tracking"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-sky-200 border border-primary/30">
                                        <CheckCircle2 className="h-4 w-4" />
                                    </div>
                                    <span className="text-sky-50">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Card className="relative z-10 glass-card bg-white/10 border-white/20 backdrop-blur-md shadow-2xl overflow-hidden ring-1 ring-white/10">
                        <CardHeader>
                            <CardTitle className="text-white">Request Call Back</CardTitle>
                            <CardDescription className="text-sky-200/60">We usually respond within 24 hours.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isSuccess ? (
                                <div className="text-center py-8">
                                    <div className="h-16 w-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
                                        <CheckCircle2 className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                                    <p className="text-sky-100/80">We have received your query.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-sky-200/70">Name</label>
                                        <Input
                                            placeholder="Your Name"
                                            className="bg-white/10 border-white/20 text-white placeholder:text-sky-200/40 h-12 rounded-xl focus:bg-white/20 transition-all border-none ring-1 ring-white/10"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-sky-200/70">Mobile</label>
                                        <Input
                                            placeholder="Mobile Number"
                                            className="bg-white/10 border-white/20 text-white placeholder:text-sky-200/40 h-12 rounded-xl focus:bg-white/20 transition-all border-none ring-1 ring-white/10"
                                            value={formData.mobile}
                                            onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-sky-200/70">Scheme Interest</label>
                                        <Input
                                            placeholder="Interested Scheme (Optional)"
                                            className="bg-white/10 border-white/20 text-white placeholder:text-sky-200/40 h-12 rounded-xl focus:bg-white/20 transition-all border-none ring-1 ring-white/10"
                                            value={formData.schemeName}
                                            onChange={e => setFormData({ ...formData, schemeName: e.target.value })}
                                        />
                                    </div>
                                    <Button className="w-full bg-primary hover:bg-sky-600 text-white font-bold h-12 text-lg shadow-lg shadow-primary/20 border border-white/10 mt-2 transition-all">Submit Request</Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
