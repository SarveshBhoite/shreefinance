"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EMICalculator } from "@/components/calculators/emi-calculator";
import { CheckCircle2, GraduationCap, FileText, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEmailForm } from "@/hooks/use-email-form";
import { ContentSection } from "@/components/ui/content-section";
import { SimpleAccordion } from "@/components/ui/simple-accordion";
import { DynamicHeroWrapper } from "@/components/dynamic-hero-wrapper";
import { Deal4LoansDynamicForm } from "@/components/forms/deal4loans-dynamic-form";

export default function EducationLoanPage() {
    const { sendEmail, isSubmitting, isSuccess } = useEmailForm();
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        city: "",
        courseName: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendEmail({
            type: "Education Loan Application",
            ...formData
        });
    };

    const scrollToForm = () => {
        document.getElementById('deal4loans-education-apply')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="pb-20 bg-[#181a1d] text-white font-sans mx-auto">
            <DynamicHeroWrapper page="education-loan">
                {/* Hero Section */}
                <section className="relative pt-12 md:pt-20 pb-20 overflow-hidden bg-[#181a1d] text-white border-b border-slate-800">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00c985]/10 rounded-full blur-[120px] pointer-events-none" />

                    <div className="container px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 mx-auto">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-black text-[#00e699] uppercase tracking-widest">
                                <GraduationCap className="h-4 w-4 text-[#00e699]" />
                                <span>Unlock Your Global Potential (9.50% p.a.)</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight text-white">
                                Invest in Your <br />
                                <span className="text-[#00e699]">Future Success.</span>
                            </h1>

                            <p className="text-xl text-slate-300 max-w-lg leading-relaxed font-medium">
                                Complete funding for tuition and living expenses for premier institutions in India and abroad. Up to 100% financing for meritorious students.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="h-14 px-8 text-sm font-black rounded-full bg-[#00c985] hover:bg-[#00b074] text-slate-950 uppercase tracking-wider transition-all hover:scale-105" onClick={scrollToForm}>
                                    Apply For Study Sanction
                                </Button>
                            </div>

                            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800">
                                <div>
                                    <p className="text-3xl font-black text-[#00e699]">9.50%</p>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Starting APR</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-white">15 Yrs</p>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Max Tenure</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-amber-400">100%</p>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Tuition Cover</p>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Hero Visual */}
                        <div className="relative hidden lg:flex justify-center items-center h-[450px]">
                            <Card className="bg-[#24272c] border border-slate-800 rounded-[2.5rem] p-8 text-white shadow-2xl space-y-6 w-full max-w-md">
                                <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                                    <div className="h-12 w-12 rounded-2xl bg-[#00c985]/15 border border-[#00c985]/30 flex items-center justify-center text-[#00c985]">
                                        <Globe className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-white">India & Global Studies</h3>
                                        <p className="text-xs text-slate-400 font-medium">US, UK, Canada, Europe & India</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800 text-xs">
                                        <span className="text-slate-400 font-bold">Interest Rate</span>
                                        <span className="font-black text-[#00e699] text-sm">Starting 9.50% p.a.</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800 text-xs">
                                        <span className="text-slate-400 font-bold">Moratorium Period</span>
                                        <span className="font-black text-white text-sm">Course + 1 Year</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800 text-xs">
                                        <span className="text-slate-400 font-bold">Tax Benefit</span>
                                        <span className="font-black text-amber-300 text-sm">100% Tax Exemption (80E)</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>
            </DynamicHeroWrapper>

            {/* Instant Education Loan Deal4Loans Form */}
            <section className="py-12 container px-4 mx-auto scroll-mt-24" id="deal4loans-education-apply">
                <Deal4LoansDynamicForm initialLoanType="education" showCategorySwitcher={true} />
            </section>

            {/* Main Content Layout */}
            <div className="container px-8 md:px-10 py-16 grid lg:grid-cols-[1fr_400px] gap-12 mx-auto">
                <div className="space-y-12">
                    {/* EMI Calculator */}
                    <div className="p-8 rounded-3xl bg-[#24272c] border border-slate-800 shadow-xl text-white">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-[#00c985]/15 border border-[#00c985]/30 rounded-xl text-[#00c985]">
                                <GraduationCap className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-black text-white">Calculate Education Loan EMI</h3>
                        </div>
                        <EMICalculator defaultAmount={1500000} defaultRate={9.5} defaultTenure={10} />
                    </div>

                    <ContentSection
                        title="Fuel Your Overseas & Indian Academic Dreams"
                        description="Don't let financial constraints hold back your higher education. Get up to ₹1.5 Crore pre-visa disbursal for top global universities in USA, UK, Canada, Australia, and Premier Indian Institutes (IITs/IIMs). Includes tuition fees, hostel, travel, and laptop allowance."
                        imageSrc="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                        imageAlt="University Students Graduating"
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
                                    { title: "Admission Proof", content: "Confirmed admission letter from recognized Indian or Overseas University." },
                                    { title: "Academic Record", content: "Good academic track record in 10th, 12th & Graduation." },
                                    { title: "Co-borrower Profile", content: "Parent or guardian with steady monthly income source." },
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
                                    { title: "Student Proofs", content: "Offer letter, Marksheets, GRE/GMAT/IELTS Scorecards." },
                                    { title: "KYC Documents", content: "Aadhaar, PAN Card, Passport Copy." },
                                    { title: "Co-applicant Income", content: "Last 3 months salary slips or 2 years ITR returns." },
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
                                <span className="text-[10px] font-black uppercase tracking-widest bg-slate-950 text-white px-3 py-1 rounded-full w-fit">Pre-Visa Disbursal</span>
                                <CardTitle className="text-2xl font-black text-slate-950 mt-2">Apply for Education Loan</CardTitle>
                                <p className="text-slate-900 text-xs font-bold">Fast sanction in 48 hours</p>
                            </CardHeader>
                            <CardContent className="p-8 space-y-4">
                                {isSuccess ? (
                                    <div className="text-center py-8 space-y-3">
                                        <div className="h-16 w-16 bg-[#00c985] text-slate-950 rounded-full flex items-center justify-center mx-auto font-black">
                                            <CheckCircle2 className="h-8 w-8" />
                                        </div>
                                        <h4 className="text-xl font-black text-white">Application Received!</h4>
                                        <p className="text-xs text-slate-400">Our student loan advisor will contact you shortly.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-slate-400">Student Name</label>
                                            <Input
                                                placeholder="Enter student name"
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
                                            <label className="text-[10px] font-black uppercase text-slate-400">City</label>
                                            <Input
                                                placeholder="City"
                                                value={formData.city}
                                                onChange={e => setFormData({ ...formData, city: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-slate-400">Target Course / Country</label>
                                            <Input
                                                placeholder="e.g. MS in USA / MBA India"
                                                value={formData.courseName}
                                                onChange={e => setFormData({ ...formData, courseName: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <Button className="w-full bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black h-14 text-sm rounded-full uppercase tracking-wider shadow-xl mt-4">
                                            Get Instant Pre-Approval
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
