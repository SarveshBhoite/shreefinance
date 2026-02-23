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
        <div className="pb-20 bg-slate-50 dark:bg-black selection:bg-slate-500/30 font-sans">
            {/* Unique Hero Section - Corporate Power Theme */}
            <section className="relative pt-32 pb-32 overflow-hidden bg-slate-900 text-white">
                {/* Dark Metallic Background */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-black opacity-90"></div>

                {/* Accent Glow */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>

                <div className="container relative z-10 px-4 md:px-6 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-600/50 bg-slate-800/50 px-4 py-1.5 text-sm font-bold text-slate-300 mb-8 backdrop-blur-md">
                        <Building2 className="h-4 w-4 text-sky-400" />
                        <span>Executive Corporate Solutions</span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight leading-tight mb-6">
                        Power Up <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-slate-200 to-sky-400">Your Business.</span>
                    </h1>

                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
                        Streamline expenses, maximize cash flow, and unlock premium corporate privileges with our metal business cards.
                    </p>

                    <div className="flex justify-center flex-wrap gap-4 mb-20">
                        <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-2xl shadow-sky-900/20 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 border border-slate-600 text-white font-bold hover:scale-105 transition-transform" onClick={scrollToForm}>
                            Request Corporate Card
                        </Button>
                    </div>

                    {/* Floating Metal Card Animation */}
                    <div className="relative mx-auto w-full max-w-md perspective-1000 group">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-sky-500/20 rounded-xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

                        <motion.div
                            initial={{ y: 0, rotateX: 0, rotateY: 0 }}
                            animate={{ y: [0, -10, 0], rotateX: [0, 5, 0], rotateY: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                            className="relative aspect-[1.586/1] rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-2xl border border-gray-700 overflow-hidden transform-style-3d"
                        >
                            {/* Metal Texture */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-30 mix-blend-overlay"></div>

                            {/* Card Shine */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[length:200%_200%] animate-shine"></div>

                            {/* Card Elements */}
                            <div className="absolute top-6 right-6">
                                <span className="text-gray-300 font-bold italic text-xl tracking-widest opacity-80">Mastercard</span>
                                <span className="block text-[8px] text-sky-400 text-right tracking-widest uppercase mt-1">World Elite</span>
                            </div>

                            <div className="absolute top-6 left-6">
                                <div className="h-8 w-11 rounded bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-inner"></div>
                            </div>

                            <div className="absolute bottom-6 left-6 text-left z-10 w-full pr-12">
                                <div className="flex justify-between items-end">
                                    <div className="space-y-1">
                                        <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] mb-1">Business Platinum</p>
                                        <p className="text-gray-200 text-lg font-mono tracking-[0.15em] drop-shadow-md">5520 8812 3456 7890</p>
                                    </div>
                                    <Briefcase className="text-gray-600 h-8 w-8" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Expense Management Feature Strip */}
            <div className="bg-slate-900 border-y border-slate-800 py-10">
                <div className="container px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Integrated Expense Dashboard</h3>
                            <p className="text-slate-400">Track every penny in real-time with our advanced corporate portal.</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="px-6 py-3 rounded-xl bg-slate-800 border border-slate-700">
                                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Monthly Spend</p>
                                <p className="text-xl font-bold text-green-400 flex items-center gap-2"><TrendingUp className="h-4 w-4" /> ₹ 12.5L</p>
                            </div>
                            <div className="px-6 py-3 rounded-xl bg-slate-800 border border-slate-700">
                                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Savings</p>
                                <p className="text-xl font-bold text-sky-400">₹ 45k</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Layout with Sticky Sidebar */}
            <div className="container px-4 md:px-6 py-12 grid lg:grid-cols-[1fr_400px] gap-12">
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
                                <h4 className="font-bold text-sky-700 dark:text-sky-300 text-lg">Real-time</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Expense Tracking</p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                <h4 className="font-bold text-slate-700 dark:text-slate-300 text-lg">SaaS Offers</h4>
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
                                { title: "Travel", icon: Globe, desc: "Global Lounge Access & Flight Insurance", color: "text-sky-500", bg: "bg-sky-50" },
                                { title: "Vendor Payments", icon: Receipt, desc: "Pay vendors via card for credit period", color: "text-green-500", bg: "bg-green-50" },
                                { title: "Workspace", icon: Building2, desc: "Discounts on WeWork & Regus", color: "text-purple-500", bg: "bg-purple-50" },
                                { title: "Fuel", icon: Zap, desc: "Surcharge waiver & fleet management", color: "text-amber-500", bg: "bg-amber-50" }
                            ].map((item, i) => (
                                <div key={i} className={cn("p-6 rounded-3xl transition-transform hover:-translate-y-2 border border-slate-100 dark:border-slate-800", item.bg, "dark:bg-slate-900")}>
                                    <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center mb-4 bg-white dark:bg-slate-800 shadow-sm", item.color)}>
                                        <item.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-1 text-slate-900 dark:text-white">{item.title}</h3>
                                    <p className="text-slate-500 text-sm leading-snug">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Sticky Form */}
                <aside className="relative">
                    <div id="lead-form" className="sticky top-24">
                        <Card className="glass-card bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
                            <CardHeader className="bg-slate-900 text-white p-6">
                                <CardTitle className="text-lg">Contact Sales</CardTitle>
                                <p className="text-slate-400 text-sm">For custom corporate solutions</p>
                            </CardHeader>
                            <CardContent className="p-6">
                                {isSuccess ? (
                                    <div className="text-center py-8">
                                        <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle2 className="h-6 w-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Request Sent</h3>
                                        <p className="text-slate-600 dark:text-slate-300 mt-2">B2B Team will contact you.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Contact Person</label>
                                            <Input
                                                placeholder="Full Name"
                                                className="bg-slate-50 border-slate-200"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Company</label>
                                            <Input
                                                placeholder="Business Name"
                                                className="bg-slate-50 border-slate-200"
                                                value={formData.businessName}
                                                onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Mobile</label>
                                                <Input
                                                    placeholder="10 digit number"
                                                    className="bg-slate-50 border-slate-200"
                                                    value={formData.mobile}
                                                    onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Turnover</label>
                                                <Input
                                                    placeholder="Annual"
                                                    className="bg-slate-50 border-slate-200"
                                                    value={formData.turnover}
                                                    onChange={e => setFormData({ ...formData, turnover: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-12 text-base shadow-lg shadow-slate-900/20 mt-2">Request Callback</Button>
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
