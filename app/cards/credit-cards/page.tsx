"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, CreditCard, Gift, Plane, Crown, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEmailForm } from "@/hooks/use-email-form";
import { cn } from "@/lib/utils";
import { ContentSection } from "@/components/ui/content-section";
import { DynamicHeroWrapper } from "@/components/dynamic-hero-wrapper";

export default function CreditCardsPage() {
    const { sendEmail, isSuccess } = useEmailForm();
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        income: "",
        city: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendEmail({
            type: "Credit Card Application",
            ...formData
        });
    };

    const scrollToForm = () => {
        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="pb-20 bg-[#181a1d] text-white font-sans mx-auto">
            <DynamicHeroWrapper page="credit-cards">
                {/* Hero Section */}
                <section className="relative pt-12 md:pt-20 pb-20 overflow-hidden bg-[#181a1d] text-white border-b border-slate-800 mx-auto">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#00c985]/10 rounded-full blur-[120px] pointer-events-none"></div>

                    <div className="container relative z-10 px-4 md:px-6 text-center mx-auto space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-black text-[#00e699] uppercase tracking-widest">
                            <Crown className="h-4 w-4 fill-amber-300 text-amber-300" />
                            <span>Experience True Privilege</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight text-white">
                            Unlock a World of <br />
                            <span className="text-[#00e699]">Privileges.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
                            From exclusive airport lounges to accelerated reward points, our credit cards are designed to complement your lifestyle.
                        </p>

                        <div className="flex justify-center flex-wrap gap-4 pt-4">
                            <Button size="lg" className="h-14 px-10 text-sm font-black rounded-full bg-[#00c985] hover:bg-[#00b074] text-slate-950 uppercase tracking-wider transition-all hover:scale-105" onClick={scrollToForm}>
                                Apply For Instant Card
                            </Button>
                        </div>
                    </div>
                </section>
            </DynamicHeroWrapper>

            {/* Premium Categories */}
            <section className="py-16 relative z-10">
                <div className="container px-4 mx-auto">
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        {[
                            { title: "Travel & Airport Lounge", desc: "Complimentary lounge passes & 0% forex fee", icon: Plane, color: "text-[#00c985]" },
                            { title: "Shopping & Cashback", desc: "Unlimited 5% cashback on top merchants", icon: Gift, color: "text-amber-400" },
                            { title: "Elite Rewards", desc: "10x reward points on all daily spends", icon: Sparkles, color: "text-[#00e699]" }
                        ].map((item, i) => (
                            <Card key={i} className="bg-[#24272c] border border-slate-800 shadow-xl hover:-translate-y-1.5 transition-all duration-300 rounded-3xl p-6 text-white">
                                <CardContent className="p-4 flex flex-col items-center">
                                    <div className={cn("h-16 w-16 rounded-full bg-[#00c985]/15 border border-[#00c985]/30 flex items-center justify-center mb-4", item.color)}>
                                        <item.icon className="h-8 w-8" />
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
                    <ContentSection
                        title="Card Rewards Tailored For You"
                        description="Access pre-approved lifetime free credit cards from top partner banks including YES Bank, HDFC, ICICI, and Axis Bank. Instant paperless sanction with welcome gift vouchers worth up to ₹2,000."
                        imageSrc="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80"
                        imageAlt="Premium Credit Card Lifestyle"
                    />
                </div>

                {/* Right Form Sidebar */}
                <aside className="relative">
                    <div id="lead-form" className="sticky top-28">
                        <Card className="bg-[#24272c] border border-slate-800 shadow-2xl rounded-[2.5rem] overflow-hidden text-white">
                            <CardHeader className="bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-400 text-slate-950 p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-slate-950 rounded-2xl text-white">
                                        <CreditCard className="h-6 w-6" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest bg-slate-950 text-white px-3 py-1 rounded-full">Instant Digital Approval</span>
                                </div>
                                <CardTitle className="text-2xl font-black text-slate-950">Apply For Credit Card</CardTitle>
                                <p className="text-slate-900 text-xs font-bold mt-1">Zero impact on credit score</p>
                            </CardHeader>
                            <CardContent className="p-8 space-y-4">
                                {isSuccess ? (
                                    <div className="text-center py-8 space-y-3">
                                        <div className="h-16 w-16 bg-[#00c985] text-slate-950 rounded-full flex items-center justify-center mx-auto font-black">
                                            <CheckCircle2 className="h-8 w-8" />
                                        </div>
                                        <h4 className="text-xl font-black text-white">Application Received!</h4>
                                        <p className="text-xs text-slate-400">Our card specialist will reach out shortly.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-slate-400">Full Name</label>
                                            <Input
                                                placeholder="Enter full name"
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
                                        <div className="grid grid-cols-2 gap-4">
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
                                                <label className="text-[10px] font-black uppercase text-slate-400">Monthly Salary</label>
                                                <Input
                                                    placeholder="₹ Salary"
                                                    value={formData.income}
                                                    onChange={e => setFormData({ ...formData, income: e.target.value })}
                                                    required
                                                />
                                            </div>
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
