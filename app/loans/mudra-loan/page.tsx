"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Briefcase, IndianRupee, Percent, ShieldCheck, Zap, FileText, BadgeIndianRupee } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEmailForm } from "@/hooks/use-email-form";
import { cn } from "@/lib/utils";
import { ContentSection } from "@/components/ui/content-section";
import { SimpleAccordion } from "@/components/ui/simple-accordion";
import { DynamicHeroWrapper } from "@/components/dynamic-hero-wrapper";

export default function MudraLoanPage() {
    const { sendEmail, isSubmitting, isSuccess, error, resetForm } = useEmailForm();
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        businessType: "",
        loanAmount: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendEmail({
            type: "Mudra Loan Inquiry",
            ...formData
        });
    };

    return (
        <div className="pb-20 bg-slate-50 dark:bg-black selection:bg-primary/30 font-sans">
            <DynamicHeroWrapper page="mudra-loan">
                {/* Mudra Hero - Business & Growth Ocean Theme */}
                <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-sky-950 to-sky-900 mx-auto">
                    {/* Abstract Globs - Ocean Style */}
                    <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] mix-blend-multiply animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] mix-blend-multiply"></div>

                    <div className="container relative z-10 px-4 md:px-6 mx-auto">
                        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8 text-white">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-bold text-sky-200 backdrop-blur-sm">
                                <BadgeIndianRupee className="h-4 w-4 text-accent" />
                                <span>Empowering Micro Enterprises</span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
                                Pradhan Mantri <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-accent">MUDRA Yojana</span>
                            </h1>

                            <p className="text-xl text-sky-100/80 max-w-2xl leading-relaxed">
                                Fuel your business dreams with collateral-free loans up to ₹10 Lakhs. Tailored support for Shishu, Kishor, and Tarun stages.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/20 bg-primary hover:bg-sky-600 text-white font-bold border border-white/10 transition-all hover:scale-105">
                                    Check Eligibility
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </DynamicHeroWrapper>

            <div className="container px-4 md:px-6 py-12 grid lg:grid-cols-[1fr_400px] gap-12">

                {/* Main Content */}
                <div className="space-y-12">
                    <ContentSection
                        title="Funding the Unfunded"
                        description="Mudra (Micro Units Development & Refinance Agency) Loan is a government initiative to provide financial support to micro and small enterprises. It aims to 'fund the unfunded' by offering loans at affordable rates without the need for collateral. Whether you are running a kirana shop, a small manufacturing unit, or a food stall, Mudra loans are designed to meet your working capital and expansion needs. The scheme classifies loans into three categories based on the stage of business development, ensuing targeted support for every entrepreneur."
                        imageSrc="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80"
                        imageAlt="Small business owner"
                    >
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-900/10 border border-sky-100 dark:border-sky-800">
                                <h4 className="font-bold text-primary text-lg">No Collateral</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Security-free loans</p>
                            </div>
                            <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800">
                                <h4 className="font-bold text-neutral-800 dark:text-accent text-lg">Processing Fee</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Zero or Nominal</p>
                            </div>
                        </div>
                    </ContentSection>

                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold">Loan Categories</h3>
                        </div>
                        <SimpleAccordion
                            items={[
                                { title: "Shishu (Startups)", content: "Loans up to ₹50,000 for new businesses starting their operations." },
                                { title: "Kishor (Mid-stage)", content: "Loans from ₹50,000 to ₹5,00,000 for businesses seeking to expand." },
                                { title: "Tarun (Growth-stage)", content: "Loans from ₹5,00,000 to ₹10,00,000 for well-established businesses looking for diversification." },
                            ]}
                        />
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 rounded-full bg-accent/10 dark:bg-accent/20 flex items-center justify-center text-accent">
                                <FileText className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold">Required Documents</h3>
                        </div>
                        <SimpleAccordion
                            items={[
                                { title: "Identity & Address Proof", content: "Self-certified ID and address proofs of the applicant." },
                                { title: "Business Registration", content: "Proof of business like Trade License, Registration Certificate, etc." },
                                { title: "Quotation of Machinery", content: "If loan is for machinery, invoice quotation is needed." },
                                { title: "Caste Certificate", content: "If applicable (SC/ST/OBC) for special category benefits." },
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
                                    <Briefcase className="h-5 w-5" />
                                    Mudra Loan Inquiry
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                {isSuccess ? (
                                    <div className="text-center py-8">
                                        <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle2 className="h-6 w-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Inquiry Sent</h3>
                                        <p className="text-slate-600 dark:text-slate-300 mt-2">We will connect you with a Mudra agent.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Loan Amount Required</label>
                                            <Input
                                                placeholder="e.g. ₹2,00,000"
                                                className="bg-sky-50 dark:bg-sky-900/10 border-sky-100"
                                                value={formData.loanAmount}
                                                onChange={e => setFormData({ ...formData, loanAmount: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Business Stage</label>
                                            <select
                                                className="flex h-12 w-full rounded-xl border border-sky-100 bg-sky-50 dark:bg-sky-900/10 dark:border-sky-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all text-slate-700 dark:text-slate-200"
                                                value={formData.businessType}
                                                onChange={e => setFormData({ ...formData, businessType: e.target.value })}
                                            >
                                                <option value="">Select Stage</option>
                                                <option value="Shishu">Shishu (Up to 50k)</option>
                                                <option value="Kishor">Kishor (50k - 5L)</option>
                                                <option value="Tarun">Tarun (5L - 10L)</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Contact Name</label>
                                            <Input
                                                placeholder="Your Name"
                                                className="bg-sky-50 dark:bg-sky-900/10 border-sky-100"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Mobile Number</label>
                                            <Input
                                                placeholder="10 digit number"
                                                className="bg-sky-50 dark:bg-sky-900/10 border-sky-100"
                                                value={formData.mobile}
                                                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <Button className="w-full bg-primary hover:bg-sky-600 text-white font-bold h-12 text-base shadow-lg shadow-primary/20 mt-4 border border-white/10 transition-all">Get Support</Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                        <div className="mt-6 p-4 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-100 dark:border-sky-800 text-sm text-slate-600 dark:text-slate-400">
                            <p className="flex items-start gap-2">
                                <Zap className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                <span>No collateral security required for loans up to ₹10 Lakhs under MUDRA.</span>
                            </p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
