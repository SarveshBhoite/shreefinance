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
        <div className="pb-20 bg-slate-50 dark:bg-black selection:bg-indigo-500/30 font-sans">
            {/* Unique Hero Section - Bull Run Theme */}
            <section className="relative pt-32 pb-32 overflow-hidden bg-slate-900 text-white">
                {/* Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f11a_1px,transparent_1px),linear-gradient(to_bottom,#6366f11a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

                {/* Glowing Orbs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] mix-blend-screen animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] mix-blend-screen animate-pulse delay-1000"></div>

                <div className="container relative z-10 px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-900/20 px-4 py-1.5 text-sm font-bold text-indigo-400">
                            <ArrowUpRight className="h-4 w-4" />
                            <span>Zero Brokerage on Delivery</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                            Master the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Bull Market.</span>
                        </h1>

                        <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
                            Open a FREE Demat account in 5 minutes. Real-time charts, advanced technical indicators, and lightning-fast execution.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-indigo-900/40 bg-indigo-600 hover:bg-indigo-700 text-white font-bold" onClick={scrollToForm}>
                                Open Free Account
                            </Button>
                        </div>

                        <div className="flex items-center gap-8 pt-4 border-t border-slate-800">
                            <div>
                                <p className="text-3xl font-bold text-white flex items-center gap-1">₹0</p>
                                <p className="text-xs text-slate-500 uppercase tracking-wider">Brokerage</p>
                            </div>
                            <div className="w-px h-10 bg-slate-800"></div>
                            <div>
                                <p className="text-3xl font-bold text-white flex items-center gap-1">₹20</p>
                                <p className="text-xs text-slate-500 uppercase tracking-wider">Intraday</p>
                            </div>
                            <div className="w-px h-10 bg-slate-800"></div>
                            <div>
                                <p className="text-3xl font-bold text-white flex items-center gap-1">5m</p>
                                <p className="text-xs text-slate-500 uppercase tracking-wider">Onboarding</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual Hero Element - Candlestick Chart */}
                    <div className="relative hidden lg:block h-[500px]">
                        <div className="absolute inset-0 flex items-center justify-center">
                            {/* Chart Container */}
                            <div className="relative w-full max-w-md bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700 p-6 shadow-2xl">
                                {/* Header */}
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white">N</div>
                                        <div>
                                            <p className="text-white font-bold">NIFTY 50</p>
                                            <p className="text-xs text-slate-400">NSE</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-green-400 font-bold text-xl flex items-center gap-1"><ArrowUpRight className="h-5 w-5" /> 22,450.00</p>
                                        <p className="text-green-500 text-xs">+1.25%</p>
                                    </div>
                                </div>

                                {/* Animated Candles */}
                                <div className="h-48 flex items-end justify-between gap-1 px-2 relative">
                                    <div className="absolute top-10 left-0 right-0 h-px bg-slate-700 border-t border-dashed border-slate-600"></div>
                                    <div className="absolute bottom-10 left-0 right-0 h-px bg-slate-700 border-t border-dashed border-slate-600"></div>

                                    {[40, 60, 45, 70, 55, 80, 65, 90, 75, 100].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            className={cn("w-full rounded-sm relative group", i > 5 ? "bg-green-500" : "bg-red-500")}
                                            style={{ height: `${h}%` }}
                                            initial={{ scaleY: 0 }}
                                            animate={{ scaleY: 1 }}
                                            transition={{ delay: i * 0.1, duration: 0.5 }}
                                        >
                                            {/* Wick */}
                                            <div className={cn("absolute -top-2 left-1/2 w-px h-full -translate-x-1/2 opacity-50", i > 5 ? "bg-green-500" : "bg-red-500")}></div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Buy/Sell Buttons */}
                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    <div className="h-10 rounded-lg bg-green-500/20 border border-green-500/50 flex items-center justify-center text-green-400 font-bold text-sm cursor-pointer hover:bg-green-500/30">BUY</div>
                                    <div className="h-10 rounded-lg bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-400 font-bold text-sm cursor-pointer hover:bg-red-500/30">SELL</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tech Strip */}
            <div className="bg-slate-900 border-y border-slate-800 py-6">
                <div className="container px-4 text-center">
                    <p className="text-slate-500 uppercase tracking-[0.2em] text-xs font-bold mb-6">Powered by Advanced Technology</p>
                    <div className="flex justify-center gap-12 items-center flex-wrap">
                        <span className="flex items-center gap-2 font-bold text-slate-300"><Smartphone className="h-5 w-5 text-indigo-400" /> Mobile App</span>
                        <span className="flex items-center gap-2 font-bold text-slate-300"><Zap className="h-5 w-5 text-yellow-400" /> High Speed Execution</span>
                        <span className="flex items-center gap-2 font-bold text-slate-300"><Globe className="h-5 w-5 text-cyan-400" /> Global Markets</span>
                    </div>
                </div>
            </div>

            {/* Main Content Layout with Sticky Sidebar */}
            <div className="container px-4 md:px-6 py-12 grid lg:grid-cols-[1fr_400px] gap-12">
                {/* Left Column: Content */}
                <div className="space-y-16">
                    <ContentSection
                        title="Trade Like a Pro"
                        description="Experience trading like never before with our cutting-edge trading platforms. Whether you are a beginner looking to invest in blue-chip stocks or a seasoned trader executing F&O strategies, our platform provides the speed and stability you need. We offer comprehensive research reports, daily market calls, and educational webinars to help you make informed decisions. With our flat brokerage plans for intraday trading and zero brokerage on equity delivery, you keep more of your profits."
                        imageSrc="https://images.unsplash.com/photo-1611974765270-ca12586343bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                        imageAlt="Stock chart on screen"
                    >
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
                                <h4 className="font-bold text-indigo-700 dark:text-indigo-300 text-lg">₹0</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Brokerage on Delivery</p>
                            </div>
                            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800">
                                <h4 className="font-bold text-purple-700 dark:text-purple-300 text-lg">₹20</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Flat Fees on Intraday</p>
                            </div>
                        </div>
                    </ContentSection>

                    {/* Accordions */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <BarChart className="text-indigo-600" /> Platform Features
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
                                <Globe className="text-purple-600" /> Investment Products
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
                    <div id="lead-form" className="sticky top-24">
                        <Card className="glass-card bg-white/80 dark:bg-slate-900/80 border-indigo-100 dark:border-indigo-900 shadow-2xl overflow-hidden ring-1 ring-indigo-500/10">
                            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
                                <CardTitle className="text-lg">Open Free Account</CardTitle>
                                <p className="text-indigo-100 text-sm">Start trading in 5 mins</p>
                            </CardHeader>
                            <CardContent className="p-6">
                                {isSuccess ? (
                                    <div className="text-center py-8">
                                        <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle2 className="h-6 w-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Request Received</h3>
                                        <p className="text-slate-600 dark:text-slate-300 mt-2">Check your email for login.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Name</label>
                                            <Input
                                                placeholder="Full Name"
                                                className="bg-slate-50 border-slate-200"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
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
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Experience</label>
                                                <select
                                                    className="flex h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                    value={formData.experience}
                                                    onChange={e => setFormData({ ...formData, experience: e.target.value })}
                                                >
                                                    <option value="">Select</option>
                                                    <option value="New">New</option>
                                                    <option value="1-3">1-3 Years</option>
                                                    <option value="Pro">Pro</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Capital</label>
                                                <Input
                                                    placeholder="Target"
                                                    className="bg-slate-50 border-slate-200"
                                                    value={formData.capital}
                                                    onChange={e => setFormData({ ...formData, capital: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 text-base shadow-lg shadow-indigo-500/20 mt-2">Unlock Free Account</Button>
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
