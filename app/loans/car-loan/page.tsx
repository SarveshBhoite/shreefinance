"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EMICalculator } from "@/components/calculators/emi-calculator";
import { CheckCircle2, Car, Gauge, MapPin, Zap, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEmailForm } from "@/hooks/use-email-form";
import { cn } from "@/lib/utils";
import { ContentSection } from "@/components/ui/content-section";
import { SimpleAccordion } from "@/components/ui/simple-accordion";
import { DynamicHeroWrapper } from "@/components/dynamic-hero-wrapper";
import { Deal4LoansDynamicForm } from "@/components/forms/deal4loans-dynamic-form";

export default function CarLoanPage() {
    const { sendEmail, isSubmitting, isSuccess } = useEmailForm();
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        city: "",
        income: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendEmail({
            type: "Car Loan Application",
            ...formData
        });
    };

    const scrollToForm = () => {
        document.getElementById('deal4loans-car-apply')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="pb-20 bg-white text-white font-sans mx-auto">
            <DynamicHeroWrapper page="car-loan">
                {/* Hero Section */}
                <section className="relative pt-12 md:pt-20 pb-20 overflow-hidden bg-white text-white border-b border-slate-200">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0284c7]/10 rounded-full blur-[120px] pointer-events-none" />

                    <div className="container px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 mx-auto">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-50 px-4 py-1.5 text-xs font-black text-[#0284c7] uppercase tracking-widest">
                                <Car className="h-4 w-4 text-[#0284c7]" />
                                <span>Drive Home Your Dream Car</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-slate-900">
                                The Road is <br />
                                <span className="text-[#0284c7]">Calling.</span>
                            </h1>

                            <p className="text-xl text-slate-600 max-w-lg leading-relaxed font-medium">
                                Get up to 100% On-Road funding with interest rates starting at 8.75% p.a. Fast-track approval for new and used cars.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="h-14 px-8 text-sm font-black rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-sm uppercase tracking-wider transition-all hover:scale-105" onClick={scrollToForm}>
                                    Get On-Road Sanction
                                </Button>
                            </div>
                        </div>

                        {/* Visual Hero Element */}
                        <div className="relative hidden lg:flex justify-center items-center h-[450px]">
                            <Card className="bg-white border border-slate-200 rounded-[2.5rem] p-8 text-white shadow-2xl space-y-6 w-full max-w-md">
                                <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                                    <div className="h-12 w-12 rounded-2xl bg-[#0284c7]/15 border border-[#0284c7]/30 flex items-center justify-center text-[#0284c7]">
                                        <Car className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-white">100% On-Road Funding</h3>
                                        <p className="text-xs text-slate-500 font-medium">Instant Pre-Approved Deals</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center bg-white p-3.5 rounded-2xl border border-slate-200 text-xs">
                                        <span className="text-slate-500 font-bold">Interest Rate</span>
                                        <span className="font-black text-[#0284c7] text-sm">From 8.75% p.a.</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white p-3.5 rounded-2xl border border-slate-200 text-xs">
                                        <span className="text-slate-500 font-bold">Max Tenure</span>
                                        <span className="font-black text-white text-sm">Up to 7 Years</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white p-3.5 rounded-2xl border border-slate-200 text-xs">
                                        <span className="text-slate-500 font-bold">Processing Fee</span>
                                        <span className="font-black text-amber-300 text-sm">Zero Fee Scheme</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>
            </DynamicHeroWrapper>

            {/* Instant Car Loan Deal4Loans Form */}
            <section className="py-12 container px-4 mx-auto scroll-mt-24" id="deal4loans-car-apply">
                <Deal4LoansDynamicForm initialLoanType="car" showCategorySwitcher={true} />
            </section>

            {/* Fast Track Process */}
            <section className="py-16 relative z-20">
                <div className="container px-4 mx-auto">
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        {[
                            { title: "Select Dream Car", desc: "New or Used Car", icon: Car, color: "text-[#0284c7]" },
                            { title: "Instant Sanction", desc: "Minimal Docs Required", icon: Gauge, color: "text-amber-400" },
                            { title: "Drive Away", desc: "Direct Dealer Disbursal", icon: MapPin, color: "text-[#0284c7]" }
                        ].map((item, i) => (
                            <Card key={i} className="bg-white border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 rounded-3xl p-6 text-white">
                                <CardContent className="p-4 flex flex-col items-center">
                                    <div className={cn("h-16 w-16 rounded-full bg-[#0284c7]/15 border border-[#0284c7]/30 flex items-center justify-center mb-4", item.color)}>
                                        <item.icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-xl font-black mb-2 text-white">{item.title}</h3>
                                    <p className="text-slate-500 font-medium text-xs">{item.desc}</p>
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
                    <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md text-white">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-[#0284c7]/15 border border-[#0284c7]/30 rounded-xl text-[#0284c7]">
                                <Gauge className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900">Calculate Car Loan EMI</h3>
                        </div>
                        <EMICalculator defaultAmount={800000} defaultRate={8.75} defaultTenure={5} />
                    </div>

                    <ContentSection
                        title="Drive Your Dream Car Home Today"
                        description="Whether you're purchasing a brand new SUV, a luxury sedan, or a certified pre-owned car, our Car Loan solutions offer 100% on-road financing with zero down payment options. Enjoy instant approval, flexible tenure options up to 7 years, and seamless dealer disbursal."
                        imageSrc="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                        imageAlt="Sleek Luxury Car on Open Road"
                    />

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-full bg-[#0284c7]/15 border border-[#0284c7]/30 flex items-center justify-center text-[#0284c7]">
                                    <CheckCircle2 className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900">Eligibility Criteria</h3>
                            </div>
                            <SimpleAccordion
                                items={[
                                    { title: "Age Limit", content: "21 to 65 years for salaried and self-employed applicants." },
                                    { title: "Minimum Income", content: "Minimum monthly net income of ₹20,000 for salaried & ₹3 Lakhs annual profit for self-employed." },
                                    { title: "Employment Stability", content: "At least 1 year in current job or 2 years in current business." },
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
                                    { title: "KYC Proofs", content: "Aadhaar, PAN Card, Passport / Driving License." },
                                    { title: "Income Proof", content: "Last 3 months salary slips or 2 years ITR returns." },
                                    { title: "Bank Statement", content: "Last 6 months bank statement showing regular income." },
                                ]}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column: Form Sidebar */}
                <aside className="relative">
                    <div id="lead-form" className="sticky top-28">
                        <Card className="bg-white border border-slate-200 shadow-2xl rounded-[2.5rem] overflow-hidden text-white">
                            <CardHeader className="bg-gradient-to-r from-sky-700 via-sky-600 to-sky-800 text-slate-950 p-6 sm:p-8">
                                <span className="text-[10px] font-black uppercase tracking-widest bg-[#f8fafc] text-white px-3 py-1 rounded-full w-fit">
                                    Shree Finance Direct Bank Facility
                                </span>
                                <CardTitle className="text-2xl font-black text-slate-950 mt-2">Car Loan Application</CardTitle>
                                <p className="text-slate-900 text-xs font-bold">100% On-Road Sanction • 8.75% p.a. onwards</p>
                            </CardHeader>
                            <CardContent className="p-6 sm:p-8 space-y-4">
                                {isSuccess ? (
                                    <div className="text-center py-8 space-y-3">
                                        <div className="h-16 w-16 bg-[#0284c7] text-white rounded-full flex items-center justify-center mx-auto font-black">
                                            <CheckCircle2 className="h-8 w-8" />
                                        </div>
                                        <h4 className="text-xl font-black text-slate-900">Application Received!</h4>
                                        <p className="text-xs text-slate-500">Our car loan direct bank advisor will reach out shortly.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-3.5">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase text-slate-500">Car Loan Purpose</label>
                                            <select
                                                className="w-full h-11 bg-white border border-slate-200 rounded-xl font-bold text-white px-3 text-xs focus:ring-2 focus:ring-[#0284c7]"
                                                onChange={(e) => setFormData({ ...formData, city: formData.city })}
                                            >
                                                <option value="New Passenger Car">🚗 New Passenger Car / SUV Purchase</option>
                                                <option value="Used / Pre-Owned Car">🚙 Certified Used / Pre-Owned Car</option>
                                                <option value="Commercial Vehicle">🚐 Commercial Fleet / Taxi Vehicle</option>
                                                <option value="EV Vehicle">⚡ Electric Vehicle (EV) Special Funding</option>
                                            </select>
                                        </div>
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
                                        <div className="grid grid-cols-2 gap-3">
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
                                                <label className="text-[10px] font-black uppercase text-slate-500">Monthly Income</label>
                                                <Input
                                                    placeholder="₹ Income"
                                                    value={formData.income}
                                                    onChange={e => setFormData({ ...formData, income: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <Button className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-sm font-black h-13 text-xs sm:text-sm rounded-full uppercase tracking-wider shadow-sm hover:shadow-md mt-3 cursor-pointer">
                                            Apply Direct Bank Facility 🚀
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
