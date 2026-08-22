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
        <main className="min-h-screen bg-white dark:bg-[#f8fafc] text-slate-900 dark:text-white font-sans py-16 md:py-24 relative overflow-hidden transition-colors duration-300">
            <div className="container px-4 md:px-6 lg:px-8 mx-auto relative z-10 space-y-16">
                {/* Header */}
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-50 dark:bg-sky-500/15 px-3.5 py-1 text-xs font-black text-sky-800 dark:text-[#0284c7] uppercase tracking-wider"
                    >
                        <Percent className="h-4 w-4 text-[#0284c7]" />
                        Official Partner & DSA Compensation Schedule 2026
                    </motion.div>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                        DSA & Channel Partner <span className="text-[#0284c7]">Payout Structure</span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-600 text-base md:text-lg leading-relaxed font-normal">
                        Earn industry-leading commissions up to <strong className="text-slate-900 dark:text-white">2.50%</strong> with weekly automated bank transfers & zero payout delays.
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
                            className="bg-white dark:bg-white border border-slate-200 dark:border-slate-200 hover:border-sky-500/30 rounded-2xl p-6 shadow-sm hover:shadow-md space-y-4 transition-all duration-300 group"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#0284c7] transition-colors">{slab.category}</h3>
                                <span className="text-xs font-bold text-sky-800 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full uppercase tracking-wider">
                                    {slab.payout}
                                </span>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-500 font-normal leading-relaxed">{slab.desc}</p>
                            <div className="pt-3 border-t border-slate-100 dark:border-slate-200 flex justify-between items-center text-xs font-bold">
                                <span className="text-slate-500">Payout Cycle:</span>
                                <span className="text-[#0284c7] font-black">{slab.cycle}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Tier Bonuses Section */}
                <div className="space-y-8 bg-[#f8fafc] border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm">
                    <div className="text-center space-y-3 max-w-2xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-black border border-slate-300 text-xs font-black uppercase tracking-wider">
                            <Award className="h-4 w-4 text-black" /> Performance Slabs
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-black">Tiered Volume Milestone Bonuses</h2>
                        <p className="text-slate-600 text-xs sm:text-sm font-normal">Unlock higher payout percentages as your monthly disbursal volume grows.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {partnerTiers.map((tier) => (
                            <div key={tier.level} className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm hover:shadow-md transition-shadow">
                                <div className="space-y-1">
                                    <h3 className="text-lg font-black text-black">{tier.level}</h3>
                                    <p className="text-xs text-[#0284c7] font-bold uppercase tracking-wider">{tier.volume}</p>
                                </div>
                                <div className="text-2xl font-black text-black">{tier.bonus}</div>
                                <ul className="space-y-2 text-xs text-slate-600 font-normal">
                                    {tier.perks.map((p, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <CheckCircle2 className="h-3.5 w-3.5 text-[#0284c7]" />
                                            <span>{p}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center bg-sky-50 border border-sky-200 p-10 rounded-3xl space-y-5">
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Ready to Start Earning Premium Payouts?</h2>
                    <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto font-normal">Join 5,000+ active channel partners receiving weekly automated commissions.</p>
                    <Button
                        size="lg"
                        onClick={() => setIsModalOpen(true)}
                        className="h-12 px-8 text-xs sm:text-sm font-bold rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white uppercase tracking-wider shadow-sm transition-transform cursor-pointer"
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
