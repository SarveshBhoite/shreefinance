"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Briefcase, Globe, Building2, ShieldCheck, Zap, Receipt, CreditCard, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEmailForm } from "@/hooks/use-email-form";
import { cn } from "@/lib/utils";
import { ContentSection } from "@/components/ui/content-section";
import { motion } from "framer-motion";
import { DynamicHeroWrapper } from "@/components/dynamic-hero-wrapper";

export default function BusinessCardsPage() {
    const { sendEmail, isSubmitting, isSuccess, error, resetForm } = useEmailForm();
    const [formData, setFormData] = useState({
        name: "",
        businessName: "",
        turnover: "",
        mobile: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendEmail({
            type: "Business Card Application",
            ...formData
        });
    };

    const scrollToForm = () => {
        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="pb-20 bg-white text-slate-900 selection:bg-primary/30 font-sans mx-auto min-h-screen">
            <DynamicHeroWrapper page="business-cards">
                {/* Unique Hero Section - Crisp White & Navy Blue Theme */}
                <section className="relative pt-12 md:pt-20 pb-24 overflow-hidden bg-[#f8fafc] border-b border-slate-200 text-slate-900">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-100/50 rounded-full blur-[140px] pointer-events-none" />

                    <div className="container relative z-10 px-4 md:px-6 text-center mx-auto">
                        <div className="inline-flex items-center gap-2 rounded-full border border-sky-300 bg-sky-50 px-4 py-1.5 text-xs font-black text-[#0284c7] uppercase tracking-widest mb-6 shadow-xs">
                            <Building2 className="h-4 w-4 text-[#0284c7]" />
                            <span>Executive Corporate Card Solutions</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-tight text-slate-900 mb-6">
                            Power Up <br />
                            <span className="text-[#0284c7]">Your Business.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8 font-medium">
                            Streamline expenses, maximize cash flow, and unlock premium corporate privileges with our metal business cards.
                        </p>

                        <div className="flex justify-center flex-wrap gap-4 mb-16">
                            <Button size="lg" className="h-14 px-10 text-sm font-black rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md uppercase tracking-wider transition-all hover:scale-105" onClick={scrollToForm}>
                                Request Corporate Card
                            </Button>
                        </div>

                        {/* Floating Metal Card Animation */}
                        <div className="relative mx-auto w-full max-w-md perspective-1000 group">
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-[#0284c7]/20 rounded-2xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

                            <motion.div
                                initial={{ y: 0, rotateX: 0, rotateY: 0 }}
                                animate={{ y: [0, -10, 0], rotateX: [0, 5, 0], rotateY: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                                className="relative aspect-[1.586/1] rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 shadow-2xl border border-slate-700 overflow-hidden transform-style-3d ring-1 ring-white/10"
                            >
                                {/* Metal Texture */}
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-30 mix-blend-overlay"></div>

                                {/* Card Shine */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[length:200%_200%] animate-shine"></div>

                                {/* Card Elements */}
                                <div className="absolute top-6 right-6">
                                    <span className="text-white font-bold italic text-xl tracking-widest opacity-90">Mastercard</span>
                                    <span className="block text-[8px] text-[#38bdf8] text-right tracking-widest uppercase mt-1 font-bold">World Elite</span>
                                </div>

                                <div className="absolute top-6 left-6">
                                    <div className="h-8 w-11 rounded-lg bg-gradient-to-br from-amber-300 to-amber-500 shadow-inner"></div>
                                </div>

                                <div className="absolute bottom-6 left-6 text-left z-10 w-full pr-12">
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-1">
                                            <p className="text-[#38bdf8] text-[10px] uppercase tracking-[0.2em] mb-1 font-bold">Business Platinum</p>
                                            <p className="text-white text-lg font-mono tracking-[0.15em] drop-shadow-md">5520 8812 3456 7890</p>
                                        </div>
                                        <Briefcase className="text-sky-400 h-8 w-8" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </DynamicHeroWrapper>

            {/* Expense Management Feature Strip */}
            <div className="bg-[#f8fafc] border-b border-slate-200 py-10">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 mb-2">Integrated Expense Dashboard</h3>
                            <p className="text-slate-600 text-sm">Track every penny in real-time with our advanced corporate portal.</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="px-6 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-bold">Monthly Spend</p>
                                <p className="text-xl font-black text-black flex items-center gap-2"><TrendingUp className="h-4 w-4 text-[#0284c7]" /> ₹ 12.5L</p>
                            </div>
                            <div className="px-6 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-bold">Savings</p>
                                <p className="text-xl font-black text-black">₹ 45k</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Layout with Sticky Sidebar */}
            <div className="container px-4 md:px-6 py-16 grid lg:grid-cols-[1fr_400px] gap-12 mx-auto">
                {/* Left Column: Content */}
                <div className="space-y-16">
                    <ContentSection
                        title="Seamless Expense Management"
                        description="Managing business expenses shouldn't be a hassle. Our Corporate Credit Cards allow you to set individual spending limits for employees, track expenses in real-time through a dedicated dashboard, and integrate seamlessly with accounting software like Tally and Zoho Books. Enjoy up to 50 days of interest-free credit to manage your working capital efficiently. Plus, get specialized offers on software subscriptions, co-working spaces, and business travel."
                        imageSrc="https://images.unsplash.com/photo-1554774853-719586f8c277?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                        imageAlt="Business meeting"
                    >
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
                                <h4 className="font-bold text-[#0284c7] text-lg">Real-time</h4>
                                <p className="text-sm text-slate-600">Expense Tracking</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
                                <h4 className="font-bold text-[#0284c7] text-lg">SaaS Offers</h4>
                                <p className="text-sm text-slate-600">AWS, Google, Zoho</p>
                            </div>
                        </div>
                    </ContentSection>

                    {/* Rewards Grid */}
                    <div className="space-y-8">
                        <div className="text-left mb-6">
                            <h2 className="text-3xl font-black text-slate-900 mb-2">Business Privileges</h2>
                            <p className="text-slate-600 text-sm">Tools to grow your business.</p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {[
                                { title: "Travel", icon: Globe, desc: "Global Lounge Access & Flight Insurance" },
                                { title: "Vendor Payments", icon: Receipt, desc: "Pay vendors via card for credit period" },
                                { title: "Workspace", icon: Building2, desc: "Discounts on WeWork & Regus" },
                                { title: "Fuel", icon: Zap, desc: "Surcharge waiver & fleet management" }
                            ].map((item, i) => (
                                <div key={i} className="p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1.5 border border-slate-200 bg-white hover:border-[#0284c7] shadow-sm hover:shadow-md group">
                                    <div className="h-12 w-12 rounded-2xl flex items-center justify-center mb-4 bg-sky-50 text-[#0284c7] border border-sky-200 shadow-xs transition-transform group-hover:scale-110">
                                        <item.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-black mb-1 text-slate-900 group-hover:text-[#0284c7] transition-colors">{item.title}</h3>
                                    <p className="text-slate-600 text-sm leading-snug">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Sticky Form */}
                <aside className="relative">
                    <div id="lead-form" className="sticky top-32">
                        <Card className="bg-white border border-slate-200 shadow-xl overflow-hidden rounded-[2.5rem]">
                            <CardHeader className="bg-gradient-to-r from-sky-700 via-sky-600 to-sky-800 text-white p-8 pb-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                                        <Briefcase className="h-6 w-6 text-white" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-white text-[#0284c7] px-3 py-1 rounded-full shadow-sm">Corporate Elite</span>
                                </div>
                                <CardTitle className="text-2xl font-black tracking-tight leading-none mb-2 text-white">Contact Sales</CardTitle>
                                <p className="text-sky-100 text-xs font-bold uppercase tracking-wider">For custom corporate solutions</p>
                            </CardHeader>
                            <CardContent className="p-8 -mt-6 bg-white rounded-t-[2.5rem] relative z-10 shadow-sm">
                                {isSuccess ? (
                                    <div className="text-center py-10">
                                        <div className="h-20 w-20 bg-sky-100 text-[#0284c7] rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-sm border border-sky-200">
                                            <CheckCircle2 className="h-10 w-10" />
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 mb-2">Request Sent</h3>
                                        <p className="text-slate-600 font-bold uppercase text-xs tracking-widest leading-loose">Our B2B team will contact you shortly.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 ml-1">Contact Person</label>
                                            <Input
                                                placeholder="Full Name"
                                                className="h-12 bg-white border-slate-300 text-slate-900 rounded-xl font-bold px-4 focus:ring-2 focus:ring-[#0284c7] text-xs"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 ml-1">Company Name</label>
                                            <Input
                                                placeholder="Business Name"
                                                className="h-12 bg-white border-slate-300 text-slate-900 rounded-xl font-bold px-4 focus:ring-2 focus:ring-[#0284c7] text-xs"
                                                value={formData.businessName}
                                                onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 ml-1">Mobile Access</label>
                                                <Input
                                                    placeholder="10-digit #"
                                                    className="h-12 bg-white border-slate-300 text-slate-900 rounded-xl font-bold px-4 focus:ring-2 focus:ring-[#0284c7] text-xs"
                                                    value={formData.mobile}
                                                    onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 ml-1">Annual Turnover</label>
                                                <Input
                                                    placeholder="e.g. 5 Cr"
                                                    className="h-12 bg-white border-slate-300 text-slate-900 rounded-xl font-bold px-4 focus:ring-2 focus:ring-[#0284c7] text-xs"
                                                    value={formData.turnover}
                                                    onChange={e => setFormData({ ...formData, turnover: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <Button className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white font-black h-14 text-sm rounded-xl shadow-md mt-4 transition-all hover:scale-[1.01] active:scale-95 uppercase tracking-wider cursor-pointer">
                                            Request Callback
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
