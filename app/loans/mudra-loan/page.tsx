"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EMICalculator } from "@/components/calculators/emi-calculator";
import { CheckCircle2, BadgeIndianRupee, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEmailForm } from "@/hooks/use-email-form";
import { ContentSection } from "@/components/ui/content-section";
import { SimpleAccordion } from "@/components/ui/simple-accordion";
import { DynamicHeroWrapper } from "@/components/dynamic-hero-wrapper";
import { Deal4LoansDynamicForm } from "@/components/forms/deal4loans-dynamic-form";

export default function MudraLoanPage() {
    const { sendEmail, isSubmitting, isSuccess } = useEmailForm();
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

    const scrollToForm = () => {
        document.getElementById('deal4loans-mudra-apply')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="pb-20 bg-[#181a1d] text-white font-sans mx-auto">
            <DynamicHeroWrapper page="mudra-loan">
                {/* Hero Section */}
                <section className="relative pt-12 md:pt-20 pb-20 overflow-hidden bg-[#181a1d] text-white border-b border-slate-800">
                    <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#00c985]/10 rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="container relative z-10 px-4 md:px-6 mx-auto">
                        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-black text-[#00e699] uppercase tracking-widest">
                                <BadgeIndianRupee className="h-4 w-4 text-[#00e699]" />
                                <span>Empowering Micro Enterprises (Collateral-Free)</span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-white">
                                Pradhan Mantri <br />
                                <span className="text-[#00e699]">MUDRA Yojana</span>
                            </h1>

                            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed font-medium">
                                Fuel your business dreams with collateral-free loans up to ₹10 Lakhs. Tailored support for Shishu, Kishor, and Tarun stages.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                <Button size="lg" className="h-14 px-8 text-sm font-black rounded-full bg-[#00c985] hover:bg-[#00b074] text-slate-950 uppercase tracking-wider transition-all hover:scale-105" onClick={scrollToForm}>
                                    Apply For MUDRA Loan
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </DynamicHeroWrapper>

            {/* Instant Business & Micro Loan Deal4Loans Form */}
            <section className="py-12 container px-4 mx-auto scroll-mt-24" id="deal4loans-mudra-apply">
                <Deal4LoansDynamicForm initialLoanType="business" showCategorySwitcher={true} />
            </section>

            {/* MUDRA Categories */}
            <section className="py-16 relative z-10">
                <div className="container px-4 mx-auto">
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        {[
                            { title: "Shishu Stage", desc: "Loans up to ₹50,000 for new micro startups", color: "text-[#00c985]" },
                            { title: "Kishor Stage", desc: "Loans above ₹50,000 up to ₹5 Lakhs", color: "text-amber-400" },
                            { title: "Tarun Stage", desc: "Loans above ₹5 Lakhs up to ₹10 Lakhs", color: "text-[#00e699]" }
                        ].map((item, i) => (
                            <Card key={i} className="bg-[#24272c] border border-slate-800 shadow-xl hover:-translate-y-1.5 transition-all duration-300 rounded-3xl p-6 text-white">
                                <CardContent className="p-4 flex flex-col items-center">
                                    <div className="h-14 w-14 rounded-full bg-[#00c985]/15 border border-[#00c985]/30 flex items-center justify-center mb-4 text-[#00c985]">
                                        <BadgeIndianRupee className="h-7 w-7" />
                                    </div>
                                    <h3 className="text-xl font-black mb-2 text-white">{item.title}</h3>
                                    <p className="text-slate-400 font-medium text-xs">{item.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content Layout */}
            <div className="container px-8 md:px-10 py-12 grid lg:grid-cols-[1fr_400px] gap-12 mx-auto">
                <div className="space-y-12">
                    {/* Calculator Section */}
                    <div className="p-8 rounded-3xl bg-[#24272c] border border-slate-800 shadow-xl text-white">
                        <h3 className="text-2xl font-black text-white mb-6">Calculate MUDRA Loan EMI</h3>
                        <EMICalculator defaultAmount={500000} defaultRate={9.95} defaultTenure={5} />
                    </div>

                    <ContentSection
                        title="Collateral-Free Support for Small Business Owners"
                        description="MUDRA (Micro Units Development & Refinance Agency) provides formal institutional credit to non-corporate, non-farm small/micro enterprises. Get hassle-free funding without mortgaging land or property."
                        imageSrc="https://images.unsplash.com/photo-1556742049-0a670f4a4591?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                        imageAlt="Small Shop Business Owner"
                    />

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-full bg-[#00c985]/15 border border-[#00c985]/30 flex items-center justify-center text-[#00c985]">
                                    <CheckCircle2 className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-black text-white">Eligibility Criteria</h3>
                            </div>
                            <SimpleAccordion
                                items={[
                                    { title: "Eligible Entities", content: "Artisans, Traders, Small Manufacturers, Shopkeepers, Agri-Allied Activities." },
                                    { title: "Age Limit", content: "Minimum 18 years up to 65 years." },
                                    { title: "Credit Track Record", content: "No history of bank default in personal or business loan." },
                                ]}
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-full bg-[#00c985]/15 border border-[#00c985]/30 flex items-center justify-center text-[#00c985]">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-black text-white">Documents Required</h3>
                            </div>
                            <SimpleAccordion
                                items={[
                                    { title: "KYC Documents", content: "Aadhaar, PAN, Voter ID / Driving License." },
                                    { title: "Business Proof", content: "GST Certificate, Shop & Establishment License, Udyam Registration." },
                                    { title: "Bank Statement", content: "Last 6 months bank statement." },
                                ]}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Form Sidebar */}
                <aside className="relative">
                    <div id="lead-form" className="sticky top-28">
                        <Card className="bg-[#24272c] border border-slate-800 shadow-2xl rounded-[2.5rem] overflow-hidden text-white">
                            <CardHeader className="bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-400 text-slate-950 p-8">
                                <span className="text-[10px] font-black uppercase tracking-widest bg-slate-950 text-white px-3 py-1 rounded-full w-fit">PMMY Govt Scheme</span>
                                <CardTitle className="text-2xl font-black text-slate-950 mt-2">Apply for MUDRA Loan</CardTitle>
                                <p className="text-slate-900 text-xs font-bold">Zero collateral required</p>
                            </CardHeader>
                            <CardContent className="p-8 space-y-4">
                                {isSuccess ? (
                                    <div className="text-center py-8 space-y-3">
                                        <div className="h-16 w-16 bg-[#00c985] text-slate-950 rounded-full flex items-center justify-center mx-auto font-black">
                                            <CheckCircle2 className="h-8 w-8" />
                                        </div>
                                        <h4 className="text-xl font-black text-white">Inquiry Received!</h4>
                                        <p className="text-xs text-slate-400">Our MUDRA loan specialist will reach out shortly.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-slate-400">Applicant Name</label>
                                            <Input
                                                placeholder="Full Name"
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
                                            <label className="text-[10px] font-black uppercase text-slate-400">Business Activity</label>
                                            <Input
                                                placeholder="e.g. Retail Shop / Manufacturing"
                                                value={formData.businessType}
                                                onChange={e => setFormData({ ...formData, businessType: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-slate-400">Loan Amount Needed</label>
                                            <Input
                                                placeholder="₹ Amount (Up to ₹10 Lakhs)"
                                                value={formData.loanAmount}
                                                onChange={e => setFormData({ ...formData, loanAmount: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <Button className="w-full bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black h-14 text-sm rounded-full uppercase tracking-wider shadow-xl mt-4">
                                            Apply For MUDRA Scheme
                                        </Button>
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
