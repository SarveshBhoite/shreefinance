"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Percent, TrendingUp, ShieldCheck, Award, Zap, ChevronRight, CheckCircle2, DollarSign, Building2, Users } from "lucide-react";
import { motion } from "framer-motion";
import { LeadFormModal } from "@/components/dialogs/lead-form-modal";

export default function PayoutStructurePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const payoutSlabs = [
        { category: "Personal Loan", payout: "Up to 2.50%", cycle: "Weekly Disbursal", minVolume: "No minimum cap", desc: "Instant disbursal payouts across 40+ top banks & NBFCs" },
        { category: "Business Loan", payout: "Up to 2.25%", cycle: "Bi-Weekly", minVolume: "₹15 Lakhs / Mo", desc: "Highest commission rates on collateral-free business loans" },
        { category: "Home Loan", payout: "Up to 1.80%", cycle: "Weekly Disbursal", minVolume: "₹50 Lakhs / Mo", desc: "Lucrative long-term high-ticket home loan commission payouts" },
        { category: "Loan Against Property", payout: "Up to 1.75%", cycle: "Bi-Weekly", minVolume: "₹25 Lakhs / Mo", desc: "High ticket sizes with direct bank tier payout bonuses" },
        { category: "Car & Vehicle Loan", payout: "Up to 1.50%", cycle: "Weekly Disbursal", minVolume: "No minimum cap", desc: "Instant commission processing on auto loans" },
        { category: "Credit Cards & Cards", payout: "₹1,800 - ₹3,500 / Card", cycle: "Weekly", minVolume: "5 Approved Cards", desc: "Fixed flat referral rewards per approved card" },
    ];

    const partnerTiers = [
        { level: "Silver Partner", volume: "₹10L - ₹50L / Mo", bonus: "+0.15% Extra Incentive", perks: ["Dedicated RM Support", "Weekly Payouts", "Basic CRM Portal"] },
        { level: "Gold Partner", volume: "₹50L - ₹2 Cr / Mo", bonus: "+0.35% Extra Incentive", perks: ["Priority Case Sanction", "Bi-Weekly Bank Transfer", "Custom Marketing Kit"] },
        { level: "Platinum Partner", volume: "₹2 Cr+ / Mo", bonus: "+0.50% Master Incentive", perks: ["Direct Bank API Access", "Instant 24-hr Payouts", "Dedicated Lead Desk"] },
    ];

    return (
        <main className="min-h-screen bg-[#181a1d] text-white font-sans py-16 md:py-24 relative overflow-hidden">
            {/* Background Light Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00c985]/15 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container px-4 md:px-6 lg:px-8 mx-auto relative z-10 space-y-16">
                {/* Header */}
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-black text-[#00e699] uppercase tracking-widest"
                    >
                        <Percent className="h-4 w-4" />
                        Official Partner & DSA Compensation Schedule 2026
                    </motion.div>
                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
                        DSA & Channel Partner <span className="text-[#00e699]">Payout Structure</span>
                    </h1>
                    <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-medium">
                        Earn industry-leading commissions up to <strong className="text-white">2.50%</strong> with weekly automated bank transfers & zero payout delays.
                    </p>
                </div>

                {/* Main Payout Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {payoutSlabs.map((slab, idx) => (
                        <motion.div
                            key={slab.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.08 }}
                            className="bg-[#24272c] border border-slate-800 hover:border-[#00c985] rounded-3xl p-6 shadow-xl space-y-4 transition-all duration-300 group"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-black text-white group-hover:text-[#00e699] transition-colors">{slab.category}</h3>
                                <span className="text-xs font-black text-slate-950 bg-[#00c985] px-3 py-1 rounded-full uppercase tracking-wider">
                                    {slab.payout}
                                </span>
                            </div>
                            <p className="text-xs text-slate-300 font-medium leading-relaxed">{slab.desc}</p>
                            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs font-bold">
                                <span className="text-slate-400">Payout Cycle:</span>
                                <span className="text-[#00e699] font-black">{slab.cycle}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Tier Bonuses Section */}
                <div className="space-y-8 bg-[#24272c] border border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
                    <div className="text-center space-y-3 max-w-2xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30 text-xs font-black uppercase tracking-widest">
                            <Award className="h-4 w-4" /> Performance Slabs
                        </div>
                        <h2 className="text-3xl font-black text-white">Tiered Volume Milestone Bonuses</h2>
                        <p className="text-slate-300 text-sm font-medium">Unlock higher payout percentages as your monthly disbursal volume grows.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {partnerTiers.map((tier) => (
                            <div key={tier.level} className="bg-[#181a1d] border border-slate-800 p-6 rounded-2xl space-y-4">
                                <div className="space-y-1">
                                    <h3 className="text-xl font-black text-white">{tier.level}</h3>
                                    <p className="text-xs text-[#00e699] font-black uppercase tracking-wider">{tier.volume}</p>
                                </div>
                                <div className="text-2xl font-black text-amber-400">{tier.bonus}</div>
                                <ul className="space-y-2 text-xs text-slate-300 font-medium">
                                    {tier.perks.map((p, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <CheckCircle2 className="h-3.5 w-3.5 text-[#00c985]" />
                                            <span>{p}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center bg-gradient-to-r from-emerald-950/40 via-[#24272c] to-emerald-950/40 border border-emerald-500/30 p-10 rounded-[2.5rem] space-y-6">
                    <h2 className="text-3xl font-black text-white">Ready to Start Earning Premium Payouts?</h2>
                    <p className="text-slate-300 text-sm max-w-xl mx-auto font-medium">Join 5,000+ active channel partners receiving weekly automated commissions.</p>
                    <Button
                        size="lg"
                        onClick={() => setIsModalOpen(true)}
                        className="h-14 px-8 text-sm font-black rounded-full bg-[#00c985] hover:bg-[#00b074] text-slate-950 uppercase tracking-wider shadow-xl transition-transform hover:scale-105"
                    >
                        Register as DSA Partner <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                </div>
            </div>

            <LeadFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type="general"
            />
        </main>
    );
}
