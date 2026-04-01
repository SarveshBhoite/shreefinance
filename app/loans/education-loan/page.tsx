"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EMICalculator } from "@/components/calculators/emi-calculator";
import { CheckCircle2, GraduationCap, IndianRupee, Globe, ShieldCheck, Zap, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEmailForm } from "@/hooks/use-email-form";
import { cn } from "@/lib/utils";
import { ContentSection } from "@/components/ui/content-section";
import { SimpleAccordion } from "@/components/ui/simple-accordion";
import { DynamicHeroWrapper } from "@/components/dynamic-hero-wrapper";

export default function EducationLoanPage() {
    const { sendEmail, isSubmitting, isSuccess, error, resetForm } = useEmailForm();
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
        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="pb-20 bg-slate-50 dark:bg-black selection:bg-primary/30 font-sans mx-auto">
            <DynamicHeroWrapper page="education-loan">
                {/* Unique Hero Section - Global Future Ocean Theme */}
                <section className="relative pt-40 pb-20 overflow-hidden bg-gradient-to-b from-sky-950 to-sky-900 border-b border-primary/20 text-white">
                    {/* Globe/Map background - Ocean Style */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-10 z-0"></div>
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-[pulse_6s_ease-in-out_infinite]"></div>

                    <div className="container px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 mx-auto">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-bold text-sky-200 backdrop-blur-sm">
                                <GraduationCap className="h-4 w-4 text-accent" />
                                <span>Unlock Your Global Potential</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                                Invest in Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-900 to-accent">Future Success.</span>
                            </h1>

                            <p className="text-xl text-sky-100/80 max-w-lg leading-relaxed">
                                Complete funding for tuition and living expenses for premier institutions in India and abroad. Up to 100% financing for meritorious students.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/20 bg-primary hover:bg-sky-600 text-white font-bold border border-white/10 transition-all hover:-translate-y-1" onClick={scrollToForm}>
                                    Check Eligibility
                                </Button>
                            </div>

                            <div className="flex items-center gap-6 pt-4 border-t border-sky-800">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-white">100%</p>
                                    <p className="text-xs text-sky-400 uppercase tracking-wider">Tuition Fee</p>
                                </div>
                                <div className="w-px h-10 bg-sky-800"></div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-white">No</p>
                                    <p className="text-xs text-sky-400 uppercase tracking-wider">Collateral*</p>
                                </div>
                                <div className="w-px h-10 bg-sky-800"></div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-white">15 Yr</p>
                                    <p className="text-xs text-sky-400 uppercase tracking-wider">Repayment</p>
                                </div>
                            </div>
                        </div>

                        {/* Visual Hero Element - Globe/Cap */}
                        <div className="relative hidden lg:block h-[500px]">
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* Abstract Globe */}
                                <div className="relative w-96 h-96">
                                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
                                    <div className="absolute inset-10 border border-primary/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
                                    <div className="absolute inset-20 border border-dashed border-sky-400/50 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

                                    {/* Central Cap Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <GraduationCap className="h-32 w-32 text-primary drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]" />
                                    </div>

                                    {/* Floating Locations */}
                                    <div className="absolute top-0 right-10 bg-sky-950/90 backdrop-blur-md px-3 py-1 rounded-full border border-primary/30 shadow-xl flex items-center gap-2 animate-bounce delay-700">
                                        <Globe className="h-4 w-4 text-primary" />
                                        <span className="text-xs font-bold text-white">USA</span>
                                    </div>
                                    <div className="absolute bottom-10 left-10 bg-sky-950/90 backdrop-blur-md px-3 py-1 rounded-full border border-primary/30 shadow-xl flex items-center gap-2 animate-bounce delay-300">
                                        <Globe className="h-4 w-4 text-accent" />
                                        <span className="text-xs font-bold text-white">UK</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </DynamicHeroWrapper>

            {/* University Strip */}
            <div className="bg-sky-950 border-y border-sky-900 py-6 overflow-hidden">
                <div className="container px-4 text-center mx-auto">
                    <p className="text-sky-200/60 uppercase tracking-[0.2em] text-sm font-bold mb-4">Funding for Top Universities Globally</p>
                    <div className="flex justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholders for Uni Logos - Using text for now */}
                        <span className="text-xl font-serif font-bold text-white">Harvard</span>
                        <span className="text-xl font-serif font-bold text-white">Oxford</span>
                        <span className="text-xl font-serif font-bold text-white">Stanford</span>
                        <span className="text-xl font-serif font-bold text-white">MIT</span>
                        <span className="text-xl font-serif font-bold text-white">IITs</span>
                        <span className="text-xl font-serif font-bold text-white">IIMs</span>
                    </div>
                </div>
            </div>

            {/* Main Content Layout with Sticky Sidebar */}
            <div className="container px-4 md:px-6 py-12 grid lg:grid-cols-[1fr_400px] gap-12">
                {/* Left Column: Content */}
                <div className="space-y-16">
                    <ContentSection
                        title="Limitless Learning Opportunities"
                        description="We believe that talent should never be restricted by financial constraints. Our Education Loan is designed to empower ambitious students to pursue their academic dreams at top universities across the globe. We cover up to 100% of the cost of education, including tuition fees, accommodation, travel expenses, laptop, and study material. With pre-visa disbursement proofs and specialized loans for executive courses, we support you at every stage of your admission process."
                        imageSrc="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                        imageAlt="Students studying"
                    >
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-900/10 border border-sky-100 dark:border-sky-800">
                                <h4 className="font-bold text-primary text-lg">Moratorium</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Pay after job secured</p>
                            </div>
                            <div className="p-4 rounded-xl bg-sky-100/50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800">
                                <h4 className="font-bold text-sky-800 dark:text-sky-300 text-lg">Section 80E</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Tax deduction on interest</p>
                            </div>
                        </div>
                    </ContentSection>

                    {/* Calculator Section */}
                    <div className="p-1 rounded-3xl bg-gradient-to-r from-sky-100 to-sky-200 dark:from-sky-900/40 dark:to-sky-800/20 shadow-sm border border-sky-200 dark:border-sky-900">
                        <div className="bg-white dark:bg-sky-950 rounded-[22px] p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary"><GraduationCap className="h-6 w-6" /></div>
                                <h3 className="text-xl font-bold">Calculate Education Loan EMI</h3>
                            </div>
                            <EMICalculator defaultAmount={4000000} defaultRate={9.5} defaultTenure={10} />
                        </div>
                    </div>

                    {/* Accordions */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <CheckCircle2 className="text-primary" /> Eligibility Criteria
                            </h3>
                            <SimpleAccordion
                                items={[
                                    { title: "Academic Record", content: "Consistent academic performance (Minimum 60% in 10th, 12th & Graduation)." },
                                    { title: "Admission Status", content: "Confirmed admission letter from a recognized university/institution." },
                                    { title: "Co-borrower", content: "A financial co-applicant (Parent/Guardian) with steady income and good CIBIL is mandatory." },
                                ]}
                            />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <FileText className="text-accent" /> Documents Required
                            </h3>
                            <SimpleAccordion
                                items={[
                                    { title: "Student Documents", content: "KYC, Marksheets (10th, 12th, Degree), Entrance Test Scorecard, Admission Letter." },
                                    { title: "Co-borrower Documents", content: "KYC, Income Proof (Salary Slips/ITR), Bank Statements." },
                                    { title: "Collateral (If applicable)", content: "Property papers, FD receipts, or Government Bond details for higher loan amounts." },
                                ]}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column: Sticky Form */}
                <aside className="relative">
                    <div id="lead-form" className="sticky top-24">
                        <Card className="glass-card bg-white/80 dark:bg-sky-950/80 border-sky-100 dark:border-sky-900 shadow-2xl overflow-hidden ring-1 ring-primary/10">
                            <CardHeader className="bg-gradient-to-r from-primary to-sky-600 text-white p-6">
                                <CardTitle className="text-lg">Education Support</CardTitle>
                                <p className="text-sky-100 text-sm">Study at your dream college</p>
                            </CardHeader>
                            <CardContent className="p-6">
                                {isSuccess ? (
                                    <div className="text-center py-8">
                                        <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle2 className="h-6 w-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Request Received</h3>
                                        <p className="text-slate-600 dark:text-slate-300 mt-2">Good luck for your future!</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Student Name</label>
                                            <Input
                                                placeholder="Full Name"
                                                className="bg-sky-50 dark:bg-sky-900/10 border-sky-100"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Mobile</label>
                                            <Input
                                                placeholder="10 digit number"
                                                className="bg-sky-50 dark:bg-sky-900/10 border-sky-100"
                                                value={formData.mobile}
                                                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">City</label>
                                                <Input
                                                    placeholder="City"
                                                    className="bg-sky-50 dark:bg-sky-900/10 border-sky-100"
                                                    value={formData.city}
                                                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Course</label>
                                                <Input
                                                    placeholder="e.g. MBA"
                                                    className="bg-sky-50 dark:bg-sky-900/10 border-sky-100"
                                                    value={formData.courseName}
                                                    onChange={e => setFormData({ ...formData, courseName: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <Button className="w-full bg-primary hover:bg-sky-600 text-white font-bold h-12 text-base shadow-lg shadow-primary/20 mt-2 border border-white/10 transition-all">Get Funding Advice</Button>
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
