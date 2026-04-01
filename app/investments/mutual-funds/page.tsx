"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SIPCalculator } from "@/components/calculators/sip-calculator";
import { CheckCircle2, TrendingUp, PieChart, BarChart3, ShieldCheck, Zap, Coins, ArrowUpRight, LineChart, Globe, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEmailForm } from "@/hooks/use-email-form";
import { cn } from "@/lib/utils";
import { ContentSection } from "@/components/ui/content-section";
import { SimpleAccordion } from "@/components/ui/simple-accordion";
import { DynamicHeroWrapper } from "@/components/dynamic-hero-wrapper";
import { motion } from "framer-motion";

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
        <div className="pb-20 bg-slate-50 dark:bg-black selection:bg-primary/30 font-sans">
            <DynamicHeroWrapper page="mutual-funds">
                {/* Ocean Blue Hero Section - Wealth Growth Theme */}
                <section className="relative pt-40 pb-20 overflow-hidden bg-sky-950 text-white">
                    {/* Water-inspired Background pattern */}
                    <div className="absolute inset-0 pointer-events-none opacity-20">
                        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[100px] animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[80px]"></div>
                    </div>
                    
                    {/* Tech Grid Background (Subtle) */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>

                    <div className="container px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 mx-auto">
                        <div className="space-y-8">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-black text-sky-200 tracking-wide"
                            >
                                <TrendingUp className="h-4 w-4 text-accent" />
                                <span>Premium Wealth Solutions</span>
                            </motion.div>

                            <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-tight">
                                Sail Towards <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-300 to-accent">Financial Freedom.</span>
                            </h1>

                            <p className="text-xl text-sky-100/70 max-w-lg leading-relaxed font-medium">
                                Navigate the markets with confidence. Expertly curated portfolios designed to grow with the tide of your aspirations.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="h-16 px-10 text-xl rounded-full shadow-2xl shadow-primary/40 bg-primary hover:bg-sky-600 text-white font-black border border-white/10 transition-all hover:scale-105" onClick={scrollToForm}>
                                    Start SIP @ ₹500
                                </Button>
                            </div>
                        </div>

                        {/* Visual Hero Element - Growing Blue Graph */}
                        <div className="relative hidden lg:block h-[450px]">
                            <div className="absolute inset-0 flex items-end justify-center px-10 pb-10">
                                {/* Animated Bars - Ocean Theme */}
                                <div className="flex items-end gap-5 h-full w-full">
                                    <div className="w-1/5 bg-primary/10 rounded-t-2xl h-[40%] animate-pulse"></div>
                                    <div className="w-1/5 bg-primary/30 rounded-t-2xl h-[60%] animate-pulse delay-75"></div>
                                    <div className="w-1/5 bg-primary/50 border-t border-white/10 rounded-t-2xl h-[50%] animate-pulse delay-150"></div>
                                    <div className="w-1/5 bg-primary/70 border-t border-sky-300/20 rounded-t-2xl h-[85%] animate-pulse delay-300"></div>
                                    <div className="w-1/5 bg-primary border-t-2 border-accent rounded-t-2xl h-[100%] shadow-[0_0_50px_rgba(14,165,233,0.5)] flex items-start justify-center p-6 transition-all duration-500 hover:shadow-accent/40">
                                        <ArrowUpRight className="text-white h-10 w-10 drop-shadow-lg" />
                                    </div>
                                </div>

                                {/* Floating Premium Card */}
                                <motion.div 
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 4 }}
                                    className="absolute top-10 left-0 bg-white/10 backdrop-blur-3xl p-6 rounded-[2rem] border border-white/20 shadow-2xl flex items-center gap-4 group cursor-default"
                                >
                                    <div className="h-14 w-14 bg-accent/20 rounded-2xl flex items-center justify-center text-accent ring-1 ring-accent/30 shadow-lg">
                                        <Sparkles className="h-8 w-8 fill-accent" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-sky-200/50 uppercase font-black tracking-widest leading-none mb-1">Growth Forecast</p>
                                        <p className="text-2xl font-black text-white">+15.8% p.a.</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>
            </DynamicHeroWrapper>

            {/* Premium Ticker */}
            <div className="bg-sky-950 border-y border-primary/20 py-4 overflow-hidden whitespace-nowrap shadow-xl">
                <div className="inline-flex gap-16 animate-marquee">
                    {[
                        { n: "NIFTY 50", v: "+1.42%", c: "text-primary" },
                        { n: "SENSEX", v: "+1.15%", c: "text-primary" },
                        { n: "GOLD", v: "+0.84%", c: "text-accent" },
                        { n: "MIDCAP", v: "+2.31%", c: "text-primary" },
                        { n: "NASDAQ", v: "+1.65%", c: "text-sky-400" },
                        { n: "Bonds", v: "7.25%", c: "text-sky-300" },
                    ].map((item, i) => (
                        <span key={i} className="text-sm font-black flex items-center gap-3 text-sky-100 tracking-widest uppercase">
                            <span className="opacity-50">•</span> {item.n} <span className={cn("font-black", item.c)}>{item.v}</span>
                        </span>
                    ))}
                    {/* Seamless Loop */}
                    {[
                        { n: "NIFTY 50", v: "+1.42%", c: "text-primary" },
                        { n: "SENSEX", v: "+1.15%", c: "text-primary" },
                        { n: "GOLD", v: "+0.84%", c: "text-accent" },
                        { n: "MIDCAP", v: "+2.31%", c: "text-primary" },
                        { n: "NASDAQ", v: "+1.65%", c: "text-sky-400" },
                        { n: "Bonds", v: "7.25%", c: "text-sky-300" },
                    ].map((item, i) => (
                        <span key={i + 10} className="text-sm font-black flex items-center gap-3 text-sky-100 tracking-widest uppercase">
                            <span className="opacity-50">•</span> {item.n} <span className={cn("font-black", item.c)}>{item.v}</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* Main Content Layout with Sticky Sidebar */}
            <div className="container px-4 md:px-6 py-20 lg:py-28 grid lg:grid-cols-[1fr_400px] gap-16 mx-auto">
                {/* Left Column: Content */}
                <div className="space-y-20">
                    <ContentSection
                        title="Elite Portfolio Management"
                        description="Navigating the financial ocean shouldn't be daunting. At ShreeFinance, we curate top-tier mutual funds across Equity, Debt, and Hybrid categories, each rigorously vetted by experts. Whether you are aiming for high-growth equity returns or the stability of gold-linked debt instruments, our platform provides the precision tools you need. Start your journey with Systematic Investment Plans (SIP) and witness the power of compounding as your wealth builds session by session, year after year."
                        imageSrc="https://images.unsplash.com/photo-1579532507281-2831e739b858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                        imageAlt="Premium growth visual"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                            <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 transition-all hover:bg-primary/10 group">
                                <h4 className="font-black text-primary text-xl mb-2 group-hover:scale-105 transition-transform">ELSS Savings</h4>
                                <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Maximise Tax Benefits u/s 80C</p>
                            </div>
                            <div className="p-6 rounded-3xl bg-accent/5 border border-accent/10 transition-all hover:bg-accent/10 group">
                                <h4 className="font-black text-accent text-xl mb-2 group-hover:scale-105 transition-transform">Blue Chip Elite</h4>
                                <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Invest in Industry Giants</p>
                            </div>
                        </div>
                    </ContentSection>

                    {/* Calculator Section - Brand Aligned */}
                    <div className="p-1 rounded-[2.5rem] bg-gradient-to-br from-primary via-sky-300 to-accent shadow-2xl shadow-primary/20">
                        <div className="bg-white dark:bg-slate-900 rounded-[2.2rem] p-4 lg:p-8">
                            <div className="mb-8 px-4">
                                <h3 className="text-3xl font-black tracking-tight text-foreground flex items-center gap-3">
                                    <TrendingUp className="text-primary h-8 w-8" />
                                    Walth <span className="text-primary">Projection</span>
                                </h3>
                            </div>
                            <SIPCalculator />
                        </div>
                    </div>

                    {/* Accordions */}
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <h3 className="text-3xl font-black flex items-center gap-3 text-slate-900 dark:text-white">
                                <div className="p-3 bg-primary/10 rounded-2xl"><PieChart className="text-primary" /></div>
                                The Power of Compounding
                            </h3>
                            <SimpleAccordion
                                items={[
                                    { title: "Rupee Cost Averaging", content: "SIPs help you buy more units when markets are low and fewer when high, averaging out cost over time." },
                                    { title: "Mathematical Discipline", content: "Regular automated deductions ensure you save first and spend later, removing emotional bias from investing." },
                                    { title: "Compounding Magic", content: "Reinvesting returns over a long period generates exponential wealth. The longer you stay, the harder your money works." },
                                ]}
                            />
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-3xl font-black flex items-center gap-3 text-slate-900 dark:text-white">
                                <div className="p-3 bg-accent/10 rounded-2xl"><Coins className="text-accent" /></div>
                                Why ShreeFinance?
                            </h3>
                            <SimpleAccordion
                                items={[
                                    { title: "Expert Human Guidance", content: "AI tools combined with personal financial advisors to map your investments to real-life life goals." },
                                    { title: "Liquid Portfolio Rebalancing", content: "Dynamic reviews to pivot from stagnation towards potential market winners automatically." },
                                    { title: "Transparency First", content: "Real-time tracking with zero hidden charges. You see what we see, always." },
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
                                        <LineChart className="h-6 w-6 text-white" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-accent text-slate-900 px-3 py-1 rounded-full shadow-lg">Start SIP</span>
                                </div>
                                <CardTitle className="text-2xl font-black tracking-tight leading-none mb-2">Grow Your Legacy</CardTitle>
                                <p className="text-sky-100/70 text-sm font-bold uppercase tracking-widest">Connect with an Advisor</p>
                            </CardHeader>
                            <CardContent className="p-8 -mt-6 bg-white dark:bg-slate-950 rounded-t-[2.5rem] relative z-10 shadow-2xl">
                                {isSuccess ? (
                                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                                        <div className="h-20 w-20 bg-primary rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/30">
                                            <CheckCircle2 className="h-10 w-10 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Request Received</h3>
                                        <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-widest leading-loose">An elite advisor will reach out shortly.</p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Your Identity</label>
                                            <Input
                                                placeholder="Full Name"
                                                className="h-14 bg-slate-50 dark:bg-sky-950/20 border-slate-100 dark:border-primary/10 rounded-2xl font-bold px-6 focus:ring-primary shadow-sm"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Direct Reach</label>
                                            <Input
                                                placeholder="10-digit Mobile"
                                                className="h-14 bg-slate-50 dark:bg-sky-950/20 border-slate-100 dark:border-primary/10 rounded-2xl font-bold px-6 focus:ring-primary shadow-sm"
                                                value={formData.mobile}
                                                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">City</label>
                                                <Input
                                                    placeholder="Pune"
                                                    className="h-14 bg-slate-50 dark:bg-sky-950/20 border-slate-100 dark:border-primary/10 rounded-2xl font-bold px-6 focus:ring-primary shadow-sm"
                                                    value={formData.city}
                                                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Monthly Plan</label>
                                                <Input
                                                    placeholder="₹5000"
                                                    className="h-14 bg-slate-50 dark:bg-sky-950/20 border-slate-100 dark:border-primary/10 rounded-2xl font-bold px-6 focus:ring-primary shadow-sm"
                                                    value={formData.investmentAmount}
                                                    onChange={e => setFormData({ ...formData, investmentAmount: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <Button className="w-full bg-primary hover:bg-sky-600 text-white font-black h-16 text-lg rounded-2xl shadow-2xl shadow-primary/20 mt-4 transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-widest border border-white/10">
                                            Initialize Plan
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
