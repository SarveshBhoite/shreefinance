"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Shield, Heart, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEmailForm } from "@/hooks/use-email-form";
import { ContentSection } from "@/components/ui/content-section";
import { SimpleAccordion } from "@/components/ui/simple-accordion";
import { DynamicHeroWrapper } from "@/components/dynamic-hero-wrapper";

export default function HealthInsurancePage() {
    const { sendEmail, isSuccess } = useEmailForm();
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        members: "",
        city: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendEmail({
            type: "Health Insurance Inquiry",
            ...formData
        });
    };

    const scrollToForm = () => {
        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="pb-20 bg-white text-white font-sans mx-auto">
            <DynamicHeroWrapper page="health-insurance">
                {/* Hero Section */}
                <section className="relative pt-12 md:pt-20 pb-20 overflow-hidden bg-white text-white border-b border-slate-200">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0284c7]/10 rounded-full blur-[120px] pointer-events-none" />

                    <div className="container px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 mx-auto">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-50 px-4 py-1.5 text-xs font-black text-[#0284c7] uppercase tracking-widest">
                                <Heart className="h-4 w-4 text-[#0284c7]" />
                                <span>Cashless Claims (10,000+ Network Hospitals)</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-slate-900">
                                Health is Wealth. <br />
                                <span className="text-[#0284c7]">Protect it.</span>
                            </h1>

                            <p className="text-xl text-slate-600 max-w-lg leading-relaxed font-medium">
                                Uncompromised healthcare for your loved ones. Cashless treatment at top hospitals, zero paperwork claims, and lifetime renewability.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="h-14 px-8 text-sm font-black rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-sm uppercase tracking-wider transition-all hover:scale-105" onClick={scrollToForm}>
                                    Get Health Mediclaim Plan
                                </Button>
                            </div>

                            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200">
                                <div>
                                    <p className="text-3xl font-black text-[#0284c7]">10,000+</p>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Cashless Hospitals</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-white">100%</p>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Bill Coverage</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-amber-400">₹10 Lakhs</p>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Standard Cover</p>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Hero Visual */}
                        <div className="relative hidden lg:flex justify-center items-center h-[450px]">
                            <Card className="bg-white border border-slate-200 rounded-[2.5rem] p-8 text-white shadow-2xl space-y-6 w-full max-w-md">
                                <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                                    <div className="h-12 w-12 rounded-2xl bg-[#0284c7]/15 border border-[#0284c7]/30 flex items-center justify-center text-[#0284c7]">
                                        <Shield className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-white">Family Floater Mediclaim</h3>
                                        <p className="text-xs text-slate-500 font-medium">80D Tax Benefit Available</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center bg-white p-3.5 rounded-2xl border border-slate-200 text-xs">
                                        <span className="text-slate-500 font-bold">Claim Processing</span>
                                        <span className="font-black text-[#0284c7] text-sm">30-Min Cashless Sanction</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white p-3.5 rounded-2xl border border-slate-200 text-xs">
                                        <span className="text-slate-500 font-bold">No Claim Bonus (NCB)</span>
                                        <span className="font-black text-white text-sm">Up to 100% Increase</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white p-3.5 rounded-2xl border border-slate-200 text-xs">
                                        <span className="text-slate-500 font-bold">Insurers</span>
                                        <span className="font-black text-amber-300 text-sm">Star, Care, Niva Bupa</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>
            </DynamicHeroWrapper>

            {/* Main Content Layout */}
            <div className="container px-8 md:px-10 py-16 grid lg:grid-cols-[1fr_400px] gap-12 mx-auto">
                <div className="space-y-12">
                    <ContentSection
                        title="Protect Your Family Against Rising Medical Inflation"
                        description="Don't let hospital bills wipe out your hard-earned savings. Our family floater health plans cover room rent, ICU charges, surgeries, pre & post-hospitalization expenses, and AYUSH treatments."
                        imageSrc="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                        imageAlt="Doctor Consulting Patient"
                    />

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-full bg-[#0284c7]/15 border border-[#0284c7]/30 flex items-center justify-center text-[#0284c7]">
                                    <CheckCircle2 className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900">Why Buy Health Insurance?</h3>
                            </div>
                            <SimpleAccordion
                                items={[
                                    { title: "Cashless Hospitalization", content: "Direct settlement of hospital bills across 10,000+ cashless network hospitals in India." },
                                    { title: "Tax Deductions (80D)", content: "Save up to ₹75,000 on tax under Section 80D for family & senior citizen parents." },
                                    { title: "No Room Rent Capping", content: "Choose any hospital room category without penalty deductions." },
                                ]}
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-full bg-[#0284c7]/15 border border-[#0284c7]/30 flex items-center justify-center text-[#0284c7]">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900">Documents Required</h3>
                            </div>
                            <SimpleAccordion
                                items={[
                                    { title: "KYC Documents", content: "Aadhaar Card, PAN Card, Current address proof." },
                                    { title: "Medical History", content: "Pre-existing disease declaration form if applicable." },
                                ]}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Form Sidebar */}
                <aside className="relative">
                    <div id="lead-form" className="sticky top-28">
                        <Card className="bg-white border border-slate-200 shadow-2xl rounded-[2.5rem] overflow-hidden text-white">
                            <CardHeader className="bg-gradient-to-r from-sky-700 via-sky-600 to-sky-800 text-slate-950 p-8">
                                <span className="text-[10px] font-black uppercase tracking-widest bg-[#f8fafc] text-white px-3 py-1 rounded-full w-fit">Cashless Mediclaim</span>
                                <CardTitle className="text-2xl font-black text-slate-950 mt-2">Get Health Insurance Plan</CardTitle>
                                <p className="text-slate-900 text-xs font-bold">Instant free comparison</p>
                            </CardHeader>
                            <CardContent className="p-8 space-y-4">
                                {isSuccess ? (
                                    <div className="text-center py-8 space-y-3">
                                        <div className="h-16 w-16 bg-[#0284c7] text-white rounded-full flex items-center justify-center mx-auto font-black">
                                            <CheckCircle2 className="h-8 w-8" />
                                        </div>
                                        <h4 className="text-xl font-black text-slate-900">Inquiry Received!</h4>
                                        <p className="text-xs text-slate-500">Our health advisor will contact you shortly.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-slate-500">Full Name</label>
                                            <Input
                                                placeholder="Enter full name"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-slate-500">Mobile Number</label>
                                            <Input
                                                placeholder="10-digit mobile"
                                                value={formData.mobile}
                                                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-[10px] font-black uppercase text-slate-500">City</label>
                                                <Input
                                                    placeholder="City"
                                                    value={formData.city}
                                                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black uppercase text-slate-500">Insured Members</label>
                                                <Input
                                                    placeholder="Self, Spouse, 2 Kids"
                                                    value={formData.members}
                                                    onChange={e => setFormData({ ...formData, members: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <Button className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-sm font-black h-14 text-sm rounded-full uppercase tracking-wider shadow-sm hover:shadow-md mt-4">
                                            Compare Health Quotes
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
