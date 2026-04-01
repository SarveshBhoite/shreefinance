"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, TrendingUp, BarChart, CandlestickChart, ShieldCheck, Zap, Globe, ArrowUpRight, Smartphone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEmailForm } from "@/hooks/use-email-form";
import { cn } from "@/lib/utils";
import { ContentSection } from "@/components/ui/content-section";
import { SimpleAccordion } from "@/components/ui/simple-accordion";
import { motion } from "framer-motion";
import { DynamicHeroWrapper } from "@/components/dynamic-hero-wrapper";

export default function StocksPage() {
    const { sendEmail, isSubmitting, isSuccess, error, resetForm } = useEmailForm();
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        experience: "",
        capital: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendEmail({
            type: "Demat Account Inquiry",
            ...formData
        });
    };

    const scrollToForm = () => {
        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="pb-20 bg-slate-50 dark:bg-black selection:bg-primary/30 font-sans mx-auto">
            <DynamicHeroWrapper page="stocks">
                {/* Unique Hero Section - Bull Run Ocean Theme */}
                <section className="relative pt-12 md:pt-20 pb-32 overflow-hidden bg-gradient-to-b from-sky-950 to-sky-900 border-b border-primary/20 text-white">
                    {/* Grid Background - Ocean Style */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e91a_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e91a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-sky-950 via-transparent to-transparent"></div>

                    {/* Glowing Orbs */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] mix-blend-screen animate-[pulse_6s_ease-in-out_infinite]"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] mix-blend-screen animate-[pulse_8s_ease-in-out_infinite_1s]"></div>

                    <div className="container relative z-10 px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center mx-auto">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/20 px-4 py-1.5 text-sm font-bold text-sky-200 backdrop-blur-sm">
                                <ArrowUpRight className="h-4 w-4 text-accent" />
                                <span>Zero Brokerage on Delivery</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                                Master the <br />
                                <span className="text-gradient">Bull Market.</span>
                            </h1>

                            <p className="text-xl text-sky-100/70 max-w-lg leading-relaxed">
                                Open a FREE Demat account in 5 minutes. Real-time charts, advanced technical indicators, and lightning-fast execution.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/20 bg-primary hover:bg-sky-600 text-white font-bold border border-white/10 transition-all hover:scale-105" onClick={scrollToForm}>
                                    Open Free Account
                                </Button>
                            </div>

                            <div className="flex items-center gap-8 pt-4 border-t border-sky-800">
                                <div>
                                    <p className="text-3xl font-bold text-white flex items-center gap-1">₹0</p>
                                    <p className="text-xs text-sky-400 uppercase tracking-wider font-bold">Brokerage</p>
                                </div>
                                <div className="w-px h-10 bg-sky-800"></div>
                                <div>
                                    <p className="text-3xl font-bold text-white flex items-center gap-1">₹20</p>
                                    <p className="text-xs text-sky-400 uppercase tracking-wider font-bold">Intraday</p>
                                </div>
                                <div className="w-px h-10 bg-sky-800"></div>
                                <div>
                                    <p className="text-3xl font-bold text-white flex items-center gap-1">5m</p>
                                    <p className="text-xs text-sky-400 uppercase tracking-wider font-bold">Onboarding</p>
                                </div>
                            </div>
                        </div>

                        {/* Visual Hero Element - Candlestick Chart */}
                        <div className="relative hidden lg:block h-[500px]">
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* Chart Container - Ocean Blue Style */}
                                <div className="relative w-full max-w-md bg-sky-950/50 backdrop-blur-md rounded-2xl border border-sky-800 p-6 shadow-2xl overflow-hidden group ring-1 ring-white/10">
                                    {/* Header */}
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center font-bold text-white border border-white/20">N</div>
                                            <div>
                                                <p className="text-white font-bold tracking-tight">NIFTY 50</p>
                                                <p className="text-xs text-sky-400 font-medium">NSE India</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-emerald-400 font-bold text-xl flex items-center gap-1"><ArrowUpRight className="h-5 w-5" /> 22,450.00</p>
                                            <p className="text-emerald-500 text-xs font-bold">+1.25% Today</p>
                                        </div>
                                    </div>

                                    {/* Animated Candles */}
                                    <div className="h-48 flex items-end justify-between gap-1 px-2 relative">
                                        <div className="absolute top-10 left-0 right-0 h-px bg-sky-900 border-t border-dashed border-sky-800 opacity-50"></div>
                                        <div className="absolute bottom-10 left-0 right-0 h-px bg-sky-900 border-t border-dashed border-sky-800 opacity-50"></div>

                                        {[40, 60, 45, 70, 55, 80, 65, 90, 75, 100].map((h, i) => (
                                            <motion.div
                                                key={i}
                                                className={cn("w-full rounded-sm relative group cursor-pointer transition-all", i > 5 ? "bg-emerald-500/80 hover:bg-emerald-400" : "bg-rose-500/80 hover:bg-rose-400")}
                                                style={{ height: `${h}%` }}
                                                initial={{ scaleY: 0 }}
                                                animate={{ scaleY: 1 }}
                                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                            >
                                                {/* Wick */}
                                                <div className={cn("absolute -top-2 left-1/2 w-px h-full -translate-x-1/2 opacity-50", i > 5 ? "bg-emerald-500" : "bg-rose-500")}></div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Buy/Sell Buttons */}
                                    <div className="grid grid-cols-2 gap-4 mt-6">
                                        <div className="h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 font-bold text-sm cursor-pointer hover:bg-emerald-500/30 transition-colors">BUY</div>
                                        <div className="h-10 rounded-lg bg-rose-500/20 border border-rose-500/50 flex items-center justify-center text-rose-400 font-bold text-sm cursor-pointer hover:bg-rose-500/30 transition-colors">SELL</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </DynamicHeroWrapper>

            {/* Tech Strip */}
            <div className="bg-sky-950 border-y border-sky-900 py-8 backdrop-blur-sm">
                <div className="container px-4 text-center mx-auto">
                    <p className="text-sky-500 uppercase tracking-[0.2em] text-xs font-extrabold mb-6">Powered by Advanced Technology</p>
                    <div className="flex justify-center gap-12 items-center flex-wrap">
                        <span className="flex items-center gap-2 font-bold text-sky-200"><Smartphone className="h-5 w-5 text-primary" /> Mobile App</span>
                        <span className="flex items-center gap-2 font-bold text-sky-200"><Zap className="h-5 w-5 text-accent" /> High Speed Execution</span>
                        <span className="flex items-center gap-2 font-bold text-sky-200"><Globe className="h-5 w-5 text-primary" /> Global Markets</span>
                    </div>
                </div>
            </div>

            {/* Main Content Layout with Sticky Sidebar */}
            <div className="container px-4 md:px-6 py-12 grid lg:grid-cols-[1fr_400px] gap-12 mx-auto">
                {/* Left Column: Content */}
                <div className="space-y-16">
                    <ContentSection
                        title="Trade Like a Pro"
                        description="Experience trading like never before with our cutting-edge trading platforms. Whether you are a beginner looking to invest in blue-chip stocks or a seasoned trader executing F&O strategies, our platform provides the speed and stability you need. We offer comprehensive research reports, daily market calls, and educational webinars to help you make informed decisions. With our flat brokerage plans for intraday trading and zero brokerage on equity delivery, you keep more of your profits."
                        imageSrc="https://images.unsplash.com/photo-1611974765270-ca12586343bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                        imageAlt="Stock chart on screen"
                    >
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800 group transition-all hover:bg-sky-100">
                                <h4 className="font-bold text-primary dark:text-sky-300 text-lg">₹0</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Brokerage on Delivery</p>
                            </div>
                            <div className="p-4 rounded-xl bg-accent/10 dark:bg-accent/20 border border-accent/20 group transition-all hover:bg-accent/20">
                                <h4 className="font-bold text-accent text-lg">₹20</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Flat Fees on Intraday</p>
                            </div>
                        </div>
                    </ContentSection>

                    {/* Accordions */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <BarChart className="text-primary" /> Platform Features
                            </h3>
                            <SimpleAccordion
                                items={[
                                    { title: "Advanced Charting", content: "100+ technical indicators and drawing tools with TradingView integration." },
                                    { title: "Instant Fund Transfer", content: "UPI and Netbanking support for instant fund addition and withdrawal." },
                                    { title: "Margin Trading Facility", content: "Get up to 4x leverage on delivery trades with our Pay Later facility." },
                                ]}
                            />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <Globe className="text-accent" /> Investment Products
                            </h3>
                            <SimpleAccordion
                                items={[
                                    { title: "Equity", content: "Invest in shares of listed companies for long term wealth creation." },
                                    { title: "Derivatives (F&O)", content: "Trade in Futures and Options for hedging and speculation." },
                                    { title: "IPOs", content: "Apply for Initial Public Offerings seamlessly through UPI." },
                                ]}
                            />
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
                                        <TrendingUp className="h-6 w-6 text-white" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-accent text-slate-900 px-3 py-1 rounded-full shadow-lg">Zero Brokerage</span>
                                </div>
                                <CardTitle className="text-2xl font-black tracking-tight leading-none mb-2">Free Account</CardTitle>
                                <p className="text-sky-100/70 text-xs font-bold uppercase tracking-widest tracking-tighter">Start trading in 5 mins</p>
                            </CardHeader>
                            <CardContent className="p-8 -mt-6 bg-white dark:bg-slate-950 rounded-t-[2.5rem] relative z-10 shadow-2xl">
                                {isSuccess ? (
                                    <div className="text-center py-10">
                                        <div className="h-20 w-20 bg-primary rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/30">
                                            <CheckCircle2 className="h-10 w-10 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Request Received</h3>
                                        <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-widest leading-loose">Check your email for login details.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Full Name</label>
                                            <Input
                                                placeholder="Enter Name"
                                                className="h-14 bg-slate-50 dark:bg-sky-950/20 border-slate-100 dark:border-primary/10 rounded-2xl font-bold px-6 focus:ring-primary shadow-sm"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Mobile Access</label>
                                            <Input
                                                placeholder="10-digit number"
                                                className="h-14 bg-slate-50 dark:bg-sky-950/20 border-slate-100 dark:border-primary/10 rounded-2xl font-bold px-6 focus:ring-primary shadow-sm"
                                                value={formData.mobile}
                                                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Experience</label>
                                                <select
                                                    className="flex h-14 w-full rounded-2xl border border-slate-100 bg-slate-50 dark:bg-sky-950/20 dark:border-primary/10 px-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary transition-all text-slate-700 dark:text-slate-200"
                                                    value={formData.experience}
                                                    onChange={e => setFormData({ ...formData, experience: e.target.value })}
                                                >
                                                    <option value="">Select</option>
                                                    <option value="New">New</option>
                                                    <option value="1-3">1-3 Yrs</option>
                                                    <option value="Pro">Pro</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Capital</label>
                                                <Input
                                                    placeholder="Target"
                                                    className="h-14 bg-slate-50 dark:bg-sky-950/20 border-slate-100 dark:border-primary/10 rounded-2xl font-bold px-6 focus:ring-primary shadow-sm"
                                                    value={formData.capital}
                                                    onChange={e => setFormData({ ...formData, capital: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <Button className="w-full bg-primary hover:bg-sky-600 text-white font-black h-16 text-lg rounded-2xl shadow-2xl shadow-primary/20 mt-4 transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-widest border border-white/10">Unlock Free Account</Button>
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
