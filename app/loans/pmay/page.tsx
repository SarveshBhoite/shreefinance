"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Home, IndianRupee, Percent, ShieldCheck, Zap, FileText, Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEmailForm } from "@/hooks/use-email-form";
import { cn } from "@/lib/utils";
import { ContentSection } from "@/components/ui/content-section";
import { SimpleAccordion } from "@/components/ui/simple-accordion";
import { DynamicHeroWrapper } from "@/components/dynamic-hero-wrapper";

export default function PMAYPage() {
    const { sendEmail, isSubmitting, isSuccess, error, resetForm } = useEmailForm();
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        income: "",
        category: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendEmail({
            type: "PMAY Inquiry",
            ...formData
        });
    };

    return (
        <div className="pb-20 bg-slate-50 dark:bg-black selection:bg-primary/30 font-sans mx-auto">
            <DynamicHeroWrapper page="pmay">
                {/* PMAY Hero - Official & Trustworthy Ocean Theme */}
                <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-sky-950 to-sky-900 border-b border-primary/20 text-white">
                    {/* Abstract Globs - Ocean Style */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] mix-blend-multiply animate-[pulse_6s_ease-in-out_infinite]"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] mix-blend-multiply opacity-50"></div>

                    <div className="container relative z-10 px-4 md:px-6 mx-auto">
                        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-bold text-sky-200 backdrop-blur-sm">
                                <Building2 className="h-4 w-4 text-accent" />
                                <span>Housing for All Initiative</span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
                                Pradhan Mantri <br />
                                <span className="text-gradient">Awas Yojana (PMAY)</span>
                            </h1>

                            <p className="text-xl text-sky-100/80 max-w-2xl leading-relaxed">
                                Own your dream home with government subsidy up to ₹2.67 Lakhs. Affordable housing solutions for EWS, LIG, and MIG categories.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/20 bg-primary hover:bg-sky-600 text-white font-bold border border-white/10 transition-all hover:scale-105">
                                    Check Subsidy Eligibility
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </DynamicHeroWrapper>

            <div className="container px-4 md:px-6 py-12 grid lg:grid-cols-[1fr_400px] gap-12 mx-auto">
                {/* Main Content */}
                <div className="space-y-12">
                    <ContentSection
                        title="About PMAY Scheme"
                        description="Pradhan Mantri Awas Yojana (PMAY) is a flagship initiative by the Government of India to provide affordable housing to the urban poor. The mission aims to achieve the goal of 'Housing for All' by 2024. Under this scheme, eligible beneficiaries can avail significant interest subsidies on their home loans through the Credit Linked Subsidy Scheme (CLSS). Whether you are buying a new house, constructing one, or extending your existing home, PMAY makes it financially viable for low and middle-income groups to own a property."
                        imageSrc="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1073&q=80"
                        imageAlt="Affordable housing"
                    >
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-900/10 border border-sky-100 dark:border-sky-800">
                                <h4 className="font-bold text-primary text-lg">CLSS</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Credit Linked Subsidy</p>
                            </div>
                            <div className="p-4 rounded-xl bg-accent/10 dark:bg-accent/20 border border-accent/20">
                                <h4 className="font-bold text-accent text-lg">₹2.67 Lakhs</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Max Subsidy Amount</p>
                            </div>
                        </div>
                    </ContentSection>

                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 rounded-full bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center text-primary">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold">Eligibility Categories</h3>
                        </div>
                        <SimpleAccordion
                            items={[
                                { title: "EWS (Economically Weaker Section)", content: "Annual household income up to ₹3 Lakhs. Carpet area approx 30 sqm." },
                                { title: "LIG (Low Income Group)", content: "Annual household income between ₹3 Lakhs to ₹6 Lakhs. Carpet area approx 60 sqm." },
                                { title: "MIG-I (Middle Income Group I)", content: "Annual household income between ₹6 Lakhs to ₹12 Lakhs. Carpet area approx 160 sqm." },
                                { title: "MIG-II (Middle Income Group II)", content: "Annual household income between ₹12 Lakhs to ₹18 Lakhs. Carpet area approx 200 sqm." },
                            ]}
                        />
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                                <FileText className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold">Required Documents</h3>
                        </div>
                        <SimpleAccordion
                            items={[
                                { title: "Proof of Identity", content: "PAN Card / Aadhaar Card / Voter ID / Passport" },
                                { title: "Proof of Income", content: "Salary Slips, Bank Statements, ITR" },
                                { title: "Property Documents", content: "Sale Deed, Allotment Letter, Property Map" },
                                { title: "Affidavit", content: "Self-declaration that beneficiary does not own a proper house in India." },
                            ]}
                        />
                    </div>
                </div>

                {/* Sticky Sidebar Form */}
                <aside className="relative">
                    <div className="sticky top-24">
                        <Card className="glass-card bg-white/80 dark:bg-sky-950/80 border-sky-100 dark:border-sky-900 shadow-2xl overflow-hidden ring-1 ring-primary/10">
                            <CardHeader className="bg-gradient-to-r from-primary to-sky-600 text-white p-6">
                                <CardTitle className="flex items-center gap-2">
                                    <Home className="h-5 w-5" />
                                    Check PMAY Eligibility
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                {isSuccess ? (
                                    <div className="text-center py-8">
                                        <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
                                            <CheckCircle2 className="h-6 w-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Request Sent</h3>
                                        <p className="text-slate-600 dark:text-slate-300 mt-2">Our PMAY expert will guide you.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Annual Family Income</label>
                                            <Input
                                                placeholder="e.g. ₹5,00,000"
                                                className="bg-sky-50 dark:bg-sky-900/10 border-sky-100"
                                                value={formData.income}
                                                onChange={e => setFormData({ ...formData, income: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Category</label>
                                            <select
                                                className="flex h-12 w-full rounded-xl border border-sky-100 bg-sky-50 dark:bg-sky-900/10 dark:border-sky-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all text-slate-700 dark:text-slate-200"
                                                value={formData.category}
                                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                            >
                                                <option value="">Select Category</option>
                                                <option value="EWS">EWS (Up to 3L)</option>
                                                <option value="LIG">LIG (3L - 6L)</option>
                                                <option value="MIG1">MIG-1 (6L - 12L)</option>
                                                <option value="MIG2">MIG-2 (12L - 18L)</option>
                                            </select>
                                        </div>
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
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Mobile Number</label>
                                            <Input
                                                placeholder="10 digit mobile"
                                                className="bg-sky-50 dark:bg-sky-900/10 border-sky-100"
                                                value={formData.mobile}
                                                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <Button className="w-full bg-primary hover:bg-sky-600 text-white font-bold h-12 text-base shadow-lg shadow-primary/20 mt-4 border border-white/10 transition-all">Calculate Subsidy</Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                        <div className="mt-6 p-4 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-100 dark:border-sky-800 text-sm text-slate-600 dark:text-slate-400">
                            <p className="flex items-start gap-2">
                                <Zap className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                                <span>Subsidy amount is directly credited to your loan account, reducing your EMI burden.</span>
                            </p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
