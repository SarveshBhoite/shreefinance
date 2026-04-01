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
        <div className="pb-20 bg-slate-50 dark:bg-black selection:bg-primary/30 font-sans mx-auto">
            <DynamicHeroWrapper page="business-cards">
                {/* Unique Hero Section - Corporate Power Ocean Theme */}
                <section className="relative pt-32 pb-32 overflow-hidden bg-gradient-to-b from-sky-950 to-sky-900 border-b border-primary/20 text-white">
                    {/* Dark Metallic Background - Ocean Style */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-950 via-sky-900 to-black opacity-90"></div>

                    {/* Accent Glow */}
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-[pulse_6s_ease-in-out_infinite]"></div>

                    <div className="container relative z-10 px-4 md:px-6 text-center mx-auto">
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-bold text-sky-200 mb-8 backdrop-blur-sm">
                            <Building2 className="h-4 w-4 text-accent" />
                            <span>Executive Corporate Solutions</span>
                        </div>

                        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight leading-tight mb-6">
                            Power Up <br />
                            <span className="text-gradient">Your Business.</span>
                        </h1>

                        <p className="text-xl text-sky-100/70 max-w-2xl mx-auto leading-relaxed mb-10">
                            Streamline expenses, maximize cash flow, and unlock premium corporate privileges with our metal business cards.
                        </p>

                        <div className="flex justify-center flex-wrap gap-4 mb-20">
                            <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-2xl shadow-primary/20 bg-primary hover:bg-sky-600 border border-white/10 text-white font-bold hover:scale-105 transition-all" onClick={scrollToForm}>
                                Request Corporate Card
                            </Button>
                        </div>

                        {/* Floating Metal Card Animation */}
                        <div className="relative mx-auto w-full max-w-md perspective-1000 group">
                            {/* Glow effect - Ocean Blue & Gold */}
                            <div className="absolute inset-0 bg-primary/20 rounded-xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

                            <motion.div
                                initial={{ y: 0, rotateX: 0, rotateY: 0 }}
                                animate={{ y: [0, -10, 0], rotateX: [0, 5, 0], rotateY: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                                className="relative aspect-[1.586/1] rounded-xl bg-gradient-to-br from-sky-950 via-slate-900 to-black shadow-2xl border border-white/10 overflow-hidden transform-style-3d ring-1 ring-white/10"
                            >
                                {/* Metal Texture */}
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-30 mix-blend-overlay"></div>

                                {/* Card Shine */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[length:200%_200%] animate-shine"></div>

                                {/* Card Elements */}
                                <div className="absolute top-6 right-6">
                                    <span className="text-sky-100 font-bold italic text-xl tracking-widest opacity-80">Mastercard</span>
                                    <span className="block text-[8px] text-primary text-right tracking-widest uppercase mt-1">World Elite</span>
                                </div>

                                <div className="absolute top-6 left-6">
                                    <div className="h-8 w-11 rounded bg-gradient-to-br from-accent to-yellow-600 shadow-inner"></div>
                                </div>

                                <div className="absolute bottom-6 left-6 text-left z-10 w-full pr-12">
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-1">
                                            <p className="text-sky-400 text-[10px] uppercase tracking-[0.2em] mb-1">Business Platinum</p>
                                            <p className="text-white text-lg font-mono tracking-[0.15em] drop-shadow-md">5520 8812 3456 7890</p>
                                        </div>
                                        <Briefcase className="text-sky-700 h-8 w-8" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </DynamicHeroWrapper>

            {/* Expense Management Feature Strip */}
            <div className="bg-sky-950 border-y border-sky-900 py-10">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Integrated Expense Dashboard</h3>
                            <p className="text-sky-200/60">Track every penny in real-time with our advanced corporate portal.</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="px-6 py-3 rounded-xl bg-sky-900/40 border border-sky-800 backdrop-blur-sm">
                                <p className="text-xs text-sky-400 uppercase tracking-wider mb-1 font-bold">Monthly Spend</p>
                                <p className="text-xl font-bold text-emerald-400 flex items-center gap-2"><TrendingUp className="h-4 w-4" /> ₹ 12.5L</p>
                            </div>
                            <div className="px-6 py-3 rounded-xl bg-sky-900/40 border border-sky-800 backdrop-blur-sm">
                                <p className="text-xs text-sky-400 uppercase tracking-wider mb-1 font-bold">Savings</p>
                                <p className="text-xl font-bold text-primary">₹ 45k</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Layout with Sticky Sidebar */}
            <div className="container px-4 md:px-6 py-12 grid lg:grid-cols-[1fr_400px] gap-12 mx-auto">
                {/* Left Column: Content */}
                <div className="space-y-16">
                    <ContentSection
                        title="Seamless Expense Management"
                        description="Managing business expenses shouldn't be a hassle. Our Corporate Credit Cards allow you to set individual spending limits for employees, track expenses in real-time through a dedicated dashboard, and integrate seamlessly with accounting software like Tally and Zoho Books. Enjoy up to 50 days of interest-free credit to manage your working capital efficiently. Plus, get specialized offers on software subscriptions, co-working spaces, and business travel."
                        imageSrc="https://images.unsplash.com/photo-1554774853-719586f8c277?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                        imageAlt="Business meeting"
                    >
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800">
                                <h4 className="font-bold text-primary dark:text-sky-300 text-lg">Real-time</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Expense Tracking</p>
                            </div>
                            <div className="p-4 rounded-xl bg-accent/10 dark:bg-accent/20 border border-accent/20">
                                <h4 className="font-bold text-accent text-lg">SaaS Offers</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">AWS, Google, Zoho</p>
                            </div>
                        </div>
                    </ContentSection>

                    {/* Rewards Grid */}
                    <div className="space-y-8">
                        <div className="text-left mb-6">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Business Privileges</h2>
                            <p className="text-slate-500">Tools to grow your business.</p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {[
                                { title: "Travel", icon: Globe, desc: "Global Lounge Access & Flight Insurance", color: "text-primary", bg: "bg-sky-50" },
                                { title: "Vendor Payments", icon: Receipt, desc: "Pay vendors via card for credit period", color: "text-accent", bg: "bg-sky-100/50" },
                                { title: "Workspace", icon: Building2, desc: "Discounts on WeWork & Regus", color: "text-primary", bg: "bg-sky-50" },
                                { title: "Fuel", icon: Zap, desc: "Surcharge waiver & fleet management", color: "text-accent", bg: "bg-sky-100/50" }
                            ].map((item, i) => (
                                <div key={i} className={cn("p-6 rounded-3xl transition-all duration-300 hover:-translate-y-2 border border-sky-100 dark:border-sky-900 group", item.bg, "dark:bg-sky-950/40")}>
                                    <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center mb-4 bg-white dark:bg-sky-900 shadow-sm transition-transform group-hover:scale-110", item.color)}>
                                        <item.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-1 text-slate-900 dark:text-white group-hover:text-primary transition-colors">{item.title}</h3>
                                    <p className="text-slate-500 text-sm leading-snug">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Sticky Form */}
                <aside className="relative">
                    <div id="lead-form" className="sticky top-32">
                        <Card className="glass-card bg-white/90 dark:bg-slate-900/90 border-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden rounded-[2.5rem] ring-1 ring-primary/5">
                            <CardHeader className="bg-gradient-to-r from-primary to-sky-700 text-white p-8 pb-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                                        <Briefcase className="h-6 w-6 text-white" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-accent text-slate-900 px-3 py-1 rounded-full shadow-lg">Corporate Elite</span>
                                </div>
                                <CardTitle className="text-2xl font-black tracking-tight leading-none mb-2">Contact Sales</CardTitle>
                                <p className="text-sky-100/70 text-xs font-bold uppercase tracking-widest tracking-tighter">For custom corporate solutions</p>
                            </CardHeader>
                            <CardContent className="p-8 -mt-6 bg-white dark:bg-slate-950 rounded-t-[2.5rem] relative z-10 shadow-2xl">
                                {isSuccess ? (
                                    <div className="text-center py-10">
                                        <div className="h-20 w-20 bg-primary rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/30">
                                            <CheckCircle2 className="h-10 w-10 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Request Sent</h3>
                                        <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-widest leading-loose">Our B2B team will contact you shortly.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Contact Person</label>
                                            <Input
                                                placeholder="Full Name"
                                                className="h-14 bg-slate-50 dark:bg-sky-950/20 border-slate-100 dark:border-primary/10 rounded-2xl font-bold px-6 focus:ring-primary shadow-sm"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Company Name</label>
                                            <Input
                                                placeholder="Business Name"
                                                className="h-14 bg-slate-50 dark:bg-sky-950/20 border-slate-100 dark:border-primary/10 rounded-2xl font-bold px-6 focus:ring-primary shadow-sm"
                                                value={formData.businessName}
                                                onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Mobile Access</label>
                                                <Input
                                                    placeholder="10-digit #"
                                                    className="h-14 bg-slate-50 dark:bg-sky-950/20 border-slate-100 dark:border-primary/10 rounded-2xl font-bold px-6 focus:ring-primary shadow-sm"
                                                    value={formData.mobile}
                                                    onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Annual Turnover</label>
                                                <Input
                                                    placeholder="e.g. 5 Cr"
                                                    className="h-14 bg-slate-50 dark:bg-sky-950/20 border-slate-100 dark:border-primary/10 rounded-2xl font-bold px-6 focus:ring-primary shadow-sm"
                                                    value={formData.turnover}
                                                    onChange={e => setFormData({ ...formData, turnover: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <Button className="w-full bg-primary hover:bg-sky-600 text-white font-black h-16 text-lg rounded-2xl shadow-2xl shadow-primary/20 mt-4 transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-widest border border-white/10">Request Callback</Button>
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
