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
        <div className="pb-20 bg-slate-50 dark:bg-black selection:bg-primary/30 font-sans mx-auto">
            <DynamicHeroWrapper page="mudra-loan">
                {/* Mudra Hero - Business & Growth Ocean Theme */}
                <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-sky-950 to-sky-900 border-b border-primary/20 text-white">
                    {/* Abstract Globs - Ocean Style */}
                    <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] mix-blend-multiply animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] mix-blend-multiply"></div>

                    <div className="container relative z-10 px-4 md:px-6 mx-auto">
                        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
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

            <div className="container px-4 md:px-6 py-20 grid lg:grid-cols-[1fr_400px] gap-12 mx-auto">

                {/* Main Content */}
                <div className="space-y-12">
                    <ContentSection
                        title="Funding the Unfunded"
                        description="Mudra (Micro Units Development & Refinance Agency) Loan is a government initiative to provide financial support to micro and small enterprises. It aims to 'fund the unfunded' by offering loans at affordable rates without the need for collateral. Whether you are running a kirana shop, a small manufacturing unit, or a food stall, Mudra loans are designed to meet your working capital and expansion needs. The scheme classifies loans into three categories based on the stage of business development, ensuing targeted support for every entrepreneur."
                        imageSrc="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80"
                        imageAlt="Small business owner"
                    >
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                                <h4 className="font-bold text-primary text-lg tracking-tight">No Collateral</h4>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Security-free loans</p>
                            </div>
                            <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
                                <h4 className="font-bold text-accent text-lg tracking-tight">Processing Fee</h4>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Zero or Nominal</p>
                            </div>
                        </div>
                    </ContentSection>

                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-12 w-12 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary shadow-sm">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Loan Categories</h3>
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
                            <div className="h-12 w-12 rounded-2xl bg-accent/10 dark:bg-accent/20 flex items-center justify-center text-accent shadow-sm">
                                <FileText className="h-6 w-6" />
                            </div>
                            <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Required Documents</h3>
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
                    <div className="sticky top-32">
                        <Card className="glass-card bg-white/90 dark:bg-sky-950/90 border-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden rounded-[2.5rem] ring-1 ring-primary/5">
                            <CardHeader className="bg-gradient-to-r from-primary to-sky-700 text-white p-8 pb-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                                        <Briefcase className="h-6 w-6 text-white" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-accent text-slate-900 px-3 py-1 rounded-full shadow-lg">Govt Scheme</span>
                                </div>
                                <CardTitle className="text-2xl font-black tracking-tight leading-none mb-2">Mudra Inquiry</CardTitle>
                                <p className="text-sky-100/70 text-xs font-bold uppercase tracking-widest tracking-tighter">Fuel Your Micro Enterprise</p>
                            </CardHeader>
                            <CardContent className="p-8 -mt-6 bg-white dark:bg-slate-950 rounded-t-[2.5rem] relative z-10 shadow-2xl">
                                {isSuccess ? (
                                    <div className="text-center py-10">
                                        <div className="h-20 w-20 bg-primary rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/30">
                                            <CheckCircle2 className="h-10 w-10 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Inquiry Sent</h3>
                                        <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-widest leading-loose">A Mudra expert will connect shortly.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Capital Needed</label>
                                            <Input
                                                placeholder="e.g. ₹2,00,000"
                                                className="h-14 bg-slate-50 dark:bg-sky-950/20 border-slate-100 dark:border-primary/10 rounded-2xl font-bold px-6 focus:ring-primary shadow-sm"
                                                value={formData.loanAmount}
                                                onChange={e => setFormData({ ...formData, loanAmount: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Business Stage</label>
                                            <select
                                                className="flex h-14 w-full rounded-2xl border border-slate-100 bg-slate-50 dark:bg-sky-950/20 px-6 py-2 text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all shadow-sm"
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
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Promoter Name</label>
                                            <Input
                                                placeholder="Your Name"
                                                className="h-14 bg-slate-50 dark:bg-sky-950/20 border-slate-100 dark:border-primary/10 rounded-2xl font-bold px-6 focus:ring-primary shadow-sm"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Mobile Access</label>
                                            <Input
                                                placeholder="10 digit number"
                                                className="h-14 bg-slate-50 dark:bg-sky-950/20 border-slate-100 dark:border-primary/10 rounded-2xl font-bold px-6 focus:ring-primary shadow-sm"
                                                value={formData.mobile}
                                                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <Button className="w-full bg-primary hover:bg-sky-600 text-white font-black h-16 text-lg rounded-2xl shadow-2xl shadow-primary/20 mt-4 transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-widest border border-white/10">Get Expert Support</Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                        <div className="mt-8 p-6 bg-primary/5 dark:bg-primary/10 rounded-3xl border border-primary/20 text-sm text-slate-600 dark:text-sky-300 font-bold shadow-sm ring-1 ring-primary/5">
                            <p className="flex items-start gap-3">
                                <Zap className="h-5 w-5 text-accent mt-0.5 shrink-0 fill-accent" />
                                <span>No collateral security required for loans up to ₹10 Lakhs under the official government MUDRA guidelines.</span>
                            </p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
