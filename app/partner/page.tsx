"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Users,
    TrendingUp,
    ShieldCheck,
    Award,
    CheckCircle2,
    DollarSign,
    Building2,
    ArrowRight,
    Sparkles,
    Briefcase
} from "lucide-react";
import { motion } from "framer-motion";
import { useEmailForm } from "@/hooks/use-email-form";

export default function PartnerProgramPage() {
    const { sendEmail, isSubmitting, isSuccess } = useEmailForm();
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        city: "",
        profession: "Loan Agent / DSA",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendEmail({
            type: "Partner Program Registration (DSA)",
            ...formData
        });
    };

    const benefits = [
        {
            icon: DollarSign,
            title: "Highest Commission Payouts",
            desc: "Earn up to 2.5% payout on home loans and personal loans disbursed through your link."
        },
        {
            icon: Building2,
            title: "40+ Partner Bank Access",
            desc: "Offer loans from YES Bank, SBI, HDFC, ICICI, Axis, Kotak and NBFCs with one portal."
        },
        {
            icon: TrendingUp,
            title: "Real-time Payout Tracking",
            desc: "Dedicated partner dashboard tracking lead stages, sanction letters, and instant payout credits."
        },
        {
            icon: ShieldCheck,
            title: "Zero Setup Fee & Free Training",
            desc: "Get certified as a financial loan advisor with dedicated relationship manager support."
        }
    ];

    const partnerTiers = [
        { name: "Silver Partner", volume: "₹50L - ₹2 Cr / month", payout: "1.25% - 1.50%", perks: "Standard Support, Basic Dashboard" },
        { name: "Gold Partner", volume: "₹2 Cr - ₹5 Cr / month", payout: "1.75% - 2.00%", perks: "Dedicated Relationship Manager, Priority Sanction" },
        { name: "Platinum Partner", volume: "₹5 Cr+ / month", payout: "Up to 2.50%", perks: "Co-Branding Marketing, Instant Disbursal Desk" },
    ];

    return (
        <div className="pb-20 bg-[#181a1d] text-white font-sans min-h-screen relative overflow-hidden">
            {/* Background Light Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00c985]/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00e699]/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Hero Banner */}
            <section className="pt-16 pb-20 border-b border-slate-800 relative z-10">
                <div className="container px-4 md:px-6 mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-1.5 text-xs font-black text-emerald-300 uppercase tracking-widest">
                            <Sparkles className="h-3.5 w-3.5" />
                            ShreeFinance Channel Partner Program
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                            Become a Partner & Earn Up to <span className="text-[#00e699]">2.5% Payout</span>
                        </h1>
                        <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                            Join 15,000+ DSAs, Real Estate Brokers, CAs, and Financial Advisors. Refer loan clients and earn industry-leading payouts across 40+ banks.
                        </p>

                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                            <div>
                                <p className="text-3xl font-black text-[#00e699]">₹15 Cr+</p>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Payouts Credited</p>
                            </div>
                            <div>
                                <p className="text-3xl font-black text-white">15,000+</p>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Active Partners</p>
                            </div>
                            <div>
                                <p className="text-3xl font-black text-amber-300">40+</p>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Lending Partners</p>
                            </div>
                        </div>
                    </div>

                    {/* Registration Card */}
                    <Card className="bg-[#24272c] border border-slate-800 backdrop-blur-xl rounded-[2.5rem] p-8 text-white shadow-2xl">
                        <CardHeader className="p-0 pb-6 border-b border-white/10">
                            <CardTitle className="text-2xl font-black">Register as DSA / Channel Partner</CardTitle>
                            <p className="text-xs text-slate-400">Instant registration with zero setup fee</p>
                        </CardHeader>
                        <CardContent className="p-0 pt-6 space-y-4">
                            {isSuccess ? (
                                <div className="text-center py-8 space-y-3">
                                    <CheckCircle2 className="h-14 w-14 text-emerald-400 mx-auto" />
                                    <h4 className="text-xl font-bold">Partner Registration Received!</h4>
                                    <p className="text-xs text-slate-400">Our Partner Relationship Desk will call you within 2 hours.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase text-slate-400">Full Name</label>
                                        <Input
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            required
                                            className="h-12 rounded-xl font-bold bg-white/5 border-white/10 text-white"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-slate-400">Mobile Number</label>
                                            <Input
                                                placeholder="10-digit mobile"
                                                value={formData.mobile}
                                                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                                required
                                                className="h-12 rounded-xl font-bold bg-white/5 border-white/10 text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-slate-400">City</label>
                                            <Input
                                                placeholder="City"
                                                value={formData.city}
                                                onChange={e => setFormData({ ...formData, city: e.target.value })}
                                                required
                                                className="h-12 rounded-xl font-bold bg-white/5 border-white/10 text-white"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase text-slate-400">Email Address</label>
                                        <Input
                                            type="email"
                                            placeholder="name@example.com"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            className="h-12 rounded-xl font-bold bg-white/5 border-white/10 text-white"
                                        />
                                    </div>
                                    <Button
                                        disabled={isSubmitting}
                                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black h-14 rounded-2xl uppercase tracking-wider text-sm shadow-xl shadow-emerald-500/20"
                                    >
                                        {isSubmitting ? "Registering..." : "Join Partner Program Now"}
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="py-20 container px-4 md:px-6 mx-auto relative z-10 space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <h2 className="text-3xl md:text-5xl font-black text-white">Why Join Shree Finance Partner Portal?</h2>
                    <p className="text-slate-400 text-sm">Everything you need to build a high-earning loan distribution business.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((b, idx) => (
                        <div key={idx} className="bg-slate-900/60 border border-sky-800/40 p-6 rounded-3xl space-y-4 backdrop-blur-md">
                            <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
                                <b.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-extrabold text-white">{b.title}</h3>
                            <p className="text-xs text-slate-300 leading-relaxed">{b.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Partner Tiers */}
            <section className="py-16 container px-4 md:px-6 mx-auto relative z-10">
                <div className="bg-slate-900/80 border border-sky-800/50 rounded-[2.5rem] p-8 space-y-8">
                    <h2 className="text-2xl font-bold text-center text-white">Partner Payout Structure & Tiers</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {partnerTiers.map((t, idx) => (
                            <div key={idx} className="bg-black/40 p-6 rounded-3xl border border-white/10 space-y-3 text-center">
                                <h3 className="text-lg font-black text-emerald-400">{t.name}</h3>
                                <p className="text-xs text-slate-400 font-bold uppercase">{t.volume}</p>
                                <p className="text-3xl font-black text-white py-2">{t.payout}</p>
                                <p className="text-[11px] text-slate-300 font-medium">{t.perks}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
