"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Landmark, ArrowRight, ShieldCheck, FileText, BadgeIndianRupee, Building2, Users } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEmailForm } from "@/hooks/use-email-form";
import { DynamicHeroWrapper } from "@/components/dynamic-hero-wrapper";

export default function GovernmentSchemesPage() {
    const { sendEmail, isSubmitting, isSuccess } = useEmailForm();
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
            badge: "Subsidies & Grants"
        },
        {
            title: "Mudra Loan",
            description: "Micro Units Development & Refinance Agency. Collateral-free loans up to ₹10 Lakhs for small businesses.",
            link: "/loans/mudra-loan",
            icon: BadgeIndianRupee,
            badge: "Micro Enterprise"
        }
    ];

    const otherSchemes = [
        {
            title: "Stand-Up India",
            description: "Loans from ₹10 Lakh to ₹1 Crore for SC/ST and women entrepreneurs.",
            link: "#",
            icon: Users,
        },
        {
            title: "PMEGP",
            description: "Prime Minister's Employment Generation Programme. Subsidy up to 35% of project cost.",
            link: "#",
            icon: FileText,
        },
        {
            title: "Sukanya Samriddhi",
            description: "Small deposit scheme for the girl child. High interest rate and tax benefits under 80C.",
            link: "#",
            icon: ShieldCheck,
        },
    ];

    return (
        <div className="pb-20 bg-[#181a1d] text-white font-sans mx-auto min-h-screen">
            <DynamicHeroWrapper page="government-schemes">
                {/* Hero Section */}
                <section className="relative pt-12 md:pt-20 pb-20 overflow-hidden bg-[#181a1d] text-white border-b border-slate-800">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00c985]/10 rounded-full blur-[120px] pointer-events-none" />

                    <div className="container px-4 md:px-6 mx-auto text-center max-w-4xl space-y-6 relative z-10">
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-black text-[#00e699] uppercase tracking-widest">
                            <Landmark className="h-4 w-4 text-[#00e699]" />
                            <span>Nation Building Initiatives (Subsidies & Grants)</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight text-white">
                            Government Schemes <br />
                            <span className="text-[#00e699]">Made Simple.</span>
                        </h1>

                        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
                            Unlock the benefits of various financial initiatives by the Government of India. We help you identify, understand, and apply for the schemes you are eligible for.
                        </p>

                        <div className="flex justify-center gap-4 pt-4">
                            <Button size="lg" className="h-14 px-8 text-sm font-black rounded-full bg-[#00c985] hover:bg-[#00b074] text-slate-950 uppercase tracking-wider transition-all hover:scale-105" onClick={scrollToForm}>
                                Check Scheme Eligibility
                            </Button>
                        </div>
                    </div>
                </section>
            </DynamicHeroWrapper>

            {/* Featured Schemes */}
            <section className="py-16 container px-4 mx-auto max-w-5xl">
                <h2 className="text-3xl font-black text-white mb-8 text-center">Featured Central Government Schemes</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {featuredSchemes.map((scheme, index) => (
                        <Card key={index} className="bg-[#24272c] border border-slate-800 rounded-3xl p-6 text-white shadow-xl hover:-translate-y-1 transition-all">
                            <CardHeader className="p-0 pb-4 flex flex-row items-center justify-between">
                                <div className="p-3 bg-[#00c985]/15 border border-[#00c985]/30 rounded-2xl text-[#00c985]">
                                    <scheme.icon className="h-7 w-7" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-[#00c985]/20 text-[#00e699] border border-[#00c985]/40">
                                    {scheme.badge}
                                </span>
                            </CardHeader>
                            <CardContent className="p-0 space-y-4">
                                <CardTitle className="text-2xl font-black text-white">{scheme.title}</CardTitle>
                                <p className="text-slate-300 text-xs leading-relaxed font-medium">{scheme.description}</p>
                                <Link href={scheme.link} className="inline-flex items-center gap-2 text-xs font-black text-[#00e699] hover:underline">
                                    Learn More & Apply <ArrowRight className="h-4 w-4" />
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Other Schemes */}
            <section className="py-12 container px-4 mx-auto max-w-5xl">
                <div className="grid md:grid-cols-3 gap-6">
                    {otherSchemes.map((item, i) => (
                        <div key={i} className="p-6 bg-[#24272c] rounded-3xl border border-slate-800 text-white space-y-3">
                            <div className="p-2.5 bg-[#00c985]/15 border border-[#00c985]/30 rounded-xl text-[#00c985] w-fit">
                                <item.icon className="h-5 w-5" />
                            </div>
                            <h3 className="text-lg font-black text-white">{item.title}</h3>
                            <p className="text-slate-400 text-xs font-medium leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Form Section */}
            <section id="lead-form" className="py-16 container px-4 mx-auto max-w-xl">
                <Card className="bg-[#24272c] border border-slate-800 shadow-2xl rounded-[2.5rem] overflow-hidden text-white">
                    <CardHeader className="bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-400 text-slate-950 p-8">
                        <CardTitle className="text-2xl font-black text-slate-950">Inquire for Govt Subsidy</CardTitle>
                        <p className="text-slate-900 text-xs font-bold mt-1">Get assisted application support</p>
                    </CardHeader>
                    <CardContent className="p-8 space-y-4">
                        {isSuccess ? (
                            <div className="text-center py-8 space-y-3">
                                <div className="h-16 w-16 bg-[#00c985] text-slate-950 rounded-full flex items-center justify-center mx-auto font-black">
                                    <CheckCircle2 className="h-8 w-8" />
                                </div>
                                <h4 className="text-xl font-black text-white">Inquiry Received!</h4>
                                <p className="text-xs text-slate-400">Our government scheme advisor will contact you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase text-slate-400">Full Name</label>
                                    <Input
                                        placeholder="Enter full name"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase text-slate-400">Mobile Number</label>
                                    <Input
                                        placeholder="10-digit mobile"
                                        value={formData.mobile}
                                        onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase text-slate-400">Preferred Govt Scheme</label>
                                    <Input
                                        placeholder="e.g. PMAY / Mudra / Stand-Up India"
                                        value={formData.schemeName}
                                        onChange={e => setFormData({ ...formData, schemeName: e.target.value })}
                                        required
                                    />
                                </div>
                                <Button className="w-full bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black h-14 text-sm rounded-full uppercase tracking-wider shadow-xl mt-4">
                                    Check My Subsidy Eligibility
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
