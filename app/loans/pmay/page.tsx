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
        <div className="pb-20 bg-slate-50 dark:bg-black selection:bg-orange-500/30 font-sans">
            {/* PMAY Hero - Official & Trustworthy */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-green-50 dark:from-orange-950 dark:via-slate-900 dark:to-green-950">
                {/* Tri-color Globs */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-400/10 rounded-full blur-[100px] mix-blend-multiply animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-green-400/10 rounded-full blur-[100px] mix-blend-multiply"></div>

                <div className="container relative z-10 px-4 md:px-6">
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/50 px-4 py-1.5 text-sm font-bold text-slate-700 dark:text-slate-300 backdrop-blur-sm">
                            <Building2 className="h-4 w-4 text-orange-600" />
                            <span>Housing for All by 2024</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
                            Pradhan Mantri <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-slate-500 to-green-600">Awas Yojana (PMAY)</span>
                        </h1>

                        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                            Own your dream home with government subsidy up to ₹2.67 Lakhs. Affordable housing solutions for EWS, LIG, and MIG categories.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg bg-orange-600 hover:bg-orange-700 text-white font-bold">
                                Check Subsidy Eligibility
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container px-4 md:px-6 py-12 grid lg:grid-cols-[1fr_400px] gap-12">

                {/* Main Content */}
                <div className="space-y-12">
                    <ContentSection
                        title="About PMAY Scheme"
                        description="Pradhan Mantri Awas Yojana (PMAY) is a flagship initiative by the Government of India to provide affordable housing to the urban poor. The mission aims to achieve the goal of 'Housing for All' by 2024. Under this scheme, eligible beneficiaries can avail significant interest subsidies on their home loans through the Credit Linked Subsidy Scheme (CLSS). Whether you are buying a new house, constructing one, or extending your existing home, PMAY makes it financially viable for low and middle-income groups to own a property."
                        imageSrc="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1073&q=80"
                        imageAlt="Affordable housing"
                    >
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                <h4 className="font-bold text-slate-800 dark:text-white text-lg">CLSS</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Credit Linked Subsidy</p>
                            </div>
                            <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800">
                                <h4 className="font-bold text-orange-700 dark:text-orange-300 text-lg">₹2.67 Lakhs</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Max Subsidy Amount</p>
                            </div>
                        </div>
                    </ContentSection>

                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600">
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
                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600">
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
                        <Card className="glass-card bg-white/50 border-white/40 shadow-xl overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-6">
                                <CardTitle className="flex items-center gap-2">
                                    <Home className="h-5 w-5" />
                                    Check PMAY Eligibility
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                {isSuccess ? (
                                    <div className="text-center py-8">
                                        <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle2 className="h-6 w-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Request Sent</h3>
                                        <p className="text-slate-600 dark:text-slate-300 mt-2">Our PMAY expert will guide you.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Annual Family Income</label>
                                            <Input
                                                placeholder="e.g. 500000"
                                                value={formData.income}
                                                onChange={e => setFormData({ ...formData, income: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
                                            <select
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
                                            <Input
                                                placeholder="Full Name"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Mobile Number</label>
                                            <Input
                                                placeholder="10 digit mobile"
                                                value={formData.mobile}
                                                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold h-12 text-base shadow-md mt-4">Calculcate Subsidy</Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800 text-sm text-slate-600 dark:text-slate-400">
                            <p className="flex items-start gap-2">
                                <Zap className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                                <span>Subsidy amount is directly credited to your loan account, reducing your EMI burden.</span>
                            </p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
