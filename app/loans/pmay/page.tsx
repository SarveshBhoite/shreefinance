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

    const scrollToForm = () => {
        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="pb-20 bg-slate-50 dark:bg-black selection:bg-primary/30 font-sans mx-auto">
            <DynamicHeroWrapper page="pmay">
                {/* PMAY Hero - Official & Trustworthy Ocean Theme */}
                <section className="relative pt-12 md:pt-20 pb-20 overflow-hidden bg-gradient-to-b from-sky-950 to-sky-900 border-b border-primary/20 text-white">
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
                                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/20 bg-primary hover:bg-sky-600 text-white font-bold border border-white/10 transition-all hover:scale-105" onClick={scrollToForm}>
                                    Check My Subsidy
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

                {/* Right Column: Sticky Form */}
                <aside className="relative">
                    <div id="lead-form" className="sticky top-32">
                        <Card className="glass-card bg-white/90 dark:bg-slate-900/90 border-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden rounded-[2.5rem] ring-1 ring-primary/5">
                            <CardHeader className="bg-gradient-to-r from-primary to-sky-700 text-white p-8 pb-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                                        <Home className="h-6 w-6 text-white" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-accent text-slate-900 px-3 py-1 rounded-full shadow-lg">Govt. Subsidy</span>
                                </div>
                                <CardTitle className="text-2xl font-black tracking-tight leading-none mb-2">Check Subsidy</CardTitle>
                                <p className="text-sky-100/70 text-xs font-bold uppercase tracking-widest tracking-tighter">Housing for All Initiative</p>
                            </CardHeader>
                            <CardContent className="p-8 -mt-6 bg-white dark:bg-slate-950 rounded-t-[2.5rem] relative z-10 shadow-2xl">
                                {isSuccess ? (
                                    <div className="text-center py-10">
                                        <div className="h-20 w-20 bg-primary rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/30">
                                            <CheckCircle2 className="h-10 w-10 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Request Received</h3>
                                        <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-widest leading-loose">Our PMAY expert will guide you.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Annual Family Income</label>
                                            <Input
                                                placeholder="e.g. ₹5,00,000"
                                                className="h-14 bg-slate-50 dark:bg-sky-950/20 border-slate-100 dark:border-primary/10 rounded-2xl font-bold px-6 focus:ring-primary shadow-sm"
                                                value={formData.income}
                                                onChange={e => setFormData({ ...formData, income: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Category</label>
                                            <select
                                                className="flex h-14 w-full rounded-2xl border border-slate-100 bg-slate-50 dark:bg-sky-950/20 dark:border-primary/10 px-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary transition-all text-slate-700 dark:text-slate-200"
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
                                        <Button className="w-full bg-primary hover:bg-sky-600 text-white font-black h-16 text-lg rounded-2xl shadow-2xl shadow-primary/20 mt-4 transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-widest border border-white/10">Calculate Subsidy</Button>
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
