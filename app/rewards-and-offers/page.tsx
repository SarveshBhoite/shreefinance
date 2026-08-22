"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Gift,
    Sparkles,
    Tag,
    Percent,
    ShieldCheck,
    CreditCard,
    Home,
    Briefcase,
    Zap,
    Clock,
    CheckCircle2,
    Copy,
    Check,
    ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LeadFormModal } from "@/components/dialogs/lead-form-modal";

export default function RewardsAndOffersPage() {
    const [selectedCategory, setSelectedCategory] = useState<"All" | "Loans" | "Cards" | "Cashback">("All");
    const [copiedCode, setCopiedCode] = useState<string | null>(null);
    const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
    const [selectedOfferTitle, setSelectedOfferTitle] = useState("");

    const offers = [
        {
            id: "1",
            code: "ZEROFEES2026",
            category: "Loans",
            title: "0% Processing Fee on Home Loans",
            subtitle: "Save up to ₹15,000 on administrative & processing charges.",
            badge: "Limited Time Deal",
            icon: Home,
            gradient: "from-sky-500 to-blue-600",
            expires: "31 Aug 2026",
            details: [
                "Applicable for Home Loan Balance Transfers & New Home Purchases",
                "Minimum Loan Amount: ₹20 Lakhs",
                "Partners: YES Bank, SBI, HDFC & Shree Finance Direct"
            ]
        },
        {
            id: "2",
            code: "GIFT1500",
            category: "Loans",
            title: "₹1,500 Amazon Gift Voucher",
            subtitle: "Get a ₹1,500 instant digital voucher on Personal Loan disbursal.",
            badge: "Popular Claim",
            icon: Briefcase,
            gradient: "from-sky-500 to-sky-700",
            expires: "15 Aug 2026",
            details: [
                "Voucher dispatched within 24 hours of loan disbursal",
                "Minimum Loan Sanction: ₹2.5 Lakhs",
                "Pre-approved 10-minute digital disbursal flow"
            ]
        },
        {
            id: "3",
            code: "CARDCASH500",
            category: "Cards",
            title: "₹500 Welcome Cashback + 10x Points",
            subtitle: "Approved Credit Cards come with welcome cashback and airport lounge passes.",
            badge: "Best Seller",
            icon: CreditCard,
            gradient: "from-purple-500 to-indigo-600",
            expires: "31 Aug 2026",
            details: [
                "100% Lifetime Free Cards available (SBI, HDFC, Axis)",
                "Free Airport Lounge Access (2 passes per quarter)",
                "Zero annual fee on first ₹1 Lakh annual spend"
            ]
        },
        {
            id: "4",
            code: "WOMENSPECIAL",
            category: "Loans",
            title: "0.25% Interest Rate Concession for Women",
            subtitle: "Special home loan interest discount starting at 8.35% p.a. for female co-applicants.",
            badge: "Women Borrower Perk",
            icon: Percent,
            gradient: "from-rose-500 to-pink-600",
            expires: "31 Dec 2026",
            details: [
                "Applicable if woman is sole or primary co-owner",
                "Lower monthly EMI payments over 30 years tenure",
                "PMAY CLSS Subsidy benefit additional"
            ]
        },
        {
            id: "5",
            code: "FREECIBIL2500",
            category: "Cashback",
            title: "Free Credit Score & Health Report (₹2,500 Value)",
            subtitle: "Detailed credit score breakdown with personalized tips to boost score above 750.",
            badge: "100% Free",
            icon: ShieldCheck,
            gradient: "from-amber-500 to-orange-600",
            expires: "Ongoing",
            details: [
                "Instant WhatsApp & Email PDF report",
                "Will NOT reduce or hurt your official CIBIL score",
                "Dedicated financial counselor consultation included"
            ]
        },
        {
            id: "6",
            code: "TOPUP30",
            category: "Loans",
            title: "Top-Up Loan up to ₹50 Lakhs @ Home Loan Rates",
            subtitle: "Get additional funds for home renovation or personal use at low mortgage interest rates.",
            badge: "High Value",
            icon: Zap,
            gradient: "from-blue-600 to-sky-400",
            expires: "30 Sep 2026",
            details: [
                "Zero additional legal valuation charges",
                "Tenure matching remaining Home Loan tenure up to 20 Yrs",
                "Same day approval for existing borrowers"
            ]
        }
    ];

    const filteredOffers = selectedCategory === "All"
        ? offers
        : offers.filter(o => o.category === selectedCategory);

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const handleClaim = (title: string) => {
        setSelectedOfferTitle(title);
        setIsLeadModalOpen(true);
    };

    return (
        <div className="pb-20 bg-white text-white font-sans min-h-screen relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-50 rounded-full blur-[120px] pointer-events-none" />

            {/* Header Hero Section */}
            <section className="pt-16 pb-14 border-b border-white/10 relative z-10 text-center">
                <div className="container px-4 md:px-6 mx-auto space-y-4 max-w-3xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 text-xs font-black text-amber-300 uppercase tracking-widest">
                        <Gift className="h-3.5 w-3.5 text-amber-400" />
                        Exclusive 2026 Rewards & Offers
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                        Rewards, Vouchers & Cashbacks
                    </h1>
                    <p className="text-slate-600 text-base md:text-lg">
                        Claim processing fee waivers, Amazon gift vouchers, rate discounts, and cashback perks when you apply with Shree Finance.
                    </p>

                    {/* Filter Tabs */}
                    <div className="flex justify-center pt-6">
                        <div className="inline-flex p-1.5 bg-white backdrop-blur-xl rounded-2xl border border-white/10">
                            {(["All", "Loans", "Cards", "Cashback"] as const).map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                                        selectedCategory === cat
                                            ? "bg-primary text-white shadow-sm hover:shadow-md shadow-primary/20 scale-105"
                                            : "text-slate-500 hover:text-white"
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Offers Cards Grid */}
            <section className="py-16 container px-4 md:px-6 mx-auto relative z-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredOffers.map((offer) => (
                            <motion.div
                                key={offer.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="group relative"
                            >
                                <Card className="bg-white/90 border border-sky-800/50 backdrop-blur-xl rounded-[2.5rem] p-6 text-white shadow-2xl flex flex-col justify-between h-full hover:border-primary/50 transition-all duration-300">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div className={`h-12 w-12 rounded-2xl bg-gradient-to-tr ${offer.gradient} text-white flex items-center justify-center shadow-lg`}>
                                                <offer.icon className="h-6 w-6" />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest bg-amber-400/20 text-amber-300 border border-amber-400/40 px-3 py-1 rounded-full">
                                                {offer.badge}
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-extrabold text-white group-hover:text-primary transition-colors">
                                                {offer.title}
                                            </h3>
                                            <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
                                                {offer.subtitle}
                                            </p>
                                        </div>

                                        {/* Offer Details List */}
                                        <ul className="space-y-2 pt-2 border-t border-white/10">
                                            {offer.details.map((d, i) => (
                                                <li key={i} className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                                                    <CheckCircle2 className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                                                    <span>{d}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Bottom Promo Code & Action */}
                                    <div className="pt-6 space-y-3 border-t border-white/10 mt-6">
                                        <div className="flex items-center justify-between bg-black/40 p-2.5 rounded-2xl border border-white/10">
                                            <div className="flex items-center gap-2 pl-2">
                                                <Tag className="h-4 w-4 text-amber-400" />
                                                <span className="font-mono font-black text-xs text-amber-300 tracking-wider">
                                                    {offer.code}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => handleCopy(offer.code)}
                                                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-600 hover:text-white transition-colors"
                                                title="Copy Coupon Code"
                                            >
                                                {copiedCode === offer.code ? <Check className="h-4 w-4 text-sky-400" /> : <Copy className="h-4 w-4" />}
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" /> Valid till {offer.expires}
                                            </span>
                                        </div>

                                        <Button
                                            onClick={() => handleClaim(offer.title)}
                                            className="w-full bg-primary hover:bg-sky-600 text-white font-black h-12 rounded-2xl uppercase tracking-wider text-xs shadow-lg shadow-primary/20"
                                        >
                                            Claim Offer Now <ArrowRight className="h-4 w-4 ml-1" />
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </section>

            <LeadFormModal
                isOpen={isLeadModalOpen}
                onClose={() => setIsLeadModalOpen(false)}
                type="general"
            />
        </div>
    );
}
