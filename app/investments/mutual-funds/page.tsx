"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SIPCalculator } from "@/components/calculators/sip-calculator";
import { CheckCircle2, TrendingUp, PieChart, BarChart3, ShieldCheck, Zap, Coins, ArrowUpRight, LineChart, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEmailForm } from "@/hooks/use-email-form";
import { cn } from "@/lib/utils";
import { ContentSection } from "@/components/ui/content-section";
import { SimpleAccordion } from "@/components/ui/simple-accordion";

export default function MutualFundsPage() {
    const { sendEmail, isSubmitting, isSuccess, error, resetForm } = useEmailForm();
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        investmentAmount: "",
        city: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendEmail({
            type: "Mutual Fund Inquiry",
            ...formData
        });
    };

    const scrollToForm = () => {
        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="pb-20 bg-slate-50 dark:bg-black selection:bg-green-500/30 font-sans">
            {/* Unique Hero Section - Market Growth Theme */}
            <section className="relative pt-40 pb-20 overflow-hidden bg-slate-900 text-white">
                {/* Tech Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                <div className="container px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-900/20 px-4 py-1.5 text-sm font-bold text-green-400">
                            <TrendingUp className="h-4 w-4" />
                            <span>Systematic Investment Plan (SIP)</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                            Beat Inflation. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">Build Real Wealth.</span>
                        </h1>

                        <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
                            Start creating your future corpus today. Expertly curated funds for every goal—Retirement, Education, or Wealth Creation.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-green-900/20 bg-green-600 hover:bg-green-700 text-white font-bold" onClick={scrollToForm}>
                                Start SIP @ ₹500
                            </Button>
                        </div>
                    </div>

                    {/* Visual Hero Element - Growing Graph */}
                    <div className="relative hidden lg:block h-[400px]">
                        <div className="absolute inset-0 flex items-end justify-center px-10 pb-10">
                            {/* Animated Bars */}
                            <div className="flex items-end gap-4 h-full w-full">
                                <div className="w-1/5 bg-green-500/20 rounded-t-xl h-[40%] animate-pulse"></div>
                                <div className="w-1/5 bg-green-500/40 rounded-t-xl h-[60%] animate-pulse delay-100"></div>
                                <div className="w-1/5 bg-green-500/60 rounded-t-xl h-[50%] animate-pulse delay-200"></div>
                                <div className="w-1/5 bg-green-500/80 rounded-t-xl h-[80%] animate-pulse delay-300"></div>
                                <div className="w-1/5 bg-green-500 rounded-t-xl h-[100%] shadow-[0_0_30px_rgba(34,197,94,0.5)] flex items-start justify-center p-4">
                                    <ArrowUpRight className="text-white h-8 w-8" />
                                </div>
                            </div>

                            {/* Floating Card */}
                            <div className="absolute top-10 left-0 bg-slate-800/90 backdrop-blur-md p-4 rounded-xl border border-slate-700 shadow-xl flex items-center gap-3 animate-bounce delay-700">
                                <div className="h-10 w-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
                                    <TrendingUp className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-bold">Returns</p>
                                    <p className="text-lg font-bold text-white">+15.4% p.a.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ticker Simulation */}
            <div className="bg-slate-950 border-y border-slate-800 py-3 overflow-hidden whitespace-nowrap">
                <div className="inline-flex gap-12 animate-marquee">
                    {[
                        { n: "NIFTY 50", v: "+1.2%", c: "text-green-500" },
                        { n: "SENSEX", v: "+0.9%", c: "text-green-500" },
                        { n: "GOLD", v: "+0.4%", c: "text-yellow-500" },
                        { n: "MIDCAP", v: "+2.1%", c: "text-green-500" },
                        { n: "BANKNIFTY", v: "-0.2%", c: "text-red-500" },
                        { n: "NASDAQ", v: "+1.5%", c: "text-green-500" },
                        { n: "USD/INR", v: "83.40", c: "text-slate-400" },
                    ].map((item, i) => (
                        <span key={i} className="text-sm font-mono font-bold flex items-center gap-2 text-slate-300">
                            {item.n} <span className={item.c}>{item.v}</span>
                        </span>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {[
                        { n: "NIFTY 50", v: "+1.2%", c: "text-green-500" },
                        { n: "SENSEX", v: "+0.9%", c: "text-green-500" },
                        { n: "GOLD", v: "+0.4%", c: "text-yellow-500" },
                        { n: "MIDCAP", v: "+2.1%", c: "text-green-500" },
                        { n: "BANKNIFTY", v: "-0.2%", c: "text-red-500" },
                        { n: "NASDAQ", v: "+1.5%", c: "text-green-500" },
                        { n: "USD/INR", v: "83.40", c: "text-slate-400" },
                    ].map((item, i) => (
                        <span key={i + 10} className="text-sm font-mono font-bold flex items-center gap-2 text-slate-300">
                            {item.n} <span className={item.c}>{item.v}</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* Main Content Layout with Sticky Sidebar */}
            <div className="container px-4 md:px-6 py-12 grid lg:grid-cols-[1fr_400px] gap-12">
                {/* Left Column: Content */}
                <div className="space-y-16">
                    <ContentSection
                        title="Smart Investing Made Simple"
                        description="Navigating the stock market can be complex, but investing in Mutual Funds doesn't have to be. We offer a curated selection of top-performing funds across various categories—Equity, Debt, Hybrid, and ELSS. Whether you are looking to save tax, build an emergency fund, or create long-term wealth for retirement, we have a fund that matches your risk appetite and time horizon. Our platform allows you to start small with Systematic Investment Plans (SIPs) or invest a lump sum. With professional fund managers handling your money, you benefit from diversification and expert market analysis."
                        imageSrc="https://images.unsplash.com/photo-1579532507281-2831e739b858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                        imageAlt="Growing plant with coins"
                    >
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
                                <h4 className="font-bold text-green-700 dark:text-green-300 text-lg">ELSS Funds</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Save tax u/s 80C</p>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800">
                                <h4 className="font-bold text-emerald-700 dark:text-emerald-300 text-lg">Zero Commission</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Direct Mutual Funds</p>
                            </div>
                        </div>
                    </ContentSection>

                    {/* Calculator Section */}
                    <div className="p-1 rounded-3xl bg-gradient-to-r from-green-400 to-emerald-600 shadow-xl">
                        <div className="bg-white dark:bg-slate-900 rounded-[20px] p-1">
                            <SIPCalculator />
                        </div>
                    </div>

                    {/* Accordions */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <PieChart className="text-green-600" /> Benefit of SIPs
                            </h3>
                            <SimpleAccordion
                                items={[
                                    { title: "Rupee Cost Averaging", content: "SIPs help you buy more units when markets are low and fewer when high, averaging out cost over time." },
                                    { title: "Disciplined Investing", content: "Regular automated deductions ensure you save first and spend later." },
                                    { title: "Power of Compounding", content: "Reinvesting returns over a long period generates massive wealth due to compounding." },
                                ]}
                            />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <Coins className="text-emerald-600" /> Why Invest with Us?
                            </h3>
                            <SimpleAccordion
                                items={[
                                    { title: "Dedicated Advisor", content: "Get a personal financial advisor to map your investments to your goals." },
                                    { title: "Portfolio Rebalancing", content: "Regular reviews to exit underperforming funds and enter potential winners." },
                                    { title: "Goal Tracking", content: "Track your progress towards goals like Child's Education or Retirement in real-time." },
                                ]}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column: Sticky Form */}
                <aside className="relative">
                    <div id="lead-form" className="sticky top-24">
                        <Card className="glass-card bg-white/80 dark:bg-slate-900/80 border-green-100 dark:border-green-900 shadow-2xl overflow-hidden ring-1 ring-green-500/10">
                            <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
                                <CardTitle className="text-lg">Start SIP Today</CardTitle>
                                <p className="text-green-100 text-sm">Build your wealth</p>
                            </CardHeader>
                            <CardContent className="p-6">
                                {isSuccess ? (
                                    <div className="text-center py-8">
                                        <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle2 className="h-6 w-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Request Received</h3>
                                        <p className="text-slate-600 dark:text-slate-300 mt-2">Advisor contacting shortly.</p>
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
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">City</label>
                                                <Input
                                                    placeholder="City"
                                                    className="bg-slate-50 border-slate-200"
                                                    value={formData.city}
                                                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Inv Amount</label>
                                                <Input
                                                    placeholder="e.g. 5000"
                                                    className="bg-slate-50 border-slate-200"
                                                    value={formData.investmentAmount}
                                                    onChange={e => setFormData({ ...formData, investmentAmount: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-12 text-base shadow-lg shadow-green-500/20 mt-2">Plan Portfolio</Button>
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
