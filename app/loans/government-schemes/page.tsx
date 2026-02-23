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

    const featuredSchemes = [
        {
            title: "PMAY (Housing)",
            description: "Pradhan Mantri Awas Yojana. Get interest subsidy up to ₹2.67 Lakhs on your home loan under CLSS.",
            link: "/loans/pmay",
            icon: Building2,
            color: "text-orange-600",
            bg: "bg-orange-100 dark:bg-orange-900/30",
            borderColor: "border-orange-200 dark:border-orange-800"
        },
        {
            title: "Mudra Loan",
            description: "Micro Units Development & Refinance Agency. Collateral-free loans up to ₹10 Lakhs for small businesses.",
            link: "/loans/mudra-loan",
            icon: BadgeIndianRupee,
            color: "text-blue-600",
            bg: "bg-blue-100 dark:bg-blue-900/30",
            borderColor: "border-blue-200 dark:border-blue-800"
        }
    ];

    const otherSchemes = [
        {
            title: "Stand-Up India",
            description: "Loans from ₹10 Lakh to ₹1 Crore for at least one SC/ST borrower and one woman borrower per bank branch.",
            link: "#",
            icon: Users,
            color: "text-green-600"
        },
        {
            title: "PMEGP",
            description: "Prime Minister's Employment Generation Programme. Subsidy up to 35% of project cost.",
            link: "#",
            icon: FileText,
            color: "text-indigo-600"
        },
        {
            title: "Sukanya Samriddhi",
            description: "Small deposit scheme for the girl child. High interest rate and tax benefits under 80C.",
            link: "#",
            icon: ShieldCheck,
            color: "text-pink-600"
        },
        {
            title: "Kisan Credit Card",
            description: "Timely credit to farmers for their cultivation and other needs.",
            link: "#",
            icon: Sprout,
            color: "text-emerald-600"
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black font-sans pb-20">
            <DynamicHeroWrapper page="government-schemes">
                {/* Premium Hero Section */}
                <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    {/* Decorative blobs */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[100px] mix-blend-screen animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] mix-blend-screen"></div>

                    <div className="container px-4 relative z-10 text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-bold text-white mb-6 backdrop-blur-md">
                            <Landmark className="h-4 w-4" />
                            <span>Nation Building Initiatives</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-200 via-white to-green-200">
                            Government Schemes <br />
                            <span className="text-white">Made Simple.</span>
                        </h1>

                        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                            Unlock the benefits of various financial initiatives by the Government of India. We help you identify, understand, and apply for the schemes you are eligible for.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold shadow-lg shadow-orange-500/20">
                                Check Eligibility
                            </Button>
                        </div>
                    </div>
                </section>
            </DynamicHeroWrapper>

            {/* Featured Schemes - Large Cards */}
            <div className="container px-4 -mt-16 relative z-20">
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {featuredSchemes.map((scheme, i) => (
                        <Link key={i} href={scheme.link} className="group cursor-pointer">
                            <Card className={`h-full border-2 ${scheme.borderColor} shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-slate-900`}>
                                <CardContent className="p-8">
                                    <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-6 ${scheme.bg} ${scheme.color} transition-transform group-hover:scale-110`}>
                                        <scheme.icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {scheme.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">
                                        {scheme.description}
                                    </p>
                                    <span className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white group-hover:underline underline-offset-4">
                                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                                    </span>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Other Initiatives Grid */}
            <div className="container px-4 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">Other Key Initiatives</h2>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto">Diverse programs designed to empower every sector of society.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {otherSchemes.map((scheme, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                            <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-4 bg-slate-50 dark:bg-slate-800 ${scheme.color}`}>
                                <scheme.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{scheme.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-4">{scheme.description}</p>
                            <Link href={scheme.link} className={`text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all ${scheme.color}`}>
                                Learn More <ArrowRight className="h-3 w-3" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* General Inquiry Form - Glassmorphism */}
            <div className="container px-4 pb-20">
                <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 md:p-16 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[80px]"></div>

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Guidance?</h2>
                        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                            Government schemes can be complex. If you are unsure about your eligibility or the right scheme for you, leave your details. Our experts will guide you for free.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Expert eligibility check",
                                "Documentation assistance",
                                "Application tracking"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                        <CheckCircle2 className="h-4 w-4" />
                                    </div>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Card className="relative z-10 glass-card bg-white/10 border-white/20 backdrop-blur-md">
                        <CardHeader>
                            <CardTitle className="text-white">Request Call Back</CardTitle>
                            <CardDescription className="text-slate-300">We usually respond within 24 hours.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isSuccess ? (
                                <div className="text-center py-8">
                                    <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                                    <p className="text-slate-300">We have received your query.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <Input
                                        placeholder="Your Name"
                                        className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 h-12"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                    <Input
                                        placeholder="Mobile Number"
                                        className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 h-12"
                                        value={formData.mobile}
                                        onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                        required
                                    />
                                    <Input
                                        placeholder="Interested Scheme (Optional)"
                                        className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 h-12"
                                        value={formData.schemeName}
                                        onChange={e => setFormData({ ...formData, schemeName: e.target.value })}
                                    />
                                    <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-12 text-lg shadow-lg shadow-indigo-500/30">Submit Request</Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
