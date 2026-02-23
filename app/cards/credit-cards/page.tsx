"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, CreditCard, Gift, Plane, ShieldCheck, Zap, ShoppingBag, Crown, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEmailForm } from "@/hooks/use-email-form";
import { cn } from "@/lib/utils";
import { ContentSection } from "@/components/ui/content-section";
import { motion } from "framer-motion";

export default function CreditCardsPage() {
    const { sendEmail, isSubmitting, isSuccess, error, resetForm } = useEmailForm();
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
        <div className="pb-20 bg-slate-50 dark:bg-black selection:bg-rose-500/30 font-sans">
            {/* Unique Hero Section - Premium Lifestyle Theme */}
            <section className="relative pt-32 pb-32 overflow-hidden bg-white dark:bg-slate-950">
                {/* Spotlight Background */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-rose-400/20 rounded-full blur-[120px] mix-blend-screen opacity-60 pointer-events-none"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-5"></div>

                <div className="container relative z-10 px-4 md:px-6 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-rose-600/20 bg-rose-600/10 px-4 py-1.5 text-sm font-bold text-rose-600 dark:text-rose-300 mb-8 backdrop-blur-md">
                        <Crown className="h-4 w-4 fill-rose-600/20" />
                        <span>Experience True Luxury</span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white mb-6">
                        Unlock a World of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500">Privileges.</span>
                    </h1>

                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
                        From exclusive airport lounges to accelerated reward points, our credit cards are designed to complement your premium lifestyle.
                    </p>

                    <div className="flex justify-center flex-wrap gap-4 mb-20">
                        <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-2xl shadow-rose-900/20 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold hover:scale-105 transition-transform" onClick={scrollToForm}>
                            Apply Now
                        </Button>
                    </div>

                    {/* Floating 3D Card Animation */}
                    <div className="relative mx-auto w-full max-w-md perspective-1000 group">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-amber-500 rounded-2xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

                        <motion.div
                            initial={{ y: 0, rotateX: 0, rotateY: 0 }}
                            animate={{ y: [0, -15, 0], rotateX: [5, 0, 5], rotateY: [-5, 5, -5] }}
                            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                            className="relative aspect-[1.586/1] rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-black shadow-2xl border border-white/10 overflow-hidden transform-style-3d"
                        >
                            {/* Card Texture */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>

                            {/* Card Shine */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[length:200%_200%] animate-shine"></div>

                            {/* Card Elements */}
                            <div className="absolute top-8 right-8">
                                <span className="text-white font-bold italic text-2xl tracking-widest opacity-90">VISA</span>
                                <span className="block text-[8px] text-white/60 text-right tracking-widest uppercase mt-1">Infinite</span>
                            </div>

                            <div className="absolute top-8 left-8 flex gap-2">
                                <div className="h-8 w-10 rounded bg-yellow-400/90 shadow-lg shadow-yellow-500/20"></div>
                                <Sparkles className="text-rose-400 h-6 w-6 mt-1 animate-pulse" />
                            </div>

                            <div className="absolute bottom-8 left-8 text-left z-10">
                                <p className="text-white/80 text-lg font-mono tracking-widest mb-2 drop-shadow-md">XXXX XXXX XXXX 4291</p>
                                <div className="flex gap-4">
                                    <div>
                                        <p className="text-[8px] text-white/50 uppercase tracking-wider">Card Holder</p>
                                        <p className="text-white font-bold tracking-wider text-sm drop-shadow-md">RAJ BHOITE</p>
                                    </div>
                                    <div>
                                        <p className="text-[8px] text-white/50 uppercase tracking-wider">Valid Thru</p>
                                        <p className="text-white font-bold tracking-wider text-sm drop-shadow-md">12/28</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Main Content Layout with Sticky Sidebar */}
            <div className="container px-4 md:px-6 py-12 grid lg:grid-cols-[1fr_400px] gap-12">
                {/* Left Column: Content */}
                <div className="space-y-16">
                    <ContentSection
                        title="More Than Just Plastic"
                        description="Our credit cards are crafted to complement your lifestyle. Whether you are a frequent flyer, a shopaholic, or a fine dining enthusiast, we have a card that matches your spending patterns. Earn accelerated reward points on every swipe, enjoy complimentary access to airport lounges worldwide, and avail buy-one-get-one offers on movie tickets. Safety is our priority; all our cards come with contactless technology and zero liability on lost cards. With an interest-free credit period of up to 50 days, you can manage your cash flow efficiently without paying extra."
                        imageSrc="https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                        imageAlt="Premium Credit Card"
                    >
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800">
                                <h4 className="font-bold text-rose-700 dark:text-rose-300 text-lg">5X Rewards</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">On dining & shopping</p>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800">
                                <h4 className="font-bold text-amber-700 dark:text-amber-300 text-lg">Lounge Access</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Domestic & International</p>
                            </div>
                        </div>
                    </ContentSection>

                    {/* Rewards Grid */}
                    <div className="space-y-8">
                        <div className="text-left mb-6">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Exclusive Privileges</h2>
                            <p className="text-slate-500">Designed for the discerning few.</p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {[
                                { title: "Travel", icon: Plane, desc: "Comp. Flight Insurace & Lounge Access", color: "text-sky-500", bg: "bg-sky-50" },
                                { title: "Shopping", icon: ShoppingBag, desc: "Cashback on Amazon, Flipkart & Myntra", color: "text-rose-500", bg: "bg-rose-50" },
                                { title: "Entertainment", icon: Gift, desc: "BOGO Movie Tickets on BookMyShow", color: "text-purple-500", bg: "bg-purple-50" },
                                { title: "Fuel", icon: Zap, desc: "1% Fuel Surcharge Waiver across India", color: "text-amber-500", bg: "bg-amber-50" }
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
                        <Card className="glass-card bg-white/80 dark:bg-slate-900/80 border-rose-100 dark:border-rose-900 shadow-2xl overflow-hidden ring-1 ring-rose-500/10">
                            <CardHeader className="bg-gradient-to-r from-rose-600 to-pink-600 text-white p-6">
                                <CardTitle className="text-lg">Check Eligibility</CardTitle>
                                <p className="text-rose-100 text-sm">No credit score impact</p>
                            </CardHeader>
                            <CardContent className="p-6">
                                {isSuccess ? (
                                    <div className="text-center py-8">
                                        <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle2 className="h-6 w-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Request Received</h3>
                                        <p className="text-slate-600 dark:text-slate-300 mt-2">We will update you shortly.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Name</label>
                                            <Input
                                                placeholder="Name as per PAN"
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
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Income</label>
                                                <Input
                                                    placeholder="Monthly ₹"
                                                    className="bg-slate-50 border-slate-200"
                                                    value={formData.income}
                                                    onChange={e => setFormData({ ...formData, income: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold h-12 text-base shadow-lg shadow-rose-500/20 mt-2">View Offers</Button>
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
